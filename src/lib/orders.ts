import type { CartItem } from "@/components/cart-provider";

export type OrderStatus =
  | "created"
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled"
  | "refunded"
  | "unknown";

export type OrderRecord = {
  id: string;
  externalReference: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  createdAt: string;
  updatedAt: string;
  paymentId?: string;
  paymentStatus?: string;
  paymentStatusDetail?: string;
};

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

function ensureKvConfig() {
  if (!KV_URL || !KV_TOKEN) {
    throw new Error(
      "Configure KV_REST_API_URL e KV_REST_API_TOKEN para persistir os pedidos e atualizar o status via webhook.",
    );
  }
}

async function runKvCommand(command: Array<string | number>) {
  ensureKvConfig();

  const response = await fetch(KV_URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Nao foi possivel acessar o armazenamento de pedidos.");
  }

  return (await response.json()) as {
    result?: unknown;
    error?: string;
  };
}

function getOrderKey(orderId: string) {
  return `order:${orderId}`;
}

function getPaymentKey(paymentId: string) {
  return `payment:${paymentId}`;
}

export async function saveOrder(order: OrderRecord) {
  const payload = JSON.stringify(order);
  const response = await runKvCommand(["SET", getOrderKey(order.id), payload]);

  if (response.error) {
    throw new Error(response.error);
  }
}

export async function getOrder(orderId: string) {
  const response = await runKvCommand(["GET", getOrderKey(orderId)]);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.result) {
    return null;
  }

  return JSON.parse(String(response.result)) as OrderRecord;
}

export async function linkPaymentToOrder(paymentId: string, orderId: string) {
  const response = await runKvCommand(["SET", getPaymentKey(paymentId), orderId]);

  if (response.error) {
    throw new Error(response.error);
  }
}

export async function getOrderIdByPayment(paymentId: string) {
  const response = await runKvCommand(["GET", getPaymentKey(paymentId)]);

  if (response.error) {
    throw new Error(response.error);
  }

  return response.result ? String(response.result) : null;
}

export function calculateSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + (item.unitPrice ?? 0) * item.quantity, 0);
}

export function mapMercadoPagoStatus(status?: string): OrderStatus {
  switch (status) {
    case "approved":
      return "approved";
    case "pending":
    case "in_process":
    case "in_mediation":
      return "pending";
    case "rejected":
      return "rejected";
    case "cancelled":
      return "cancelled";
    case "refunded":
    case "charged_back":
      return "refunded";
    default:
      return "unknown";
  }
}
