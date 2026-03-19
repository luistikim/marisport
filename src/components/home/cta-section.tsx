import Link from "next/link";

type CtaSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; external?: boolean };
};

export function CtaSection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: CtaSectionProps) {
  return (
    <section className="px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-[linear-gradient(145deg,#132022_0%,#203235_45%,#395a60_100%)] p-7 text-white shadow-[0_20px_60px_rgba(19,32,34,0.18)] sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent-soft">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-[#dff1cf] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#27402c] hover:bg-[#cee4b6]"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              target={secondaryCta.external ? "_blank" : undefined}
              rel={secondaryCta.external ? "noreferrer" : undefined}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/86 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-surface-strong hover:bg-white"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
