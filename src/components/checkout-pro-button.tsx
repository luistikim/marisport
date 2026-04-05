"use client";

import { useRef, useState } from "react";
import type { CartItem } from "@/components/cart-provider";

type CheckoutErrorKind = "item" | "checkout" | "global";

type CheckoutError = {
  kind: CheckoutErrorKind;
  message: string;
};

type CheckoutResponseBody = {
  initPoint?: string;
  error?: string;
};

const CHECKOUT_FALLBACK_MESSAGE =
  "Nao conseguimos abrir o checkout agora. Seus itens continuam salvos no carrinho. Tente novamente em alguns instantes ou conclua o pedido pelo WhatsApp.";

function buildCheckoutError(
  kind: CheckoutErrorKind,
  message?: string,
): CheckoutError {
  return {
    kind,
    message: message?.trim() || CHECKOUT_FALLBACK_MESSAGE,
  };
}

function isValidCheckoutItems(items: CartItem[]) {
  return (
    Array.isArray(items) &&
    items.length > 0 &&
    items.every(
      (item) =>
        typeof item?.id === "string" &&
        item.id.trim().length > 0 &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    )
  );
}

async function safeReadCheckoutResponse(response: Response) {
  try {
    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      return (await response.json()) as CheckoutResponseBody;
    }

    const text = await response.text();

    if (!text.trim()) {
      return {};
    }

    try {
      return JSON.parse(text) as CheckoutResponseBody;
    } catch {
      return {};
    }
  } catch {
    return {};
  }
}

type CheckoutProButtonProps = {
  items: CartItem[];
  disabled?: boolean;
};

export function CheckoutProButton({
  items,
  disabled = false,
}: CheckoutProButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<CheckoutError | null>(null);
  const isLoadingRef = useRef(false);

  async function handleCheckout() {
    if (isLoadingRef.current) {
      return;
    }

    if (!isValidCheckoutItems(items)) {
      setCheckoutError(
        buildCheckoutError(
          "item",
          "Seu carrinho esta vazio ou possui itens invalidos. Revise os produtos e tente novamente.",
        ),
      );
      return;
    }

    isLoadingRef.current = true;
    setIsLoading(true);

    let didNavigate = false;

    try {
      setCheckoutError(null);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await safeReadCheckoutResponse(response);

      if (!response.ok || !data.initPoint) {
        const kind: CheckoutErrorKind =
          response.status >= 500 ? "global" : "checkout";
        setCheckoutError(buildCheckoutError(kind, data.error));
        return;
      }

      didNavigate = true;
      window.location.assign(data.initPoint);
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? buildCheckoutError("global", error.message)
          : buildCheckoutError("global"),
      );
    } finally {
      isLoadingRef.current = false;

      if (!didNavigate) {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={disabled || isLoading}
        className="inline-flex justify-center rounded-full bg-[#dff1cf] px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#27402c] transition-opacity hover:bg-[#cee4b6] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Abrindo checkout..." : "Pagar com Mercado Pago"}
      </button>
      {checkoutError ? (
        <p className="text-sm leading-6 text-[#8f5a45]">
          {checkoutError.message}
        </p>
      ) : null}
    </div>
  );
}
