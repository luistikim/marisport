import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutStatusTracker } from "@/components/checkout-status-tracker";
import { SectionHero } from "@/components/section-hero";
import { siteDescription, siteName } from "@/data/site";

export const metadata: Metadata = {
  title: "Pagamento nao concluido",
  description: "O pagamento nao foi concluido e voce pode tentar novamente.",
  alternates: {
    canonical: "/checkout/falha",
  },
  openGraph: {
    title: `Pagamento nao concluido | ${siteName}`,
    description: siteDescription,
    images: ["/logo-marisport.png"],
  },
};

export default function CheckoutFalhaPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Checkout Pro"
        title="Pagamento nao concluido."
        description="O retorno do Mercado Pago informou que o pagamento nao foi aprovado ou foi interrompido."
      />
      <Suspense fallback={null}>
        <CheckoutStatusTracker fallbackStatus="rejected" />
      </Suspense>
    </main>
  );
}
