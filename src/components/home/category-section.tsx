import Link from "next/link";
import type { CatalogSection } from "@/data/categories";

type CategorySectionProps = {
  eyebrow: string;
  title: string;
  ctaLabel: string;
  sections: CatalogSection[];
};

export function CategorySection({
  eyebrow,
  title,
  ctaLabel,
  sections,
}: CategorySectionProps) {
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
          <Link
            href="/produtos"
            className="inline-flex rounded-full border border-[#d9e5dc] bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.id}
              className="overflow-hidden rounded-[2rem] border border-[#d9e5dc] bg-white shadow-[0_16px_36px_rgba(19,38,59,0.06)]"
            >
              <div className="flex h-full flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6a8271]">
                      {section.title}
                    </p>
                    <span className="rounded-full bg-[#eef5e5] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4f6a56]">
                      {section.products.length} produtos
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black uppercase leading-tight text-surface-strong">
                    {section.description}
                  </h3>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {section.products.map((product) => (
                    <span
                      key={product.id}
                      className="rounded-full border border-[#d9e5dc] bg-[#f8fbf8] px-3 py-2 text-xs font-semibold text-[#56686c]"
                    >
                      {product.name}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/produtos#${section.id}`}
                  className="mt-6 inline-flex w-fit rounded-full bg-surface-strong px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
                >
                  Explorar {section.title.toLowerCase()}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

