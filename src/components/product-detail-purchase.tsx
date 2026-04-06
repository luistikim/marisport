"use client";

import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  buildWhatsAppLink,
  findMatchingProductVariant,
  getProductVariants,
  getSelectableVariantColors,
  getSelectableVariantSizes,
  isVariantInStock,
  normalizeVariationKey,
  type CatalogProduct,
} from "@/data/product";
import { useCart } from "@/components/cart-provider";

type ProductDetailPurchaseProps = {
  product: CatalogProduct;
  productName: string;
  whatsappPhone: string;
};

function uniqueValues(values: Array<string | undefined>) {
  return Array.from(
    new Set(
      values
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  );
}

function sortSizes(values: string[]) {
  const sizeOrder = ["PP", "P", "M", "G", "GG", "XG", "Único"];

  return [...values].sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a);
    const bIndex = sizeOrder.indexOf(b);

    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b, "pt-BR");
    }

    if (aIndex === -1) {
      return 1;
    }

    if (bIndex === -1) {
      return -1;
    }

    return aIndex - bIndex;
  });
}

function buildWhatsAppMessage(
  productName: string,
  selectedSize: string,
  selectedColor: string,
) {
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
}

export function ProductDetailPurchase({
  product,
  productName,
  whatsappPhone,
}: ProductDetailPurchaseProps) {
  const { addItem } = useCart();
  const variants = useMemo(() => getProductVariants(product), [product]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");
  const [wasAdded, setWasAdded] = useState(false);
  const allSizeOptions = useMemo(
    () => sortSizes(uniqueValues(variants.map((variant) => variant.size))),
    [variants],
  );
  const allColorOptions = useMemo(
    () => uniqueValues(variants.map((variant) => variant.color)),
    [variants],
  );
  const selectableSizes = useMemo(
    () => getSelectableVariantSizes(product, selectedColor),
    [product, selectedColor],
  );
  const selectableColors = useMemo(
    () => getSelectableVariantColors(product, selectedSize),
    [product, selectedSize],
  );
  const hasSizes = allSizeOptions.length > 0;
  const hasColors = allColorOptions.length > 0;

  useEffect(() => {
    if (!wasAdded) {
      return;
    }

    const timeoutId = window.setTimeout(() => setWasAdded(false), 1400);

    return () => window.clearTimeout(timeoutId);
  }, [wasAdded]);

  const selectedVariant = useMemo(() => {
    if (!selectedSize || !selectedColor) {
      return null;
    }

    return findMatchingProductVariant(product, selectedSize, selectedColor);
  }, [product, selectedColor, selectedSize]);

  const whatsappMessage = useMemo(
    () => buildWhatsAppMessage(productName, selectedSize, selectedColor),
    [productName, selectedColor, selectedSize],
  );

  const whatsappHref = useMemo(
    () => buildWhatsAppLink(whatsappPhone, whatsappMessage),
    [whatsappPhone, whatsappMessage],
  );

  function getMissingSelectionMessage() {
    const missingItems: string[] = [];

    if (hasSizes && !selectedSize) {
      missingItems.push("tamanho");
    }

    if (hasColors && !selectedColor) {
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

    if (selectedSize && selectedColor) {
      if (!selectedVariant) {
        return "Esta combinação está indisponível.";
      }

      if (!isVariantInStock(selectedVariant)) {
        return "Sem estoque para esta variação.";
      }
    }

    return null;
  }

  function handleWhatsAppClick(event: MouseEvent<HTMLAnchorElement>) {
    const missingMessage = getMissingSelectionMessage();

    if (missingMessage) {
      event.preventDefault();
      setError(missingMessage);
      return;
    }

    setError("");
  }

  function handleAddToCart() {
    const missingMessage = getMissingSelectionMessage();

    if (missingMessage) {
      setError(missingMessage);
      return;
    }

    const added = addItem(product, {
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
      availableStock: selectedVariant?.stock ?? undefined,
    });

    if (!added) {
      setError("Sem estoque para esta variação.");
      return;
    }

    setError("");
    setWasAdded(true);
  }

  function handleSizeSelect(size: string) {
    setError("");

    if (selectedSize === size) {
      setSelectedSize("");
      return;
    }

    setSelectedSize(size);

    if (
      selectedColor &&
      !variants.some(
        (variant) =>
          normalizeVariationKey(variant.size) === normalizeVariationKey(size) &&
          normalizeVariationKey(variant.color) === normalizeVariationKey(selectedColor) &&
          isVariantInStock(variant),
      )
    ) {
      setSelectedColor("");
    }
  }

  function handleColorSelect(color: string) {
    setError("");

    if (selectedColor === color) {
      setSelectedColor("");
      return;
    }

    setSelectedColor(color);

    if (
      selectedSize &&
      !variants.some(
        (variant) =>
          normalizeVariationKey(variant.size) === normalizeVariationKey(selectedSize) &&
          normalizeVariationKey(variant.color) === normalizeVariationKey(color) &&
          isVariantInStock(variant),
      )
    ) {
      setSelectedSize("");
    }
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
                {allSizeOptions.map((item) => {
                  const isSelected = selectedSize === item;
                  const isEnabled = selectableSizes.includes(item);

                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={isSelected}
                      aria-label={`Selecionar tamanho ${item}`}
                      aria-disabled={!isEnabled}
                      disabled={!isEnabled}
                      onClick={() => handleSizeSelect(item)}
                      className={
                        isSelected
                          ? "rounded-full border border-[#6aaa30] bg-[#eff7e5] px-3 py-2 text-xs font-semibold text-[#35531b] shadow-[0_8px_18px_rgba(95,154,42,0.12)] transition-colors hover:bg-[#e5f1d6] disabled:opacity-100"
                          : isEnabled
                            ? "rounded-full border border-[#dbe5db] bg-[#f8fbf8] px-3 py-2 text-xs font-semibold text-[#536566] transition-colors hover:border-[#b8c8b8] hover:bg-[#f1f6f1]"
                            : "cursor-not-allowed rounded-full border border-dashed border-[#dbe5db] bg-[#fbfcfb] px-3 py-2 text-xs font-semibold text-[#a0aea3] opacity-80"
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
                {allColorOptions.map((item) => {
                  const isSelected = selectedColor === item;
                  const isEnabled = selectableColors.includes(item);

                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={isSelected}
                      aria-label={`Selecionar cor ${item}`}
                      aria-disabled={!isEnabled}
                      disabled={!isEnabled}
                      onClick={() => handleColorSelect(item)}
                      className={
                        isSelected
                          ? "rounded-full border border-[#6aaa30] bg-[#eff7e5] px-3 py-2 text-xs font-semibold text-[#35531b] shadow-[0_8px_18px_rgba(95,154,42,0.12)] transition-colors hover:bg-[#e5f1d6] disabled:opacity-100"
                          : isEnabled
                            ? "rounded-full border border-[#dbe5db] bg-[#f8fbf8] px-3 py-2 text-xs font-semibold text-[#536566] transition-colors hover:border-[#b8c8b8] hover:bg-[#f1f6f1]"
                            : "cursor-not-allowed rounded-full border border-dashed border-[#dbe5db] bg-[#fbfcfb] px-3 py-2 text-xs font-semibold text-[#a0aea3] opacity-80"
                      }
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
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
          Voltar ao catálogo
        </Link>
      </div>
    </div>
  );
}
