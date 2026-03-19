import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SectionHero } from "@/components/section-hero";
import { buildWhatsAppLink } from "@/data/product";
import {
  getAboutContent,
  getCatalogContent,
  getContactContent,
  getSiteSettings,
} from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { siteName, siteDescription } = await getSiteSettings();

  return {
    title: "Produtos",
    description:
      "Catalogo Mari Sport com moda fitness masculina e feminina para academia, corrida e rotina ativa.",
    alternates: {
      canonical: "/produtos",
    },
    openGraph: {
      title: `Produtos | ${siteName}`,
      description: siteDescription,
      images: ["/logo-marisport.png"],
    },
  };
}

export default async function ProdutosPage() {
  const [{ sections }, { trustSignals }, contact] = await Promise.all([
    getCatalogContent(),
    getAboutContent(),
    getContactContent(),
  ]);
  const whatsappLink = buildWhatsAppLink(
    contact.whatsappPhone,
    "Ola! Quero consultar o catalogo da Mari Sport.",
  );

  return (
    <main>
      <SectionHero
        eyebrow="Catalogo"
        title="Moda fitness masculina e feminina em uma vitrine clara e premium."
        description="Veja os produtos organizados por categoria, compare estilos e fale com a equipe para consultar disponibilidade, tamanhos e cores."
        primaryAction={{ label: "Falar no WhatsApp", href: whatsappLink, external: true }}
        secondaryAction={{ label: "Ver Instagram", href: contact.instagramUrl, external: true }}
      />

      <section className="px-5 pb-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-[#d9e5dc] bg-white p-6 shadow-[0_16px_36px_rgba(19,38,59,0.06)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Navegacao rapida
              </p>
              <p className="mt-2 text-sm leading-7 text-[#56686c]">
                Explore o catalogo por categoria ou fale direto com a Mari Sport.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#feminino"
                className="rounded-full border border-[#d9e5dc] bg-[#f8fbf8] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
              >
                Feminino
              </Link>
              <Link
                href="#masculino"
                className="rounded-full border border-[#d9e5dc] bg-[#f8fbf8] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
              >
                Masculino
              </Link>
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
              >
                Falar no WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="px-5 pb-10 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                  {section.title}
                </p>
                <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-surface-strong sm:text-4xl">
                  {section.description}
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-7 text-[#56686c]">
                Cards com preco, status e disponibilidade para facilitar a
                leitura no desktop e no mobile.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {section.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] bg-white p-7 shadow-[0_16px_40px_rgba(19,38,59,0.06)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
              Confianca
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-surface-strong">
              O que reforca a compra sem parecer pagina incompleta.
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

          <article className="rounded-[2rem] bg-[linear-gradient(145deg,#132022_0%,#203235_50%,#395a60_100%)] p-7 text-white shadow-[0_20px_60px_rgba(19,32,34,0.18)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-soft">
              Atendimento rapido
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight">
              Quer ver tamanhos, cores e combos disponiveis?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
              A equipe responde por WhatsApp e e-mail com uma linguagem direta,
              humana e pronta para converter interesse em pedido.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-surface-strong"
              >
                Consultar no WhatsApp
              </Link>
              <Link
                href={`mailto:${contact.contactEmail}?subject=Catalogo%20Mari%20Sport`}
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white"
              >
                Enviar e-mail
              </Link>
            </div>
            <Link
              href={contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex text-sm font-semibold text-accent-soft hover:text-white"
            >
              Ver novidades no Instagram
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
