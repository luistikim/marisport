import { contactData } from "./contact.ts";

export type ProductVariant = {
  size?: string;
  color?: string;
  stock?: number | null;
};

export type CatalogProduct = {
  id: string;
  name: string;
  badge: string;
  description: string;
  fullDescription?: string;
  unitPrice: number | null;
  originalPrice?: number | null;
  imageSrc?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  galleryImages?: Array<{
    src: string;
    alt: string;
  }>;
  category?: "Feminino" | "Masculino";
  variants?: ProductVariant[];
  sizes?: string[];
  colors?: string[];
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
    variants: [
      { size: "P", color: "Preto", stock: 3 },
      { size: "P", color: "rose", stock: 0 },
      { size: "M", color: "Preto", stock: 5 },
      { size: "M", color: "terracota", stock: 2 },
      { size: "G", color: "terracota", stock: 1 },
    ],
    sizes: ["P", "M", "G"],
    colors: ["Preto", "rose", "terracota"],
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
    variants: [],
    sizes: [],
    colors: [],
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
    variants: [
      { size: "P", color: "Preto", stock: 2 },
      { size: "P", color: "azul", stock: 1 },
      { size: "M", color: "Preto", stock: 4 },
      { size: "M", color: "azul", stock: 3 },
      { size: "G", color: "Preto", stock: 0 },
    ],
    sizes: ["P", "M", "G"],
    colors: ["Preto", "azul"],
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
    variants: [
      { size: "M", color: "Preto", stock: 5 },
      { size: "M", color: "marinho", stock: 3 },
      { size: "G", color: "marinho", stock: 2 },
      { size: "GG", color: "grafite", stock: 4 },
    ],
    sizes: ["M", "G", "GG"],
    colors: ["Preto", "marinho", "grafite"],
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
    variants: [],
    sizes: [],
    colors: [],
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
    variants: [],
    sizes: [],
    colors: [],
    statusLabel: "Lancamento em breve",
    availability: ["Consulte cores disponiveis", "Linha em definicao"],
  },
];

export const catalogById = Object.fromEntries(
  productGrid.map((product) => [product.id, product]),
) as Record<string, CatalogProduct>;

const SIZE_ORDER = ["PP", "P", "M", "G", "GG", "XG", "Único"];

function normalizeVariationValue(value?: string) {
  return value?.trim() || undefined;
}

export function normalizeSizeLabel(value?: string) {
  const normalized = normalizeVariationValue(value);

  if (!normalized) {
    return undefined;
  }

  const upper = normalized.toLocaleUpperCase("pt-BR");

  return upper === "UNICO" ? "Único" : upper;
}

export function normalizeColorLabel(value?: string) {
  const normalized = normalizeVariationValue(value);

  if (!normalized) {
    return undefined;
  }

  return normalized
    .toLocaleLowerCase("pt-BR")
    .split(/\s+/)
    .map((part) => {
      if (!part) {
        return part;
      }

      return part.charAt(0).toLocaleUpperCase("pt-BR") + part.slice(1);
    })
    .join(" ");
}

export function normalizeVariationKey(value?: string) {
  return normalizeVariationValue(value)?.toLocaleLowerCase("pt-BR") ?? "";
}

function normalizeStockValue(value?: number | null) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return undefined;
  }

  return Math.max(0, Math.floor(value));
}

function buildVariantKey(size?: string, color?: string) {
  return [normalizeVariationKey(size), normalizeVariationKey(color)].join("::");
}

function sortSizes(values: string[]) {
  return [...values].sort((a, b) => {
    const aIndex = SIZE_ORDER.indexOf(a);
    const bIndex = SIZE_ORDER.indexOf(b);

    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b, "pt-BR");
    }

    if (aIndex === -1) {
      return 1;
    }

    if (bIndex === -1) {
      return -1;
    }

    return aIndex - bIndex;
  });
}

function uniqueValues(values: Array<string | undefined>) {
  return Array.from(
    new Set(
      values
        .map((value) => normalizeVariationValue(value))
        .filter((value): value is string => Boolean(value)),
    ),
  );
}

function normalizeProductVariants(variants?: ProductVariant[]) {
  const normalized = (variants ?? [])
    .map((variant) => {
      const size = normalizeSizeLabel(variant.size);
      const color = normalizeColorLabel(variant.color);
      const stock = normalizeStockValue(variant.stock);

      if (!size && !color) {
        return null;
      }

      return {
        size,
        color,
        stock,
      };
    })
    .filter(Boolean) as Array<{ size?: string; color?: string; stock?: number }>;

  const uniqueVariants = new Map<string, { size?: string; color?: string; stock?: number }>();

  for (const variant of normalized) {
    const key = buildVariantKey(variant.size, variant.color);
    const existing = uniqueVariants.get(key);

    if (!existing) {
      uniqueVariants.set(key, variant);
      continue;
    }

    const existingStock = existing.stock ?? undefined;
    const nextStock = variant.stock ?? undefined;

    if (typeof nextStock === "number" && (existingStock === undefined || nextStock > existingStock)) {
      uniqueVariants.set(key, {
        ...existing,
        stock: nextStock,
      });
    }
  }

  return Array.from(uniqueVariants.values());
}

function deriveLegacyVariants(product: Pick<CatalogProduct, "sizes" | "colors">) {
  const sizes = uniqueValues((product.sizes ?? []).map((value) => normalizeSizeLabel(value)));
  const colors = uniqueValues((product.colors ?? []).map((value) => normalizeColorLabel(value)));

  if (sizes.length && colors.length) {
    return sizes.flatMap((size) =>
      colors.map((color) => ({
        size,
        color,
        stock: undefined,
      })),
    );
  }

  if (sizes.length) {
    return sizes.map((size) => ({
      size,
      color: undefined,
      stock: undefined,
    }));
  }

  if (colors.length) {
    return colors.map((color) => ({
      size: undefined,
      color,
      stock: undefined,
    }));
  }

  return [];
}

export function getProductVariants(product: Pick<CatalogProduct, "variants" | "sizes" | "colors">) {
  const structured = normalizeProductVariants(product.variants);

  return structured.length ? structured : deriveLegacyVariants(product);
}

export function findMatchingProductVariant(
  product: Pick<CatalogProduct, "variants" | "sizes" | "colors">,
  selectedSize?: string,
  selectedColor?: string,
) {
  const size = normalizeVariationKey(selectedSize);
  const color = normalizeVariationKey(selectedColor);
  const variants = getProductVariants(product);

  if (!variants.length) {
    return null;
  }

  return (
    variants.find((variant) => {
      return (
        normalizeVariationKey(variant.size) === size &&
        normalizeVariationKey(variant.color) === color
      );
    }) ?? null
  );
}

export function isVariantInStock(variant?: ProductVariant | null) {
  if (!variant) {
    return false;
  }

  // Stock undefined/null means the CMS is not tracking inventory for that variant yet.
  return variant.stock === undefined || variant.stock === null || variant.stock > 0;
}

export function getSelectableVariantSizes(
  product: Pick<CatalogProduct, "variants" | "sizes" | "colors">,
  selectedColor?: string,
) {
  const color = normalizeVariationValue(selectedColor);
  const variants = getProductVariants(product);
  const sizes = variants
    .filter((variant) => isVariantInStock(variant))
    .filter((variant) =>
      color ? normalizeVariationKey(variant.color) === normalizeVariationKey(color) : true,
    )
    .map((variant) => normalizeSizeLabel(variant.size))
    .filter(Boolean) as string[];

  return sortSizes(uniqueValues(sizes));
}

export function getSelectableVariantColors(
  product: Pick<CatalogProduct, "variants" | "sizes" | "colors">,
  selectedSize?: string,
) {
  const size = normalizeVariationValue(selectedSize);
  const variants = getProductVariants(product);
  const colors = variants
    .filter((variant) => isVariantInStock(variant))
    .filter((variant) =>
      size ? normalizeVariationKey(variant.size) === normalizeVariationKey(size) : true,
    )
    .map((variant) => normalizeColorLabel(variant.color))
    .filter(Boolean) as string[];

  return uniqueValues(colors);
}

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
  const structuredVariations = [
    product.sizes?.length ? `Tamanhos: ${product.sizes.join(", ")}.` : null,
    product.colors?.length ? `Cores: ${product.colors.join(", ")}.` : null,
  ].filter((value): value is string => Boolean(value));

  const details = [
    `Ola! Quero saber mais sobre o produto ${product.name}.`,
    product.category ? `Categoria: ${product.category}.` : null,
    product.unitPrice === null ? "Quero consultar disponibilidade e valores." : null,
    structuredVariations.length
      ? structuredVariations.join(" ")
      : product.availability?.length
        ? `Tamanhos e cores: ${product.availability.join(", ")}.`
        : null,
  ].filter(Boolean);

  return details.join(" ");
}

export function buildProductInquiryLink(product: CatalogProduct) {
  return buildWhatsAppLink(buildProductInquiryMessage(product));
}
