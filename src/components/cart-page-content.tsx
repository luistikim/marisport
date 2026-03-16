"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { buildWhatsAppLink, contactEmail } from "@/data/site";
import { useCart } from "@/components/cart-provider";

export function CartPageContent() {
  const { items, itemCount, clearCart, removeItem, updateQuantity } = useCart();
  const [notes, setNotes] = useState("");

  const whatsappHref = useMemo(() => {
    const lines = [
      "Ola! Vim pelo site da Mari Sport e quero fechar este pedido:",
      "",
      ...items.map((item) => `- ${item.quantity}x ${item.name}`),
    ];

    if (notes.trim()) {
      lines.push("", `Observacoes: ${notes.trim()}`);
    }

    lines.push("", `Total de itens: ${itemCount}`);

    return buildWhatsAppLink(lines.join("\n"));
  }, [itemCount, items, notes]);

  if (items.length === 0) {
    return (
      <section className="px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/8 p-8 text-center text-white shadow-[0_18px_50px_rgba(19,38,59,0.12)]">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
            Carrinho vazio
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase">
            Escolha alguns produtos para montar seu pedido.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-200">
            O carrinho fica salvo neste navegador, sem precisar criar conta.
            Quando voce adicionar itens, daqui voce consegue revisar tudo e
            enviar o pedido pelo WhatsApp.
          </p>
          <Link
            href="/produtos"
            className="mt-8 inline-flex rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-surface-strong"
          >
            Ir para produtos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 pb-16 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-[2rem] border border-line bg-surface p-6 shadow-[0_16px_40px_rgba(19,38,59,0.08)]"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    {item.badge}
                  </p>
                  <h2 className="mt-2 text-2xl font-black uppercase text-surface-strong">
                    {item.name}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-700 transition-colors hover:border-[#ff5f2e] hover:text-[#ff5f2e]"
                >
                  Remover
                </button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  Quantidade
                </span>
                <div className="inline-flex items-center rounded-full border border-slate-300 bg-white">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-4 py-2 text-lg font-bold text-slate-700"
                    aria-label={`Diminuir quantidade de ${item.name}`}
                  >
                    -
                  </button>
                  <span className="min-w-10 text-center text-sm font-bold text-surface-strong">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-4 py-2 text-lg font-bold text-slate-700"
                    aria-label={`Aumentar quantidade de ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="rounded-[2rem] bg-[#263537] p-8 text-white shadow-[0_18px_60px_rgba(19,38,59,0.22)]">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
            Resumo do pedido
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase leading-tight">
            Revise os itens e envie para atendimento.
          </h2>
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-300">
              Itens no carrinho
            </p>
            <p className="mt-2 text-4xl font-black">{itemCount}</p>
          </div>

          <label className="mt-6 block">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
              Observacoes do pedido
            </span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={5}
              placeholder="Ex.: quero ver cores disponiveis, tamanhos M e G, ou combinar entrega."
              className="mt-3 w-full rounded-[1.2rem] border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
            />
          </label>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-surface-strong"
            >
              Enviar pedido no WhatsApp
            </Link>
            <Link
              href={`mailto:${contactEmail}?subject=Pedido%20Mari%20Sport`}
              className="inline-flex justify-center rounded-full border border-white/16 bg-white/8 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white"
            >
              Enviar por e-mail
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex justify-center rounded-full border border-white/16 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-200"
            >
              Limpar carrinho
            </button>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-300">
            Sem cadastro por enquanto: o carrinho fica salvo neste navegador e o
            fechamento segue direto com a equipe da Mari Sport.
          </p>
        </aside>
      </div>
    </section>
  );
}
