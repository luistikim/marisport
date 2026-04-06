"use client";

import { useState } from "react";
import Link from "next/link";
import { buildWhatsAppLink } from "@/data/product";

type ProductDetailPurchaseProps = {
  productName: string;
  whatsappPhone: string;
  availability?: string[];
};

export function ProductDetailPurchase({
  productName,
  whatsappPhone,
  availability,
}: ProductDetailPurchaseProps) {
  const options = availability ?? [];
  const hasOptions = options.length > 0;
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");

  function handleWhatsAppClick() {
    if (hasOptions && !selectedOption) {
      setError("Selecione um tamanho/cor antes de continuar.");
      return;
    }

    const message = selectedOption
      ? `Ola! Quero o produto ${productName} no tamanho/cor: ${selectedOption}.`
      : `Ola! Quero saber mais sobre o produto ${productName}.`;

    window.open(buildWhatsAppLink(whatsappPhone, message), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mt-4 space-y-4">
      {hasOptions ? (
        <div className="rounded-[1.4rem] border border-[#dbe5db] bg-white p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d8272]">
            Escolha o tamanho/cor
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {options.map((item) => {
              const isSelected = selectedOption === item;

              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Selecionar tamanho/cor ${item}`}
                  onClick={() => {
                    setSelectedOption((current) => (current === item ? "" : item));
                    setError("");
                  }}
                  className={
                    isSelected
                      ? "rounded-full border border-[#6aaa30] bg-[#eff7e5] px-3 py-2 text-xs font-semibold text-[#35531b] shadow-[0_8px_18px_rgba(95,154,42,0.12)] transition-colors hover:bg-[#e5f1d6]"
                      : "rounded-full border border-[#dbe5db] bg-[#f8fbf8] px-3 py-2 text-xs font-semibold text-[#536566] transition-colors hover:border-[#b8c8b8] hover:bg-[#f1f6f1]"
                  }
                >
                  {item}
                </button>
              );
            })}
          </div>
          {error ? (
            <p className="mt-3 text-sm font-medium text-[#a24b41]" aria-live="polite">
              {error}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="brand-cta-primary"
        >
          Falar no WhatsApp
        </button>
        <Link href="/produtos" className="brand-cta-secondary">
          Voltar ao catalogo
        </Link>
      </div>
    </div>
  );
}
