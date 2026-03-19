import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { SectionHero } from "@/components/section-hero";
import { buildWhatsAppLink, formatCurrency } from "@/data/product";
import { getCatalogProductById, getCatalogProducts, getContactContent, getSiteSettings } from "@/lib/content";

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

  const whatsappLink = buildWhatsAppLink(
    contact.whatsappPhone,
    `Ola! Quero saber mais sobre o produto ${product.name}.`,
  );
  const hasPrice = typeof product.unitPrice === "number" && product.unitPrice > 0;

  return (
    <main>
      <SectionHero
        eyebrow="Detalhe do produto"
        title={product.name}
        description={product.description}
        primaryAction={{ label: "Falar no WhatsApp", href: whatsappLink, external: true }}
        secondaryAction={{ label: "Voltar ao catálogo", href: "/produtos" }}
      />

      <section className="px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-[#d9e5dc] bg-white p-4 shadow-[0_16px_40px_rgba(19,38,59,0.06)] sm:p-5">
            <ProductImageCarousel images={galleryImages} productName={product.name} />
          </article>

          <article className="rounded-[2rem] bg-white p-7 shadow-[0_16px_40px_rgba(19,38,59,0.06)] sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#dff1cf] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#27402c]">
                {product.badge}
              </span>
              {product.statusLabel ? (
                <span className="rounded-full bg-[#f1f6f1] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4c6454]">
                  {product.statusLabel}
                </span>
              ) : null}
            </div>

            <div className="mt-5 space-y-4">
              <p className="text-sm leading-7 text-[#55686b]">
                {product.fullDescription || product.description}
              </p>

              <div className="rounded-[1.4rem] border border-[#dbe5db] bg-[#f6faf6] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d8272]">
                  Preço
                </p>
                <div className="mt-2 flex flex-wrap items-end gap-3">
                  <p className="text-2xl font-black uppercase text-surface-strong">
                    {hasPrice && product.unitPrice !== null
                      ? formatCurrency(product.unitPrice)
                      : "Consulte disponibilidade"}
                  </p>
                  {product.originalPrice ? (
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#9ba79f] line-through">
                      {formatCurrency(product.originalPrice)}
                    </p>
                  ) : null}
                </div>
              </div>

              {product.category ? (
                <div className="rounded-[1.4rem] border border-[#dbe5db] bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d8272]">
                    Categoria
                  </p>
                  <p className="mt-2 text-sm font-semibold text-surface-strong">
                    {product.category}
                  </p>
                </div>
              ) : null}

              {product.availability?.length ? (
                <div className="rounded-[1.4rem] border border-[#dbe5db] bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d8272]">
                    Tamanhos e cores
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.availability.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#dbe5db] bg-[#f8fbf8] px-3 py-2 text-xs font-semibold text-[#536566]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#dff1cf] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#27402c] hover:bg-[#cee4b6]"
                >
                  Consultar no WhatsApp
                </Link>
                <Link
                  href="/produtos"
                  className="inline-flex items-center justify-center rounded-full border border-[#d9e5dc] bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-surface-strong hover:bg-[#f4fbef]"
                >
                  Voltar ao catálogo
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
