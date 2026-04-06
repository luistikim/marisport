import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "produto",
  title: "Produto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome do produto",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Selo",
      type: "string",
      description: "Ex.: Mais vendido, Novo, Performance.",
    }),
    defineField({
      name: "shortDescription",
      title: "Descrição curta",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fullDescription",
      title: "Descrição completa",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "unitPrice",
      title: "Preço",
      type: "number",
      description: "Deixe vazio se o preço ainda estiver sob consulta.",
    }),
    defineField({
      name: "originalPrice",
      title: "Preço original",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Imagem principal",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "Galeria de imagens",
      type: "array",
      description: "Adicione várias imagens e arraste para ordenar.",
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
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "categoria" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variants",
      title: "Variantes",
      type: "array",
      description: "Cadastre uma combinação por linha com tamanho, cor e estoque.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "size",
              title: "Tamanho",
              type: "string",
              options: {
                list: [
                  { title: "PP", value: "PP" },
                  { title: "P", value: "P" },
                  { title: "M", value: "M" },
                  { title: "G", value: "G" },
                  { title: "GG", value: "GG" },
                  { title: "XG", value: "XG" },
                  { title: "Único", value: "Único" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "color",
              title: "Cor",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "stock",
              title: "Estoque",
              type: "number",
              initialValue: 0,
              validation: (Rule) => Rule.required().integer().min(0),
            }),
          ],
          preview: {
            select: {
              size: "size",
              color: "color",
              stock: "stock",
            },
            prepare({ size, color, stock }) {
              return {
                title: `${size ?? "?"} / ${color ?? "?"}`,
                subtitle: `Estoque: ${typeof stock === "number" ? stock : 0}`,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((variants) => {
          if (!Array.isArray(variants)) {
            return true;
          }

          const seen = new Set<string>();

          for (const variant of variants) {
            if (!variant || typeof variant !== "object") {
              continue;
            }

            const typedVariant = variant as {
              size?: string;
              color?: string;
            };
            const size = typedVariant.size?.trim().toLowerCase() ?? "";
            const color = typedVariant.color?.trim().toLowerCase() ?? "";
            const key = `${size}::${color}`;

            if (seen.has(key)) {
              return "Cada combinação de tamanho e cor deve aparecer apenas uma vez.";
            }

            seen.add(key);
          }

          return true;
        }),
    }),
    defineField({
      name: "sizes",
      title: "Tamanhos",
      type: "array",
      description: "Campo legado temporário. Prefira cadastrar as combinações em Variantes.",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "PP", value: "PP" },
              { title: "P", value: "P" },
              { title: "M", value: "M" },
              { title: "G", value: "G" },
              { title: "GG", value: "GG" },
              { title: "XG", value: "XG" },
              { title: "Único", value: "Único" },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "colors",
      title: "Cores",
      type: "array",
      description: "Campo legado temporário. Prefira cadastrar as combinações em Variantes.",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "statusLabel",
      title: "Status",
      type: "string",
      description: "Ex.: Disponível agora, Lançamento em breve.",
    }),
    defineField({
      name: "featured",
      title: "Destacar na home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.title",
      media: "image",
    },
  },
});
