"use client";

import { useState } from "react";
import type { CartItem } from "@/components/cart-provider";

type CheckoutProButtonProps = {
  items: CartItem[];
  disabled?: boolean;
};

export function CheckoutProButton({
  items,
  disabled = false,
}: CheckoutProButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleCheckout() {
    try {
      setIsLoading(true);
      setErrorMessage(null);

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

      const data = (await response.json()) as {
        initPoint?: string;
        error?: string;
      };

      if (!response.ok || !data.initPoint) {
        throw new Error(data.error ?? "Nao foi possivel iniciar o pagamento.");
      }

      window.location.href = data.initPoint;
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Nao foi possivel iniciar o pagamento.",
      );
      setIsLoading(false);
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
      {errorMessage ? (
        <p className="text-sm leading-6 text-[#8f5a45]">{errorMessage}</p>
      ) : null}
    </div>
  );
}
