type SectionHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHero({
  eyebrow,
  title,
  description,
}: SectionHeroProps) {
  return (
    <section className="brand-wave px-5 pb-8 pt-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/40 bg-white/65 p-8 shadow-[0_20px_60px_rgba(16,32,51,0.08)] backdrop-blur">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-none text-surface-strong sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
