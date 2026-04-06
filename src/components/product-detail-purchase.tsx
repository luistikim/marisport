"use client";

import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { buildWhatsAppLink, type CatalogProduct } from "@/data/product";
import { useCart } from "@/components/cart-provider";

type ProductDetailPurchaseProps = {
  product: CatalogProduct;
  productName: string;
  whatsappPhone: string;
  availability?: string[];
};

type AvailabilityOptions = {
  sizes: string[];
  colors: string[];
  notes: string[];
};

const SIZE_KEYWORDS = [
  "tamanho",
  "tamanhos",
  "grade",
  "pp",
  "p",
  "m",
  "g",
  "gg",
  "xg",
  "xxg",
  "u",
  "unico",
  "g1",
  "g2",
  "g3",
  "eg",
  "xgg",
  "xxgg",
];

const NON_SELECTABLE_KEYWORDS = [
  "consulte",
  "definicao",
  "atualizacao",
  "disponiveis",
  "em breve",
  "linha em definicao",
];

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function cleanOption(value: string) {
  return value.replace(/\.$/, "").trim();
}

function splitAvailabilityValue(value: string) {
  return value
    .split(/,|\/|\se\s/i)
    .map((item) => cleanOption(item))
    .filter(Boolean);
}

function isSelectableSizeToken(value: string) {
  const normalized = normalizeText(value);
  return SIZE_KEYWORDS.some((keyword) => normalized === keyword);
}

function isSelectableColorToken(value: string) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return false;
  }

  if (NON_SELECTABLE_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return false;
  }

  return !isSelectableSizeToken(value);
}

function parseAvailabilityOptions(values: string[] = []): AvailabilityOptions {
  const sizes = new Set<string>();
  const colors = new Set<string>();
  const notes: string[] = [];

  for (const value of values) {
    const cleanedValue = cleanOption(value);
    const normalizedValue = normalizeText(cleanedValue);
    const parts = splitAvailabilityValue(cleanedValue);
    let matchedSelectableToken = false;

    for (const part of parts) {
      if (isSelectableSizeToken(part)) {
        sizes.add(part.toUpperCase());
        matchedSelectableToken = true;
        continue;
      }

      if (isSelectableColorToken(part)) {
        colors.add(part);
        matchedSelectableToken = true;
      }
    }

    if (!matchedSelectableToken && normalizedValue) {
      notes.push(cleanedValue);
    }
  }

  return {
    sizes: Array.from(sizes),
    colors: Array.from(colors),
    notes,
  };
}

export function ProductDetailPurchase({
  product,
  productName,
  whatsappPhone,
  availability,
}: ProductDetailPurchaseProps) {
  const { addItem } = useCart();
  const { sizes, colors, notes } = useMemo(
    () => parseAvailabilityOptions(availability),
    [availability],
  );
  const hasSizes = sizes.length > 0;
  const hasColors = colors.length > 0;
  const requiresSizes = hasSizes;
  const requiresColors = hasColors;
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");
  const [wasAdded, setWasAdded] = useState(false);

  useEffect(() => {
    if (!wasAdded) {
      return;
    }

    const timeoutId = window.setTimeout(() => setWasAdded(false), 1400);

    return () => window.clearTimeout(timeoutId);
  }, [wasAdded]);

  const whatsappMessage = useMemo(() => {
    if (selectedSize && selectedColor) {
      return `Ola! Quero o produto ${productName} no tamanho ${selectedSize} e cor ${selectedColor}.`;
    }

    if (selectedSize) {
      return `Ola! Quero o produto ${productName} no tamanho ${selectedSize}.`;
    }

    if (selectedColor) {
      return `Ola! Quero o produto ${productName} na cor ${selectedColor}.`;
    }

    return `Ola! Quero saber mais sobre o produto ${productName}.`;
  }, [productName, selectedColor, selectedSize]);

  const whatsappHref = useMemo(
    () => buildWhatsAppLink(whatsappPhone, whatsappMessage),
    [whatsappPhone, whatsappMessage],
  );

  function handleWhatsAppClick(event: MouseEvent<HTMLAnchorElement>) {
    const missingMessage = getMissingSelectionMessage();

    if (missingMessage) {
      event.preventDefault();
      setError(missingMessage);
      return;
    }

    setError("");
  }

  function getMissingSelectionMessage() {
    const missingItems: string[] = [];

    if (requiresSizes && !selectedSize) {
      missingItems.push("tamanho");
    }

    if (requiresColors && !selectedColor) {
      missingItems.push("cor");
    }

    if (missingItems.length === 2) {
      return "Selecione um tamanho e uma cor antes de continuar.";
    }

    if (missingItems.length === 1) {
      return missingItems[0] === "tamanho"
        ? "Selecione um tamanho antes de continuar."
        : "Selecione uma cor antes de continuar.";
    }

    return null;
  }

  function handleAddToCart() {
    const missingMessage = getMissingSelectionMessage();

    if (missingMessage) {
      setError(missingMessage);
      return;
    }

    addItem(product, {
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
    });
    setError("");
    setWasAdded(true);
  }

  function toggleSelection(
    currentValue: string,
    nextValue: string,
    setter: (value: string) => void,
  ) {
    setter(currentValue === nextValue ? "" : nextValue);
    setError("");
  }

  return (
    <div className="mt-4 space-y-4">
      {hasSizes || hasColors ? (
        <div className="rounded-[1.4rem] border border-[#dbe5db] bg-white p-4">
          {hasSizes ? (
            <div className={hasColors ? "pb-4" : ""}>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d8272]">
                Tamanho
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((item) => {
                  const isSelected = selectedSize === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={isSelected}
                      aria-label={`Selecionar tamanho ${item}`}
                      onClick={() =>
                        toggleSelection(selectedSize, item, setSelectedSize)
                      }
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
            </div>
          ) : null}

          {hasSizes && hasColors ? (
            <div className="my-4 h-px bg-[#e3ebe3]" aria-hidden="true" />
          ) : null}

          {hasColors ? (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d8272]">
                Cor
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {colors.map((item) => {
                  const isSelected = selectedColor === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={isSelected}
                      aria-label={`Selecionar cor ${item}`}
                      onClick={() =>
                        toggleSelection(selectedColor, item, setSelectedColor)
                      }
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
            </div>
          ) : null}

          {notes.length ? (
            <p className="mt-4 text-xs leading-6 text-[#6b7c79]">
              {notes.join(" • ")}
            </p>
          ) : null}

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
          onClick={handleAddToCart}
          className="brand-cta-primary"
        >
          {wasAdded ? "Adicionado" : "Comprar"}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          onClick={handleWhatsAppClick}
          className="brand-cta-secondary"
        >
          Falar no WhatsApp
        </a>
        <Link href="/produtos" className="brand-cta-secondary">
          Voltar ao catalogo
        </Link>
      </div>
    </div>
  );
}
