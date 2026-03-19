import { brandBenefits, brandChannels, brandPillars, brandStoryMoments, coupleStory, trustSignals } from "@/data/about";
import { categoryData, catalogSections } from "@/data/categories";
import { contactData } from "@/data/contact";
import {
  buildProductInquiryMessage,
  buildProductInquiryLink,
  buildWhatsAppLink,
  catalogById,
  formatCurrency,
  productGrid,
  type CatalogProduct,
} from "@/data/product";

export type { CatalogProduct };

export const siteName = "Mari Sport";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://marisport.vercel.app";

export const siteDescription =
  "Moda fitness masculina e feminina com estilo, conforto e performance para academia, corrida e rotina ativa.";

export const siteKeywords = [
  "Mari Sport",
  "moda fitness",
  "roupa esportiva feminina",
  "roupa esportiva masculina",
  "looks para academia",
  "roupas para corrida",
  "conjunto fitness",
  "legging fitness",
  "top esportivo",
  "bermuda masculina esportiva",
];

export const whatsappPhone = contactData.whatsappPhone;
export const whatsappLink = buildWhatsAppLink(
  contactData.whatsappPhone,
  contactData.whatsappMessage,
);

export const contactPhone = contactData.contactPhone;
export const contactEmail = contactData.contactEmail;
export const instagramLink = contactData.instagramUrl;
export const instagramHandle = contactData.instagramHandle;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/produtos", label: "Produtos" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/contato", label: "Contato" },
  { href: "/carrinho", label: "Carrinho" },
];

export const footerColumns = [
  {
    title: "Navegacao",
    links: navLinks,
  },
  {
    title: "Categorias",
    links: [
      { href: "/produtos#feminino", label: "Feminino" },
      { href: "/produtos#masculino", label: "Masculino" },
      { href: "/produtos", label: "Catalogo completo" },
    ],
  },
] as const;

export {
  brandBenefits,
  brandChannels,
  brandPillars,
  brandStoryMoments,
  buildProductInquiryMessage,
  buildProductInquiryLink,
  buildWhatsAppLink,
  catalogById,
  catalogSections,
  categoryData,
  coupleStory,
  formatCurrency,
  productGrid,
  trustSignals,
};
