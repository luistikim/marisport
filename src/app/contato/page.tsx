import type { Metadata } from "next";
import Link from "next/link";
import { SectionHero } from "@/components/section-hero";
import {
  contactEmail,
  contactPhone,
  instagramLink,
  siteDescription,
  siteName,
  whatsappLink,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Mari Sport pelo WhatsApp, Instagram ou e-mail para conhecer o catalogo e tirar duvidas sobre pedidos.",
  alternates: {
    canonical: "/contato",
  },
  openGraph: {
    title: `Contato | ${siteName}`,
    description: siteDescription,
    images: ["/logo-marisport.png"],
  },
};

export default function ContatoPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Contato"
        title="Atendimento rapido, humano e pronto para tirar suas duvidas."
        description="Fale com a Mari Sport para consultar produtos, tamanhos, cores, disponibilidade e orientacao de compra."
      />

      <section className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-[#d9e5dc] bg-white p-6 shadow-[0_16px_36px_rgba(19,38,59,0.06)]">
          <p className="text-sm leading-7 text-[#55686b]">
            Se voce procura atendimento para moda fitness masculina e feminina,
            aqui estao os canais oficiais da marca. O objetivo e responder de
            forma rapida e facilitar sua compra.
          </p>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] bg-white p-7 shadow-[0_16px_40px_rgba(19,38,59,0.06)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Canais oficiais
            </p>
            <div className="mt-6 grid gap-5">
              <div className="rounded-[1.4rem] border border-[#d9e5dc] bg-[#f8fbf8] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#506859]">
                  WhatsApp
                </p>
                <p className="mt-2 text-lg font-semibold text-surface-strong">{contactPhone}</p>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full bg-surface-strong px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
                >
                  Abrir WhatsApp
                </Link>
              </div>

              <div className="rounded-[1.4rem] border border-[#d9e5dc] bg-[#f8fbf8] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#506859]">
                  E-mail
                </p>
                <p className="mt-2 text-lg font-semibold text-surface-strong">{contactEmail}</p>
                <Link
                  href={`mailto:${contactEmail}`}
                  className="mt-4 inline-flex rounded-full border border-[#d9e5dc] bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
                >
                  Enviar e-mail
                </Link>
              </div>

              <div className="rounded-[1.4rem] border border-[#d9e5dc] bg-[#f8fbf8] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#506859]">
                  Instagram
                </p>
                <p className="mt-2 text-lg font-semibold text-surface-strong">@mari_sportfit</p>
                <Link
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full border border-[#d9e5dc] bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
                >
                  Abrir Instagram
                </Link>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] bg-[linear-gradient(145deg,#132022_0%,#203235_52%,#395a60_100%)] p-7 text-white shadow-[0_20px_60px_rgba(19,32,34,0.18)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-soft">
              Atendimento
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight">
              Receba orientacao personalizada para sua compra.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-200">
              A Mari Sport usa o WhatsApp como canal principal para enviar fotos,
              explicar tamanhos e indicar a melhor opcao para o seu estilo.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/8 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-soft">
                  Atendimento
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">Seg a sab, das 9h as 18h</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/8 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-soft">
                  Alcance
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  Atendimento online para todo o Brasil
                </p>
              </div>
            </div>
            <Link
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-surface-strong"
            >
              Falar agora
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
