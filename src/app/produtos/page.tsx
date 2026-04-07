import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { getCatalogContent, getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { siteName, siteDescription } = await getSiteSettings();

  return {
    title: "Produtos",
    description:
      "Catalogo Mari Sport com busca, filtros, precos, variacoes e compra rapida de moda fitness masculina e feminina.",
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
  const { sections } = await getCatalogContent();
  const products = sections.flatMap((section) => section.products);

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-accent">
              Produtos
            </p>
            <h1 className="mt-2 text-2xl font-black uppercase leading-tight text-surface-strong sm:text-3xl">
              Vitrine de produtos
            </h1>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            {products.length} itens
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>
    </main>
  );
}
