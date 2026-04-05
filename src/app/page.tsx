import { getFeaturedProducts, getHomeContent } from "@/lib/content";
import { BenefitsSection } from "@/components/home/benefits-section";
import { CategorySection } from "@/components/home/category-section";
import { HomeHero } from "@/components/home/home-hero";
import { ProductGridSection } from "@/components/home/product-grid-section";

export default async function Home() {
  const [home, featuredProducts] = await Promise.all([
    getHomeContent(),
    getFeaturedProducts(),
  ]);

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

      <ProductGridSection products={featuredProducts} />
    </main>
  );
}
