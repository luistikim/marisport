export type SanityHomeDoc = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  heroStats?: Array<{ label?: string; value?: string }>;
  identityEyebrow?: string;
  identityTitle?: string;
  identityDescription?: string;
  conversionEyebrow?: string;
  conversionDescription?: string;
  benefitsEyebrow?: string;
  benefitsTitle?: string;
  benefitsDescription?: string;
  benefitsItems?: Array<{ title?: string; text?: string }>;
  catalogEyebrow?: string;
  catalogTitle?: string;
  catalogCtaLabel?: string;
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutDescription?: string;
  whyChooseTitle?: string;
  trustEyebrow?: string;
  trustTitle?: string;
  contactEyebrow?: string;
  contactTitle?: string;
  contactDescription?: string;
  contactWhatsappDescription?: string;
  contactEmailDescription?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaPrimaryCtaLabel?: string;
  ctaPrimaryCtaHref?: string;
  ctaSecondaryCtaLabel?: string;
  ctaSecondaryCtaHref?: string;
};

export type SanityContactDoc = {
  whatsappPhone?: string;
  whatsappMessage?: string;
  contactPhone?: string;
  contactEmail?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  atendimentoTitle?: string;
  atendimentoDescription?: string;
  atendimentoSchedule?: string;
  atendimentoCoverage?: string;
};

export type SanityAboutDoc = {
  coupleStory?: Array<{ title?: string; text?: string }>;
  brandPillars?: Array<{ title?: string; text?: string }>;
  brandStoryMoments?: Array<{ title?: string; text?: string; image?: unknown }>;
  brandChannels?: Array<{ title?: string; text?: string; href?: string; cta?: string }>;
  trustSignals?: string[];
  whyChooseMariSport?: Array<{ title?: string; text?: string }>;
};

export type SanityCategoryDoc = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  description?: string;
  order?: number;
};

export type SanityProductDoc = {
  _id: string;
  name?: string;
  slug?: { current?: string };
  badge?: string;
  shortDescription?: string;
  fullDescription?: string;
  unitPrice?: number | null;
  originalPrice?: number | null;
  imageSrc?: string | null;
  images?: Array<{
    alt?: string;
    imageUrl?: string | null;
    asset?: {
      url?: string | null;
    };
  }>;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  categorySlug?: string;
  categoryTitle?: string;
  sizes?: string[];
  colors?: string[];
  statusLabel?: string;
  featured?: boolean;
  order?: number;
};

export type SanitySiteSettingsDoc = {
  siteName?: string;
  siteDescription?: string;
  siteKeywords?: string[];
  siteUrl?: string;
};
