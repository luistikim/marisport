import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import {
  acquireWebhookEventLock,
  getOrder,
  getOrderIdByPayment,
  isWebhookEventProcessed,
  linkPaymentToOrder,
  mapMercadoPagoStatus,
  markWebhookEventProcessed,
  releaseWebhookEventLock,
  saveOrder,
} from "@/lib/orders";
import { notifyOrderOwner } from "@/lib/notify";

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

type MercadoPagoPayment = {
  id?: number | string;
  status?: string;
  status_detail?: string;
  external_reference?: string;
  date_approved?: string;
  payer?: {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: {
      area_code?: string;
      number?: string;
    };
    identification?: {
      type?: string;
      number?: string;
    };
  };
};

type MercadoPagoWebhookValidationResult =
  | { ok: true }
  | { ok: false; response: Response };

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

async function fetchPayment(paymentId: string) {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("Configure MERCADO_PAGO_ACCESS_TOKEN para processar webhooks.");
  }

  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  let data: MercadoPagoPayment = {};

  try {
    data = (await response.json()) as MercadoPagoPayment;
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error("Mercado Pago nao retornou os dados do pagamento.");
  }

  return data;
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

    const validationResult = validateMercadoPagoWebhook(request, body);

    if (!validationResult.ok) {
      return validationResult.response;
    }

    if (body.type && body.type !== "payment") {
      return NextResponse.json({ received: true });
    }

    const paymentId = getPaymentId(body, url);

    if (!paymentId) {
      return NextResponse.json({ received: true });
    }

    if (await isWebhookEventProcessed(paymentId)) {
      console.info("[mercado-pago:webhook]", {
        paymentId,
        action: "already-processed",
      });

      return NextResponse.json({ received: true });
    }

    const lockAcquired = await acquireWebhookEventLock(paymentId);

    if (!lockAcquired) {
      console.info("[mercado-pago:webhook]", {
        paymentId,
        action: "processing-locked",
      });

      return NextResponse.json({ received: true });
    }

    try {
      const payment = await fetchPayment(paymentId);
      const externalReference = payment.external_reference;

      if (payment.status !== "approved") {
        console.info("[mercado-pago:webhook]", {
          paymentId,
          status: payment.status ?? "unknown",
          action: "ignored-non-approved",
        });

        return NextResponse.json({ received: true });
      }

      const orderId =
        getOrderIdFromExternalReference(externalReference) ??
        (await getOrderIdByPayment(paymentId));

      if (!orderId) {
        return NextResponse.json({ received: true });
      }

      const order = await getOrder(orderId);

      if (!order) {
        return NextResponse.json({ received: true });
      }

      await linkPaymentToOrder(paymentId, orderId);

      const paymentApprovedAt = payment.date_approved ?? new Date().toISOString();
      const customer = mergeCustomer(order.customer ?? {}, buildCustomerFromPayment(payment));
      const mercadoPagoPaymentId = String(payment.id ?? paymentId);
      const orderStatus = mapMercadoPagoStatus(payment.status);

      if (order.notificationStatus === "sent") {
        const notifiedAt = order.notifiedAt ?? new Date().toISOString();

        await saveOrder({
          ...order,
          status: orderStatus,
          paymentId,
          mercadoPagoPaymentId,
          paymentStatus: payment.status,
          paymentStatusDetail: payment.status_detail,
          paymentApprovedAt,
          customer,
          notifiedAt,
          notificationStatus: "sent",
          updatedAt: new Date().toISOString(),
        });

        await markWebhookEventProcessed(paymentId);
        console.info("[mercado-pago:webhook]", {
          orderId,
          paymentId,
          action: "notification-already-sent",
        });

        return NextResponse.json({ received: true });
      }

      await saveOrder({
        ...order,
        status: orderStatus,
        paymentId,
        mercadoPagoPaymentId,
        paymentStatus: payment.status,
        paymentStatusDetail: payment.status_detail,
        paymentApprovedAt,
        customer,
        notificationStatus: "pending",
        updatedAt: new Date().toISOString(),
      });

      const notificationResult = await notifyOrderOwner({
        ...order,
        status: "approved",
        paymentId,
        mercadoPagoPaymentId,
        paymentStatus: payment.status,
        paymentStatusDetail: payment.status_detail,
        paymentApprovedAt,
        customer,
        notificationStatus: "pending",
        updatedAt: new Date().toISOString(),
      });

      const notificationStatus = notificationResult.status;
      const notifiedAt =
        notificationStatus === "sent" ? new Date().toISOString() : order.notifiedAt;

      await saveOrder({
        ...order,
        status: orderStatus,
        paymentId,
        mercadoPagoPaymentId,
        paymentStatus: payment.status,
        paymentStatusDetail: payment.status_detail,
        paymentApprovedAt,
        customer,
        notifiedAt,
        notificationStatus,
        updatedAt: new Date().toISOString(),
      });

      if (notificationStatus === "sent") {
        console.info("[mercado-pago:webhook]", {
          orderId,
          paymentId,
          action: "notification-sent",
        });
      }

      if (notificationStatus === "skipped") {
        console.info("[mercado-pago:webhook]", {
          orderId,
          paymentId,
          action: "notification-skipped",
          reason: notificationResult.reason,
        });
      }

      if (notificationStatus === "failed") {
        console.error("[mercado-pago:webhook]", {
          orderId,
          paymentId,
          action: "notification-failed",
          error: notificationResult.error,
        });

        await markWebhookEventProcessed(paymentId);

        return NextResponse.json({ received: true });
      }

      await markWebhookEventProcessed(paymentId);

      return NextResponse.json({ received: true });
    } finally {
      try {
        await releaseWebhookEventLock(paymentId);
      } catch (error) {
        console.warn("[mercado-pago:webhook]", {
          paymentId,
          action: "lock-release-failed",
          error: error instanceof Error ? error.message : "unknown-error",
        });
      }
    }
  } catch (error) {
    console.error("[mercado-pago:webhook]", {
      action: "failed",
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
