import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
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

  const orderedSections = [...sections]
    .filter((section) => section.id === "masculino" || section.id === "feminino")
    .sort((a, b) => {
      const order = {
        masculino: 0,
        feminino: 1,
      } as const;

      return order[a.id] - order[b.id];
    });

  const whatsappLink = buildWhatsAppLink(
    contact.whatsappPhone,
    "Ola! Quero consultar o catalogo da Mari Sport.",
  );

  return (
    <main>
      {orderedSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="px-5 pb-14 sm:px-8 sm:pb-18 lg:px-12"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 sm:mb-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
                {section.title}
              </p>
              <div className="mt-3 h-px w-8 bg-accent/40" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {section.products.map((product) => (
                <ProductCard key={product.id} product={product} compact />
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
                className="inline-flex items-center justify-center rounded-full bg-[#dff1cf] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#27402c] hover:bg-[#cee4b6]"
              >
                Consultar no WhatsApp
              </Link>
              <Link
                href={`mailto:${contact.contactEmail}?subject=Catalogo%20Mari%20Sport`}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/86 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-surface-strong hover:bg-white"
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
