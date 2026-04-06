import { NextResponse } from "next/server";
import { getOrder, getOrderIdByPayment, saveOrder, type OrderRecord } from "@/lib/orders";
import {
  decideMercadoPagoStatusTransition,
  buildPaymentStatusUpdate,
  fetchMercadoPagoPayment,
  shouldConsultMercadoPagoForOrder,
} from "@/lib/mercado-pago-payment";

type ResolvePaymentInput = {
  orderId?: string;
  paymentId?: string;
};

type ResolvePaymentResponse = OrderRecord & {
  resolvedFrom?: "cache" | "mercado_pago";
  message?: string;
};

function logFallback(
  level: "info" | "warn" | "error",
  step: string,
  details: Record<string, unknown> = {},
) {
  console[level]("[mercado-pago:fallback]", {
    scope: "mercado_pago_fallback",
    step,
    ...details,
  });
}

function normalizeInput(value?: string | null) {
  return value?.trim() || undefined;
}

async function resolveOrder(orderId?: string, paymentId?: string) {
  if (orderId) {
    const order = await getOrder(orderId);
    if (order) {
      return { order, resolvedOrderId: orderId };
    }
  }

  if (!paymentId) {
    return { order: null, resolvedOrderId: null };
  }

  const resolvedOrderId = await getOrderIdByPayment(paymentId);

  if (!resolvedOrderId) {
    return { order: null, resolvedOrderId: null };
  }

  const order = await getOrder(resolvedOrderId);
  return { order, resolvedOrderId };
}

async function handleResolvePayment(input: ResolvePaymentInput) {
  const orderId = normalizeInput(input.orderId);
  const paymentId = normalizeInput(input.paymentId);

  logFallback("info", "received", {
    orderId: orderId ?? null,
    paymentId: paymentId ?? null,
  });

  if (!orderId && !paymentId) {
    logFallback("warn", "input_missing", {
      message: "Fallback chamado sem orderId nem paymentId.",
    });

    return NextResponse.json(
      { error: "Informe orderId ou paymentId." },
      { status: 400 },
    );
  }

  const { order, resolvedOrderId } = await resolveOrder(orderId, paymentId);

  if (!order || !resolvedOrderId) {
    logFallback("warn", "order_not_found", {
      orderId: orderId ?? null,
      paymentId: paymentId ?? null,
    });

    return NextResponse.json(
      { error: "Pedido nao encontrado." },
      { status: 404 },
    );
  }

  logFallback("info", "order_loaded", {
    orderId: resolvedOrderId,
    previousStatus: order.status,
    paymentStatus: order.paymentStatus ?? null,
    paymentId: order.paymentId ?? paymentId ?? null,
  });

  if (!shouldConsultMercadoPagoForOrder(order)) {
    logFallback("info", "status_trusted", {
      orderId: resolvedOrderId,
      previousStatus: order.status,
      nextStatus: order.status,
      message: "Pedido ja possui status final confiavel.",
    });

    return NextResponse.json({
      ...order,
      resolvedFrom: "cache",
      message: "Pedido ja confirmado localmente.",
    } satisfies ResolvePaymentResponse);
  }

  const effectivePaymentId = paymentId ?? order.paymentId;

  if (!effectivePaymentId) {
    logFallback("warn", "payment_id_missing_for_refresh", {
      orderId: resolvedOrderId,
      previousStatus: order.status,
      message: "Nao foi possivel consultar o Mercado Pago sem paymentId.",
    });

    return NextResponse.json({
      ...order,
      resolvedFrom: "cache",
      message: "Pagamento ainda depende do webhook ou do retorno com payment_id.",
    } satisfies ResolvePaymentResponse);
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    logFallback("error", "access_token_missing", {
      orderId: resolvedOrderId,
      paymentId: effectivePaymentId,
      message: "MERCADO_PAGO_ACCESS_TOKEN nao configurado.",
    });

    return NextResponse.json(
      { error: "Falha ao confirmar o pagamento agora." },
      { status: 500 },
    );
  }

  try {
    logFallback("info", "payment_refresh_start", {
      orderId: resolvedOrderId,
      paymentId: effectivePaymentId,
      previousStatus: order.status,
    });

    const payment = await fetchMercadoPagoPayment(effectivePaymentId, {
      accessToken,
      timeoutMs: 5000,
      maxAttempts: 2,
      retryDelayMs: 400,
    });

    const paymentUpdate = buildPaymentStatusUpdate(payment, order.paymentApprovedAt);
    const statusDecision = decideMercadoPagoStatusTransition(
      order.status,
      paymentUpdate.orderStatus,
      "fallback",
    );

    if (statusDecision.action === "ignore") {
      logFallback("warn", "status_transition_ignored", {
        orderId: resolvedOrderId,
        paymentId: effectivePaymentId,
        previousStatus: statusDecision.currentStatus,
        nextStatus: statusDecision.nextStatus,
        source: statusDecision.source,
        reason: statusDecision.reason,
        message: statusDecision.message,
      });

      return NextResponse.json({
        ...order,
        resolvedFrom: "cache",
        message: "O pedido ja possui um status mais confiavel e nao foi regredido.",
      } satisfies ResolvePaymentResponse);
    }

    const nextOrder = {
      ...order,
      status: statusDecision.nextStatus,
      paymentId: paymentUpdate.paymentId,
      mercadoPagoPaymentId: paymentUpdate.mercadoPagoPaymentId,
      paymentStatus: paymentUpdate.paymentStatus,
      paymentStatusDetail: paymentUpdate.paymentStatusDetail,
      paymentApprovedAt: paymentUpdate.paymentApprovedAt ?? order.paymentApprovedAt,
      updatedAt: new Date().toISOString(),
    };

    await saveOrder(nextOrder);

    logFallback("info", "status_transition_applied", {
      orderId: resolvedOrderId,
      paymentId: effectivePaymentId,
      previousStatus: statusDecision.currentStatus,
      nextStatus: nextOrder.status,
      source: statusDecision.source,
      reason: statusDecision.reason,
      message: statusDecision.message,
    });

    logFallback("info", "payment_refreshed", {
      orderId: resolvedOrderId,
      paymentId: effectivePaymentId,
      previousStatus: statusDecision.currentStatus,
      nextStatus: nextOrder.status,
      source: statusDecision.source,
      reason: statusDecision.reason,
      paymentStatusDetail: nextOrder.paymentStatusDetail ?? null,
      message: "Status do pedido atualizado com base no Mercado Pago.",
    });

    return NextResponse.json({
      ...nextOrder,
      resolvedFrom: "mercado_pago",
      message: "Pagamento confirmado no backend.",
    } satisfies ResolvePaymentResponse);
  } catch (error) {
    logFallback("warn", "payment_refresh_failed", {
      orderId: resolvedOrderId,
      paymentId: effectivePaymentId,
      previousStatus: order.status,
      error: error instanceof Error ? error.message : "unknown-error",
      message: "Fallback seguro: retornando o pedido local sem corromper o estado.",
    });

    return NextResponse.json({
      ...order,
      resolvedFrom: "cache",
      message: "Ainda nao foi possivel confirmar o pagamento. Vamos tentar novamente.",
    } satisfies ResolvePaymentResponse);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as ResolvePaymentInput;
    return handleResolvePayment(body);
  } catch (error) {
    logFallback("error", "request_failed", {
      error: error instanceof Error ? error.message : "unknown-error",
    });

    return NextResponse.json(
      { error: "Nao foi possivel confirmar o pagamento." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);

  return handleResolvePayment({
    orderId: url.searchParams.get("order_id") ?? url.searchParams.get("orderId") ?? undefined,
    paymentId: url.searchParams.get("payment_id") ?? url.searchParams.get("paymentId") ?? undefined,
  });
}
