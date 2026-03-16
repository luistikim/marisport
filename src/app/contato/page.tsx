import type { Metadata } from "next";
import Link from "next/link";
import { SectionHero } from "@/components/section-hero";
import {
  contactEmail,
  contactPhone,
  instagramLink,
  whatsappLink,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Mari Sport pelo WhatsApp, Instagram ou email para conhecer colecoes, tirar duvidas e solicitar atendimento.",
  keywords: [
    "contato Mari Sport",
    "WhatsApp Mari Sport",
    "Instagram Mari Sport",
    "atendimento roupa fitness",
    "comprar roupa esportiva",
    "contato conjunto fitness",
    "contato legging fitness",
    "comprar bermuda masculina esportiva",
  ],
  openGraph: {
    title: "Contato | Mari Sport",
    description:
      "Fale com a Mari Sport e receba atendimento para produtos, colecoes e pedidos.",
    images: ["/logo-marisport.png"],
  },
};

export default function ContatoPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Contato"
        title="Atendimento simples, rapido e direto com a Mari Sport."
        description="Entre em contato para conhecer colecoes, tirar duvidas, solicitar catalogo e iniciar seu pedido pelo WhatsApp."
      />

      <section className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-white/10 bg-white/8 p-6 text-white shadow-[0_14px_40px_rgba(19,38,59,0.1)]">
          <p className="text-base leading-8 text-slate-100">
            Se voce procura contato com loja de roupa fitness, atendimento para
            comprar conjunto esportivo, tirar duvidas sobre tamanhos ou conhecer
            a linha masculina da Mari Sport, esta pagina reune os canais mais
            rapidos para falar com a marca.
          </p>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] bg-surface p-8 shadow-[0_18px_50px_rgba(19,38,59,0.08)]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Canais
            </p>
            <div className="mt-6 space-y-5 text-slate-700">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  WhatsApp
                </p>
                <p className="mt-2 text-lg font-semibold">{contactPhone}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  E-mail
                </p>
                <p className="mt-2 text-lg font-semibold">{contactEmail}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  Instagram
                </p>
                <p className="mt-2 text-lg font-semibold">@mari_sportfit</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  Atendimento
                </p>
                <p className="mt-2 text-lg font-semibold">Seg a Sab, das 9h as 18h</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-slate-300/30 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
                >
                  Abrir Instagram
                </Link>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
                >
                  Abrir WhatsApp
                </Link>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] bg-[linear-gradient(145deg,#13263b_0%,#1f4764_50%,#295b7d_100%)] p-8 text-white shadow-[0_18px_60px_rgba(19,38,59,0.22)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-200">
              Fale agora
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-tight">
              Receba atendimento personalizado para suas compras.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-slate-200">
              O WhatsApp e o canal principal da Mari Sport para apresentar
              produtos, enviar fotos, tirar duvidas e fechar pedidos com
              rapidez.
            </p>
            <Link
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(255,95,46,0.28)]"
            >
              Abrir WhatsApp
            </Link>
          </article>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] bg-[#263537] p-8 text-white shadow-[0_18px_50px_rgba(19,38,59,0.14)]">
          <h2 className="text-2xl font-black uppercase">
            Atendimento para produtos, colecoes e pedidos
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <p className="text-sm leading-7 text-slate-200">
              Fale com a Mari Sport para conhecer roupa esportiva feminina para
              academia, corrida e rotina ativa com mais detalhes.
            </p>
            <p className="text-sm leading-7 text-slate-200">
              Solicite fotos, videos, informacoes sobre conjuntos fitness, tops,
              leggings, shorts e pecas masculinas diretamente pelo WhatsApp.
            </p>
            <p className="text-sm leading-7 text-slate-200">
              Use tambem o Instagram para acompanhar lancamentos, novidades e o
              visual real das colecoes em clientes e modelos.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
