import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AddToCartButton } from "@/components/add-to-cart-button";
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
    <main className="bg-[linear-gradient(180deg,#f8fbf7_0%,#f1f7ef_42%,#edf4ec_100%)] text-surface-strong">
      <section className="px-5 pb-8 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#dbe7d2] bg-[#fbfdf9] p-6 shadow-[0_20px_60px_rgba(16,32,51,0.06)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">
            Catalogo
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-3xl font-black uppercase leading-none text-surface-strong sm:text-5xl">
                Fotos reais, grade e compra rapida com cara de vitrine.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#526765] sm:text-base">
                Organizamos a pagina de produtos como um catalogo visual: foco
                nas imagens, leitura mais limpa e informacoes importantes logo
                abaixo de cada peca.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-[#dbe7d2] bg-[#f5f9f3] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6f8373]">
                  Catalogo
                </p>
                <p className="mt-2 text-lg font-black uppercase">{productGrid.length} itens</p>
              </div>
              <div className="rounded-[1.4rem] border border-[#dbe7d2] bg-[#f5f9f3] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6f8373]">
                  Formato
                </p>
                <p className="mt-2 text-lg font-black uppercase">Fotos reais</p>
              </div>
              <div className="rounded-[1.4rem] border border-[#dbe7d2] bg-[#f5f9f3] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6f8373]">
                  Compra
                </p>
                <p className="mt-2 text-lg font-black uppercase">WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
          <span className="rounded-full border border-[#dbe7d2] bg-[#fbfdf9] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong shadow-[0_8px_24px_rgba(38,53,55,0.03)]">
            Feminino
          </span>
          <span className="rounded-full border border-[#dbe7d2] bg-[#fbfdf9] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong shadow-[0_8px_24px_rgba(38,53,55,0.03)]">
            Fotos reais
          </span>
          <span className="rounded-full border border-[#dbe7d2] bg-[#fbfdf9] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong shadow-[0_8px_24px_rgba(38,53,55,0.03)]">
            Grade por produto
          </span>
          <span className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_12px_26px_rgba(125,187,56,0.18)]">
            Compra por WhatsApp
          </span>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {productGrid.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[2rem] border border-[#dbe7d2] bg-[#fffefc] shadow-[0_16px_40px_rgba(19,38,59,0.06)]"
            >
              {product.imageSrc ? (
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f2ec]">
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
                  <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/88 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-surface-strong backdrop-blur">
                    {product.badge}
                  </div>
                </div>
              ) : (
                <div className="flex h-56 items-end bg-[linear-gradient(135deg,#f5f9f3_0%,#edf4ea_52%,#d6e8be_100%)] p-6 text-surface-strong">
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
                  <p className="text-sm leading-7 text-[#526765]">
                    {product.description}
                  </p>
                </div>

                <div className="rounded-[1.4rem] border border-[#dbe7d2] bg-[#f5f9f3] p-4 shadow-[0_10px_30px_rgba(19,38,59,0.04)]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6f8373]">
                    Valor
                  </p>
                  <div className="mt-2 flex flex-wrap items-end gap-3">
                    <p className="text-2xl font-black uppercase text-surface-strong">
                      {product.unitPrice === null
                        ? "Preco em configuracao"
                        : formatCurrency(product.unitPrice)}
                    </p>
                    {product.originalPrice ? (
                      <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#93a094] line-through">
                        {formatCurrency(product.originalPrice)}
                      </p>
                    ) : null}
                  </div>
                </div>

                {product.availability?.length ? (
                  <div className="rounded-[1.4rem] border border-[#dbe7d2] bg-[#f5f9f3] p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6f8373]">
                      Tamanhos e cores
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.availability.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#dbe7d2] bg-[#fffefc] px-3 py-2 text-xs font-semibold text-[#526765]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[1.4rem] border border-dashed border-[#cdddbf] bg-[#f5f9f3] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6f8373]">
                      Em atualizacao
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#5f726f]">
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
