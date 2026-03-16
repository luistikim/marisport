import type { Metadata } from "next";
import { CheckoutStatus } from "@/components/checkout-status";
import { SectionHero } from "@/components/section-hero";

export const metadata: Metadata = {
  title: "Pagamento aprovado",
  description: "Seu pagamento foi aprovado e a Mari Sport recebeu seu pedido.",
};

export default function CheckoutSucessoPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Checkout Pro"
        title="Pagamento aprovado."
        description="Seu pedido voltou do Mercado Pago com confirmacao de pagamento."
      />
      <CheckoutStatus
        eyebrow="Sucesso"
        title="Pedido recebido com pagamento confirmado."
        description="Agora a Mari Sport pode seguir com a separacao do pedido. Se quiser alinhar tamanho, cor ou entrega, voce ainda pode continuar o atendimento pelo WhatsApp ou pela pagina de contato."
      />
    </main>
  );
}
