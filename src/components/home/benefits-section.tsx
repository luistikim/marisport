type BenefitsSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{ title: string; text: string }>;
};

export function BenefitsSection({
  eyebrow,
  title,
  description,
  items,
}: BenefitsSectionProps) {
  return (
    <section className="px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-6 shadow-[0_16px_36px_rgba(19,38,59,0.06)] sm:p-8">
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {items.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-[#d9e5dc] bg-[#f8fbf8] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4f6a56]">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#56686c]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

