type BenefitsSectionProps = {
  items: Array<{ title: string; text: string }>;
};

export function BenefitsSection({ items }: BenefitsSectionProps) {
  return (
    <section className="px-5 pt-1 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[2.2rem] border border-[#d9e5dc] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdfb_100%)] p-4 shadow-[0_18px_50px_rgba(19,38,59,0.06)] sm:p-6 lg:p-7">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {items.map((item) => (
            <article
              key={item.title}
              className="h-full rounded-[1.5rem] border border-[#d9e5dc] bg-white p-5 shadow-[0_10px_24px_rgba(19,38,59,0.05)] transition-transform duration-300 hover:-translate-y-0.5"
            >
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
