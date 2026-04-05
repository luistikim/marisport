import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
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
