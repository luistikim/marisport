import type { Metadata } from "next";
import { CheckoutStatus } from "@/components/checkout-status";
import { SectionHero } from "@/components/section-hero";

export const metadata: Metadata = {
  title: "Pagamento pendente",
  description: "Seu pagamento esta em analise ou aguardando confirmacao.",
};

export default function CheckoutPendentePage() {
  return (
    <main>
      <SectionHero
        eyebrow="Checkout Pro"
        title="Pagamento pendente."
        description="O Mercado Pago ainda esta processando ou aguardando a confirmacao do pagamento."
      />
      <CheckoutStatus
        eyebrow="Pendente"
        title="Seu pedido foi recebido, mas o pagamento ainda nao foi concluido."
        description="Isso pode acontecer em Pix aguardando pagamento, boleto ou analise do meio de pagamento. Se precisar, voce pode voltar ao carrinho ou falar com a Mari Sport para confirmar os proximos passos."
      />
    </main>
  );
}
