import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import {
  acquireWebhookEventLock,
  claimWebhookEventProcessing,
  getOrder,
  getOrderIdByPayment,
  isWebhookEventProcessed,
  releaseWebhookEventProcessing,
  linkPaymentToOrder,
  type OrderRecord,
  markWebhookEventProcessed,
  releaseWebhookEventLock,
  saveOrder,
} from "@/lib/orders";
import { notifyOrderOwner } from "@/lib/notify";
import {
  buildMercadoPagoItemPayload,
  reconcileMercadoPagoItems,
} from "@/lib/mercado-pago-items";
import {
  buildPaymentStatusUpdate,
  decideMercadoPagoStatusTransition,
  fetchMercadoPagoPayment,
  isFinalMercadoPagoOrderStatus,
  type MercadoPagoPayment,
} from "@/lib/mercado-pago-payment";

type MercadoPagoWebhookBody = {
  action?: string;
  api_version?: string;
  data?: {
    id?: string;
  };
  id?: number | string;
  live_mode?: boolean;
  type?: string;
};

type MercadoPagoWebhookValidationResult =
  | { ok: true }
  | { ok: false; response: Response };

type LogLevel = "info" | "warn" | "error";

function logMercadoPagoWebhook(
  level: LogLevel,
  step: string,
  details: Record<string, unknown> = {},
) {
  console[level]("[mercado-pago:webhook]", {
    scope: "mercado_pago_webhook",
    step,
    ...details,
  });
}

function parseMercadoPagoSignature(signature: string) {
  const values: Record<string, string> = {};

  for (const part of signature.split(",")) {
    const [key, value] = part.split("=", 2).map((item) => item.trim());

    if (key && value) {
      values[key] = value;
    }
  }

  return {
    ts: values.ts,
    v1: values.v1,
  };
}

function validateMercadoPagoWebhook(
  request: Request,
  body: MercadoPagoWebhookBody,
): MercadoPagoWebhookValidationResult {
  const webhookSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error(
      "Configure MERCADO_PAGO_WEBHOOK_SECRET para validar a autenticidade do webhook.",
    );
  }

  const url = new URL(request.url);
  const signature = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id");
  const dataId = url.searchParams.get("data.id") ?? body.data?.id?.toString() ?? body.id?.toString();

  // Esta validação confirma que a notificação veio mesmo do Mercado Pago.
  // Sem isso, uma requisição forjada poderia simular pagamento aprovado e causar fraude.
  if (!signature || !requestId || !dataId) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const { ts, v1 } = parseMercadoPagoSignature(signature);

  if (!ts || !v1) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
  const expectedSignature = createHmac("sha256", webhookSecret)
    .update(manifest)
    .digest("hex");

  const receivedSignature = Buffer.from(v1, "hex");
  const calculatedSignature = Buffer.from(expectedSignature, "hex");

  if (
    receivedSignature.length !== calculatedSignature.length ||
    !timingSafeEqual(receivedSignature, calculatedSignature)
  ) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true };
}

function getPaymentId(body: MercadoPagoWebhookBody, url: URL) {
  return (
    body.data?.id?.toString() ??
    body.id?.toString() ??
    url.searchParams.get("data.id") ??
    url.searchParams.get("id")
  );
}

function getOrderIdFromExternalReference(externalReference?: string) {
  const prefix = "marisport-order-";

  if (!externalReference || !externalReference.startsWith(prefix)) {
    return null;
  }

  const orderId = externalReference.slice(prefix.length).trim();

  return orderId || null;
}

function getPaymentItems(payment: MercadoPagoPayment) {
  return payment.additional_info?.items ?? [];
}

function buildPaymentState(
  order: Awaited<ReturnType<typeof getOrder>>,
  payment: MercadoPagoPayment,
) {
  if (!order) {
    return null;
  }

  const paymentUpdate = buildPaymentStatusUpdate(payment, order.paymentApprovedAt);

  const expectedItems = order.items.map((item) =>
    buildMercadoPagoItemPayload({
      id: item.id,
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
    }),
  );

  const reconciliation = reconcileMercadoPagoItems(order.items, getPaymentItems(payment));

  return {
    ...paymentUpdate,
    expectedItems,
    reconciliation,
    customer: mergeCustomer(order.customer ?? {}, buildCustomerFromPayment(payment)),
  };
}

function isOrderAlreadyApplied(
  order: NonNullable<Awaited<ReturnType<typeof getOrder>>>,
  paymentState: NonNullable<ReturnType<typeof buildPaymentState>>,
) {
  return (
    order.paymentId === paymentState.paymentId &&
    order.mercadoPagoPaymentId === paymentState.mercadoPagoPaymentId &&
    order.paymentStatus === paymentState.paymentStatus &&
    order.status === paymentState.orderStatus
  );
}

function buildPersistedOrder(
  order: NonNullable<Awaited<ReturnType<typeof getOrder>>>,
  paymentState: NonNullable<ReturnType<typeof buildPaymentState>>,
  nextStatus: OrderRecord["status"],
): OrderRecord {
  return {
    ...order,
    status: nextStatus,
    paymentId: paymentState.paymentId,
    mercadoPagoPaymentId: paymentState.mercadoPagoPaymentId,
    paymentStatus: paymentState.paymentStatus,
    paymentStatusDetail: paymentState.paymentStatusDetail,
    paymentApprovedAt: paymentState.paymentApprovedAt,
    customer: paymentState.customer,
    notificationStatus:
      paymentState.orderStatus === "approved"
        ? order.notificationStatus === "sent"
          ? "sent"
          : "pending"
        : "skipped",
    updatedAt: new Date().toISOString(),
  };
}

function buildCustomerFromPayment(payment: MercadoPagoPayment) {
  const payer = payment.payer;
  const firstName = payer?.first_name?.trim() ?? "";
  const lastName = payer?.last_name?.trim() ?? "";
  const name = `${firstName} ${lastName}`.trim() || payer?.email?.trim() || undefined;
  const phoneNumber = [payer?.phone?.area_code, payer?.phone?.number]
    .map((part) => part?.toString().trim() ?? "")
    .filter(Boolean)
    .join(" ")
    .trim();

  return {
    name,
    email: payer?.email?.trim() || undefined,
    phone: phoneNumber || undefined,
    identification:
      payer?.identification?.type && payer?.identification?.number
        ? {
            type: payer.identification.type,
            number: payer.identification.number,
          }
        : undefined,
  };
}

function mergeCustomer(
  existingCustomer: NonNullable<NonNullable<Awaited<ReturnType<typeof getOrder>>>["customer"]>,
  incomingCustomer: ReturnType<typeof buildCustomerFromPayment>,
) {
  return {
    name: incomingCustomer.name ?? existingCustomer.name,
    email: incomingCustomer.email ?? existingCustomer.email,
    phone: incomingCustomer.phone ?? existingCustomer.phone,
    identification: incomingCustomer.identification ?? existingCustomer.identification,
  };
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const body = (await request.json().catch(() => ({}))) as MercadoPagoWebhookBody;

    logMercadoPagoWebhook("info", "webhook_received", {
      url: request.url,
      body,
    });

    const validationResult = validateMercadoPagoWebhook(request, body);

    if (!validationResult.ok) {
      logMercadoPagoWebhook("warn", "signature_invalid", {
        url: request.url,
      });
      return validationResult.response;
    }

    logMercadoPagoWebhook("info", "signature_validated", {
      type: body.type ?? "unknown",
      dataId: body.data?.id?.toString() ?? body.id?.toString() ?? url.searchParams.get("data.id") ?? url.searchParams.get("id") ?? null,
    });

    if (body.type && body.type !== "payment") {
      logMercadoPagoWebhook("info", "event_ignored", {
        type: body.type,
      });
      return NextResponse.json({ received: true });
    }

    const paymentId = getPaymentId(body, url);

    if (!paymentId) {
      logMercadoPagoWebhook("warn", "payment_id_missing", {
        message: "Webhook recebido sem paymentId.",
      });
      return NextResponse.json({ received: true });
    }

    logMercadoPagoWebhook("info", "payment_id_found", {
      paymentId,
    });

    if (await isWebhookEventProcessed(paymentId)) {
      logMercadoPagoWebhook("info", "duplicate_detected", {
        paymentId,
        reason: "processed",
      });

      return NextResponse.json({ received: true });
    }

    const lockAcquired = await acquireWebhookEventLock(paymentId);

    if (!lockAcquired) {
      logMercadoPagoWebhook("info", "duplicate_detected", {
        paymentId,
        reason: "lock_busy",
      });

      return NextResponse.json({ received: true });
    }

    const processingClaimed = await claimWebhookEventProcessing(paymentId);

    if (!processingClaimed) {
      logMercadoPagoWebhook("info", "duplicate_detected", {
        paymentId,
        reason: "processing_claimed",
      });

      try {
        await releaseWebhookEventLock(paymentId);
      } catch (error) {
        logMercadoPagoWebhook("warn", "lock_release_failed", {
          paymentId,
          error: error instanceof Error ? error.message : "unknown-error",
        });
      }

      return NextResponse.json({ received: true });
    }

    try {
      logMercadoPagoWebhook("info", "payment_fetch_started", {
        paymentId,
      });

      const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

      if (!accessToken) {
        throw new Error("Configure MERCADO_PAGO_ACCESS_TOKEN para processar webhooks.");
      }

      const payment = await fetchMercadoPagoPayment(paymentId, {
        accessToken,
      });
      const paymentItems = getPaymentItems(payment);
      const paymentStatus = payment.status ?? "unknown";

      logMercadoPagoWebhook("info", "payment_fetched", {
        paymentId,
        status: paymentStatus,
        statusDetail: payment.status_detail ?? "unknown",
        itemsCount: paymentItems.length,
        externalReference: payment.external_reference ?? null,
      });

      logMercadoPagoWebhook("info", "payment_context_loaded", {
        paymentId,
        status: paymentStatus,
      });

      const orderId =
        getOrderIdFromExternalReference(payment.external_reference) ??
        (await getOrderIdByPayment(paymentId));

      if (!orderId) {
        logMercadoPagoWebhook("warn", "order_not_found", {
          paymentId,
          status: paymentStatus,
          externalReference: payment.external_reference ?? null,
        });

        return NextResponse.json({ received: true });
      }

      const order = await getOrder(orderId);

      if (!order) {
        logMercadoPagoWebhook("warn", "order_missing", {
          paymentId,
          orderId,
        });
        return NextResponse.json({ received: true });
      }

      await linkPaymentToOrder(paymentId, orderId);

      logMercadoPagoWebhook("info", "payment_linked_to_order", {
        paymentId,
        orderId,
      });

      const paymentState = buildPaymentState(order, payment);

      if (!paymentState) {
        logMercadoPagoWebhook("error", "payment_state_unavailable", {
          paymentId,
          orderId,
        });
        return NextResponse.json({ received: true });
      }

      if (paymentState.reconciliation.matched) {
        logMercadoPagoWebhook("info", "reconciliation_ok", {
          paymentId,
          orderId,
          itemsCount: paymentState.reconciliation.expectedCount,
        });
      } else {
        logMercadoPagoWebhook("warn", "reconciliation_divergence", {
          paymentId,
          orderId,
          itemsCount: paymentState.reconciliation.expectedCount,
          paymentItemsCount: paymentState.reconciliation.paymentCount,
          differences: paymentState.reconciliation.differences,
        });
      }

      const statusDecision = decideMercadoPagoStatusTransition(
        order.status,
        paymentState.orderStatus,
        "webhook",
      );

      if (statusDecision.action === "ignore") {
        logMercadoPagoWebhook("warn", "status_transition_ignored", {
          paymentId,
          orderId,
          previousStatus: statusDecision.currentStatus,
          nextStatus: statusDecision.nextStatus,
          source: statusDecision.source,
          reason: statusDecision.reason,
          message: statusDecision.message,
        });

        if (isFinalMercadoPagoOrderStatus(order.status)) {
          try {
            await markWebhookEventProcessed(paymentId);
            logMercadoPagoWebhook("info", "event_marked_processed", {
              paymentId,
              orderId,
              status: order.status,
              reason: "final_status_preserved",
            });
          } catch (error) {
            logMercadoPagoWebhook("error", "event_marked_process_failed", {
              paymentId,
              orderId,
              error: error instanceof Error ? error.message : "unknown-error",
            });
          }
        } else {
          logMercadoPagoWebhook("info", "event_not_marked_processed", {
            paymentId,
            orderId,
            status: order.status,
            reason: "non_final_status_requires_future_retry",
          });
        }

        return NextResponse.json({ received: true });
      }

      if (isOrderAlreadyApplied(order, paymentState)) {
        logMercadoPagoWebhook("info", "decision_already_applied", {
          paymentId,
          orderId,
          status: paymentState.paymentStatus,
        });

        await markWebhookEventProcessed(paymentId);
        logMercadoPagoWebhook("info", "event_marked_processed", {
          paymentId,
          orderId,
          status: paymentState.paymentStatus,
        });

        return NextResponse.json({ received: true });
      }

      const persistedOrder = buildPersistedOrder(
        order,
        paymentState,
        statusDecision.nextStatus,
      );
      await saveOrder(persistedOrder);
      logMercadoPagoWebhook("info", "status_transition_applied", {
        paymentId,
        orderId,
        previousStatus: statusDecision.currentStatus,
        nextStatus: persistedOrder.status,
        source: statusDecision.source,
        reason: statusDecision.reason,
        paymentStatus: persistedOrder.paymentStatus,
      });
      logMercadoPagoWebhook("info", "order_persisted", {
        paymentId,
        orderId,
        previousStatus: statusDecision.currentStatus,
        nextStatus: persistedOrder.status,
        source: statusDecision.source,
        reason: statusDecision.reason,
        paymentStatus: persistedOrder.paymentStatus,
      });

      await markWebhookEventProcessed(paymentId);
      logMercadoPagoWebhook("info", "event_marked_processed", {
        paymentId,
        orderId,
        status: persistedOrder.status,
      });

      if (paymentState.orderStatus !== "approved") {
        logMercadoPagoWebhook("info", "decision_status_persisted", {
          paymentId,
          orderId,
          status: persistedOrder.status,
        });
        return NextResponse.json({ received: true });
      }

      const notificationResult = await notifyOrderOwner({
        ...persistedOrder,
        status: "approved",
        notificationStatus: "pending",
      });

      const notifiedAt =
        notificationResult.status === "sent"
          ? new Date().toISOString()
          : persistedOrder.notifiedAt;

      const finalOrder = {
        ...persistedOrder,
        notifiedAt,
        notificationStatus: notificationResult.status,
        updatedAt: new Date().toISOString(),
      };

      try {
        await saveOrder(finalOrder);
      } catch (error) {
        logMercadoPagoWebhook("error", "notification_state_persist_failed", {
          paymentId,
          orderId,
          error: error instanceof Error ? error.message : "unknown-error",
        });
        return NextResponse.json({ received: true });
      }

      if (notificationResult.status === "sent") {
        logMercadoPagoWebhook("info", "decision_notification_sent", {
          paymentId,
          orderId,
          emailId: notificationResult.emailId ?? null,
        });
      } else if (notificationResult.status === "skipped") {
        logMercadoPagoWebhook("info", "decision_notification_skipped", {
          paymentId,
          orderId,
          reason: notificationResult.reason,
        });
      } else {
        logMercadoPagoWebhook("error", "decision_notification_failed", {
          paymentId,
          orderId,
          error: notificationResult.error,
        });
      }

      return NextResponse.json({ received: true });
    } catch (error) {
      logMercadoPagoWebhook("error", "webhook_error", {
        paymentId,
        error: error instanceof Error ? error.message : "unknown-error",
      });

      return NextResponse.json(
        {
          error: "Nao foi possivel processar o webhook.",
        },
        { status: 500 },
      );
    } finally {
      try {
        await releaseWebhookEventProcessing(paymentId);
      } catch (error) {
        logMercadoPagoWebhook("warn", "processing_release_failed", {
          paymentId,
          error: error instanceof Error ? error.message : "unknown-error",
        });
      }

      try {
        await releaseWebhookEventLock(paymentId);
      } catch (error) {
        logMercadoPagoWebhook("warn", "lock_release_failed", {
          paymentId,
          error: error instanceof Error ? error.message : "unknown-error",
        });
      }
    }
  } catch (error) {
    logMercadoPagoWebhook("error", "webhook_failed", {
      error: error instanceof Error ? error.message : "unknown-error",
    });

    return NextResponse.json(
      {
        error: "Nao foi possivel processar o webhook.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ received: true });
}
