import { brandBenefits, coupleStory, trustSignals } from "./about.ts";
import { catalogSections } from "./categories.ts";
import { contactData } from "./contact.ts";
import { productGrid } from "./product.ts";

export const homeHero = {
  eyebrow: "Mari Sport",
  title:
    "Moda fitness para homens e mulheres que buscam estilo e performance.",
  description:
    "Looks esportivos para academia, corrida e rotina ativa, com visual moderno, conforto real e uma identidade criada por um casal que vive esse estilo de vida.",
  identityEyebrow: "Identidade da marca",
  identityTitle: "Criada por um casal apaixonado por treino.",
  identityDescription:
    "A Mari Sport foi pensada para parecer uma loja de verdade: proximidade, clareza e uma comunicacao que passa confianca desde o primeiro clique.",
  conversionEyebrow: "Conversao e confianca",
  conversionDescription:
    "Catalogo organizado, CTA claro e leitura boa no mobile para ajudar a transformar visita em contato.",
  primaryCta: {
    label: "Ver catalogo",
    href: "/produtos",
  },
  secondaryCta: {
    label: "Falar no WhatsApp",
    href: `https://wa.me/${contactData.whatsappPhone}?text=${encodeURIComponent(contactData.whatsappMessage)}`,
    external: true,
  },
  stats: [
    { label: "Moda fitness", value: "Masculina e feminina" },
    { label: "Foco", value: "Estilo + performance" },
    { label: "Atendimento", value: "Online e direto" },
  ],
};

export const homeIntro = {
  title: "Criada por um casal apaixonado por treino.",
  description:
    "A Mari Sport foi pensada para parecer uma loja de verdade: proximidade, clareza e uma comunicacao que passa confianca desde o primeiro clique.",
  tag: "Autenticidade",
  note: "Conversao e confianca",
  noteDescription:
    "Catalogo organizado, CTA claro e leitura boa no mobile para ajudar a transformar visita em contato.",
};

export const homeBenefits = {
  eyebrow: "Beneficios da marca",
  title: "Tudo que fortalece a experiencia de compra.",
  description:
    "Uma comunicacao mais limpa melhora a leitura do conteudo e ajuda o usuario a encontrar o produto certo mais rapido.",
  items: brandBenefits,
};

export const homeCatalog = {
  eyebrow: "Categorias",
  title: "Masculino e feminino em blocos claros.",
  ctaLabel: "Ver catalogo completo",
  sections: catalogSections,
};

export const homeFeaturedProducts = {
  eyebrow: "Catalogo em destaque",
  title: "Produtos mais fortes da vitrine.",
  description:
    "Os cards abaixo deixam a leitura clara e mostram preco, status e disponibilidade sem ruido visual.",
  products: productGrid.slice(0, 3),
};

export const homeAbout = {
  eyebrow: "Sobre o casal",
  title: "Uma marca criada por quem vive o estilo de vida fitness.",
  description:
    "A Mari Sport nasce da combinacao de proximidade, rotina de treino e desejo de criar uma loja mais confiavel, bonita e facil de comprar.",
  items: coupleStory,
  whyChooseTitle: "Por que escolher a Mari Sport",
};

export const homeTrust = {
  eyebrow: "Prova de confianca",
  title: "Clareza que ajuda a vender mais.",
  items: trustSignals,
};

export const homeContact = {
  eyebrow: "Atendimento e entrega",
  title: "Pronto para falar com a equipe e montar seu pedido.",
  description:
    "Atendimento rapido para detalhes, tamanhos, cores e disponibilidade.",
  emailDescription:
    "Suporte para pedidos, informacoes e acompanhamento comercial.",
  whatsappDescription:
    "Atendimento rapido para detalhes, tamanhos, cores e disponibilidade.",
  email: contactData.contactEmail,
};

export const homeCta = {
  eyebrow: "CTA final",
  title: "Quer ver o catalogo completo e escolher seu proximo look?",
  description:
    "Acesse a pagina de produtos para comparar categorias, consultar disponibilidade e falar com a Mari Sport com mais agilidade.",
  primaryCta: {
    label: "Ver catalogo",
    href: "/produtos",
  },
  secondaryCta: {
    label: "Ver Instagram",
    href: contactData.instagramUrl,
    external: true,
  },
};
