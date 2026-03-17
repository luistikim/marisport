import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutStatusTracker } from "@/components/checkout-status-tracker";
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
        title="Pagamento não concluído."
        description="O retorno do Mercado Pago informou que o pagamento não foi aprovado ou foi interrompido."
      />
      <Suspense fallback={null}>
        <CheckoutStatusTracker fallbackStatus="rejected" />
      </Suspense>
    </main>
  );
}
