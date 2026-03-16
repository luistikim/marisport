import type { Metadata } from "next";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { SectionHero } from "@/components/section-hero";
import { productGrid, whatsappLink } from "@/data/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Conheca os produtos da Mari Sport para academia, corrida e rotina ativa, com conjuntos fitness, tops, leggings e looks esportivos.",
  keywords: [
    "produtos Mari Sport",
    "conjunto fitness",
    "legging feminina",
    "top esportivo",
    "roupa para academia",
    "roupa para corrida",
    "short fitness feminino",
    "bermuda masculina esportiva",
    "roupa dry fit masculina",
    "top fitness com sustentacao",
    "legging para treino",
  ],
  openGraph: {
    title: "Produtos | Mari Sport",
    description:
      "Explore a linha de roupas esportivas da Mari Sport para academia e corrida.",
    images: ["/logo-marisport.png"],
  },
};

export default function ProdutosPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Produtos"
        title="Colecoes criadas para academia, corrida e rotina ativa."
        description="A selecao da Mari Sport combina tecidos leves, caimento premium e visual marcante para acompanhar cada etapa do treino."
      />

      <section className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-white/10 bg-white/8 p-6 text-white shadow-[0_14px_40px_rgba(19,38,59,0.1)]">
          <p className="text-base leading-8 text-slate-100">
            A pagina de produtos da Mari Sport foi pensada para quem procura
            roupa fitness feminina, roupa esportiva masculina, conjuntos para
            academia, pecas para corrida, legging fitness, top esportivo,
            short fitness feminino, bermuda masculina e looks confortaveis para
            a rotina ativa. Aqui voce encontra uma visao geral das colecoes com
            foco em modelagem, estilo, funcionalidade e combinacao de cores.
          </p>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {productGrid.map((product, index) => (
            <article
              key={product.name}
              className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_16px_40px_rgba(19,38,59,0.08)]"
            >
              <div className="flex h-52 items-end bg-[linear-gradient(135deg,#13263b_0%,#244b67_45%,#ff5f2e_100%)] p-6 text-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-200">
                    {product.badge}
                  </p>
                  <h2 className="mt-3 text-3xl font-black uppercase leading-tight">
                    {index + 1}. {product.name}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-7 text-slate-700">
                  {product.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <AddToCartButton product={product} />
                  <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full bg-surface-strong px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
                  >
                    Solicitar no WhatsApp
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-white/10 bg-[#263537] p-8 text-white shadow-[0_18px_50px_rgba(19,38,59,0.14)]">
          <h2 className="text-2xl font-black uppercase">
            O que voce encontra nas colecoes da Mari Sport
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <p className="text-sm leading-7 text-slate-200">
              Conjuntos fitness com tops, leggings, shorts e pecas para treino
              que valorizam o corpo e acompanham a rotina de academia e
              funcional.
            </p>
            <p className="text-sm leading-7 text-slate-200">
              Looks esportivos para corrida com tecidos leves, tops de alta
              sustentacao, shorts confortaveis e liberdade total de movimento.
            </p>
            <p className="text-sm leading-7 text-slate-200">
              Linha masculina com shorts, camisetas dry fit e bermudas
              performance para quem busca roupa esportiva funcional e moderna.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
