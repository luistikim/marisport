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
  const [contact, site] = await Promise.all([getContactContent(), getSiteSettings()]);
  const whatsappLink = buildWhatsAppLink(contact.whatsappPhone, contact.whatsappMessage);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoPopup whatsappPhone={contact.whatsappPhone} />

      <header className="sticky top-0 z-40 border-b border-line bg-white/88 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="brand-outline rounded-[1.3rem] bg-surface px-3 py-2">
                <Image
                  src="/logo-marisport.png"
                  alt="Logo Mari Sport"
                  width={180}
                  height={56}
                  className="h-auto w-[122px] object-contain sm:w-[150px]"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden items-center gap-5 lg:flex" aria-label="Navegacao principal">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-slate-700 hover:text-surface-strong"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <CartLink />
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-full bg-[#dff1cf] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#27402c] hover:bg-[#cee4b6] sm:inline-flex"
              >
                WhatsApp
              </Link>
              <Link
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir Instagram da Mari Sport"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-surface-strong hover:-translate-y-0.5 hover:text-accent"
              >
                <InstagramIcon />
              </Link>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Links rapidos">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-line bg-[#111b1d] px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="brand-outline inline-flex rounded-[1.35rem] bg-white px-3 py-2">
              <Image
                src="/logo-marisport.png"
                alt="Logo Mari Sport"
                width={180}
                height={56}
                className="h-auto w-[132px] object-contain"
              />
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              {site.siteName} entrega moda fitness masculina e feminina com visual
              moderno, conforto e atendimento direto para quem quer comprar com
              mais seguranca.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">
              {site.siteDescription}
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-white">
                {column.title}
              </p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
                {column.links.map((item) => (
                  <Link key={item.href} href={item.href} className="hover:text-accent-soft">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Contato
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>{contact.contactEmail}</p>
              <p>{contact.contactPhone}</p>
              <p>Atendimento online para todo o Brasil</p>
              <Link
                href={`mailto:${contact.contactEmail}`}
                className="inline-flex text-accent-soft hover:text-white"
              >
                Enviar e-mail
              </Link>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-accent px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong"
                >
                  WhatsApp
                </Link>
                <Link
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/30 bg-white/86 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong hover:bg-white"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {trustSignals.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="uppercase tracking-[0.18em]">
            {`Copyright ${new Date().getFullYear()} Mari Sport. Todos os direitos reservados.`}
          </p>
        </div>
      </footer>

      <Link
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Mari Sport no WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-xl font-black text-white shadow-[0_16px_40px_rgba(37,211,102,0.4)] hover:scale-105"
      >
        <WhatsAppIcon />
      </Link>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
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

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.52 0 .2 5.31.2 11.86c0 2.09.54 4.13 1.57 5.93L0 24l6.38-1.67a11.8 11.8 0 0 0 5.67 1.45h.01c6.54 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.15-3.41-8.43Zm-8.46 18.3h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.79 1 1.01-3.69-.24-.38a9.82 9.82 0 0 1-1.51-5.27c0-5.44 4.43-9.87 9.88-9.87 2.63 0 5.11 1.03 6.96 2.89a9.8 9.8 0 0 1 2.89 6.98c0 5.44-4.43 9.87-9.87 9.87Zm5.41-7.39c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.43-1.5-.9-.8-1.51-1.78-1.69-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.08-.8.37-.28.3-1.05 1.03-1.05 2.5s1.08 2.89 1.23 3.09c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}
