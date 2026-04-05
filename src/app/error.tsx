"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[MariSport] Erro na página:", error);
  }, [error]);

  return (
    <main>
      <section className="brand-wave px-5 pb-8 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-line bg-white/90 p-6 shadow-[0_22px_60px_rgba(16,32,51,0.08)] backdrop-blur-sm sm:p-8 lg:p-10">
          <span className="rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-surface-strong">
            Erro
          </span>

          <h1 className="mt-4 max-w-4xl text-3xl font-black uppercase leading-[0.92] text-surface-strong sm:text-5xl">
            Algo deu errado.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#56686c] sm:text-lg">
            Não conseguimos carregar esta página. O problema pode ser temporário —
            tente novamente ou volte para o início.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={reset}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#dff1cf] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#27402c] hover:bg-[#cee4b6]"
            >
              Tentar novamente
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[#d8e4db] bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong hover:bg-[#f4fbef]"
            >
              Voltar ao início
            </Link>
          </div>

          {error.digest ? (
            <p className="mt-6 text-[11px] font-mono text-[#8fa3a8]">
              Código: {error.digest}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
