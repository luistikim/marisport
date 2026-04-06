import { defineField, defineType } from "sanity";

// Tamanhos controlados — mesmos valores usados pelo frontend e checkout
const SIZE_OPTIONS = [
  { title: "PP", value: "PP" },
  { title: "P", value: "P" },
  { title: "M", value: "M" },
  { title: "G", value: "G" },
  { title: "GG", value: "GG" },
  { title: "XG", value: "XG" },
  { title: "Único", value: "Único" },
];

// Cores controladas — lista curada para moda esportiva
// Adicione novas cores aqui quando necessário. Os valores são usados no ID do item no Mercado Pago.
const COLOR_OPTIONS = [
  { title: "Preto", value: "Preto" },
  { title: "Branco", value: "Branco" },
  { title: "Cinza", value: "Cinza" },
  { title: "Cinza Mescla", value: "Cinza Mescla" },
  { title: "Grafite", value: "Grafite" },
  { title: "Azul Marinho", value: "Azul Marinho" },
  { title: "Azul", value: "Azul" },
  { title: "Azul Royal", value: "Azul Royal" },
  { title: "Azul Bebê", value: "Azul Bebê" },
  { title: "Verde", value: "Verde" },
  { title: "Verde Militar", value: "Verde Militar" },
  { title: "Verde Musgo", value: "Verde Musgo" },
  { title: "Vermelho", value: "Vermelho" },
  { title: "Rosa", value: "Rosa" },
  { title: "Rosa Bebê", value: "Rosa Bebê" },
  { title: "Rosa Chá", value: "Rosa Chá" },
  { title: "Rose", value: "Rose" },
  { title: "Coral", value: "Coral" },
  { title: "Salmão", value: "Salmão" },
  { title: "Amarelo", value: "Amarelo" },
  { title: "Laranja", value: "Laranja" },
  { title: "Roxo", value: "Roxo" },
  { title: "Lilás", value: "Lilás" },
  { title: "Bege", value: "Bege" },
  { title: "Marrom", value: "Marrom" },
  { title: "Caramelo", value: "Caramelo" },
  { title: "Terracota", value: "Terracota" },
  { title: "Vinho", value: "Vinho" },
  { title: "Dourado", value: "Dourado" },
  { title: "Prata", value: "Prata" },
];

export const productType = defineType({
  name: "produto",
  title: "Produto",
  type: "document",

  // Grupos de campos para organizar o Studio em abas
  groups: [
    {
      name: "essencial",
      title: "Essencial",
      default: true,
    },
    {
      name: "variacoes",
      title: "Variações e Preço",
    },
    {
      name: "imagens",
      title: "Imagens",
    },
    {
      name: "descricoes",
      title: "Descrições",
    },
    {
      name: "status",
      title: "Status",
    },
    {
      name: "legado",
      title: "Campos legados",
    },
  ],

  fields: [
    // ─── ABA: ESSENCIAL ──────────────────────────────────────────────────────────

    defineField({
      name: "ativo",
      title: "Produto ativo",
      type: "boolean",
      description:
        "Desmarque para ocultar o produto do site sem precisar excluí-lo. Ao ativar, certifique-se de que o cadastro está completo.",
      initialValue: true,
      group: "essencial",
      // Ao ativar o produto, mostra um resumo de tudo que está faltando
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (value !== true) return true; // só valida ao ativar

          const doc = context.document as {
            unitPrice?: number | null;
            image?: { asset?: unknown };
            shortDescription?: string;
            variants?: unknown[];
            sizes?: string[];
            colors?: string[];
          };

          const issues: string[] = [];

          if (typeof doc?.unitPrice !== "number" || doc.unitPrice <= 0) {
            issues.push(
              'preço base (ou será exibido como "sob consulta" — tudo bem se for intencional)',
            );
          }
          if (!doc?.image?.asset) {
            issues.push("imagem principal (aba Imagens)");
          }
          if (!doc?.shortDescription?.trim()) {
            issues.push("descrição curta (aba Descrições)");
          }
          const hasVariants =
            Array.isArray(doc?.variants) && doc.variants.length > 0;
          const hasLegacy =
            (doc?.sizes?.length ?? 0) > 0 || (doc?.colors?.length ?? 0) > 0;
          if (!hasVariants && !hasLegacy) {
            issues.push("variações de tamanho e cor (aba Variações e Preço)");
          }

          return issues.length === 0
            ? true
            : `Produto ativo com cadastro incompleto — ${issues.join("; ")}.`;
        }).warning(),
    }),

    defineField({
      name: "name",
      title: "Nome do produto",
      type: "string",
      description: "Nome exibido no catálogo, carrinho e no Mercado Pago.",
      validation: (Rule) =>
        Rule.required().error("O nome do produto é obrigatório."),
      group: "essencial",
    }),

    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description:
        "Identificador único na URL e no carrinho. Clique em 'Gerar' após definir o nome. ⚠ Não altere depois que o produto já estiver no ar.",
      options: {
        source: "name",
        // Remove acentos, converte para minúsculas e substitui espaços/chars por hífen
        slugify: (input) =>
          input
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 96),
      },
      validation: (Rule) =>
        Rule.required().error(
          "O slug é obrigatório para o produto funcionar no site e no checkout.",
        ),
      group: "essencial",
    }),

    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "categoria" }],
      description: "Selecione Feminino ou Masculino.",
      validation: (Rule) =>
        Rule.required().error("Selecione a categoria do produto."),
      group: "essencial",
    }),

    // ─── ABA: VARIAÇÕES E PREÇO ──────────────────────────────────────────────────

    defineField({
      name: "unitPrice",
      title: "Preço base (R$)",
      type: "number",
      description:
        "Preço padrão de todas as variações. Deixe vazio apenas se o produto for 'sob consulta'. Variações podem ter preço próprio abaixo.",
      group: "variacoes",
      validation: (Rule) => [
        // Regra 1 (erro): se preço informado, deve ser válido
        Rule.custom((value) => {
          if (value === undefined || value === null) return true;
          if (typeof value !== "number") return "O preço deve ser um número.";
          if (value <= 0)
            return "O preço deve ser maior que zero. Se o produto não tem preço definido, deixe este campo vazio.";
          if (value > 99999)
            return "Valor muito alto. Verifique se está correto (ex: use 169.90, não 16990).";
          return true;
        }),
        // Regra 2 (aviso): produto ativo sem preço
        Rule.custom((value, context) => {
          const doc = context.document as { ativo?: boolean };
          if (doc?.ativo === false) return true;
          if (value === undefined || value === null) {
            return 'Produto ativo sem preço. Será exibido como "Sob consulta" no catálogo — preencha quando o preço for definido.';
          }
          return true;
        }).warning(),
      ],
    }),

    defineField({
      name: "originalPrice",
      title: "Preço original / De: (R$)",
      type: "number",
      description:
        "Preço anterior exibido como 'De: R$ X'. Preencha apenas quando houver desconto real.",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (value === undefined || value === null) return true;
          if (typeof value !== "number") return "O preço deve ser um número.";
          if (value <= 0) return "O preço original deve ser maior que zero.";
          return true;
        }),
      group: "variacoes",
    }),

    defineField({
      name: "variants",
      title: "Variações (tamanho + cor)",
      type: "array",
      description:
        "Cada linha é uma combinação única de tamanho e cor. O ID gerado no Mercado Pago usa o slug do produto + tamanho + cor normalizados.",
      group: "variacoes",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "size",
              title: "Tamanho",
              type: "string",
              options: {
                list: SIZE_OPTIONS,
              },
              validation: (Rule) =>
                Rule.required().error("Informe o tamanho desta variação."),
            }),
            defineField({
              name: "color",
              title: "Cor",
              type: "string",
              description:
                "Selecione na lista. Se a cor não existir, peça ao desenvolvedor para adicioná-la — isso garante consistência no checkout.",
              options: {
                list: COLOR_OPTIONS,
              },
              validation: (Rule) =>
                Rule.required().error("Informe a cor desta variação."),
            }),
            defineField({
              name: "stock",
              title: "Estoque",
              type: "number",
              description:
                "Quantidade disponível. Use 0 para marcar como esgotado (a variação continuará visível, mas bloqueada para compra).",
              initialValue: 0,
              validation: (Rule) =>
                Rule.required()
                  .integer()
                  .min(0)
                  .error(
                    "O estoque deve ser um número inteiro maior ou igual a zero.",
                  ),
            }),
            defineField({
              name: "priceOverride",
              title: "Preço específico (R$)",
              type: "number",
              description:
                "Deixe vazio para usar o preço base do produto. Preencha apenas se esta variação tiver preço diferente (ex: tamanho especial com custo maior).",
              validation: (Rule) =>
                Rule.custom((value) => {
                  if (value === undefined || value === null) return true;
                  if (typeof value !== "number")
                    return "O preço deve ser um número.";
                  if (value <= 0)
                    return "O preço da variação deve ser maior que zero.";
                  if (value > 99999)
                    return "Valor muito alto. Verifique se o preço está correto.";
                  return true;
                }),
            }),
            defineField({
              name: "sku",
              title: "SKU (código interno)",
              type: "string",
              description:
                "Código de rastreabilidade interno. Opcional — se vazio, o checkout já gera um ID automático no formato slug-tamanho-cor (ex: legging-power-sculpt-m-preto). Preencha apenas se precisar de um código próprio (ex: para integração com ERP).",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  // Se já tem SKU manual, não interfere
                  if (typeof value === "string" && value.trim()) return true;

                  const doc = context.document as {
                    slug?: { current?: string };
                  };
                  const parent = context.parent as {
                    size?: string;
                    color?: string;
                  };

                  function slugSeg(text?: string): string {
                    return (text ?? "")
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "")
                      .replace(/-+/g, "-")
                      .replace(/^-+|-+$/g, "");
                  }

                  const base = doc?.slug?.current ?? "";
                  const size = slugSeg(parent?.size);
                  const color = slugSeg(parent?.color);
                  const suggestion = [base, size, color]
                    .filter(Boolean)
                    .join("-");

                  return suggestion
                    ? `ID automático desta variação: "${suggestion}" — preencha acima só se precisar de código diferente`
                    : true;
                }).warning(),
            }),
          ],
          preview: {
            select: {
              size: "size",
              color: "color",
              stock: "stock",
              priceOverride: "priceOverride",
              sku: "sku",
            },
            prepare({ size, color, stock, priceOverride, sku }) {
              const hasSize = typeof size === "string" && size.trim();
              const hasColor = typeof color === "string" && color.trim();

              const stockNum = typeof stock === "number" ? stock : null;
              const isOutOfStock = stockNum === 0;
              const stockLabel =
                stockNum === null
                  ? "Estoque não informado"
                  : isOutOfStock
                    ? "Esgotado"
                    : `${stockNum} em estoque`;

              const priceLabel =
                typeof priceOverride === "number"
                  ? `R$ ${priceOverride.toFixed(2).replace(".", ",")} (preço específico)`
                  : "preço base";

              const skuLabel = sku ? `SKU: ${sku}` : null;

              const subtitleParts = [stockLabel, priceLabel, skuLabel].filter(
                Boolean,
              );

              return {
                // Prefixo visual para esgotado — facilita identificação na lista
                title: `${isOutOfStock ? "◌ " : "● "}${hasSize ? size : "?"} / ${hasColor ? color : "?"}`,
                subtitle: subtitleParts.join(" · "),
              };
            },
          },
        },
      ],
      validation: (Rule) => [
        // Regra 1: bloqueia combinações tamanho+cor duplicadas (erro)
        Rule.custom((variants) => {
          if (!Array.isArray(variants)) return true;

          const seen = new Set<string>();

          for (const variant of variants) {
            if (!variant || typeof variant !== "object") continue;

            const v = variant as { size?: string; color?: string };
            const size = v.size?.trim() ?? "";
            const color = v.color?.trim() ?? "";
            const key = `${size.toLowerCase()}::${color.toLowerCase()}`;

            if (seen.has(key)) {
              return `Combinação duplicada: "${size || "?"} / ${color || "?"}". Cada tamanho + cor pode aparecer apenas uma vez — remova ou edite a variação repetida.`;
            }

            seen.add(key);
          }

          return true;
        }),

        // Regra 2: aviso quando o produto tem dados legados mas nenhuma variação estruturada
        Rule.custom((variants, context) => {
          const doc = context.document as {
            sizes?: string[];
            colors?: string[];
          };
          const hasLegacy =
            (doc?.sizes?.length ?? 0) > 0 || (doc?.colors?.length ?? 0) > 0;
          const hasStructured =
            Array.isArray(variants) && variants.length > 0;

          if (hasLegacy && !hasStructured) {
            return 'Este produto tem dados na aba "Campos legados". Migre para cá para ter controle de estoque, preço por variação e consistência no checkout.';
          }

          return true;
        }).warning(),

        // Regra 3: aviso quando produto ativo tem todas as variações esgotadas
        Rule.custom((variants, context) => {
          const doc = context.document as { ativo?: boolean };
          if (doc?.ativo === false) return true;
          if (!Array.isArray(variants) || variants.length === 0) return true;

          const allOutOfStock = variants.every((v) => {
            const variant = v as { stock?: number };
            return (
              typeof variant.stock === "number" && variant.stock === 0
            );
          });

          if (allOutOfStock) {
            return "Todas as variações estão com estoque zero. O produto está ativo mas nenhuma variação pode ser comprada — atualize os estoques ou desative o produto.";
          }

          return true;
        }).warning(),
      ],
    }),

    // ─── ABA: IMAGENS ────────────────────────────────────────────────────────────

    defineField({
      name: "image",
      title: "Imagem principal",
      type: "image",
      description:
        "Foto de destaque do produto. Recomendado: imagem quadrada (1:1) em boa resolução.",
      options: { hotspot: true },
      group: "imagens",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { ativo?: boolean };
          if (doc?.ativo === false) return true;
          const hasImage = Boolean(
            value && (value as { asset?: unknown }).asset,
          );
          if (!hasImage) {
            return "Produto ativo sem imagem principal. O produto aparecerá sem foto no catálogo — adicione uma imagem.";
          }
          return true;
        }).warning(),
    }),

    defineField({
      name: "images",
      title: "Galeria de imagens",
      type: "array",
      description:
        "Adicione várias fotos e arraste para reordenar. A primeira imagem é usada como capa caso não haja imagem principal.",
      group: "imagens",
      of: [
        defineField({
          name: "galleryImage",
          title: "Imagem",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
              description:
                "Descrição da imagem para acessibilidade (ex: 'Legging preta, vista frontal').",
            }),
          ],
        }),
      ],
      validation: (Rule) => [
        Rule.max(10),
        Rule.custom((value, context) => {
          const doc = context.document as {
            ativo?: boolean;
            image?: { asset?: unknown };
          };
          if (doc?.ativo === false) return true;

          const hasGallery = Array.isArray(value) && value.length > 0;
          const hasMainImage = Boolean(doc?.image?.asset);

          if (!hasGallery && !hasMainImage) {
            return "Produto ativo sem nenhuma imagem. Adicione a imagem principal ou fotos na galeria.";
          }
          if (!hasGallery) {
            return "Produto sem galeria de fotos. Adicionar mais imagens melhora a conversão — o cliente quer ver ângulos, detalhes e o produto em uso.";
          }
          return true;
        }).warning(),
      ],
    }),

    defineField({
      name: "imageFit",
      title: "Enquadramento da imagem",
      type: "string",
      description:
        "'Conter' mostra o produto inteiro (recomendado). 'Cobrir' preenche o espaço mas pode cortar bordas.",
      initialValue: "contain",
      options: {
        list: [
          { title: "Conter — mostra o produto inteiro (padrão)", value: "contain" },
          { title: "Cobrir — preenche a área (pode cortar)", value: "cover" },
        ],
        layout: "radio",
      },
      group: "imagens",
    }),

    defineField({
      name: "imagePosition",
      title: "Alinhamento vertical da imagem",
      type: "string",
      description:
        "Controla onde a imagem fica dentro do espaço disponível. Útil com o modo 'Cobrir'.",
      initialValue: "center",
      options: {
        list: [
          { title: "Centro (padrão)", value: "center" },
          { title: "Topo", value: "top" },
          { title: "Baixo", value: "bottom" },
        ],
        layout: "radio",
      },
      group: "imagens",
    }),

    // ─── ABA: DESCRIÇÕES ─────────────────────────────────────────────────────────

    defineField({
      name: "shortDescription",
      title: "Descrição curta",
      type: "text",
      rows: 3,
      description:
        "Aparece no catálogo e no carrinho. Seja direto: benefício principal + diferencial. Máx. 160 caracteres recomendado.",
      validation: (Rule) => [
        Rule.max(300).warning(
          "Descrição muito longa. Prefira até 160 caracteres — o restante pode ser cortado no catálogo.",
        ),
        Rule.custom((value, context) => {
          const doc = context.document as { ativo?: boolean };
          if (doc?.ativo === false) return true;
          if (!value || !String(value).trim()) {
            return "Produto ativo sem descrição curta. A descrição aparece no catálogo e ajuda o cliente a decidir pela compra.";
          }
          return true;
        }).warning(),
      ],
      group: "descricoes",
    }),

    defineField({
      name: "fullDescription",
      title: "Descrição completa",
      type: "text",
      rows: 6,
      description:
        "Aparece na página de detalhes do produto. Detalhe materiais, tecnologia do tecido, caimento e cuidados.",
      group: "descricoes",
    }),

    // ─── ABA: STATUS ─────────────────────────────────────────────────────────────

    defineField({
      name: "badge",
      title: "Selo do produto",
      type: "string",
      description:
        "Etiqueta de destaque exibida sobre a imagem do produto. Use selos padronizados para manter consistência visual.",
      options: {
        list: [
          { title: "Mais vendido", value: "Mais vendido" },
          { title: "Novo", value: "Novo" },
          { title: "Lançamento", value: "Lançamento" },
          { title: "Performance", value: "Performance" },
          { title: "Conforto", value: "Conforto" },
          { title: "Versátil", value: "Versátil" },
          { title: "Promoção", value: "Promoção" },
          { title: "Exclusivo", value: "Exclusivo" },
          { title: "Masculino", value: "Masculino" },
          { title: "Feminino", value: "Feminino" },
        ],
      },
      group: "status",
    }),

    defineField({
      name: "statusLabel",
      title: "Etiqueta de disponibilidade",
      type: "string",
      description:
        "Texto de status exibido próximo ao produto. Indica disponibilidade para o cliente.",
      options: {
        list: [
          { title: "Disponível agora", value: "Disponível agora" },
          { title: "Lançamento em breve", value: "Lançamento em breve" },
          { title: "Pré-venda", value: "Pré-venda" },
          { title: "Últimas unidades", value: "Últimas unidades" },
          { title: "Esgotado", value: "Esgotado" },
          { title: "Consulte disponibilidade", value: "Consulte disponibilidade" },
          { title: "Sob encomenda", value: "Sob encomenda" },
        ],
      },
      group: "status",
    }),

    defineField({
      name: "featured",
      title: "Destacar na home",
      type: "boolean",
      description:
        "Ative para exibir este produto na seção de destaques da página inicial.",
      initialValue: false,
      group: "status",
    }),

    defineField({
      name: "isNew",
      title: "Produto novo",
      type: "boolean",
      description:
        "Marca o produto como novidade. Pode ser usado para filtros e seções especiais no site.",
      initialValue: false,
      group: "status",
    }),

    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      description:
        "Posição na listagem do catálogo. Menor número aparece primeiro. Use múltiplos de 10 para facilitar reordenação.",
      initialValue: 0,
      group: "status",
    }),

    // ─── ABA: CAMPOS LEGADOS ─────────────────────────────────────────────────────
    // Mantidos apenas para não quebrar dados existentes. Use 'Variações' acima.

    defineField({
      name: "sizes",
      title: "Tamanhos (legado)",
      type: "array",
      description:
        "⚠ Campo antigo. Use 'Variações e Preço' para novos cadastros. Este campo é usado como fallback automático para produtos sem variações estruturadas.",
      group: "legado",
      of: [
        {
          type: "string",
          options: {
            list: SIZE_OPTIONS,
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),

    defineField({
      name: "colors",
      title: "Cores (legado)",
      type: "array",
      description:
        "⚠ Campo antigo. Use 'Variações e Preço' para novos cadastros. Este campo é usado como fallback automático para produtos sem variações estruturadas.",
      group: "legado",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.unique(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "category.title",
      media: "image",
      unitPrice: "unitPrice",
      ativo: "ativo",
      featured: "featured",
      isNew: "isNew",
      shortDesc: "shortDescription",
      variants: "variants",
      sizes: "sizes",
      colors: "colors",
    },
    prepare({
      title,
      subtitle,
      media,
      unitPrice,
      ativo,
      featured,
      isNew,
      shortDesc,
      variants,
      sizes,
      colors,
    }) {
      const isActive = ativo !== false;
      const hasImage = Boolean(
        media && (media as { asset?: unknown }).asset,
      );
      const hasPrice =
        typeof unitPrice === "number" && unitPrice > 0;
      const hasDesc =
        typeof shortDesc === "string" && shortDesc.trim().length > 0;

      const variantList = Array.isArray(variants) ? variants : [];
      const hasVariants = variantList.length > 0;
      const hasLegacy =
        (Array.isArray(sizes) && sizes.length > 0) ||
        (Array.isArray(colors) && colors.length > 0);
      const allOutOfStock =
        hasVariants &&
        variantList.every((v: unknown) => {
          const variant = v as { stock?: number };
          return (
            typeof variant.stock === "number" && variant.stock === 0
          );
        });

      // Problemas detectados (apenas para produtos ativos)
      const issues: string[] = [];
      if (isActive) {
        if (!hasImage) issues.push("Sem imagem");
        if (!hasPrice) issues.push("Sem preço");
        if (!hasDesc) issues.push("Sem descrição");
        if (!hasVariants && !hasLegacy) issues.push("Sem variações");
        if (allOutOfStock) issues.push("Tudo esgotado");
      }

      // Prefixo visual
      // ◌ = inativo | ⚠ = ativo com problema | (sem prefixo) = ativo e completo
      const prefix = !isActive ? "◌ " : issues.length > 0 ? "⚠ " : "";

      // Badges no título
      const badges: string[] = [];
      if (!isActive) badges.push("INATIVO");
      if (featured) badges.push("★");
      if (isNew) badges.push("Novo");
      if (hasLegacy && !hasVariants) badges.push("Legado");
      const badgeStr = badges.length ? ` [${badges.join(" · ")}]` : "";

      // Linha de subtítulo
      const category = subtitle ?? "Sem categoria";
      const price = hasPrice
        ? `R$ ${unitPrice.toFixed(2).replace(".", ",")}`
        : "Sob consulta";
      const varInfo = hasVariants
        ? `${variantList.length} var.`
        : hasLegacy
          ? "Dados legados"
          : "Sem variações";

      // Issues aparecem no subtítulo apenas quando houver problemas
      const subtitleParts = [category, price, varInfo, ...issues];

      return {
        title: `${prefix}${title ?? "Produto sem nome"}${badgeStr}`,
        subtitle: subtitleParts.join(" · "),
        media,
      };
    },
  },
});
