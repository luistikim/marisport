import { NextResponse } from "next/server";
import type { CartItem } from "@/components/cart-provider";
import { calculateSubtotal, saveOrder, type OrderRecord } from "@/lib/orders";
import { getCatalogProductById } from "@/lib/content";

type CheckoutRequestItem = {
  id: string;
  quantity: number;
};

function getBaseUrl(request: Request) {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredSiteUrl) {
    return configuredSiteUrl;
  }

  return new URL(request.url).origin;
}

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        {
          error:
            "Configure MERCADO_PAGO_ACCESS_TOKEN para ativar o Checkout Pro.",
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as {
      items?: CheckoutRequestItem[];
    };

    if (!body.items?.length) {
      return NextResponse.json(
        { error: "Seu carrinho esta vazio." },
        { status: 400 },
      );
    }

    const items: CartItem[] = [];

    for (const entry of body.items) {
      const product = await getCatalogProductById(entry.id);

      if (!product) {
        throw new Error("Produto invalido no carrinho.");
      }

      if (!Number.isInteger(entry.quantity) || entry.quantity <= 0) {
        throw new Error("Quantidade invalida no carrinho.");
      }

      if (typeof product.unitPrice !== "number" || product.unitPrice <= 0) {
        throw new Error(
          `Defina o preco do produto "${product.name}" antes de usar o Checkout Pro.`,
        );
      }

      items.push({ ...product, quantity: entry.quantity } as CartItem);
    }

    const baseUrl = getBaseUrl(request);
    const orderId = crypto.randomUUID();
    const externalReference = `marisport-order-${orderId}`;
    const order: OrderRecord = {
      id: orderId,
      externalReference,
      status: "created",
      items,
      subtotal: calculateSubtotal(items),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveOrder(order);

    const mercadoPagoResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            title: item.name,
            quantity: item.quantity,
            currency_id: "BRL",
            unit_price: item.unitPrice,
            description: item.description,
          })),
          back_urls: {
            success: `${baseUrl}/checkout/sucesso?order_id=${orderId}`,
            pending: `${baseUrl}/checkout/pendente?order_id=${orderId}`,
            failure: `${baseUrl}/checkout/falha?order_id=${orderId}`,
          },
          auto_return: "approved",
          external_reference: externalReference,
          notification_url: `${baseUrl}/api/mercado-pago/webhook`,
        }),
      },
    );

    const data = (await mercadoPagoResponse.json()) as {
      init_point?: string;
      sandbox_init_point?: string;
      message?: string;
      cause?: Array<{ description?: string }>;
    };

    if (!mercadoPagoResponse.ok) {
      const causeMessage = data.cause?.[0]?.description;

      return NextResponse.json(
        {
          error:
            causeMessage ??
            data.message ??
            "Mercado Pago nao conseguiu criar a preferencia de pagamento.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      orderId,
      initPoint: data.init_point ?? data.sandbox_init_point,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Nao foi possivel iniciar o pagamento.",
      },
      { status: 500 },
    );
  }
}
