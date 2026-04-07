import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CartLink } from "@/components/cart-link";
import { PromoPopup } from "@/components/promo-popup";
import { footerColumns, navLinks, trustSignals } from "@/data/site";
import { buildWhatsAppLink } from "@/data/product";
import { getContactContent, getSiteSettings } from "@/lib/content";

type SiteShellProps = {
  children: ReactNode;
};

export default async function SiteShell({ children }: SiteShellProps) {
  const [contact, site] = await Promise.all([
    getContactContent(),
    getSiteSettings(),
  ]);
  const whatsappLink = buildWhatsAppLink(
    contact.whatsappPhone,
    contact.whatsappMessage,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoPopup whatsappPhone={contact.whatsappPhone} />

      {/* ─── HEADER ─────────────────────────────────────────────────────────────
          Mobile : logo | [whatsapp ícone] [cart] — altura fixa h-14
                   pills de navegação abaixo (scroll horizontal)
          Desktop: logo | nav links | [WhatsApp botão] [cart]
      ───────────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/92 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">

          {/* Linha principal */}
          <div className="flex h-14 items-center justify-between gap-3 sm:h-16">

            {/* Logo — sem container extra no header (bg já é branco) */}
            <Link
              href="/"
              aria-label="Página inicial da Mari Sport"
              className="shrink-0"
            >
              <Image
                src="/logo-marisport.png"
                alt="Mari Sport"
                width={180}
                height={56}
                className="h-auto w-[100px] object-contain sm:w-[128px]"
                priority
              />
            </Link>

            {/* Navegação desktop */}
            <nav
              className="hidden items-center gap-6 lg:flex"
              aria-label="Navegação principal"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-slate-600 hover:text-surface-strong"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Ações: WhatsApp sempre visível + Carrinho */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Mobile: ícone verde. sm+: pill com texto */}
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Falar no WhatsApp"
                className="flex items-center gap-2 rounded-full bg-[#dff1cf] px-3 py-2 text-[#27402c] hover:bg-[#cee4b6] sm:px-4"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                <span className="hidden text-xs font-bold uppercase tracking-[0.14em] sm:inline">
                  WhatsApp
                </span>
              </Link>
              <CartLink />
            </div>
          </div>

          {/* Pills de navegação rápida — apenas mobile/tablet */}
          <nav
            className="flex gap-2 overflow-x-auto pb-2 lg:hidden"
            aria-label="Navegação rápida"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

        </div>
      </header>

      {children}

      {/* ─── FOOTER ─────────────────────────────────────────────────────────────
          Mobile (<640px) : colunas empilhadas verticalmente
          sm (640-1023px) : marca full-width · nav | contato lado a lado
          lg (1024px+)    : 3 colunas [1.5fr 1fr 1fr]
      ───────────────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-line bg-[#111b1d] text-white">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14 lg:px-12">

          {/* Grid principal */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">

            {/* Coluna 1 — Marca + Instagram */}
            <div className="sm:col-span-2 lg:col-span-1">
              {/* Logo com fundo branco (background do footer é escuro) */}
              <div className="brand-outline inline-flex rounded-[1.35rem] bg-white px-3 py-2">
                <Image
                  src="/logo-marisport.png"
                  alt="Mari Sport"
                  width={180}
                  height={56}
                  className="h-auto w-[118px] object-contain"
                />
              </div>

              <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
                {site.siteDescription}
              </p>

              {/* Instagram como link social — compacto, sem botão grande */}
              <Link
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
              >
                <InstagramIcon className="h-4 w-4 shrink-0" />
                <span>{contact.instagramHandle}</span>
              </Link>
            </div>

            {/* Coluna 2 — Páginas + Categorias (2 seções numa coluna) */}
            <div className="flex flex-col gap-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                  Páginas
                </p>
                <nav className="mt-3.5 flex flex-col gap-2.5">
                  {navLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm text-slate-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                  Categorias
                </p>
                <nav className="mt-3.5 flex flex-col gap-2.5">
                  {footerColumns[1].links.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm text-slate-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Coluna 3 — Contato + CTA WhatsApp */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                Contato
              </p>
              <div className="mt-3.5 flex flex-col gap-2">
                <a
                  href={`mailto:${contact.contactEmail}`}
                  className="text-sm text-slate-300 hover:text-white"
                >
                  {contact.contactEmail}
                </a>
                <a
                  href={`tel:${contact.contactPhone}`}
                  className="text-sm text-slate-300 hover:text-white"
                >
                  {contact.contactPhone}
                </a>
                <p className="text-xs text-slate-500">
                  Atendimento online · Todo o Brasil
                </p>
              </div>

              {/* CTA principal do footer */}
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-surface-strong hover:brightness-110"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                Falar no WhatsApp
              </Link>
            </div>
          </div>

          {/* Barra inferior — trust signals + copyright */}
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {trustSignals.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-400"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Mari Sport
            </p>
          </div>

        </div>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <Link
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Mari Sport no WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_16px_40px_rgba(37,211,102,0.4)] hover:scale-105"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </Link>
    </div>
  );
}

// ─── Ícones inline ─────────────────────────────────────────────────────────────
// Recebem className para ser usados em tamanhos e contextos variados.

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.6" cy="6.4" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.52 0 .2 5.31.2 11.86c0 2.09.54 4.13 1.57 5.93L0 24l6.38-1.67a11.8 11.8 0 0 0 5.67 1.45h.01c6.54 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.15-3.41-8.43Zm-8.46 18.3h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.79 1 1.01-3.69-.24-.38a9.82 9.82 0 0 1-1.51-5.27c0-5.44 4.43-9.87 9.88-9.87 2.63 0 5.11 1.03 6.96 2.89a9.8 9.8 0 0 1 2.89 6.98c0 5.44-4.43 9.87-9.87 9.87Zm5.41-7.39c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.43-1.5-.9-.8-1.51-1.78-1.69-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.08-.8.37-.28.3-1.05 1.03-1.05 2.5s1.08 2.89 1.23 3.09c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}
