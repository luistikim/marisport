import { NextResponse } from "next/server";
import {
  getOrder,
  getOrderIdByPayment,
  linkPaymentToOrder,
  mapMercadoPagoStatus,
  saveOrder,
} from "@/lib/orders";

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

function getPaymentId(body: MercadoPagoWebhookBody, url: URL) {
  return (
    body.data?.id?.toString() ??
    body.id?.toString() ??
    url.searchParams.get("data.id") ??
    url.searchParams.get("id")
  );
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

  const data = (await response.json()) as {
    status?: string;
    status_detail?: string;
    external_reference?: string;
    id?: number | string;
  };

  if (!response.ok) {
    throw new Error("Mercado Pago nao retornou os dados do pagamento.");
  }

  return data;
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const body = (await request.json().catch(() => ({}))) as MercadoPagoWebhookBody;

    if (body.type && body.type !== "payment") {
      return NextResponse.json({ received: true });
    }

    const paymentId = getPaymentId(body, url);

    if (!paymentId) {
      return NextResponse.json({ received: true });
    }

    const payment = await fetchPayment(paymentId);
    const externalReference = payment.external_reference;

    const orderId =
      externalReference?.replace("marisport-order-", "") ??
      (await getOrderIdByPayment(paymentId));

    if (!orderId) {
      return NextResponse.json({ received: true });
    }

    const order = await getOrder(orderId);

    if (!order) {
      return NextResponse.json({ received: true });
    }

    await linkPaymentToOrder(paymentId, orderId);

    await saveOrder({
      ...order,
      status: mapMercadoPagoStatus(payment.status),
      paymentId,
      paymentStatus: payment.status,
      paymentStatusDetail: payment.status_detail,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Nao foi possivel processar o webhook.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ received: true });
}
