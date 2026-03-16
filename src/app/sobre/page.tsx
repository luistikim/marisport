import type { Metadata } from "next";
import { SectionHero } from "@/components/section-hero";
import { brandPillars } from "@/data/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Saiba mais sobre a Mari Sport, marca de moda fitness com identidade forte, foco em conforto, estilo e performance.",
  keywords: [
    "sobre Mari Sport",
    "marca de moda fitness",
    "roupa esportiva com estilo",
    "moda esportiva feminina",
    "moda esportiva masculina",
    "legging fitness Mari Sport",
    "top esportivo Mari Sport",
    "bermuda masculina Mari Sport",
  ],
  openGraph: {
    title: "Sobre | Mari Sport",
    description:
      "Conheca a historia, a proposta e a identidade da Mari Sport.",
    images: ["/logo-marisport.png"],
  },
};

export default function SobrePage() {
  return (
    <main>
      <SectionHero
        eyebrow="Sobre"
        title="Uma marca esportiva feita para mulheres em movimento."
        description="A Mari Sport nasceu com o proposito de oferecer roupas esportivas que unem presenca visual, conforto e confianca para a rotina ativa."
      />

      <section className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-white/10 bg-white/8 p-6 text-white shadow-[0_14px_40px_rgba(19,38,59,0.1)]">
          <p className="text-base leading-8 text-slate-100">
            A Mari Sport e uma marca de moda fitness voltada para quem quer unir
            roupa esportiva com estilo, seguranca e autenticidade. Nossa
            proposta envolve looks femininos e masculinos para academia,
            corrida e rotina ativa, com destaque para conjuntos fitness,
            leggings, tops, shorts e bermudas esportivas, sempre com foco em
            conforto, desempenho e presenca visual.
          </p>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] bg-surface-strong p-8 text-white shadow-[0_18px_60px_rgba(19,38,59,0.22)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-soft">
              Nossa essencia
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-tight">
              Moda esportiva com identidade, funcionalidade e atitude.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Acreditamos que roupa de treino precisa vestir bem, apoiar o
              movimento e transmitir seguranca. Por isso, cada colecao busca
              equilibrar tecnologia textil, design contemporaneo e versatilidade.
            </p>
          </article>

          <div className="grid gap-4">
            {brandPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[1.75rem] border border-line bg-white/80 p-6 shadow-[0_14px_30px_rgba(19,38,59,0.06)]"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
                  {pillar.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  {pillar.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] bg-[#263537] p-8 text-white shadow-[0_18px_50px_rgba(19,38,59,0.14)]">
          <h2 className="text-2xl font-black uppercase">
            Por que a Mari Sport se destaca
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <p className="text-sm leading-7 text-slate-200">
              A marca trabalha roupa esportiva com uma identidade visual forte,
              fugindo do basico e aproximando moda fitness, roupa para academia
              e estilo urbano.
            </p>
            <p className="text-sm leading-7 text-slate-200">
              Os conteudos mostram looks reais, combinacoes de cores e pecas que
              ajudam a cliente a visualizar melhor leggings, tops, shorts e
              conjuntos no uso no dia a dia.
            </p>
            <p className="text-sm leading-7 text-slate-200">
              O atendimento direto tambem facilita a compra de conjuntos,
              leggings, tops, shorts, camisetas dry fit e itens da linha
              masculina pelo WhatsApp.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
