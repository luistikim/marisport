import type { Metadata } from "next";
import { CheckoutStatus } from "@/components/checkout-status";
import { SectionHero } from "@/components/section-hero";

export const metadata: Metadata = {
  title: "Pagamento nao concluido",
  description: "O pagamento nao foi concluido e voce pode tentar novamente.",
};

export default function CheckoutFalhaPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Checkout Pro"
        title="Pagamento nao concluido."
        description="O retorno do Mercado Pago informou que o pagamento nao foi aprovado ou foi interrompido."
      />
      <CheckoutStatus
        eyebrow="Falha"
        title="Voce pode revisar o carrinho e tentar novamente."
        description="Nada se perde: seu carrinho continua salvo neste navegador. Se preferir, a Mari Sport tambem pode seguir com o atendimento pelo WhatsApp ou por e-mail."
      />
    </main>
  );
}
