import Link from "next/link";

type AboutBrandSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{ title: string; text: string }>;
  whyChooseItems: Array<{ title: string; text: string }>;
  whyChooseTitle: string;
};

export function AboutBrandSection({
  eyebrow,
  title,
  description,
  items,
  whyChooseItems,
  whyChooseTitle,
}: AboutBrandSectionProps) {
  return (
    <section className="px-5 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[2.2rem] bg-[linear-gradient(145deg,#132022_0%,#223437_45%,#395a60_100%)] p-7 text-white shadow-[0_20px_60px_rgba(19,32,34,0.18)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-soft">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200">
            {description}
          </p>
          <div className="mt-6 grid gap-3">
            {items.map((item) => (
              <div key={item.title} className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent-soft">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{item.text}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2.2rem] bg-white p-7 shadow-[0_20px_60px_rgba(19,38,59,0.08)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
            {whyChooseTitle}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {whyChooseItems.map((item) => (
              <div key={item.title} className="rounded-[1.4rem] border border-[#d9e5dc] bg-[#f8fbf8] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#4f6a56]">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#56686c]">{item.text}</p>
              </div>
            ))}
          </div>
          <Link
            href="/quem-somos"
            className="mt-6 inline-flex rounded-full border border-[#d9e5dc] bg-[#f8fbf8] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
          >
            Ver historia da marca
          </Link>
        </article>
      </div>
    </section>
  );
}
