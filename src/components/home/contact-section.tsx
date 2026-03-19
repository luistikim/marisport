import Link from "next/link";

type ContactSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  emailDescription: string;
  whatsappDescription: string;
  email: string;
  whatsappLink: string;
  emailLink: string;
};

export function ContactSection({
  eyebrow,
  title,
  description,
  emailDescription,
  whatsappDescription,
  email,
  whatsappLink,
  emailLink,
}: ContactSectionProps) {
  return (
    <section className="px-5 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[2rem] bg-white p-7 shadow-[0_16px_40px_rgba(19,38,59,0.06)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-surface-strong">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#55686b]">{description}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-[#d9e5dc] bg-[#f8fbf8] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#506859]">
                WhatsApp
              </p>
              <p className="mt-2 text-sm leading-7 text-[#56686c]">{whatsappDescription}</p>
            </div>
            <div className="rounded-[1.4rem] border border-[#d9e5dc] bg-[#f8fbf8] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#506859]">
                E-mail
              </p>
              <p className="mt-2 text-sm leading-7 text-[#56686c]">{emailDescription}</p>
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#d8ff9e_0%,#97ee4a_55%,#64d21c_100%)] p-7 text-surface-strong shadow-[0_20px_60px_rgba(125,187,56,0.18)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em]">Atendimento e entrega</p>
          <h2 className="mt-4 text-3xl font-black uppercase leading-tight">
            Pronto para falar com a equipe e montar seu pedido.
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.4rem] bg-white/65 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#506859]">
                WhatsApp
              </p>
              <p className="mt-2 text-sm leading-7">{whatsappDescription}</p>
            </div>
            <div className="rounded-[1.4rem] bg-white/65 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#506859]">
                E-mail
              </p>
              <p className="mt-2 text-sm leading-7">{emailDescription}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#dff1cf] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#27402c] hover:bg-[#cee4b6]"
            >
              Falar no WhatsApp
            </Link>
            <Link
              href={emailLink}
              className="inline-flex items-center justify-center rounded-full border border-surface-strong/15 bg-white/90 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-surface-strong hover:bg-white"
            >
              Enviar e-mail
            </Link>
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-surface-strong/80">
            {email}
          </p>
        </article>
      </div>
    </section>
  );
}
