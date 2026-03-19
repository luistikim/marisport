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
      name: "sizes",
      title: "Tamanhos",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "colors",
      title: "Cores",
      type: "array",
      of: [{ type: "string" }],
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
