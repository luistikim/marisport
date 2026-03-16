import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart-page-content";
import { SectionHero } from "@/components/section-hero";

export const metadata: Metadata = {
  title: "Carrinho",
  description:
    "Revise os produtos escolhidos na Mari Sport e envie seu pedido sem precisar criar conta.",
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
