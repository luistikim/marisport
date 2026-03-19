type TrustSectionProps = {
  eyebrow: string;
  title: string;
  items: string[];
};

export function TrustSection({ eyebrow, title, items }: TrustSectionProps) {
  return (
    <section className="px-5 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <article className="rounded-[2rem] bg-white p-7 shadow-[0_16px_40px_rgba(19,38,59,0.06)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-surface-strong">
            {title}
          </h2>
          <div className="mt-6 grid gap-3">
            {items.map((item) => (
              <div
                key={item}
                className="rounded-[1.2rem] border border-[#d9e5dc] bg-[#f8fbf8] px-4 py-4 text-sm font-semibold text-[#536566]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#d8ff9e_0%,#97ee4a_55%,#64d21c_100%)] p-7 text-surface-strong shadow-[0_20px_60px_rgba(125,187,56,0.18)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em]">
            Atendimento e entrega
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase leading-tight">
            Pronto para falar com a equipe e montar seu pedido.
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.4rem] bg-white/65 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#506859]">
                WhatsApp
              </p>
              <p className="mt-2 text-sm leading-7">
                Atendimento rapido para detalhes, tamanhos, cores e disponibilidade.
              </p>
            </div>
            <div className="rounded-[1.4rem] bg-white/65 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#506859]">
                E-mail
              </p>
              <p className="mt-2 text-sm leading-7">
                Suporte para pedidos, informacoes e acompanhamento comercial.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

