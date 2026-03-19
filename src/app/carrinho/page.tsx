import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart-page-content";
import { SectionHero } from "@/components/section-hero";
import { siteDescription, siteName } from "@/data/site";

export const metadata: Metadata = {
  title: "Carrinho",
  description:
    "Revise os produtos escolhidos na Mari Sport e envie seu pedido sem criar conta.",
  alternates: {
    canonical: "/carrinho",
  },
  openGraph: {
    title: `Carrinho | ${siteName}`,
    description: siteDescription,
    images: ["/logo-marisport.png"],
  },
};

export default function CarrinhoPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Carrinho"
        title="Seu pedido fica salvo aqui, sem cadastro."
        description="Adicione produtos, ajuste quantidades e envie o resumo direto para a Mari Sport pelo WhatsApp ou por e-mail."
      />
      <CartPageContent />
    </main>
  );
}
