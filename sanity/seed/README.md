# Seed inicial Mari Sport

Este arquivo `initial.ndjson` pode ser importado no Sanity para criar o conteúdo inicial do projeto.

Opção 1: importar com a CLI do Sanity

```bash
npx sanity dataset import sanity/seed/initial.ndjson production --replace
```

Opção 2: importar pelo painel do Sanity
- Abra o Studio em `/studio`
- Crie os documentos manualmente com base neste seed

Observações
- Os documentos foram criados com os `_type` usados nos schemas atuais.
- Os produtos já estão ligados às categorias por referência.
- As imagens dos produtos podem ser adicionadas depois no Studio, sem afetar o site.
