import { defineField, defineType } from "sanity";

export const contactType = defineType({
  name: "contato",
  title: "Contato",
  type: "document",
  fields: [
    defineField({
      name: "whatsappPhone",
      title: "WhatsApp - número",
      type: "string",
      description: "Use apenas números, com código do país.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsappMessage",
      title: "Mensagem inicial do WhatsApp",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactPhone",
      title: "Telefone exibido",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "E-mail",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram - @",
      type: "string",
    }),
    defineField({
      name: "instagramUrl",
      title: "Link do Instagram",
      type: "url",
    }),
    defineField({
      name: "atendimentoTitle",
      title: "Título do atendimento",
      type: "string",
    }),
    defineField({
      name: "atendimentoDescription",
      title: "Descrição do atendimento",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "atendimentoSchedule",
      title: "Horário de atendimento",
      type: "string",
    }),
    defineField({
      name: "atendimentoCoverage",
      title: "Abrangência",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "contactEmail",
      subtitle: "instagramHandle",
    },
  },
});

