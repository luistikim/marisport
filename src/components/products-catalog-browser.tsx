"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { CatalogProduct } from "@/data/product";

type ProductCatalogBrowserProps = {
  products: CatalogProduct[];
};

type CategoryFilter = "all" | "Feminino" | "Masculino";
type AvailabilityFilter = "all" | "available" | "consult";
type SortOption = "featured" | "price-asc" | "price-desc" | "name";

function normalizeSearchText(value?: string) {
  return value
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim() ?? "";
}

function matchesQuery(product: CatalogProduct, query: string) {
  if (!query) {
    return true;
  }

  const searchableFields = [
    product.name,
    product.description,
    product.fullDescription,
    product.badge,
    product.statusLabel,
    product.category,
    ...(product.sizes ?? []),
    ...(product.colors ?? []),
    ...(product.availability ?? []),
  ];

  return searchableFields.some((field) =>
    normalizeSearchText(field).includes(query),
  );
}

export function ProductsCatalogBrowser({ products }: ProductCatalogBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [availability, setAvailability] =
    useState<AvailabilityFilter>("all");
  const [sort, setSort] = useState<SortOption>("featured");

  const normalizedQuery = normalizeSearchText(query);
  const categoryOptions = useMemo(
    () => Array.from(new Set(products.map((product) => product.category).filter(Boolean))) as Array<"Feminino" | "Masculino">,
    [products],
  );

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "all" ? true : product.category === category;
      const matchesAvailability =
        availability === "all"
          ? true
          : availability === "available"
            ? typeof product.unitPrice === "number" && product.unitPrice > 0
            : typeof product.unitPrice !== "number" || product.unitPrice <= 0;

      return (
        matchesCategory &&
        matchesAvailability &&
        matchesQuery(product, normalizedQuery)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "price-asc" || sort === "price-desc") {
        const aPrice =
          typeof a.unitPrice === "number" && a.unitPrice > 0
            ? a.unitPrice
            : Number.POSITIVE_INFINITY;
        const bPrice =
          typeof b.unitPrice === "number" && b.unitPrice > 0
            ? b.unitPrice
            : Number.POSITIVE_INFINITY;

        return sort === "price-asc" ? aPrice - bPrice : bPrice - aPrice;
      }

      if (sort === "name") {
        return a.name.localeCompare(b.name, "pt-BR");
      }

      const aScore = Number(Boolean(a.featured)) * 2 + Number(Boolean(a.isNew));
      const bScore = Number(Boolean(b.featured)) * 2 + Number(Boolean(b.isNew));

      if (aScore !== bScore) {
        return bScore - aScore;
      }

      return a.name.localeCompare(b.name, "pt-BR");
    });

    return sorted;
  }, [availability, category, normalizedQuery, products, sort]);

  const availableCount = products.filter(
    (product) => typeof product.unitPrice === "number" && product.unitPrice > 0,
  ).length;
  const consultCount = products.length - availableCount;

  return (
    <section className="px-5 pb-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,#132022_0%,#203235_48%,#395a60_100%)] p-5 text-white shadow-[0_20px_60px_rgba(19,32,34,0.18)] sm:p-7">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-soft">
                  Catálogo
                </p>
                <h1 className="mt-2 text-3xl font-black uppercase leading-tight sm:text-4xl">
                  Produtos prontos para compra
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Busque por nome, filtre por categoria e encontre rapidamente
                  produtos com preço, variações e disponibilidade.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  {products.length} produtos
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  {availableCount} com preço
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  {consultCount} sob consulta
                </span>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
              <label className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-white/10 px-4 py-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-200">
                  Buscar
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Produto, cor, tamanho, badge..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-300 focus:outline-none"
                />
              </label>

              <label className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-white/10 px-4 py-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-200">
                  Categoria
                </span>
                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as CategoryFilter)
                  }
                  className="w-full bg-transparent text-sm text-white focus:outline-none"
                >
                  <option className="text-surface-strong" value="all">
                    Todas
                  </option>
                  {categoryOptions.map((option) => (
                    <option
                      key={option}
                      className="text-surface-strong"
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-white/10 px-4 py-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-200">
                  Ordenar
                </span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none"
                >
                  <option className="text-surface-strong" value="featured">
                    Destaques
                  </option>
                  <option className="text-surface-strong" value="price-asc">
                    Menor preço
                  </option>
                  <option className="text-surface-strong" value="price-desc">
                    Maior preço
                  </option>
                  <option className="text-surface-strong" value="name">
                    Nome
                  </option>
                </select>
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { label: "Todos", value: "all" as const },
                { label: "Com preço", value: "available" as const },
                { label: "Sob consulta", value: "consult" as const },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setAvailability(item.value)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
                    availability === item.value
                      ? "bg-[#dff1cf] text-[#27402c]"
                      : "border border-white/15 bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-600">
            {filteredProducts.length} produto(s) encontrado(s)
          </p>
          {(query || category !== "all" || availability !== "all" || sort !== "featured") ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
                setAvailability("all");
                setSort("featured");
              }}
              className="text-sm font-bold uppercase tracking-[0.14em] text-accent hover:text-surface-strong"
            >
              Limpar filtros
            </button>
          ) : null}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))
          ) : (
            <div className="col-span-full rounded-[2rem] border border-dashed border-[#d9e5dc] bg-white px-6 py-16 text-center shadow-[0_10px_30px_rgba(19,38,59,0.04)]">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Nenhum produto encontrado
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#55686b]">
                Tente ajustar a busca, trocar a categoria ou voltar para
                visualizar todos os produtos disponíveis.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
