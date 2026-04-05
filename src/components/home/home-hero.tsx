import Image from "next/image";
import Link from "next/link";

type HeroAction = {
  label: string;
  href: string;
  external?: boolean;
};

type HomeHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  identityEyebrow: string;
  identityTitle: string;
  identityDescription: string;
  primaryAction: HeroAction;
  secondaryAction: HeroAction;
  stats: Array<{ label: string; value: string }>;
};

export function HomeHero({
  eyebrow,
  title,
  description,
  identityEyebrow,
  identityTitle,
  identityDescription,
  primaryAction,
  secondaryAction,
  stats,
}: HomeHeroProps) {
  return (
    <section className="px-5 pt-6 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="relative overflow-hidden rounded-[2.4rem] bg-[linear-gradient(145deg,#132022_0%,#203235_45%,#35555a_100%)] p-7 text-white shadow-[0_22px_60px_rgba(19,32,34,0.22)] sm:p-10">
          <div className="absolute inset-0 hero-grid opacity-20" aria-hidden="true" />
          <div className="relative z-10">
            <span className="inline-flex rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-surface-strong">
              {eyebrow}
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-[0.92] text-balance sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryAction.href}
                className="brand-cta-primary"
              >
                {primaryAction.label}
              </Link>
              <Link
                href={secondaryAction.href}
                target={secondaryAction.external ? "_blank" : undefined}
                rel={secondaryAction.external ? "noreferrer" : undefined}
                className="brand-cta-secondary"
              >
                {secondaryAction.label}
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-soft">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <article className="section-shell rounded-[2rem] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6a8271]">
                  {identityEyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-surface-strong">
                  {identityTitle}
                </h2>
              </div>
              <span className="rounded-full bg-[#eef5e5] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#56705d]">
                Autenticidade
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#536566]">
              {identityDescription}
            </p>
          </article>

          <article className="flex min-h-[13rem] items-center justify-center overflow-hidden rounded-[2rem] border border-[#d9e5dc] bg-[linear-gradient(135deg,#eef4ef_0%,#f7faf7_48%,#e2eddb_100%)] p-6 shadow-[0_16px_36px_rgba(19,38,59,0.08)] sm:min-h-[16rem] sm:p-8">
            <Image
              src="/logo-marisport.png"
              alt="Mari Sport"
              width={320}
              height={160}
              className="h-auto w-[72%] max-w-[18rem] object-contain"
              priority
            />
          </article>
        </div>
      </div>
    </section>
  );
}
