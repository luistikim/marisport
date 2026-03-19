"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "@/data/product";

const STORAGE_KEY = "marisport-promo-popup-dismissed";
const couponCode = "VIP25";

type PromoPopupProps = {
  whatsappPhone: string;
};

export function PromoPopup({ whatsappPhone }: PromoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const wasDismissed = window.sessionStorage.getItem(STORAGE_KEY);
    if (wasDismissed === "true") {
      return;
    }

    const timer = window.setTimeout(() => setIsOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  function handleClose() {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !accepted) {
      return;
    }

    const message =
      `Olá, Mari Sport! Acabei de preencher o pop-up do site e quero receber meu cupom exclusivo.\n\n` +
      `Meu nome é ${name}.\n` +
      `E-mail: ${email}\n` +
      `WhatsApp: ${phone}\n\n` +
      `Já autorizei o contato e a entrada no Grupo VIP.\n` +
      `Podem me enviar o cupom ${couponCode} e me mostrar as peças em destaque?`;

    handleClose();
    window.open(
      buildWhatsAppLink(whatsappPhone, message),
      "_blank",
      "noopener,noreferrer",
    );
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-4">
      <div className="relative w-full max-w-[34rem] overflow-hidden rounded-[2rem] border border-[#6f8a8d] bg-[linear-gradient(180deg,#58727b_0%,#4f6b74_52%,#435b63_100%)] p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#58727b_0%,#4f6b74_45%,#7dbb38_100%)]" />
        <button
          type="button"
          aria-label="Fechar pop-up"
          onClick={handleClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/70 transition-colors hover:text-white"
        >
          x
        </button>

        <div className="pr-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent-soft">
            Cupom exclusivo
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-200">
            O cupom sera revelado assim que voce preencher os dados abaixo.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nome"
            required
            className="w-full rounded-none border border-[#d9e5e1] bg-[#fbfdfc] px-4 py-4 text-lg text-surface-strong outline-none transition-colors placeholder:text-slate-400 focus:border-accent"
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-mail"
            required
            className="w-full rounded-none border border-[#d9e5e1] bg-[#fbfdfc] px-4 py-4 text-lg text-surface-strong outline-none transition-colors placeholder:text-slate-400 focus:border-accent"
          />
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Celular com DDD"
            required
            className="w-full rounded-none border border-[#d9e5e1] bg-[#fbfdfc] px-4 py-4 text-lg text-surface-strong outline-none transition-colors placeholder:text-slate-400 focus:border-accent"
          />

          <label className="flex items-start gap-3 rounded-[1rem] bg-[#5f7b7e]/70 px-4 py-3 text-left text-xs leading-5 text-slate-100">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              required
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-accent"
            />
            <span>
              Ao informar seu WhatsApp, voce aceita receber contato da Mari Sport
              e ser adicionada ao Grupo VIP para novidades, ofertas e cupons.
            </span>
          </label>

          <button
            type="submit"
            disabled={!name.trim() || !email.trim() || !phone.trim() || !accepted}
            className="w-full bg-[linear-gradient(90deg,#263537_0%,#4f6b74_50%,#7dbb38_100%)] px-5 py-4 text-base font-bold text-white transition-opacity enabled:hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-55"
          >
            Revelar o cupom!
          </button>
        </form>
      </div>
    </div>
  );
}

