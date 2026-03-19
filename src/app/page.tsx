import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import {
  brandBenefits,
  catalogSections,
  coupleStory,
  instagramLink,
  productGrid,
  trustSignals,
  whatsappLink,
  whyChooseMariSport,
} from "@/data/site";

const heroStats = [
  { label: "Moda fitness", value: "Masculina e feminina" },
  { label: "Foco", value: "Estilo + performance" },
  { label: "Atendimento", value: "Online e direto" },
];

export default function Home() {
  return (
    <main className="space-y-8 pb-10">
      <section className="px-5 pt-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="relative overflow-hidden rounded-[2.4rem] bg-[linear-gradient(145deg,#132022_0%,#203235_45%,#35555a_100%)] p-7 text-white shadow-[0_22px_60px_rgba(19,32,34,0.22)] sm:p-10">
            <div className="absolute inset-0 hero-grid opacity-20" aria-hidden="true" />
            <div className="relative z-10">
              <span className="inline-flex rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-surface-strong">
                Mari Sport
              </span>
              <h1 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-[0.92] text-balance sm:text-6xl">
                Moda fitness para homens e mulheres que buscam estilo e performance.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-lg">
                Looks esportivos para academia, corrida e rotina ativa, com
                visual moderno, conforto real e uma identidade criada por um
                casal que vive esse estilo de vida.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/produtos"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-surface-strong shadow-[0_16px_36px_rgba(125,187,56,0.24)] hover:-translate-y-0.5"
                >
                  Ver catalogo
                </Link>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-white/14"
                >
                  Falar no WhatsApp
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {heroStats.map((item) => (
                  <div key={item.label} className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-soft">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <article className="section-shell rounded-[2rem] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6a8271]">
                    Identidade da marca
                  </p>
                  <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-surface-strong">
                    Criada por um casal apaixonado por treino.
                  </h2>
                </div>
                <span className="rounded-full bg-[#eef5e5] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#56705d]">
                  Autenticidade
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#536566]">
                A Mari Sport foi pensada para parecer uma loja de verdade:
                proximidade, clareza e uma comunicacao que passa confianca desde
                o primeiro clique.
              </p>
            </article>

            <article className="overflow-hidden rounded-[2rem] border border-[#d9e5dc] bg-white shadow-[0_16px_36px_rgba(19,38,59,0.08)]">
              <div className="relative aspect-[16/10] bg-[linear-gradient(135deg,#e8f0e4_0%,#f7faf7_48%,#dfead8_100%)]">
                <Image
                  src="/logo-marisport.png"
                  alt="Mari Sport"
                  fill
                  className="object-contain p-10"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a8271]">
                  Conversao e confianca
                </p>
                <p className="mt-2 text-sm leading-7 text-[#536566]">
                  Catalogo organizado, CTA claro e leitura boa no mobile para
                  ajudar a transformar visita em contato.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-6 shadow-[0_16px_36px_rgba(19,38,59,0.06)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Beneficios da marca
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-surface-strong sm:text-4xl">
                Tudo que fortalece a experiencia de compra.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#55686b]">
              Uma comunicacao mais limpa melhora a leitura do conteudo e ajuda o
              usuario a encontrar o produto certo mais rapido.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {brandBenefits.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-[#d9e5dc] bg-[#f8fbf8] p-5"
              >
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4f6a56]">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#56686c]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Categorias
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-surface-strong sm:text-4xl">
                Masculino e feminino em blocos claros.
              </h2>
            </div>
            <Link
              href="/produtos"
              className="inline-flex rounded-full border border-[#d9e5dc] bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
            >
              Ver catalogo completo
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {catalogSections.map((section) => (
              <article
                key={section.id}
                className="overflow-hidden rounded-[2rem] border border-[#d9e5dc] bg-white shadow-[0_16px_36px_rgba(19,38,59,0.06)]"
              >
                <div className="flex h-full flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6a8271]">
                        {section.title}
                      </p>
                      <span className="rounded-full bg-[#eef5e5] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4f6a56]">
                        {section.products.length} produtos
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-black uppercase leading-tight text-surface-strong">
                      {section.description}
                    </h3>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {section.products.map((product) => (
                      <span
                        key={product.id}
                        className="rounded-full border border-[#d9e5dc] bg-[#f8fbf8] px-3 py-2 text-xs font-semibold text-[#56686c]"
                      >
                        {product.name}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/produtos#${section.id}`}
                    className="mt-6 inline-flex w-fit rounded-full bg-surface-strong px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
                  >
                    Explorar {section.title.toLowerCase()}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Catalogo em destaque
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-surface-strong sm:text-4xl">
                Produtos mais fortes da vitrine.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#55686b]">
              Os cards abaixo deixam a leitura clara e mostram preco, status e
              disponibilidade sem ruido visual.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {productGrid.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-6 rounded-[1.8rem] border border-[#d9e5dc] bg-white p-5 text-sm leading-7 text-[#56686c]">
            <strong className="text-surface-strong">Preco e status</strong>{" "}
            atualizado para leitura mais profissional: quando o valor nao esta
            definido, o site mostra{" "}
            <span className="font-semibold text-surface-strong">
              consulte disponibilidade
            </span>{" "}
            ou{" "}
            <span className="font-semibold text-surface-strong">
              lancamento em breve
            </span>
            .
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2.2rem] bg-[linear-gradient(145deg,#132022_0%,#223437_45%,#395a60_100%)] p-7 text-white shadow-[0_20px_60px_rgba(19,32,34,0.18)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-soft">
              Sobre o casal
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-balance sm:text-4xl">
              Uma marca criada por quem vive o estilo de vida fitness.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200">
              A Mari Sport nasce da combinacao de proximidade, rotina de treino
              e desejo de criar uma loja mais confiavel, bonita e facil de
              comprar.
            </p>
            <div className="mt-6 grid gap-3">
              {coupleStory.map((item) => (
                <div key={item.title} className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent-soft">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{item.text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.2rem] bg-white p-7 shadow-[0_20px_60px_rgba(19,38,59,0.08)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
              Por que escolher a Mari Sport
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {whyChooseMariSport.map((item) => (
                <div key={item.title} className="rounded-[1.4rem] border border-[#d9e5dc] bg-[#f8fbf8] p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4f6a56]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#56686c]">{item.text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-[2rem] bg-white p-7 shadow-[0_16px_40px_rgba(19,38,59,0.06)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
              Prova de confianca
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-surface-strong">
              Clareza que ajuda a vender mais.
            </h2>
            <div className="mt-6 grid gap-3">
              {trustSignals.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] border border-[#d9e5dc] bg-[#f8fbf8] px-4 py-4 text-sm font-semibold text-[#536566]"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#d8ff9e_0%,#97ee4a_55%,#64d21c_100%)] p-7 text-surface-strong shadow-[0_20px_60px_rgba(125,187,56,0.18)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em]">
              Atendimento e entrega
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight">
              Pronto para falar com a equipe e montar seu pedido.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] bg-white/65 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#506859]">
                  WhatsApp
                </p>
                <p className="mt-2 text-sm leading-7">
                  Atendimento rapido para detalhes, tamanhos, cores e
                  disponibilidade.
                </p>
              </div>
              <div className="rounded-[1.4rem] bg-white/65 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#506859]">
                  E-mail
                </p>
                <p className="mt-2 text-sm leading-7">
                  Suporte para pedidos, informacoes e acompanhamento comercial.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-surface-strong px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white"
              >
                Falar no WhatsApp
              </Link>
              <Link
                href={`mailto:${"marisport.fitwear@gmail.com"}?subject=Contato%20Mari%20Sport`}
                className="inline-flex items-center justify-center rounded-full border border-surface-strong/20 bg-white/65 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-surface-strong"
              >
                Enviar e-mail
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[linear-gradient(145deg,#132022_0%,#203235_45%,#395a60_100%)] p-7 text-white shadow-[0_20px_60px_rgba(19,32,34,0.18)] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-soft">
                CTA final
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-balance sm:text-4xl">
                Quer ver o catalogo completo e escolher seu proximo look?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
                Acesse a pagina de produtos para comparar categorias, consultar
                disponibilidade e falar com a Mari Sport com mais agilidade.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-surface-strong"
              >
                Ver catalogo
              </Link>
              <Link
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white"
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
