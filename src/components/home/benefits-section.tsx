type BenefitsSectionProps = {
  items: Array<{ title: string; text: string }>;
};

export function BenefitsSection({ items }: BenefitsSectionProps) {
  return (
    <section className="px-5 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-4 pt-0 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <article
            key={item.title}
            className="h-full rounded-[1.5rem] border border-[#d9e5dc] bg-[#f8fbf8] p-5 shadow-[0_10px_24px_rgba(19,38,59,0.04)]"
          >
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4f6a56]">
              {item.title}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#56686c]">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
