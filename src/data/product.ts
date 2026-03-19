import { contactData } from "@/data/contact";

export type CatalogProduct = {
  id: string;
  name: string;
  badge: string;
  description: string;
  unitPrice: number | null;
  originalPrice?: number | null;
  imageSrc?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  category?: "Feminino" | "Masculino";
  availability?: string[];
  statusLabel?: string;
  featured?: boolean;
};

export const productGrid: CatalogProduct[] = [
  {
    id: "conjunto-top-cropped",
    name: "Conjunto Top Cropped",
    badge: "Mais vendido",
    description:
      "Conjunto fitness feminino com caimento premium, cintura alta e visual elegante para treino e rotina ativa.",
    unitPrice: 169.9,
    originalPrice: 189.9,
    imageSrc: "/WhatsApp Image 2026-03-15 at 21.01.09.jpeg",
    imageFit: "contain",
    imagePosition: "center",
    category: "Feminino",
    statusLabel: "Disponivel agora",
    availability: ["P, M e G", "Preto, rose e terracota"],
  },
  {
    id: "conjunto-power-set",
    name: "Conjunto Power Set",
    badge: "Novo",
    description:
      "Look coordenado para quem quer estilo forte, conforto e um visual marcante no treino.",
    unitPrice: null,
    imageSrc: "/WhatsApp Image 2026-03-15 at 21.01.12 (3).jpeg",
    imageFit: "contain",
    imagePosition: "center",
    category: "Feminino",
    statusLabel: "Lancamento em breve",
    availability: ["Consulte cores disponiveis", "Grade em definicao"],
  },
  {
    id: "top-sprint-pulse",
    name: "Top Sprint Pulse",
    badge: "Performance",
    description:
      "Sustentacao firme com toque leve para acompanhar cardio, funcional e corridas curtas.",
    unitPrice: 99.9,
    imageSrc: "/WhatsApp Image 2026-03-15 at 21.01.11.jpeg",
    imageFit: "contain",
    imagePosition: "center",
    category: "Feminino",
    statusLabel: "Disponivel agora",
    availability: ["P, M e G", "Preto e azul"],
  },
  {
    id: "camiseta-dry-active",
    name: "Camiseta Dry Active",
    badge: "Masculino",
    description:
      "Tecido dry de secagem rapida com conforto para treino, caminhada e rotina ativa.",
    unitPrice: 89.9,
    imageSrc: "/WhatsApp Image 2026-03-15 at 21.01.14.jpeg",
    imageFit: "contain",
    imagePosition: "center",
    category: "Masculino",
    statusLabel: "Disponivel agora",
    availability: ["M, G e GG", "Preto, marinho e grafite"],
  },
  {
    id: "short-energy-move",
    name: "Short Energy Move",
    badge: "Conforto",
    description:
      "Short leve com mobilidade total para corrida, treino funcional e dias quentes.",
    unitPrice: null,
    imageSrc: "/WhatsApp Image 2026-03-15 at 21.01.14 (1).jpeg",
    imageFit: "contain",
    imagePosition: "center",
    category: "Masculino",
    statusLabel: "Consulte disponibilidade",
    availability: ["Consulte tamanhos", "Grade em atualizacao"],
  },
  {
    id: "jaqueta-urban-run",
    name: "Jaqueta Urban Run",
    badge: "Versatil",
    description:
      "Camada leve para aquecimento, rua e pos-treino com visual esportivo premium.",
    unitPrice: null,
    imageSrc: "/WhatsApp Image 2026-03-15 at 21.01.14 (2).jpeg",
    imageFit: "contain",
    imagePosition: "center",
    category: "Masculino",
    statusLabel: "Lancamento em breve",
    availability: ["Consulte cores disponiveis", "Linha em definicao"],
  },
];

export const catalogById = Object.fromEntries(
  productGrid.map((product) => [product.id, product]),
) as Record<string, CatalogProduct>;

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function buildWhatsAppLink(phoneOrMessage: string, maybeMessage?: string) {
  const phone = maybeMessage ? phoneOrMessage : contactData.whatsappPhone;
  const message = maybeMessage ?? phoneOrMessage;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildProductInquiryMessage(product: CatalogProduct) {
  const details = [
    `Ola! Quero saber mais sobre o produto ${product.name}.`,
    product.category ? `Categoria: ${product.category}.` : null,
    product.unitPrice === null ? "Quero consultar disponibilidade e valores." : null,
    product.availability?.length
      ? `Tamanhos e cores: ${product.availability.join(", ")}.`
      : null,
  ].filter(Boolean);

  return details.join(" ");
}

export function buildProductInquiryLink(product: CatalogProduct) {
  return buildWhatsAppLink(buildProductInquiryMessage(product));
}
