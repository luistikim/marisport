import { ProductCard } from "@/components/product-card";
import type { CatalogProduct } from "@/data/product";

type ProductGridSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  products: CatalogProduct[];
};

export function ProductGridSection({
  eyebrow,
  title,
  description,
  products,
}: ProductGridSectionProps) {
  return (
    <section className="px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-surface-strong sm:text-4xl">
              {title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#55686b]">
            {description}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

