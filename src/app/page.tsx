import Image from "next/image";
import Link from "next/link";
import {
  productFlatlays,
  productGrid,
  whatsappLink,
} from "@/data/site";

export default function Home() {
  return (
    <main>
      <section className="brand-wave px-5 pb-10 pt-10 sm:px-8 lg:px-12 lg:pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-5 sm:space-y-6">
              <span className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-accent sm:border-white/12 sm:bg-white/8">
                Catalogo Mari Sport
              </span>
              <h1 className="text-balance max-w-3xl text-4xl font-black uppercase leading-none text-surface-strong sm:text-6xl sm:text-white lg:text-7xl">
                Veja as roupas, escolha a peca e compre rapido.
              </h1>
              <p className="max-w-xl text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 sm:text-base sm:font-medium sm:uppercase sm:tracking-[0.12em] sm:text-slate-100">
                Fotos reais, catalogo simples e atendimento direto no WhatsApp.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/produtos"
                  className="rounded-full bg-accent px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_16px_34px_rgba(125,187,56,0.22)] transition-transform hover:-translate-y-0.5"
                >
                  Ver catalogo
                </Link>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line bg-white px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-surface-strong transition-colors hover:bg-slate-50 sm:border-white/14 sm:bg-white/8 sm:text-white sm:hover:bg-white/14"
                >
                  Comprar no WhatsApp
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-line bg-white p-4 shadow-[0_20px_50px_rgba(19,38,59,0.08)] sm:border-white/10 sm:bg-white/8 sm:p-5 sm:shadow-[0_18px_50px_rgba(19,38,59,0.12)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {productGrid.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-[1.5rem] bg-[#f6fbfb] sm:bg-white/8"
                  >
                    {item.imageSrc ? (
                      <div className="relative aspect-[4/5] bg-[#f5f2ec]">
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          className={
                            item.imageFit === "contain"
                              ? "object-contain p-2"
                              : "object-cover"
                          }
                          style={{
                            objectPosition: item.imagePosition ?? "center",
                          }}
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/5] items-end bg-[linear-gradient(135deg,#f5f9f3_0%,#edf4ea_52%,#d6e8be_100%)] p-4 text-surface-strong">
                        <p className="text-xl font-black uppercase leading-tight">
                          {item.name}
                        </p>
                      </div>
                    )}
                    <div className="p-4 text-surface-strong sm:text-white">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#4f6b74] sm:text-accent">
                        {item.badge}
                      </p>
                      <p className="mt-2 text-sm font-black uppercase leading-5">
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm sm:tracking-[0.24em]">
                Catalogo
              </p>
              <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-surface-strong sm:mt-3 sm:text-4xl sm:text-white">
                Escolha uma peca e siga para compra.
              </h2>
            </div>
            <Link
              href="/produtos"
              className="text-xs font-bold uppercase tracking-[0.18em] text-surface-strong sm:text-sm sm:text-accent"
            >
              Ver tudo
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {productGrid.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_16px_36px_rgba(19,38,59,0.08)]"
              >
                {product.imageSrc ? (
                  <div className="relative aspect-[4/5] bg-[#f5f2ec]">
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
                  <div className="flex aspect-[4/5] items-end bg-[linear-gradient(135deg,#f5f9f3_0%,#edf4ea_52%,#d6e8be_100%)] p-5 text-surface-strong">
                    <p className="text-2xl font-black uppercase leading-tight">
                      {product.name}
                    </p>
                  </div>
                )}

                <div className="space-y-4 p-5">
                  <div className="space-y-2">
                    {product.category ? (
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#4f6b74]">
                        {product.category}
                      </p>
                    ) : null}
                    <h3 className="text-2xl font-black uppercase leading-tight text-surface-strong">
                      {product.name}
                    </h3>
                    <p className="text-sm leading-6 text-slate-700">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href="/produtos"
                      className="text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
                    >
                      Ver detalhes
                    </Link>
                    <Link
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white"
                    >
                      Comprar
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm sm:tracking-[0.24em]">
              Fotos das roupas
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-surface-strong sm:mt-3 sm:text-4xl sm:text-white">
              Veja as pecas com mais destaque visual.
            </h2>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {productFlatlays.map((item) => (
              <article
                key={item.src}
                className="overflow-hidden rounded-[1.8rem] border border-line bg-white shadow-[0_16px_36px_rgba(19,38,59,0.08)] sm:rounded-[2rem] sm:border-white/10 sm:bg-[#edf3f4] sm:shadow-[0_18px_50px_rgba(19,38,59,0.12)]"
              >
                <div className="relative aspect-[4/5] bg-[#f5f2ec]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 text-surface-strong sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-surface-strong">
                      {item.color}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-[#f8fbfb] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700 sm:border-slate-300 sm:bg-white">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black uppercase leading-tight">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 pt-2 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[linear-gradient(135deg,#f5f9f3_0%,#edf4ea_50%,#d6e8be_100%)] p-8 text-surface-strong shadow-[0_20px_60px_rgba(125,187,56,0.12)]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em]">
                Comprar rapido
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl">
                Gostou de alguma peca? Chame no WhatsApp e feche seu pedido.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/produtos"
                className="rounded-full bg-surface-strong px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-white"
              >
                Abrir catalogo
              </Link>
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-surface-strong/12 bg-white px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-surface-strong"
              >
                Comprar no WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
