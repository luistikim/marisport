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
  const hasVariants = Boolean(product.variants?.length) || Boolean(product.sizes?.length) || Boolean(product.colors?.length);
  const detailHref = `/produtos/${product.id}`;

  if (compact) {
    return (
      <article className="group h-full overflow-hidden rounded-[1.4rem] border border-[#d9e5dc] bg-white shadow-[0_10px_26px_rgba(19,38,59,0.06)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(19,38,59,0.1)] sm:rounded-[1.6rem]">
        <div className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(135deg,#eef4ef_0%,#f7faf6_48%,#e6efe2_100%)]">
          {product.imageSrc ? (
            <Image
              src={product.imageSrc}
              alt={product.name}
              fill
              className={
                product.imageFit === "contain"
                  ? "object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  : "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              }
              style={{ objectPosition: product.imagePosition ?? "center" }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : null}

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badge ? (
              <span className="rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#31503a] shadow-sm">
                {product.badge}
              </span>
            ) : null}
            {product.statusLabel ? (
              <span className="rounded-full bg-[#dff1cf] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#27402c] shadow-sm">
                {product.statusLabel}
              </span>
            ) : null}
          </div>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              {product.category ? (
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6d8272]">
                  {product.category}
                </p>
              ) : (
                <span />
              )}
              {product.originalPrice && hasPrice && price !== null ? (
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#a2aca5] line-through">
                  {formatCurrency(product.originalPrice)}
                </p>
              ) : null}
            </div>

            <h3 className="text-[1.02rem] font-black uppercase leading-tight text-surface-strong sm:text-[1.08rem]">
              {product.name}
            </h3>
          </div>

          <div className="rounded-[1.2rem] border border-[#dbe5db] bg-[#f6faf6] p-3">
            <div className="flex flex-wrap items-end gap-3">
              <p className="text-[1.15rem] font-black uppercase text-surface-strong">
                {hasPrice && price !== null ? formatCurrency(price) : "Consulte"}
              </p>
              {product.originalPrice && hasPrice && price !== null ? (
                <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#4c6454]">
                  Promo
                </span>
              ) : null}
            </div>

            {product.availability?.length ? (
              <p className="mt-2 text-[11px] font-medium leading-6 text-[#60726d]">
                {product.availability.join(" • ")}
              </p>
            ) : null}
          </div>

          {hasVariants ? (
            <div className="flex flex-wrap gap-2">
              {(product.sizes ?? []).slice(0, 3).map((size) => (
                <span
                  key={`${product.id}-size-${size}`}
                  className="rounded-full border border-[#dbe5db] bg-[#fafcf9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#536566]"
                >
                  {size}
                </span>
              ))}
              {(product.colors ?? []).slice(0, 3).map((color) => (
                <span
                  key={`${product.id}-color-${color}`}
                  className="rounded-full border border-[#dbe5db] bg-[#fafcf9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#536566]"
                >
                  {color}
                </span>
              ))}
            </div>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row">
            {hasPrice ? (
              <AddToCartButton product={product} className="w-full flex-1" />
            ) : (
              <Link
                href={buildProductInquiryLink(product)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#dff1cf] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#27402c] transition-all hover:-translate-y-0.5 hover:bg-[#cee4b6] hover:shadow-[0_14px_26px_rgba(125,187,56,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Consultar
              </Link>
            )}
            <Link
              href={detailHref}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-[#dbe5db] bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong transition-colors hover:border-accent hover:text-accent"
            >
              Detalhes
            </Link>
          </div>
        </div>
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
