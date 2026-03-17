import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SectionHero } from "@/components/section-hero";
import {
  brandChannels,
  brandPillars,
  brandStoryMoments,
  communityMoments,
  instagramLink,
  whatsappLink,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheca a essencia da Mari Sport, a proposta da marca e o jeito como transformamos catalogo, comunidade e atendimento em uma experiencia mais proxima.",
  keywords: [
    "quem somos Mari Sport",
    "sobre Mari Sport",
    "marca de moda fitness",
    "roupa esportiva com identidade",
    "moda esportiva feminina",
    "moda esportiva masculina",
  ],
  openGraph: {
    title: "Quem Somos | Mari Sport",
    description:
      "Veja a historia, a identidade e a proposta da Mari Sport.",
    images: ["/logo-marisport.png"],
  },
};

export default function QuemSomosPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Quem Somos"
        title="Uma marca criada para vestir o movimento com identidade."
        description="A Mari Sport aproxima catalogo, comunidade e atendimento em uma proposta de moda esportiva feita para treino, corrida e rotina ativa."
      />

      <section className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.95fr]">
          <article className="rounded-[2rem] bg-surface-strong p-8 text-white shadow-[0_18px_60px_rgba(19,38,59,0.2)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-soft">
              Nossa essencia
            </p>
            <h1 className="mt-4 text-4xl font-black uppercase leading-tight">
              Moda esportiva com presenca visual, funcionalidade e atitude.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              A Mari Sport nasceu para mostrar que roupa de treino pode entregar
              conforto, seguranca e estilo ao mesmo tempo. Por isso, a marca
              construiu uma comunicacao que valoriza pecas reais, fotos de uso,
              atendimento direto e uma identidade visual forte.
            </p>
          </article>

          <div className="grid gap-4">
            {brandStoryMoments.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-line bg-white/85 p-6 shadow-[0_14px_30px_rgba(19,38,59,0.06)]"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                  {item.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">
                Como a marca se apresenta
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase text-surface-strong sm:text-4xl sm:text-white">
                Catalogo, comunidade e atendimento fazem parte da mesma experiencia.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-slate-200">
              Reunimos aqui a parte institucional da marca para deixar a home
              mais focada em produto e compra.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {brandChannels.map((channel) => (
              <article
                key={channel.title}
                className="rounded-[1.8rem] border border-line bg-white p-6 text-surface-strong shadow-[0_16px_40px_rgba(19,38,59,0.08)] sm:border-white/10 sm:bg-white/8 sm:text-white sm:shadow-[0_16px_40px_rgba(19,38,59,0.12)]"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
                  {channel.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-slate-100">
                  {channel.text}
                </p>
                <Link
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-5 inline-flex rounded-full border border-line bg-[#f6fbfb] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong transition-colors hover:bg-white sm:border-white/14 sm:bg-white/8 sm:text-white sm:hover:bg-white/14"
                >
                  {channel.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] bg-[#f5fbfb] p-8 text-surface-strong shadow-[0_18px_50px_rgba(19,38,59,0.08)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
              Base da marca
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl">
              O que guia a Mari Sport no produto e na comunicacao.
            </h2>
            <div className="mt-6 grid gap-4">
              {brandPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-[1.4rem] border border-slate-200 bg-white p-5"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4f6b74]">
                    {pillar.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] bg-[#263537] p-8 text-white shadow-[0_18px_50px_rgba(19,38,59,0.16)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
              Comunidade e imagem
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl">
              A marca ganha forca quando aparece em uso real.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {communityMoments.map((item) => (
                <div key={item.title} className="overflow-hidden rounded-[1.5rem] bg-white/8">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold uppercase leading-tight">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[linear-gradient(135deg,#d8ff9e_0%,#87ff00_48%,#5fe000_100%)] p-8 text-surface-strong shadow-[0_20px_60px_rgba(135,255,0,0.24)]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em]">
                Fale com a marca
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl">
                Quer conhecer o catalogo, tirar duvidas ou acompanhar a Mari Sport mais de perto?
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-surface-strong px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-white"
              >
                Abrir WhatsApp
              </Link>
              <Link
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-surface-strong/20 bg-white/70 px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-surface-strong"
              >
                Ver Instagram
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
