import {
  brandChannels,
  brandPillars,
  brandStoryMoments,
  coupleStory,
  trustSignals,
  whyChooseMariSport,
} from "@/data/about";
import { categoryData, catalogSections } from "@/data/categories";
import { contactData } from "@/data/contact";
import {
  buildProductInquiryMessage,
  buildWhatsAppLink,
  catalogById,
  formatCurrency,
  productGrid,
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

export function getHomeContent() {
  return {
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

export function getCatalogContent() {
  return {
    sections: catalogSections,
  };
}

export function getAboutContent() {
  return {
    coupleStory,
    brandPillars,
    brandStoryMoments,
    brandChannels,
    trustSignals,
    whyChooseMariSport,
  };
}

export function getCategoryContent() {
  return categoryData;
}

export function getContactContent() {
  return contactData;
}

export function getCatalogProducts() {
  return productGrid;
}

export function getCatalogProductById(productId: string) {
  return catalogById[productId] ?? null;
}

export {
  buildProductInquiryMessage,
  buildWhatsAppLink,
  formatCurrency,
};
