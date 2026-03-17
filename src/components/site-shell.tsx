import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CartLink } from "@/components/cart-link";
import {
  contactEmail,
  contactPhone,
  instagramLink,
  navLinks,
  whatsappLink,
} from "@/data/site";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-line bg-white/88 backdrop-blur-xl md:border-white/10 md:bg-[#2d3f43]/82">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="brand-outline rounded-[1.35rem] bg-white px-3 py-2 md:bg-white/6">
              <Image
                src="/logo-marisport.png"
                alt="Logo Mari Sport"
                width={170}
                height={50}
                className="h-auto w-[122px] object-contain sm:w-[150px]"
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-200 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CartLink />
            <Link
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir Instagram da Mari Sport"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-surface-strong transition-transform hover:-translate-y-0.5 hover:text-accent md:border-white/10 md:bg-white/8 md:text-white"
            >
              <InstagramIcon />
            </Link>
            <Link
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir WhatsApp da Mari Sport"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-surface-strong transition-transform hover:-translate-y-0.5 hover:text-accent md:border-white/10 md:bg-white/8 md:text-white"
            >
              <WhatsAppIcon />
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-line bg-[#f3f8f8] px-5 py-10 text-surface-strong sm:px-8 lg:bg-[#263537] lg:text-white lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <div className="brand-outline inline-flex rounded-[1.35rem] bg-white px-3 py-2 lg:bg-white/6">
              <Image
                src="/logo-marisport.png"
                alt="Logo Mari Sport"
                width={170}
                height={50}
                className="h-auto w-[132px] object-contain"
              />
            </div>
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-600 lg:text-slate-300">
              Roupas esportivas para academia e corrida com visual marcante,
              conforto e energia para a rotina de quem vive em movimento.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-surface-strong lg:text-white">
              Navegacao
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 lg:text-slate-300">
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-surface-strong lg:text-white">
              Contato
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-600 lg:text-slate-300">
              <p>{contactEmail}</p>
              <p>{contactPhone}</p>
              <p>Atendimento online para todo o Brasil</p>
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir Instagram da Mari Sport"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-surface-strong transition-colors hover:text-accent lg:border-white/10 lg:bg-white/8 lg:text-white"
                >
                  <InstagramIcon />
                </Link>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir WhatsApp da Mari Sport"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-surface-strong transition-colors hover:text-accent lg:border-white/10 lg:bg-white/8 lg:text-white"
                >
                  <WhatsAppIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl">
          <p className="text-right text-[10px] uppercase tracking-[0.18em] text-slate-400 lg:text-white/20">
            Feito por Luis Paulo Silva
          </p>
        </div>
      </footer>

      <Link
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Mari Sport no WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-xl font-black text-white shadow-[0_16px_40px_rgba(37,211,102,0.4)] transition-transform hover:scale-105"
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
