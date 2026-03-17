"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "@/data/site";

const STORAGE_KEY = "marisport-promo-popup-dismissed";
const couponCode = "VIP25";

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

    if (!accepted) {
      return;
    }

    const message =
      `Olá! Vim pelo pop-up do site da Mari Sport.\n` +
      `Nome: ${name}\n` +
      `E-mail: ${email}\n` +
      `WhatsApp: ${phone}\n` +
      `Quero receber meu cupom ${couponCode} e entrar no Grupo VIP.`;

    setIsSubmitted(true);
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-4">
      <div className="relative w-full max-w-[34rem] overflow-hidden rounded-[2rem] border border-[#d2e0da] bg-[linear-gradient(180deg,#f8fbfb_0%,#eef5f4_56%,#e3ece7_100%)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#263537_0%,#4f6b74_40%,#7dbb38_100%)]" />
        <button
          type="button"
          aria-label="Fechar pop-up"
          onClick={handleClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl text-surface-strong/70 transition-colors hover:text-surface-strong"
        >
          ×
        </button>

        <div className="pr-10 text-center">
          <p className="text-5xl font-black uppercase leading-none text-surface-strong sm:text-6xl">
            25% OFF
          </p>
          <p className="mt-3 text-base font-semibold text-[#4f6b74]">
            *acima de R$799
          </p>
          <p className="mt-2 text-sm leading-6 text-surface-strong/80">
            O cupom sera revelado assim que voce preencher os dados abaixo.
          </p>
        </div>

        {isSubmitted ? (
          <div className="mt-6 rounded-[1.5rem] border border-[#d2e0da] bg-white/85 p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Cupom liberado
            </p>
            <p className="mt-3 text-4xl font-black uppercase text-surface-strong">
              {couponCode}
            </p>
            <p className="mt-3 text-sm leading-6 text-surface-strong/80">
              Abrimos o WhatsApp com seus dados para continuar o atendimento.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-5 inline-flex rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nome"
              required
              className="w-full rounded-none border border-[#cfdad7] bg-white px-4 py-4 text-lg text-surface-strong outline-none transition-colors placeholder:text-slate-400 focus:border-accent"
            />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="E-mail"
              required
              className="w-full rounded-none border border-[#cfdad7] bg-white px-4 py-4 text-lg text-surface-strong outline-none transition-colors placeholder:text-slate-400 focus:border-accent"
            />
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Celular com DDD"
              required
              className="w-full rounded-none border border-[#cfdad7] bg-white px-4 py-4 text-lg text-surface-strong outline-none transition-colors placeholder:text-slate-400 focus:border-accent"
            />

            <label className="flex items-start gap-3 rounded-[1rem] bg-[#f3f8f7] px-4 py-3 text-left text-xs leading-5 text-surface-strong/85">
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
              className="w-full bg-[linear-gradient(90deg,#263537_0%,#4f6b74_50%,#7dbb38_100%)] px-5 py-4 text-base font-bold text-white transition-opacity hover:opacity-95"
            >
              Revelar o cupom!
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
