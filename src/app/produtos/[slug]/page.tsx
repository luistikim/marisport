import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { ProductDetailPurchase } from "@/components/product-detail-purchase";
import { formatCurrency } from "@/data/product";
import {
  getCatalogProductById,
  getCatalogProducts,
  getContactContent,
  getSiteSettings,
} from "@/lib/content";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const products = await getCatalogProducts();

  return products.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [product, site] = await Promise.all([
    getCatalogProductById(slug),
    getSiteSettings(),
  ]);

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: site.siteDescription,
    };
  }

  return {
    title: `${product.name} | ${site.siteName}`,
    description: product.fullDescription || product.description || site.siteDescription,
    alternates: {
      canonical: `/produtos/${slug}`,
    },
    openGraph: {
      title: `${product.name} | ${site.siteName}`,
      description: product.fullDescription || product.description || site.siteDescription,
      images: [product.imageSrc ?? "/logo-marisport.png"],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const [product, contact] = await Promise.all([
    getCatalogProductById(slug),
    getContactContent(),
  ]);

  if (!product) {
    notFound();
  }

  const galleryImages =
    product.galleryImages?.length && product.galleryImages.length > 0
      ? product.galleryImages
      : product.imageSrc
        ? [{ src: product.imageSrc, alt: product.name }]
        : [];
  const hasPrice = typeof product.unitPrice === "number" && product.unitPrice > 0;
  const priceLabel =
    hasPrice && product.unitPrice !== null
      ? formatCurrency(product.unitPrice)
      : "Consulte disponibilidade";

  return (
    <main>
      <section className="px-5 pt-4 pb-10 sm:px-8 lg:px-12 lg:pt-6">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <article className="overflow-hidden rounded-[2rem] border border-[#d9e5dc] bg-white p-4 shadow-[0_16px_40px_rgba(19,38,59,0.06)] sm:p-5 lg:sticky lg:top-24">
            <ProductImageCarousel images={galleryImages} productName={product.name} />
          </article>

          <article className="rounded-[2rem] bg-white p-6 shadow-[0_16px_40px_rgba(19,38,59,0.06)] sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              {product.category ? (
                <span className="rounded-full bg-[#f4f8ef] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6a8271]">
                  {product.category}
                </span>
              ) : null}
              {product.statusLabel ? (
                <span className="rounded-full bg-[#f1f6f1] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4c6454]">
                  {product.statusLabel}
                </span>
              ) : null}
            </div>

            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight leading-[0.95] text-surface-strong sm:text-4xl lg:text-[2.8rem]">
              {product.name}
            </h1>

            <div className="mt-3 rounded-[1.4rem] border border-[#dbe5db] bg-[linear-gradient(180deg,#f9fbf9_0%,#f3f8f3_100%)] px-4 pb-4 pt-3">
              <div className="flex flex-wrap items-end gap-3">
                <p className="text-2xl font-black text-surface-strong">
                  {priceLabel}
                </p>
                {product.originalPrice ? (
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#9ba79f] line-through">
                    {formatCurrency(product.originalPrice)}
                  </p>
                ) : null}
              </div>
            </div>

            <ProductDetailPurchase
              product={product}
              productName={product.name}
              whatsappPhone={contact.whatsappPhone}
            />

            <div className="mt-4 space-y-4">
              <p className="text-sm leading-7 text-[#55686b]">
                {product.fullDescription || product.description}
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
