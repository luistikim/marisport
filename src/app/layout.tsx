import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { SiteShell } from "@/components/site-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mari Sport | Moda Fitness e Looks Esportivos",
    template: "%s | Mari Sport",
  },
  description:
    "Mari Sport vende roupas esportivas femininas e masculinas para academia, corrida e rotina ativa, com conforto, estilo e performance.",
  keywords: [
    "Mari Sport",
    "moda fitness",
    "roupa esportiva feminina",
    "roupa esportiva masculina",
    "looks para academia",
    "roupas para corrida",
    "conjunto fitness",
    "legging fitness",
    "top esportivo",
    "bermuda masculina esportiva",
  ],
  applicationName: "Mari Sport",
  category: "fashion",
  creator: "Mari Sport",
  publisher: "Mari Sport",
  authors: [{ name: "Mari Sport" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Mari Sport | Moda Fitness e Looks Esportivos",
    description:
      "Roupas esportivas para academia e corrida, com looks femininos e masculinos, identidade forte e foco em performance.",
    siteName: "Mari Sport",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo-marisport.png",
        width: 1200,
        height: 630,
        alt: "Logo da Mari Sport",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mari Sport | Moda Fitness e Looks Esportivos",
    description:
      "Looks esportivos femininos e masculinos para academia, corrida e rotina ativa.",
    images: ["/logo-marisport.png"],
  },
  icons: {
    icon: [
      { url: "/logo-marisport.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/logo-marisport.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider>
      </body>
    </html>
  );
}
