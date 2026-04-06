import {
  brandChannels,
  brandPillars,
  brandStoryMoments,
  coupleStory,
  trustSignals,
  whyChooseMariSport,
} from "@/data/about";
import { catalogSections } from "@/data/categories";
import { contactData } from "@/data/contact";
import {
  buildProductInquiryMessage,
  buildWhatsAppLink,
  formatCurrency,
  getProductVariants,
  productGrid,
  type CatalogProduct,
} from "@/data/product";
import { siteDescription, siteKeywords, siteName, siteUrl } from "@/data/site";
import {
  homeAbout,
  homeBenefits,
  homeCatalog,
  homeContact,
  homeCta,
  homeFeaturedProducts,
  homeHero,
  homeIntro,
  homeTrust,
} from "@/data/home";
import { sanityClient, sanityClientNoCache } from "@/sanity/lib/client";
import {
  aboutQuery,
  categoriesQuery,
  contactQuery,
  homeQuery,
  productBySlugQuery,
  productsQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import type {
  SanityAboutDoc,
  SanityCategoryDoc,
  SanityContactDoc,
  SanityHomeDoc,
  SanityProductDoc,
  SanitySiteSettingsDoc,
} from "@/sanity/types";

// Local content gateway.
// Replace these getters with Sanity fetchers when the CMS integration is ready.
export function getSiteContent() {
  return {
    siteName,
    siteUrl,
    siteDescription,
    siteKeywords,
  };
}

const SIZE_TOKENS = new Set([
  "PP",
  "P",
  "M",
  "G",
  "GG",
  "XG",
  "U",
  "UNICO",
  "ÚNICO",
]);

function normalizeVariationText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function splitStructuredVariationValues(values?: string[]) {
  const items: string[] = [];

  for (const value of values ?? []) {
    const cleanedValue = value.trim();
    if (!cleanedValue) {
      continue;
    }

    const parts = cleanedValue
      .split(/,|\/|\se\s/i)
      .map((part) => part.trim())
      .filter(Boolean);

    if (parts.length > 1) {
      items.push(...parts);
      continue;
    }

    const normalizedParts = cleanedValue
      .split(/\s+/)
      .map((part) => part.trim())
      .filter(Boolean);

    if (
      normalizedParts.length > 1 &&
      normalizedParts.every((part) => SIZE_TOKENS.has(normalizeVariationText(part).toUpperCase()))
    ) {
      items.push(...normalizedParts);
      continue;
    }

    items.push(cleanedValue);
  }

  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
}

function mapSanityProduct(product: SanityProductDoc): CatalogProduct | null {
  if (!product.name || !product.slug) {
    return null;
  }

  const sanityVariants = (product.variants ?? []).map((v) => ({
    size: v.size,
    color: v.color,
    stock: v.stock,
    priceOverride:
      typeof v.priceOverride === "number" && v.priceOverride > 0
        ? v.priceOverride
        : undefined,
  }));

  const variants = getProductVariants({
    variants: sanityVariants,
    sizes: splitStructuredVariationValues(product.sizes),
    colors: splitStructuredVariationValues(product.colors),
  });
  const sizes = Array.from(
    new Set(
      variants
        .map((variant) => variant.size?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  );
  const colors = Array.from(
    new Set(
      variants
        .map((variant) => variant.color?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  );
  const galleryImages = (product.images ?? [])
    .map((image) => ({
      alt: image.alt?.trim() ?? product.name ?? "",
      imageUrl: image.imageUrl ?? image.asset?.url ?? null,
    }))
    .filter((image) => image.imageUrl);

  return {
    id: product.slug,
    name: product.name,
    badge: product.badge ?? "Produto",
    description: product.shortDescription ?? product.fullDescription ?? "",
    fullDescription: product.fullDescription ?? product.shortDescription ?? "",
    unitPrice: typeof product.unitPrice === "number" ? product.unitPrice : null,
    originalPrice:
      typeof product.originalPrice === "number" ? product.originalPrice : null,
    imageSrc: product.imageSrc ?? galleryImages[0]?.imageUrl ?? undefined,
    imageFit: product.imageFit ?? "contain",
    imagePosition: product.imagePosition ?? "center",
    galleryImages: galleryImages.length
      ? galleryImages.map((image) => ({
          src: image.imageUrl as string,
          alt: image.alt ?? product.name,
        }))
      : product.imageSrc
        ? [{ src: product.imageSrc, alt: product.name }]
        : undefined,
    category:
      product.categoryTitle === "Feminino" || product.categoryTitle === "Masculino"
        ? product.categoryTitle
        : undefined,
    variants,
    sizes,
    colors,
    availability: [
      ...(sizes.length ? [sizes.join(", ")] : []),
      ...(colors.length ? [colors.join(", ")] : []),
    ],
    statusLabel: product.statusLabel ?? undefined,
    featured: product.featured ?? false,
    isNew: product.isNew ?? false,
  };
}

function mapSanityCategories(categories: SanityCategoryDoc[]) {
  return categories
    .map((category) => {
      const slug = category.slug;

      if (!slug || !category.title) {
        return null;
      }

      return {
        id: slug === "masculino" ? "masculino" : "feminino",
        title: category.title,
        description: category.description ?? "",
        order: category.order ?? 0,
      };
    })
    .filter(Boolean) as Array<{
    id: "feminino" | "masculino";
    title: string;
    description: string;
    order: number;
  }>;
}

function mapSanityHome(home: SanityHomeDoc | null) {
  if (!home) {
    return null;
  }

  return {
    hero: {
      eyebrow: home.heroEyebrow ?? homeHero.eyebrow,
      title: home.heroTitle ?? homeHero.title,
      description: home.heroDescription ?? homeHero.description,
      identityEyebrow: home.identityEyebrow ?? homeHero.identityEyebrow,
      identityTitle: home.identityTitle ?? homeHero.identityTitle,
      identityDescription: home.identityDescription ?? homeHero.identityDescription,
      conversionEyebrow: home.conversionEyebrow ?? homeHero.conversionEyebrow,
      conversionDescription:
        home.conversionDescription ?? homeHero.conversionDescription,
      primaryCta: {
        label: home.heroPrimaryCtaLabel ?? homeHero.primaryCta.label,
        href: home.heroPrimaryCtaHref ?? homeHero.primaryCta.href,
      },
      secondaryCta: {
        label: home.heroSecondaryCtaLabel ?? homeHero.secondaryCta.label,
        href: home.heroSecondaryCtaHref ?? homeHero.secondaryCta.href,
        external: true,
      },
      stats:
        home.heroStats?.length
          ? home.heroStats
              .map((item) => ({
                label: item.label ?? "",
                value: item.value ?? "",
              }))
              .filter((item) => item.label && item.value)
          : homeHero.stats,
    },
    intro: homeIntro,
    benefits: {
      ...homeBenefits,
      eyebrow: home.benefitsEyebrow ?? homeBenefits.eyebrow,
      title: home.benefitsTitle ?? homeBenefits.title,
      description: home.benefitsDescription ?? homeBenefits.description,
      items:
        home.benefitsItems?.length
          ? home.benefitsItems
              .map((item) => ({
                title: item.title ?? "",
                text: item.text ?? "",
              }))
              .filter((item) => item.title && item.text)
          : homeBenefits.items,
    },
    catalog: {
      ...homeCatalog,
      eyebrow: home.catalogEyebrow ?? homeCatalog.eyebrow,
      title: home.catalogTitle ?? homeCatalog.title,
      ctaLabel: home.catalogCtaLabel ?? homeCatalog.ctaLabel,
    },
    featuredProducts: homeFeaturedProducts,
    about: {
      ...homeAbout,
      eyebrow: home.aboutEyebrow ?? homeAbout.eyebrow,
      title: home.aboutTitle ?? homeAbout.title,
      description: home.aboutDescription ?? homeAbout.description,
      whyChooseTitle: home.whyChooseTitle ?? homeAbout.whyChooseTitle,
    },
    trust: {
      ...homeTrust,
      eyebrow: home.trustEyebrow ?? homeTrust.eyebrow,
      title: home.trustTitle ?? homeTrust.title,
    },
    contact: {
      ...homeContact,
      eyebrow: home.contactEyebrow ?? homeContact.eyebrow,
      title: home.contactTitle ?? homeContact.title,
      description: home.contactDescription ?? homeContact.description,
      whatsappDescription:
        home.contactWhatsappDescription ?? homeContact.whatsappDescription,
      emailDescription: home.contactEmailDescription ?? homeContact.emailDescription,
    },
    cta: {
      ...homeCta,
      eyebrow: home.ctaEyebrow ?? homeCta.eyebrow,
      title: home.ctaTitle ?? homeCta.title,
      description: home.ctaDescription ?? homeCta.description,
      primaryCta: {
        label: home.ctaPrimaryCtaLabel ?? homeCta.primaryCta.label,
        href: home.ctaPrimaryCtaHref ?? homeCta.primaryCta.href,
      },
      secondaryCta: {
        label: home.ctaSecondaryCtaLabel ?? homeCta.secondaryCta.label,
        href: home.ctaSecondaryCtaHref ?? homeCta.secondaryCta.href,
        external: true,
      },
    },
  };
}

function mapSanityAbout(about: SanityAboutDoc | null) {
  if (!about) {
    return null;
  }

  return {
    coupleStory:
      about.coupleStory?.length
        ? about.coupleStory
            .map((item) => ({ title: item.title ?? "", text: item.text ?? "" }))
            .filter((item) => item.title && item.text)
        : coupleStory,
    brandPillars:
      about.brandPillars?.length
        ? about.brandPillars
            .map((item) => ({ title: item.title ?? "", text: item.text ?? "" }))
            .filter((item) => item.title && item.text)
        : brandPillars,
    brandStoryMoments:
      about.brandStoryMoments?.length
        ? about.brandStoryMoments
            .map((item) => ({ title: item.title ?? "", text: item.text ?? "" }))
            .filter((item) => item.title && item.text)
        : brandStoryMoments,
    brandChannels:
      about.brandChannels?.length
        ? about.brandChannels
            .map((item) => ({
              title: item.title ?? "",
              text: item.text ?? "",
              href: item.href ?? "",
              cta: item.cta ?? "Abrir",
            }))
            .filter((item) => item.title && item.text && item.href)
        : brandChannels,
    trustSignals: about.trustSignals?.length ? about.trustSignals : trustSignals,
    whyChooseMariSport:
      about.whyChooseMariSport?.length
        ? about.whyChooseMariSport
            .map((item) => ({ title: item.title ?? "", text: item.text ?? "" }))
            .filter((item) => item.title && item.text)
        : whyChooseMariSport,
  };
}

function buildCatalogSections(
  categories: Array<{
    id: "feminino" | "masculino";
    title: string;
    description: string;
    order: number;
  }>,
  products: CatalogProduct[],
) {
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  if (!sortedCategories.length) {
    return catalogSections;
  }

  return sortedCategories.map((category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    products: products.filter((product) => product.category === category.title),
  }));
}

async function fetchSanityDocument<T>(
  query: string,
  params: Record<string, unknown> = {},
  client = sanityClient,
) {
  if (!client) {
    return null;
  }

  try {
    return (await client.fetch<T>(query, params, { next: { revalidate: 60 } })) ?? null;
  } catch {
    return null;
  }
}

async function fetchSanityDocumentNoCache<T>(
  query: string,
  params: Record<string, unknown> = {},
) {
  if (!sanityClientNoCache) {
    return null;
  }

  try {
    return (await sanityClientNoCache.fetch<T>(query, params, { next: { revalidate: 0 } })) ?? null;
  } catch {
    return null;
  }
}

export async function getHomeContent() {
  const home = await fetchSanityDocument<SanityHomeDoc>(homeQuery);
  const mapped = mapSanityHome(home);

  return mapped ?? {
    hero: homeHero,
    intro: homeIntro,
    benefits: homeBenefits,
    catalog: homeCatalog,
    featuredProducts: homeFeaturedProducts,
    about: homeAbout,
    trust: homeTrust,
    contact: homeContact,
    cta: homeCta,
  };
}

export async function getCatalogContent() {
  const [categories, products] = await Promise.all([
    fetchSanityDocument<SanityCategoryDoc[]>(categoriesQuery),
    fetchSanityDocument<SanityProductDoc[]>(productsQuery),
  ]);

  const mappedProducts = (products ?? [])
    .map(mapSanityProduct)
    .filter(Boolean) as CatalogProduct[];

  if (!categories?.length || !mappedProducts.length) {
    return {
      sections: catalogSections,
    };
  }

  return {
    sections: buildCatalogSections(mapSanityCategories(categories), mappedProducts),
  };
}

export async function getAboutContent() {
  const about = await fetchSanityDocument<SanityAboutDoc>(aboutQuery);
  const mapped = mapSanityAbout(about);

  return (
    mapped ?? {
      coupleStory,
      brandPillars,
      brandStoryMoments,
      brandChannels,
      trustSignals,
      whyChooseMariSport,
    }
  );
}

export async function getContactContent() {
  const contact = await fetchSanityDocument<SanityContactDoc>(contactQuery);

  if (!contact) {
    return contactData;
  }

  return {
    whatsappPhone: contact.whatsappPhone ?? contactData.whatsappPhone,
    whatsappMessage: contact.whatsappMessage ?? contactData.whatsappMessage,
    contactPhone: contact.contactPhone ?? contactData.contactPhone,
    contactEmail: contact.contactEmail ?? contactData.contactEmail,
    instagramHandle: contact.instagramHandle ?? contactData.instagramHandle,
    instagramUrl: contact.instagramUrl ?? contactData.instagramUrl,
  };
}

export async function getCatalogProducts() {
  const products = await fetchSanityDocument<SanityProductDoc[]>(productsQuery);
  const mappedProducts = (products ?? [])
    .map(mapSanityProduct)
    .filter(Boolean) as CatalogProduct[];

  return mappedProducts.length ? mappedProducts : productGrid;
}

export async function getCatalogProductsNoCache() {
  const products = await fetchSanityDocumentNoCache<SanityProductDoc[]>(productsQuery);
  const mappedProducts = (products ?? [])
    .map(mapSanityProduct)
    .filter(Boolean) as CatalogProduct[];

  return mappedProducts.length ? mappedProducts : productGrid;
}

export async function getFeaturedProducts() {
  const products = await getCatalogProducts();
  const featured = products.filter((product) => product.featured);

  return (featured.length ? featured : products).slice(0, 3);
}

export async function getCatalogProductById(productId: string) {
  const product = await fetchSanityDocument<SanityProductDoc>(productBySlugQuery, {
    slug: productId,
  });
  const mappedProduct = product ? mapSanityProduct(product) : null;

  return mappedProduct;
}

export async function getCatalogProductByIdNoCache(productId: string) {
  const product = await fetchSanityDocumentNoCache<SanityProductDoc>(productBySlugQuery, {
    slug: productId,
  });
  const mappedProduct = product ? mapSanityProduct(product) : null;

  return mappedProduct;
}

export async function getSiteSettings() {
  const settings = await fetchSanityDocument<SanitySiteSettingsDoc>(
    siteSettingsQuery,
  );

  if (!settings) {
    return {
      siteName,
      siteUrl,
      siteDescription,
      siteKeywords,
    };
  }

  return {
    siteName: settings.siteName ?? siteName,
    siteUrl: settings.siteUrl ?? siteUrl,
    siteDescription: settings.siteDescription ?? siteDescription,
    siteKeywords: settings.siteKeywords?.length ? settings.siteKeywords : siteKeywords,
  };
}

export {
  buildProductInquiryMessage,
  buildWhatsAppLink,
  formatCurrency,
};
