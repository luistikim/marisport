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
};

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

const whatsappMessage =
  "Ola! Vim pelo site e quero conhecer os produtos da Mari Sport.";

export const whatsappPhone = "5562984592770";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
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
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/contato", label: "Contato" },
  { href: "/carrinho", label: "Carrinho" },
];

export const brandBenefits = [
  {
    title: "Conforto para treinar",
    text: "Pecas pensadas para movimento, respirabilidade e seguranca em cada repeticao.",
  },
  {
    title: "Visual moderno",
    text: "Modelagens e cores que entregam presenca premium dentro e fora da academia.",
  },
  {
    title: "Versatilidade real",
    text: "Looks que funcionam no treino, na corrida e na rotina ativa do dia a dia.",
  },
  {
    title: "Masculino e feminino",
    text: "Colecao equilibrada para homens e mulheres que buscam estilo com performance.",
  },
  {
    title: "Atendimento online",
    text: "Suporte via WhatsApp e e-mail para todo o Brasil, com resposta direta e humana.",
  },
];

export const coupleStory = [
  {
    title: "Marca criada por um casal",
    text: "A Mari Sport nasceu da rotina de quem vive o treino de perto e sabe o que faz sentido na pratica.",
  },
  {
    title: "Conexao e autenticidade",
    text: "A comunicacao aproxima a marca das pessoas com um tom real, acolhedor e confiavel.",
  },
  {
    title: "Crescimento com consistencia",
    text: "Cada peca e cada campanha reforcam a mesma mensagem: estilo, conforto e performance.",
  },
];

export const whyChooseMariSport = [
  {
    title: "Identidade premium",
    text: "A marca passa mais profissionalismo com visual limpo, fotos reais e texto objetivo.",
  },
  {
    title: "Compra sem atrito",
    text: "O caminho entre visualizar, escolher e falar com a equipe ficou mais curto e claro.",
  },
  {
    title: "Catalogo organizado",
    text: "Masculino e feminino aparecem com separacao visual simples e leitura rapida no mobile.",
  },
  {
    title: "Credibilidade comercial",
    text: "Produtos sem preco final ganham linguagem elegante, sem sensacao de pagina inacabada.",
  },
];

export const trustSignals = [
  "Marca criada por um casal real",
  "Atendimento direto e humano",
  "Entrega para todo o Brasil",
  "Qualidade e estilo nas pecas",
];

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

export const catalogSections = [
  {
    id: "feminino",
    title: "Feminino",
    description:
      "Conjuntos, tops e looks que unem estilo, sustentacao e conforto para o treino.",
    products: productGrid.filter((product) => product.category === "Feminino"),
  },
  {
    id: "masculino",
    title: "Masculino",
    description:
      "Camisetas, shorts e pecas funcionais para corrida, academia e rotina ativa.",
    products: productGrid.filter((product) => product.category === "Masculino"),
  },
] as const;

export const featuredProducts = [
  {
    name: "Conjunto Top Cropped",
    category: "Feminino",
    description:
      "Mais vendido da vitrine, com visual elegante e toque premium para o treino.",
    palette: "from-[#203a43] via-[#395a60] to-[#7c9aa0]",
  },
  {
    name: "Camiseta Dry Active",
    category: "Masculino",
    description:
      "Opcao funcional para quem quer conforto, secagem rapida e versatilidade.",
    palette: "from-[#13263b] via-[#203d56] to-[#4b7d91]",
  },
  {
    name: "Conjunto Power Set",
    category: "Feminino",
    description:
      "Linha com energia de lancamento para ampliar o catalogo com personalidade.",
    palette: "from-[#6b4e57] via-[#a06b75] to-[#d4a3a8]",
  },
];

export const brandPillars = [
  {
    title: "Performance com estilo",
    text: "Cada peca foi pensada para unir presenca visual, conforto e seguranca em movimento.",
  },
  {
    title: "Feito para a rotina real",
    text: "Do treino da manha a corrida no fim do dia, a Mari Sport acompanha quem vive em ritmo ativo.",
  },
  {
    title: "Marca para crescer",
    text: "A comunicacao foi organizada para vendas, campanhas, colecoes e expansao digital.",
  },
];

export const brandStoryMoments = [
  {
    title: "Identidade forte",
    text: "A Mari Sport foi pensada para unir moda esportiva, confianca e atitude em uma linguagem visual clara e contemporanea.",
  },
  {
    title: "Uso real",
    text: "A marca mostra as pecas em treino, corrida, rotina e comunidade para aproximar o catalogo da experiencia de compra.",
  },
  {
    title: "Atendimento humano",
    text: "O relacionamento acontece de forma direta pelo WhatsApp e pelo e-mail, facilitando escolhas e pedidos.",
  },
];

export const brandChannels = [
  {
    title: "Feminino",
    text: "Conjuntos fitness, tops, leggings e shorts com foco em estilo, confianca e treino.",
    href: "/produtos#feminino",
    cta: "Ver feminino",
  },
  {
    title: "Masculino",
    text: "Shorts, camisetas dry fit e bermudas esportivas para corrida, treino e rotina ativa.",
    href: "/produtos#masculino",
    cta: "Ver masculino",
  },
  {
    title: "Comunidade",
    text: "A marca cresce junto com quem vive o movimento e busca um visual mais forte.",
    href: instagramLink,
    cta: "Ver comunidade",
  },
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
