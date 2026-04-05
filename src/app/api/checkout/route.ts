import { NextResponse } from "next/server";
import type { CartItem } from "@/components/cart-provider";
import { calculateSubtotal, saveOrder, type OrderRecord } from "@/lib/orders";
import { getCatalogProducts } from "@/lib/content";

type CheckoutRequestItem = {
  id: string;
  quantity: number;
};

const MAX_ITEM_QUANTITY = 10;

function isValidCheckoutItem(item: unknown): item is CheckoutRequestItem {
  if (!item || typeof item !== "object") {
    return false;
  }

  const typedItem = item as Partial<CheckoutRequestItem>;

  return (
    typeof typedItem.id === "string" &&
    typedItem.id.trim().length > 0 &&
    typeof typedItem.quantity === "number" &&
    Number.isInteger(typedItem.quantity) &&
    typedItem.quantity > 0 &&
    typedItem.quantity <= MAX_ITEM_QUANTITY
  );
}

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

    if (!Array.isArray(body.items) || body.items.some((item) => !isValidCheckoutItem(item))) {
      return NextResponse.json(
        {
          error: `Carrinho invalido. Cada item deve ter quantidade entre 1 e ${MAX_ITEM_QUANTITY}.`,
        },
        { status: 400 },
      );
    }

    const catalogProducts = await getCatalogProducts();
    const productById = new Map(catalogProducts.map((product) => [product.id, product]));
    const mergedItemsById = new Map<string, CheckoutRequestItem>();

    for (const entry of body.items) {
      const normalizedId = entry.id.trim();
      const current = mergedItemsById.get(normalizedId);
      const nextQuantity = (current?.quantity ?? 0) + entry.quantity;

      if (nextQuantity > MAX_ITEM_QUANTITY) {
        return NextResponse.json(
          {
            error: `Quantidade maxima por item excedida para "${normalizedId}". O limite e ${MAX_ITEM_QUANTITY}.`,
          },
          { status: 400 },
        );
      }

      mergedItemsById.set(normalizedId, {
        id: normalizedId,
        quantity: nextQuantity,
      });
    }

    const items: CartItem[] = [];

    for (const entry of mergedItemsById.values()) {
      const product = productById.get(entry.id);

      if (!product) {
        return NextResponse.json(
          { error: "Produto invalido no carrinho." },
          { status: 400 },
        );
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
