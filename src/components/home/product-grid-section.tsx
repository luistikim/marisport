import { ProductCard } from "@/components/product-card";
import type { CatalogProduct } from "@/data/product";

type ProductGridSectionProps = {
  products: CatalogProduct[];
};

export function ProductGridSection({ products }: ProductGridSectionProps) {
  return (
    <section className="px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
