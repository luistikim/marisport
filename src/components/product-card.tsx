import Image from "next/image";
import Link from "next/link";
import type { CatalogProduct } from "@/data/product";
import {
  buildProductInquiryLink,
  formatCurrency,
} from "@/data/site";
import { AddToCartButton } from "@/components/add-to-cart-button";

type ProductCardProps = {
  product: CatalogProduct;
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const price = typeof product.unitPrice === "number" ? product.unitPrice : null;
  const hasPrice = price !== null && price > 0;
  const detailHref = `/produtos/${product.id}`;

  if (compact) {
    return (
      <article className="group overflow-hidden rounded-[1.7rem] border border-[#d8e4db] bg-white shadow-[0_14px_34px_rgba(19,38,59,0.07)] transition-transform duration-300 hover:-translate-y-1">
        <Link
          href={detailHref}
          aria-label={`Ver detalhes de ${product.name}`}
          className="block"
        >
          {product.imageSrc ? (
            <div className="relative aspect-[1/1.12] overflow-hidden bg-[linear-gradient(135deg,#eef4ef_0%,#f7faf6_48%,#e6efe2_100%)]">
              <Image
                src={product.imageSrc}
                alt={product.name}
                fill
                className={
                  product.imageFit === "contain"
                    ? "object-contain p-2.5 transition-transform duration-500 group-hover:scale-[1.03]"
                    : "object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                }
                style={{ objectPosition: product.imagePosition ?? "center" }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ) : (
            <div className="flex aspect-[1/1.12] items-center justify-center bg-[linear-gradient(135deg,#eef4ef_0%,#f7faf6_48%,#e6efe2_100%)]" />
          )}
        </Link>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[#d8e4db] bg-white shadow-[0_16px_40px_rgba(19,38,59,0.08)] transition-transform duration-300 hover:-translate-y-1">
      {product.imageSrc ? (
        <div className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(135deg,#eef4ef_0%,#f7faf6_48%,#e6efe2_100%)]">
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            className={
              product.imageFit === "contain"
                ? "object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                : "object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            }
            style={{ objectPosition: product.imagePosition ?? "center" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/5] items-end bg-[linear-gradient(135deg,#203a43_0%,#395a60_52%,#8da8ab_100%)] p-6 text-white">
          <h3 className="max-w-[14ch] text-3xl font-black uppercase leading-tight">
            {product.name}
          </h3>
        </div>
      )}

      <div className={compact ? "space-y-4 p-5" : "space-y-4 p-6"}>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {product.category ? (
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#58727b]">
                {product.category}
              </p>
            ) : null}
            {product.statusLabel ? (
              <span className="rounded-full bg-[#f1f6f1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#4c6454]">
                {product.statusLabel}
              </span>
            ) : null}
          </div>
          <h3 className="text-2xl font-black uppercase leading-tight text-surface-strong">
            {product.name}
          </h3>
          <p className="text-sm leading-7 text-[#536566]">{product.description}</p>
        </div>

        <div className="rounded-[1.4rem] border border-[#dbe5db] bg-[#f6faf6] p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d8272]">
            Preco
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-3">
            <p className="text-2xl font-black uppercase text-surface-strong">
              {hasPrice && price !== null
                ? formatCurrency(price)
                : "Consulte disponibilidade"}
            </p>
            {hasPrice && product.originalPrice ? (
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#9ba79f] line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            ) : null}
          </div>
        </div>

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

        <div className="flex flex-col gap-3">
          {hasPrice ? (
            <AddToCartButton product={product} />
          ) : (
            <Link
              href={buildProductInquiryLink(product)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#dbe5db] bg-[#f7faf7] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong transition-colors hover:border-accent hover:text-accent"
            >
              Consultar disponibilidade
            </Link>
          )}
          <Link
            href={detailHref}
            className="inline-flex items-center justify-center rounded-full border border-[#dbe5db] bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong transition-colors hover:border-accent hover:text-accent"
          >
            Ver detalhes
          </Link>
          <p className="text-xs leading-6 text-[#6b7c79]">
            {hasPrice
              ? "Adicione ao carrinho e finalize depois com mais detalhes."
              : "Fale com a equipe para receber fotos, tamanhos e orientacao de compra."}
          </p>
        </div>
      </div>
    </article>
  );
}
