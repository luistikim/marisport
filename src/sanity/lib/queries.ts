export const homeQuery = `*[_type == "home"][0]{
  "heroEyebrow": heroEyebrow,
  "heroTitle": heroTitle,
  "heroDescription": heroDescription,
  "heroPrimaryCtaLabel": heroPrimaryCtaLabel,
  "heroPrimaryCtaHref": heroPrimaryCtaHref,
  "heroSecondaryCtaLabel": heroSecondaryCtaLabel,
  "heroSecondaryCtaHref": heroSecondaryCtaHref,
  "heroStats": heroStats[]{label, value},
  "identityEyebrow": identityEyebrow,
  "identityTitle": identityTitle,
  "identityDescription": identityDescription,
  "conversionEyebrow": conversionEyebrow,
  "conversionDescription": conversionDescription,
  "benefitsEyebrow": benefitsEyebrow,
  "benefitsTitle": benefitsTitle,
  "benefitsDescription": benefitsDescription,
  "benefitsItems": benefitsItems[]{title, text},
  "catalogEyebrow": catalogEyebrow,
  "catalogTitle": catalogTitle,
  "catalogCtaLabel": catalogCtaLabel,
  "aboutEyebrow": aboutEyebrow,
  "aboutTitle": aboutTitle,
  "aboutDescription": aboutDescription,
  "whyChooseTitle": whyChooseTitle,
  "trustEyebrow": trustEyebrow,
  "trustTitle": trustTitle,
  "contactEyebrow": contactEyebrow,
  "contactTitle": contactTitle,
  "contactDescription": contactDescription,
  "contactWhatsappDescription": contactWhatsappDescription,
  "contactEmailDescription": contactEmailDescription,
  "ctaEyebrow": ctaEyebrow,
  "ctaTitle": ctaTitle,
  "ctaDescription": ctaDescription,
  "ctaPrimaryCtaLabel": ctaPrimaryCtaLabel,
  "ctaPrimaryCtaHref": ctaPrimaryCtaHref,
  "ctaSecondaryCtaLabel": ctaSecondaryCtaLabel,
  "ctaSecondaryCtaHref": ctaSecondaryCtaHref
}`;

export const contactQuery = `*[_type == "contact"][0]{
  whatsappPhone,
  whatsappMessage,
  contactPhone,
  contactEmail,
  instagramHandle,
  instagramUrl
}`;

export const aboutQuery = `*[_type == "sobreMarca"][0]{
  "coupleStory": coupleStory[]{title, text},
  "brandPillars": brandPillars[]{title, text},
  "brandStoryMoments": brandStoryMoments[]{title, text},
  "brandChannels": brandChannels[]{title, text, href, cta},
  "trustSignals": trustSignals,
  "whyChooseMariSport": whyChooseMariSport[]{title, text}
}`;

export const categoriesQuery = `*[_type == "categoria"] | order(order asc){
  title,
  "slug": slug.current,
  description,
  order
}`;

const productProjection = `{
  name,
  "slug": slug.current,
  badge,
  shortDescription,
  fullDescription,
  unitPrice,
  originalPrice,
  "imageSrc": image.asset->url,
  images[]{
    alt,
    "imageUrl": asset->url
  },
  imageFit,
  imagePosition,
  "categoryTitle": category->title,
  variants[]{
    size,
    color,
    stock
  },
  sizes,
  colors,
  statusLabel,
  featured
}`;

export const productsQuery = `*[_type == "produto"] | order(order asc) ${productProjection}`;

export const productBySlugQuery = `*[_type == "produto" && slug.current == $slug][0] ${productProjection}`;

export const siteSettingsQuery = `*[_type == "configuracaoSite"][0]{
  siteName,
  siteDescription,
  siteKeywords,
  siteUrl
}`;
