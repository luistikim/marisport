# Seed da Mari Sport

Este projeto inclui um seed TypeScript para popular o Sanity com os dados atuais do site.

## Como rodar

```bash
npm run seed
```

## Dependências

- `@sanity/client` para escrita no Sanity
- Node 24+ com suporte a `--experimental-strip-types`

## Variáveis de ambiente

Defina estas variáveis no `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_WRITE_TOKEN`

## O que o seed faz

- Cria ou substitui os documentos de:
  - home
  - produtos
  - categorias
  - contato
  - sobre a marca
  - configuração do site
- Reaproveita os IDs fixos para evitar duplicação
- Faz upload das imagens locais encontradas em `public/`

## Observação

O seed foi feito para refletir o conteúdo atual do projeto. Se você alterar o conteúdo local depois, basta rodar `npm run seed` novamente para sincronizar o CMS.
