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
      className="rounded-full border border-slate-300/60 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong transition-colors hover:border-accent hover:text-accent"
    >
      {wasAdded ? "Adicionado" : "Adicionar ao carrinho"}
    </button>
  );
}
