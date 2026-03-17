import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { SectionHero } from "@/components/section-hero";
import { formatCurrency, productGrid, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Catalogo de produtos da Mari Sport com conjuntos fitness, tops, leggings e looks esportivos para academia e corrida.",
  keywords: [
    "catalogo Mari Sport",
    "conjunto fitness",
    "legging feminina",
    "top esportivo",
    "roupa para academia",
    "roupa para corrida",
  ],
  openGraph: {
    title: "Produtos | Mari Sport",
    description:
      "Veja o catalogo de roupas esportivas da Mari Sport para academia e corrida.",
    images: ["/logo-marisport.png"],
  },
};

export default function ProdutosPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Catalogo"
        title="Fotos reais, grade e compra rapida."
        description="Veja os produtos da Mari Sport com foco em imagem, preco e disponibilidade."
      />

      <section className="px-5 pb-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white">
            Feminino
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white">
            Catalogo real
          </span>
          <span className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong">
            Compra por WhatsApp
          </span>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {productGrid.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[2rem] border border-line bg-[#eef3f3] shadow-[0_16px_40px_rgba(19,38,59,0.08)]"
            >
              {product.imageSrc ? (
                <div className="relative aspect-[4/5] overflow-hidden bg-[#d8d6d1]">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    className={
                      product.imageFit === "contain"
                        ? "object-contain p-2"
                        : "object-cover"
                    }
                    style={{
                      objectPosition: product.imagePosition ?? "center",
                    }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-[#263537]/80 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                    {product.badge}
                  </div>
                </div>
              ) : (
                <div className="flex h-56 items-end bg-[linear-gradient(135deg,#13263b_0%,#244b67_45%,#ff5f2e_100%)] p-6 text-white">
                  <h2 className="text-3xl font-black uppercase leading-tight">
                    {product.name}
                  </h2>
                </div>
              )}

              <div className="space-y-4 p-5 sm:p-6">
                <div className="space-y-2">
                  {product.category ? (
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#4f6b74]">
                      {product.category}
                    </p>
                  ) : null}
                  <h2 className="text-2xl font-black uppercase leading-tight text-surface-strong">
                    {product.name}
                  </h2>
                  <p className="hidden text-sm leading-7 text-slate-700 md:block">
                    {product.description}
                  </p>
                </div>

                <div className="rounded-[1.4rem] bg-white p-4 shadow-[0_10px_30px_rgba(19,38,59,0.06)]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Valor
                  </p>
                  <div className="mt-2 flex flex-wrap items-end gap-3">
                    <p className="text-2xl font-black uppercase text-surface-strong">
                      {product.unitPrice === null
                        ? "Preco em configuracao"
                        : formatCurrency(product.unitPrice)}
                    </p>
                    {product.originalPrice ? (
                      <p className="text-sm font-bold uppercase tracking-[0.12em] text-slate-400 line-through">
                        {formatCurrency(product.originalPrice)}
                      </p>
                    ) : null}
                  </div>
                </div>

                {product.availability?.length ? (
                  <div className="rounded-[1.4rem] border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      Tamanhos e cores
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.availability.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[1.4rem] border border-dashed border-slate-300 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Em atualizacao
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Mais detalhes, fotos e grade serao adicionados em breve.
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <AddToCartButton product={product} />
                  <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex justify-center rounded-full bg-surface-strong px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
                  >
                    Solicitar no WhatsApp
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
