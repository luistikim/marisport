import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "configuracaoSite",
  title: "Configuração do site",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Nome do site",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Descrição do site",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "siteKeywords",
      title: "Palavras-chave",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "siteUrl",
      title: "URL principal",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Configuração do site" };
    },
  },
});

