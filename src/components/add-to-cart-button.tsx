"use client";

import { useState } from "react";
import Link from "next/link";
import type { CatalogProduct } from "@/data/site";
import { useCart } from "@/components/cart-provider";

type AddToCartButtonProps = {
  product: CatalogProduct;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [wasAdded, setWasAdded] = useState(false);
  const requiresVariantSelection =
    Boolean(product.variants?.length) || Boolean(product.sizes?.length) || Boolean(product.colors?.length);

  function handleClick() {
    const added = addItem(product);

    if (!added) {
      setWasAdded(false);
      return;
    }

    setWasAdded(true);
    window.setTimeout(() => setWasAdded(false), 1400);
  }

  if (requiresVariantSelection) {
    return (
      <Link
        href={`/produtos/${product.id}`}
        className="inline-flex items-center justify-center rounded-full bg-[#dff1cf] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#27402c] transition-all hover:-translate-y-0.5 hover:bg-[#cee4b6] hover:shadow-[0_14px_26px_rgba(125,187,56,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Escolher variações
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-full bg-[#dff1cf] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#27402c] transition-all hover:-translate-y-0.5 hover:bg-[#cee4b6] hover:shadow-[0_14px_26px_rgba(125,187,56,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      {wasAdded ? "Adicionado" : "Adicionar ao carrinho"}
    </button>
  );
}
