import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutStatusTracker } from "@/components/checkout-status-tracker";
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
        description="O Mercado Pago ainda está processando ou aguardando a confirmação do pagamento."
      />
      <Suspense fallback={null}>
        <CheckoutStatusTracker fallbackStatus="pending" />
      </Suspense>
    </main>
  );
}
