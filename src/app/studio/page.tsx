"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { sanityConfigured } from "@/sanity/lib/env";

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-6 py-16">
        <div className="rounded-3xl border border-[#d9e5dc] bg-white p-8 shadow-[0_16px_36px_rgba(19,38,59,0.06)]">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Sanity nao configurado
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase text-surface-strong">
            Defina as variaveis de ambiente para abrir o Studio.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#56686c]">
            Configure `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET`
            para liberar o painel de edicao.
          </p>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
