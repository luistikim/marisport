"use client";

import { useState } from "react";
import type { CatalogProduct } from "@/data/site";
import { useCart } from "@/components/cart-provider";

type AddToCartButtonProps = {
  product: CatalogProduct;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [wasAdded, setWasAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setWasAdded(true);
    window.setTimeout(() => setWasAdded(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(125,187,56,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      {wasAdded ? "Adicionado" : "Adicionar ao carrinho"}
    </button>
  );
}
