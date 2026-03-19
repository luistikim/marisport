import Link from "next/link";

type HeroAction = {
  label: string;
  href: string;
  external?: boolean;
};

type SectionHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  chips?: string[];
};

export function SectionHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  chips = [
    "Moda fitness premium",
    "Web e mobile",
    "Atendimento online",
  ],
}: SectionHeroProps) {
  return (
    <section className="brand-wave px-5 pb-8 pt-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-line bg-white/90 p-6 shadow-[0_22px_60px_rgba(16,32,51,0.08)] backdrop-blur-sm sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-surface-strong">
            {eyebrow}
          </span>
        </div>
        <h1 className="mt-4 max-w-4xl text-3xl font-black uppercase leading-[0.92] text-surface-strong sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#56686c] sm:text-lg">
          {description}
        </p>
        {primaryAction || secondaryAction ? (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {primaryAction ? (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center justify-center rounded-full bg-surface-strong px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
              >
                {primaryAction.label}
              </Link>
            ) : null}
            {secondaryAction ? (
              <Link
                href={secondaryAction.href}
                target={secondaryAction.external ? "_blank" : undefined}
                rel={secondaryAction.external ? "noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-full border border-[#d8e4db] bg-[#f7faf7] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
              >
                {secondaryAction.label}
              </Link>
            ) : null}
          </div>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#58727b]">
          {chips.map((chip) => (
            <span key={chip} className="rounded-full border border-[#d8e4db] bg-[#f7faf7] px-3 py-2">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
