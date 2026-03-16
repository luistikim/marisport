export type CatalogProduct = {
  id: string;
  name: string;
  badge: string;
  description: string;
  unitPrice: number | null;
};

const whatsappMessage =
  "Ola! Vim pelo site e quero conhecer os produtos da Mari Sport.";

export const whatsappPhone = "5562984592770";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export const whatsappLink = buildWhatsAppLink(whatsappMessage);

export const contactPhone = "(62) 98459-2770";
export const contactEmail = "marisport.fitwear@gmail.com";

export const instagramLink =
  "https://www.instagram.com/mari_sportfit?igsh=MWsxdXl3Nmo5bnRodQ==";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/produtos", label: "Produtos" },
  { href: "/carrinho", label: "Carrinho" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export const featuredProducts = [
  {
    name: "Legging Motion Fit",
    category: "Academia",
    description:
      "Compressao equilibrada, cintura alta e tecido respiravel para treinos intensos.",
    palette: "from-[#1f3044] via-[#27476a] to-[#3f77a8]",
  },
  {
    name: "Top Sprint Pulse",
    category: "Corrida",
    description:
      "Sustentacao firme com toque leve para acompanhar sua rotina do cardio ao funcional.",
    palette: "from-[#ff6b2c] via-[#ff8e3c] to-[#ffd35a]",
  },
  {
    name: "Jaqueta Urban Run",
    category: "Performance",
    description:
      "Camada versatil para aquecimento, rua e pos-treino com visual esportivo premium.",
    palette: "from-[#203a43] via-[#2c5364] to-[#4b7d91]",
  },
];

export const productGrid: CatalogProduct[] = [
  {
    id: "legging-motion-fit",
    name: "Legging Motion Fit",
    badge: "Mais vendida",
    description: "Modelagem firme, cintura alta e conforto para treino diario.",
    unitPrice: null,
  },
  {
    id: "top-sprint-pulse",
    name: "Top Sprint Pulse",
    badge: "Novo",
    description: "Sustentacao e liberdade de movimento para academia e corrida.",
    unitPrice: null,
  },
  {
    id: "short-energy-move",
    name: "Short Energy Move",
    badge: "Corrida",
    description: "Leve, fresco e com caimento pensado para mobilidade total.",
    unitPrice: null,
  },
  {
    id: "camiseta-dry-active",
    name: "Camiseta Dry Active",
    badge: "Essencial",
    description: "Tecido tecnologico de secagem rapida para alto desempenho.",
    unitPrice: null,
  },
  {
    id: "jaqueta-urban-run",
    name: "Jaqueta Urban Run",
    badge: "Premium",
    description: "Visual contemporaneo para compor treino, rua e viagem.",
    unitPrice: null,
  },
  {
    id: "conjunto-power-set",
    name: "Conjunto Power Set",
    badge: "Academia",
    description: "Look coordenado para quem gosta de estilo forte no treino.",
    unitPrice: null,
  },
];

export const catalogById = Object.fromEntries(
  productGrid.map((product) => [product.id, product]),
) as Record<string, CatalogProduct>;

export const brandPillars = [
  {
    title: "Performance com estilo",
    text: "Cada peca nasce para unir presenca visual, conforto e seguranca em movimento.",
  },
  {
    title: "Feito para a rotina real",
    text: "Do treino da manha a corrida no fim do dia, a Mari Sport acompanha quem vive em ritmo ativo.",
  },
  {
    title: "Marca para crescer",
    text: "A base da comunicacao foi pensada para vendas, colecoes, campanhas e expansao digital.",
  },
];

export const outfitCollections = [
  {
    id: "serenity-flare",
    title: "Conjunto azul serenity",
    color: "Azul serenity",
    type: "Top faixa + calca flare",
    person: "Editorial piscina",
    cover: "/WhatsApp Image 2026-03-15 at 21.01.04.jpeg",
    images: [
      "/WhatsApp Image 2026-03-15 at 21.01.04.jpeg",
      "/WhatsApp Image 2026-03-15 at 21.01.06.jpeg",
      "/WhatsApp Image 2026-03-15 at 21.01.08.jpeg",
    ],
  },
  {
    id: "azul-short",
    title: "Conjunto azul claro",
    color: "Azul claro",
    type: "Top + short",
    person: "Editorial urbano",
    cover: "/WhatsApp Image 2026-03-15 at 21.01.11 (4).jpeg",
    images: [
      "/WhatsApp Image 2026-03-15 at 21.01.11 (4).jpeg",
    ],
  },
  {
    id: "navy-recorte",
    title: "Look marinho com recorte",
    color: "Marinho e grafite",
    type: "Top recorte + short",
    person: "Editorial urbano",
    cover: "/WhatsApp Image 2026-03-15 at 21.01.11 (3).jpeg",
    images: [
      "/WhatsApp Image 2026-03-15 at 21.01.11 (3).jpeg",
    ],
  },
  {
    id: "neon-running",
    title: "Base preta com colete neon",
    color: "Preto com neon",
    type: "Top + legging + colete",
    person: "Editorial piscina",
    cover: "/WhatsApp Image 2026-03-15 at 21.01.10.jpeg",
    images: [
      "/WhatsApp Image 2026-03-15 at 21.01.10.jpeg",
    ],
  },
  {
    id: "rose-wind",
    title: "Legging rose com corta-vento",
    color: "Rose e dourado",
    type: "Legging + jaqueta leve",
    person: "Editorial piscina",
    cover: "/WhatsApp Image 2026-03-15 at 21.01.09.jpeg",
    images: [
      "/WhatsApp Image 2026-03-15 at 21.01.09.jpeg",
    ],
  },
  {
    id: "pink-cycling",
    title: "Conjunto pink sport",
    color: "Pink e gelo",
    type: "Top + short biker",
    person: "Editorial piscina",
    cover: "/WhatsApp Image 2026-03-15 at 21.01.11.jpeg",
    images: [
      "/WhatsApp Image 2026-03-15 at 21.01.11.jpeg",
    ],
  },
  {
    id: "navy-leggings",
    title: "Look navy brilho",
    color: "Marinho e magenta",
    type: "Top + legging",
    person: "Editorial piscina",
    cover: "/WhatsApp Image 2026-03-15 at 21.01.09 (3).jpeg",
    images: [
      "/WhatsApp Image 2026-03-15 at 21.01.09 (3).jpeg",
    ],
  },
];

export const outfitGroups = {
  colors: [
    { name: "Azul serenity", description: "Tons leves, frescos e elegantes para looks protagonistas." },
    { name: "Marinho e grafite", description: "Combos sofisticados para treino e uso urbano." },
    { name: "Preto com neon", description: "Base classica com energia visual de alta performance." },
  ],
  types: [
    { name: "Top faixa + calca flare", description: "Silhueta marcante com toque fashion fitness." },
    { name: "Top + short", description: "Leveza e liberdade para treinos intensos e clima quente." },
    { name: "Top + legging + colete", description: "Camadas esportivas para composicoes versateis." },
  ],
};

export const productFlatlays = [
  {
    src: "/WhatsApp Image 2026-03-15 at 21.01.12.jpeg",
    title: "Conjunto nude com azul",
    color: "Nude com azul acinzentado",
    type: "Top assimetrico + legging",
  },
  {
    src: "/WhatsApp Image 2026-03-15 at 21.01.12 (1).jpeg",
    title: "Conjunto nude essencial",
    color: "Nude com azul acinzentado",
    type: "Top cavado + legging",
  },
  {
    src: "/WhatsApp Image 2026-03-15 at 21.01.12 (3).jpeg",
    title: "Conjunto marrom brilho",
    color: "Marrom chocolate",
    type: "Top costas cruzadas + legging",
  },
];

export const mensLooks = [
  {
    src: "/WhatsApp Image 2026-03-15 at 21.01.14 (2).jpeg",
    title: "Corrida em preto performance",
    description: "Jaqueta leve com short tecnico para treino e rua.",
  },
  {
    src: "/WhatsApp Image 2026-03-15 at 21.01.14.jpeg",
    title: "Look running marinho",
    description: "Regata funcional e short leve para alto rendimento.",
  },
  {
    src: "/WhatsApp Image 2026-03-15 at 21.01.14 (1).jpeg",
    title: "Visual casual sport",
    description: "Camiseta dry e short masculino para rotina ativa.",
  },
];

export const editorialHighlights = [
  {
    src: "/WhatsApp Image 2026-03-15 at 21.01.14.jpeg",
    title: "Corrida urbana",
    description: "Looks em movimento, energia real e performance no asfalto.",
  },
  {
    src: "/WhatsApp Image 2026-03-15 at 21.01.11 (4).jpeg",
    title: "Editorial feminino",
    description: "Conjuntos que funcionam no treino e mantem presenca visual forte.",
  },
  {
    src: "/WhatsApp Image 2026-03-15 at 21.01.14 (2).jpeg",
    title: "Masculino performance",
    description: "A linha masculina aparece com corrida, leveza e funcionalidade.",
  },
];

export const brandChannels = [
  {
    title: "Feminino",
    text: "Conjuntos fitness, tops, leggings e shorts com foco em estilo, confianca e treino.",
    href: "/produtos",
    cta: "Ver feminino",
  },
  {
    title: "Masculino",
    text: "Shorts, camisetas dry fit e bermudas esportivas para corrida, treino e rotina ativa.",
    href: "#masculino",
    cta: "Ver masculino",
  },
  {
    title: "Comunidade",
    text: "Eventos, auloes, treinos coletivos e a energia de quem vive o movimento com a marca.",
    href: instagramLink,
    cta: "Ver comunidade",
  },
];

export const communityMoments = [
  {
    src: "/perfil.jpeg",
    title: "Feed ativo",
    description: "O Instagram mistura produto, pessoas reais, corrida e comunicacao direta.",
  },
  {
    src: "/WhatsApp Image 2026-03-15 at 21.01.08 (2).jpeg",
    title: "Presenca da marca",
    description: "A Mari Sport aparece em treinos, eventos e encontros com a comunidade.",
  },
  {
    src: "/WhatsApp Image 2026-03-15 at 21.01.08 (1).jpeg",
    title: "Auloes e movimento",
    description: "Fotos coletivas reforcam proximidade, experiencia e estilo de vida ativo.",
  },
];
