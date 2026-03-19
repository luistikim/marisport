import { defineField, defineType } from "sanity";

export const homeType = defineType({
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Selo do hero", type: "string" }),
    defineField({ name: "heroTitle", title: "Título principal", type: "string" }),
    defineField({ name: "heroDescription", title: "Subtítulo", type: "text", rows: 4 }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Botão principal", type: "string" }),
    defineField({ name: "heroPrimaryCtaHref", title: "Link do botão principal", type: "string" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Botão secundário", type: "string" }),
    defineField({ name: "heroSecondaryCtaHref", title: "Link do botão secundário", type: "string" }),
    defineField({
      name: "heroStats",
      title: "Cards rápidos do hero",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Título curto", type: "string" }),
            defineField({ name: "value", title: "Valor", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "identityEyebrow", title: "Título do bloco institucional", type: "string" }),
    defineField({ name: "identityTitle", title: "Título institucional", type: "string" }),
    defineField({ name: "identityDescription", title: "Texto institucional", type: "text", rows: 4 }),
    defineField({ name: "conversionEyebrow", title: "Título do bloco de conversão", type: "string" }),
    defineField({ name: "conversionDescription", title: "Texto de conversão", type: "text", rows: 4 }),
    defineField({ name: "benefitsEyebrow", title: "Título dos benefícios", type: "string" }),
    defineField({ name: "benefitsTitle", title: "Título dos benefícios", type: "string" }),
    defineField({ name: "benefitsDescription", title: "Descrição dos benefícios", type: "text", rows: 3 }),
    defineField({
      name: "benefitsItems",
      title: "Lista de benefícios",
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
    defineField({ name: "catalogEyebrow", title: "Título das categorias", type: "string" }),
    defineField({ name: "catalogTitle", title: "Título das categorias", type: "string" }),
    defineField({ name: "catalogCtaLabel", title: "Texto do botão do catálogo", type: "string" }),
    defineField({ name: "aboutEyebrow", title: "Título sobre a marca", type: "string" }),
    defineField({ name: "aboutTitle", title: "Título sobre a marca", type: "string" }),
    defineField({ name: "aboutDescription", title: "Descrição sobre a marca", type: "text", rows: 4 }),
    defineField({ name: "whyChooseTitle", title: "Título do bloco 'por que escolher'", type: "string" }),
    defineField({ name: "trustEyebrow", title: "Título da confiança", type: "string" }),
    defineField({ name: "trustTitle", title: "Título da confiança", type: "string" }),
    defineField({ name: "contactEyebrow", title: "Título do contato", type: "string" }),
    defineField({ name: "contactTitle", title: "Título do contato", type: "string" }),
    defineField({ name: "contactDescription", title: "Descrição do contato", type: "text", rows: 3 }),
    defineField({ name: "contactWhatsappDescription", title: "Texto do WhatsApp", type: "text", rows: 3 }),
    defineField({ name: "contactEmailDescription", title: "Texto do e-mail", type: "text", rows: 3 }),
    defineField({ name: "ctaEyebrow", title: "Título do CTA final", type: "string" }),
    defineField({ name: "ctaTitle", title: "Título do CTA final", type: "string" }),
    defineField({ name: "ctaDescription", title: "Descrição do CTA final", type: "text", rows: 3 }),
    defineField({ name: "ctaPrimaryCtaLabel", title: "Botão principal final", type: "string" }),
    defineField({ name: "ctaPrimaryCtaHref", title: "Link do botão principal final", type: "string" }),
    defineField({ name: "ctaSecondaryCtaLabel", title: "Botão secundário final", type: "string" }),
    defineField({ name: "ctaSecondaryCtaHref", title: "Link do botão secundário final", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Home" };
    },
  },
});

