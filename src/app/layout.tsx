import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import SiteShell from "@/components/site-shell";
import { getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { siteDescription, siteKeywords, siteName, siteUrl } =
    await getSiteSettings();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} | Moda Fitness Masculina e Feminina para Academia e Corrida`,
      template: "%s | Mari Sport",
    },
    description: siteDescription,
    keywords: siteKeywords,
    alternates: {
      canonical: "/",
    },
    applicationName: siteName,
    category: "fashion",
    creator: siteName,
    publisher: siteName,
    authors: [{ name: siteName }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${siteName} | Moda Fitness Masculina e Feminina para Academia e Corrida`,
      description: siteDescription,
      siteName,
      locale: "pt_BR",
      type: "website",
      url: siteUrl,
      images: [
        {
          url: "/logo-marisport.png",
          width: 1200,
          height: 630,
          alt: "Mari Sport",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | Moda Fitness Masculina e Feminina para Academia e Corrida`,
      description: siteDescription,
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider>
      </body>
    </html>
  );
}
