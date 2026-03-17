import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutStatusTracker } from "@/components/checkout-status-tracker";
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
        description="Seu pedido voltou do Mercado Pago e agora estamos consultando a confirmação real do pagamento."
      />
      <Suspense fallback={null}>
        <CheckoutStatusTracker fallbackStatus="approved" />
      </Suspense>
    </main>
  );
}
