import Image from "next/image";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatCurrency, productGrid } from "@/data/site";

export default function Home() {
  return (
    <main className="bg-[linear-gradient(180deg,#f8fbf7_0%,#f1f7ef_42%,#edf4ec_100%)] text-surface-strong">
      <section className="brand-wave px-5 pb-8 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#dbe7d2] bg-[#fbfdf9] p-6 shadow-[0_20px_60px_rgba(16,32,51,0.06)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">
            Catalogo
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black uppercase leading-none text-surface-strong sm:text-5xl">
            Escolha sua peca e adicione ao carrinho.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#526765] sm:text-base">
            Fotos reais, visual limpo e compra direta em uma unica tela.
          </p>
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
                <div className="flex h-72 items-end bg-[linear-gradient(135deg,#f5f9f3_0%,#edf4ea_52%,#d6e8be_100%)] p-6 text-surface-strong">
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

                <AddToCartButton product={product} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
