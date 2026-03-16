import Link from "next/link";

type CheckoutStatusProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function CheckoutStatus({
  eyebrow,
  title,
  description,
}: CheckoutStatusProps) {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/8 p-8 text-center text-white shadow-[0_18px_50px_rgba(19,38,59,0.12)]">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black uppercase leading-tight">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-200">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/carrinho"
            className="inline-flex rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-surface-strong"
          >
            Voltar ao carrinho
          </Link>
          <Link
            href="/contato"
            className="inline-flex rounded-full border border-white/16 bg-white/8 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white"
          >
            Falar com a loja
          </Link>
        </div>
      </div>
    </section>
  );
}
