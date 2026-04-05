import { buildWhatsAppLink } from "@/data/product";
import {
  getAboutContent,
  getContactContent,
  getFeaturedProducts,
  getHomeContent,
} from "@/lib/content";
import { AboutBrandSection } from "@/components/home/about-brand-section";
import { BenefitsSection } from "@/components/home/benefits-section";
import { CategorySection } from "@/components/home/category-section";
import { ContactSection } from "@/components/home/contact-section";
import { CtaSection } from "@/components/home/cta-section";
import { HomeHero } from "@/components/home/home-hero";
import { ProductGridSection } from "@/components/home/product-grid-section";
import { TrustSection } from "@/components/home/trust-section";

export default async function Home() {
  const [home, about, contact, featuredProducts] = await Promise.all([
    getHomeContent(),
    getAboutContent(),
    getContactContent(),
    getFeaturedProducts(),
  ]);

  const whatsappLink = buildWhatsAppLink(
    contact.whatsappPhone,
    contact.whatsappMessage,
  );

  return (
    <main className="space-y-8 pb-10">
      <HomeHero
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        description={home.hero.description}
        identityEyebrow={home.hero.identityEyebrow}
        identityTitle={home.hero.identityTitle}
        identityDescription={home.hero.identityDescription}
        primaryAction={home.hero.primaryCta}
        secondaryAction={home.hero.secondaryCta}
        stats={home.hero.stats}
      />

      <BenefitsSection items={home.benefits.items} />

      <CategorySection
        eyebrow={home.catalog.eyebrow}
        title={home.catalog.title}
        ctaLabel={home.catalog.ctaLabel}
        sections={home.catalog.sections}
      />

      <ProductGridSection
        products={featuredProducts}
      />

      {false && (
        <>
          <AboutBrandSection
            eyebrow={home.about.eyebrow}
            title={home.about.title}
            description={home.about.description}
            items={home.about.items}
            whyChooseItems={about.whyChooseMariSport}
            whyChooseTitle={home.about.whyChooseTitle}
          />

          <TrustSection
            eyebrow={home.trust.eyebrow}
            title={home.trust.title}
            items={home.trust.items}
          />

          <ContactSection
            eyebrow="Contato"
            title="Atendimento direto para responder rápido."
            description="Se você quiser falar com a Mari Sport agora, os canais abaixo já apontam para WhatsApp e e-mail oficiais."
            emailDescription={home.contact.emailDescription}
            whatsappDescription={home.contact.whatsappDescription}
            email={home.contact.email}
            whatsappLink={whatsappLink}
            emailLink={`mailto:${contact.contactEmail}?subject=Contato%20Mari%20Sport`}
          />

          <CtaSection
            eyebrow={home.cta.eyebrow}
            title={home.cta.title}
            description={home.cta.description}
            primaryCta={home.cta.primaryCta}
            secondaryCta={home.cta.secondaryCta}
          />
        </>
      )}
    </main>
  );
}
