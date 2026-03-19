import { defineField, defineType } from "sanity";

export const aboutBrandType = defineType({
  name: "sobreMarca",
  title: "Sobre a marca",
  type: "document",
  fields: [
    defineField({
      name: "coupleStory",
      title: "História do casal",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "text", title: "Texto", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: "brandPillars",
      title: "Pilares da marca",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "text", title: "Texto", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: "brandStoryMoments",
      title: "Blocos da história",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "text", title: "Texto", type: "text", rows: 4 }),
            defineField({ name: "image", title: "Imagem", type: "image", options: { hotspot: true } }),
          ],
        },
      ],
    }),
    defineField({
      name: "brandChannels",
      title: "Canais e links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "text", title: "Texto", type: "text", rows: 3 }),
            defineField({ name: "href", title: "Link", type: "url" }),
            defineField({ name: "cta", title: "Texto do botão", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "trustSignals",
      title: "Sinais de confiança",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "whyChooseMariSport",
      title: "Por que escolher",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "text", title: "Texto", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Sobre a marca",
      };
    },
  },
});

