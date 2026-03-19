import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutStatusTracker } from "@/components/checkout-status-tracker";
import { SectionHero } from "@/components/section-hero";
import { siteDescription, siteName } from "@/data/site";

export const metadata: Metadata = {
  title: "Pagamento pendente",
  description: "Seu pagamento esta em analise ou aguardando confirmacao.",
  alternates: {
    canonical: "/checkout/pendente",
  },
  openGraph: {
    title: `Pagamento pendente | ${siteName}`,
    description: siteDescription,
    images: ["/logo-marisport.png"],
  },
};

export default function CheckoutPendentePage() {
  return (
    <main>
      <SectionHero
        eyebrow="Checkout Pro"
        title="Pagamento pendente."
        description="O Mercado Pago ainda esta processando ou aguardando a confirmacao do pagamento."
      />
      <Suspense fallback={null}>
        <CheckoutStatusTracker fallbackStatus="pending" />
      </Suspense>
    </main>
  );
}
