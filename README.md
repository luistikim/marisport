# Mari Sport

Loja online da Mari Sport feita com Next.js e Sanity, com catálogo de produtos, carrinho, checkout e Studio para edição de conteúdo.

## Stack

- Next.js 16
- React 19
- Sanity Studio
- Tailwind CSS 4
- Embla Carousel

## Recursos

- Home com seções institucionais e catálogo em destaque
- Página de produtos com cards e detalhes individuais
- Galeria de imagens por produto com carrossel e lightbox
- Carrinho com envio por WhatsApp, e-mail e checkout
- Studio em `/studio` para edição do conteúdo

## Variáveis de ambiente

Crie um arquivo `.env.local` com as variáveis necessárias:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-19
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_CONTACT_WHATSAPP_PHONE=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_INSTAGRAM_URL=
MERCADO_PAGO_ACCESS_TOKEN=
MERCADO_PAGO_WEBHOOK_SECRET=
KV_REST_API_URL=
KV_REST_API_TOKEN=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
ORDER_NOTIFICATION_EMAIL=
```

## Rodar localmente

```bash
npm install
npm run dev
```

Abra:

- Site: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

## Build e deploy

```bash
npm run build
```

Para publicar na Vercel:

```bash
npx vercel --prod
```

## Sanity

Os schemas ficam em `src/sanity/schemaTypes/`.

O schema principal de produto é `src/sanity/schemaTypes/product.ts`, que inclui:

- nome
- slug
- imagem principal
- galeria de imagens
- preço
- categoria
- tamanhos e cores

## Observação

Quando atualizar o conteúdo no Sanity Studio, faça deploy da aplicação para refletir as mudanças no site e no Studio hospedado.
