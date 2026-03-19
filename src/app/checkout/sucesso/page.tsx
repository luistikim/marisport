import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutStatusTracker } from "@/components/checkout-status-tracker";
import { SectionHero } from "@/components/section-hero";
import { siteDescription, siteName } from "@/data/site";

export const metadata: Metadata = {
  title: "Pagamento aprovado",
  description: "Seu pagamento foi aprovado e a Mari Sport recebeu seu pedido.",
  alternates: {
    canonical: "/checkout/sucesso",
  },
  openGraph: {
    title: `Pagamento aprovado | ${siteName}`,
    description: siteDescription,
    images: ["/logo-marisport.png"],
  },
};

export default function CheckoutSucessoPage() {
  return (
    <main>
      <SectionHero
        eyebrow="Checkout Pro"
        title="Pagamento aprovado."
        description="Seu pedido voltou do Mercado Pago e agora estamos consultando a confirmacao real do pagamento."
      />
      <Suspense fallback={null}>
        <CheckoutStatusTracker fallbackStatus="approved" />
      </Suspense>
    </main>
  );
}
