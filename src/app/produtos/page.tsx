import type { Metadata } from "next";
import { ProductsCatalogBrowser } from "@/components/products-catalog-browser";
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
    <main>
      <ProductsCatalogBrowser products={products} />
    </main>
  );
}
