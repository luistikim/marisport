import { getHomeContent } from "@/lib/content";
import { BenefitsSection } from "@/components/home/benefits-section";
import { HomeHero } from "@/components/home/home-hero";

export default async function Home() {
  const home = await getHomeContent();

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
    </main>
  );
}
