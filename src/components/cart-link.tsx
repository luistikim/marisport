"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/carrinho"
      aria-label={`Abrir carrinho com ${itemCount} itens`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-surface-strong transition-transform hover:-translate-y-0.5 hover:text-accent md:border-[#d8e4db] md:bg-white md:text-surface-strong"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M3 4h2l2.2 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.76L21 7H7" />
      </svg>
      <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#dff1cf] px-1 text-[10px] font-black text-[#27402c]">
        {itemCount}
      </span>
    </Link>
  );
}
