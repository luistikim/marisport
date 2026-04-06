import { mapMercadoPagoStatus, type OrderRecord, type OrderStatus } from "@/lib/orders";

export type MercadoPagoPaymentItem = {
  id?: string;
  title?: string;
  description?: string;
  quantity?: number;
  unit_price?: number;
};

export type MercadoPagoPayment = {
  id?: number | string;
  status?: string;
  status_detail?: string;
  external_reference?: string;
  date_approved?: string;
  additional_info?: {
    items?: MercadoPagoPaymentItem[];
  };
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

export type MercadoPagoPaymentFetchOptions = {
  accessToken: string;
  timeoutMs?: number;
  maxAttempts?: number;
  retryDelayMs?: number;
};

export type MercadoPagoPaymentStatusUpdate = {
  paymentId: string;
  mercadoPagoPaymentId: string;
  paymentStatus: string;
  paymentStatusDetail?: string;
  paymentApprovedAt?: string;
  orderStatus: OrderStatus;
};

export type MercadoPagoStatusSource = "webhook" | "fallback";

export type MercadoPagoStatusTransitionDecision = {
  source: MercadoPagoStatusSource;
  currentStatus: OrderStatus;
  nextStatus: OrderStatus;
  currentPriority: number;
  nextPriority: number;
  action: "apply" | "ignore";
  reason: "status_progression" | "status_same" | "status_regression";
  message: string;
};

const FINAL_ORDER_STATUSES: OrderStatus[] = [
  "approved",
  "rejected",
  "cancelled",
  "refunded",
];
const ORDER_STATUS_PRIORITY: Record<OrderStatus, number> = {
  unknown: 0,
  created: 1,
  pending: 2,
  rejected: 3,
  cancelled: 3,
  approved: 4,
  refunded: 5,
};

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isRetryablePaymentFetchError(error: unknown) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return true;
  }

  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    message.includes("fetch failed") ||
    message.includes("network") ||
    message.includes("timeout") ||
    message.includes("timed out") ||
    message.includes("aborted")
  );
}

export function isFinalMercadoPagoOrderStatus(status?: OrderStatus | string) {
  return FINAL_ORDER_STATUSES.includes((status ?? "") as OrderStatus);
}

export function shouldConsultMercadoPagoForOrder(order: Pick<OrderRecord, "status">) {
  return !isFinalMercadoPagoOrderStatus(order.status);
}

export function mapMercadoPagoPaymentStatus(status?: string): OrderStatus {
  return mapMercadoPagoStatus(status);
}

export function decideMercadoPagoStatusTransition(
  currentStatus: OrderStatus | string | undefined,
  nextStatus: OrderStatus | string | undefined,
  source: MercadoPagoStatusSource,
): MercadoPagoStatusTransitionDecision {
  const current = mapMercadoPagoStatus(currentStatus);
  const next = mapMercadoPagoStatus(nextStatus);
  const currentPriority = ORDER_STATUS_PRIORITY[current];
  const nextPriority = ORDER_STATUS_PRIORITY[next];

  if (nextPriority > currentPriority) {
    return {
      source,
      currentStatus: current,
      nextStatus: next,
      currentPriority,
      nextPriority,
      action: "apply",
      reason: "status_progression",
      message: "Novo status possui maior precedencia e pode ser aplicado.",
    };
  }

  if (nextPriority === currentPriority) {
    return {
      source,
      currentStatus: current,
      nextStatus: next,
      currentPriority,
      nextPriority,
      action: "apply",
      reason: "status_same",
      message: "Novo status possui a mesma precedencia do status atual.",
    };
  }

  return {
    source,
    currentStatus: current,
    nextStatus: next,
    currentPriority,
    nextPriority,
    action: "ignore",
    reason: "status_regression",
    message: "Novo status foi ignorado para evitar regressao do pedido.",
  };
}

export function buildPaymentStatusUpdate(
  payment: MercadoPagoPayment,
  existingPaymentApprovedAt?: string,
): MercadoPagoPaymentStatusUpdate {
  const paymentId = String(payment.id ?? "");
  const mercadoPagoPaymentId = String(payment.id ?? paymentId);
  const paymentStatus = payment.status ?? "unknown";
  const orderStatus = mapMercadoPagoStatus(paymentStatus);
  const paymentApprovedAt =
    payment.date_approved ?? (isFinalMercadoPagoOrderStatus(orderStatus) ? existingPaymentApprovedAt : undefined);

  return {
    paymentId,
    mercadoPagoPaymentId,
    paymentStatus,
    paymentStatusDetail: payment.status_detail,
    paymentApprovedAt,
    orderStatus,
  };
}

export async function fetchMercadoPagoPayment(
  paymentId: string,
  options: MercadoPagoPaymentFetchOptions,
) {
  const timeoutMs = options.timeoutMs ?? 5000;
  const maxAttempts = options.maxAttempts ?? 2;
  const retryDelayMs = options.retryDelayMs ?? 400;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${options.accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        signal: controller.signal,
      });

      let data: MercadoPagoPayment = {};

      try {
        data = (await response.json()) as MercadoPagoPayment;
      } catch {
        data = {};
      }

      if (!response.ok) {
        const message =
          response.status >= 500
            ? "Mercado Pago retornou erro temporario ao consultar o pagamento."
            : "Mercado Pago nao retornou os dados do pagamento.";

        const error = new Error(message) as Error & { status?: number };
        error.status = response.status;
        throw error;
      }

      return data;
    } catch (error) {
      lastError = error;

      if (!isRetryablePaymentFetchError(error) || attempt >= maxAttempts) {
        break;
      }

      await sleep(retryDelayMs * attempt);
    } finally {
      clearTimeout(timeout);
    }
  }

  if (lastError instanceof Error) {
    throw lastError;
  }

  throw new Error("Mercado Pago nao retornou os dados do pagamento.");
}
