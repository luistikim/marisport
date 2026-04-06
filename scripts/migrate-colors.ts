/**
 * migrate-colors.ts
 *
 * Auditoria e migração de cores legadas no Sanity para a lista controlada.
 *
 * Uso:
 *   npx tsx scripts/migrate-colors.ts            → mostra relatório sem alterar nada
 *   npx tsx scripts/migrate-colors.ts --apply    → aplica a migração automaticamente
 *
 * Pré-requisito: SANITY_WRITE_TOKEN em .env.local
 */

import { createClient } from "@sanity/client";
import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "../src/sanity/lib/env.ts";

// ─── Lista oficial de cores (deve ser idêntica à do schema product.ts) ────────

const VALID_COLORS = new Set([
  "Preto",
  "Branco",
  "Cinza",
  "Cinza Mescla",
  "Grafite",
  "Azul Marinho",
  "Azul",
  "Azul Royal",
  "Azul Bebê",
  "Verde",
  "Verde Militar",
  "Verde Musgo",
  "Vermelho",
  "Rosa",
  "Rosa Bebê",
  "Rosa Chá",
  "Rose",
  "Coral",
  "Salmão",
  "Amarelo",
  "Laranja",
  "Roxo",
  "Lilás",
  "Bege",
  "Marrom",
  "Caramelo",
  "Terracota",
  "Vinho",
  "Dourado",
  "Prata",
]);

// ─── Mapeamento de valores legados → valor padrão ────────────────────────────
// Adicione aqui qualquer valor encontrado na base que precise ser mapeado.

const COLOR_MAP: Record<string, string> = {
  // Caixa baixa / título (normalizações simples)
  preto: "Preto",
  branco: "Branco",
  cinza: "Cinza",
  grafite: "Grafite",
  azul: "Azul",
  verde: "Verde",
  vermelho: "Vermelho",
  rosa: "Rosa",
  rose: "Rose",
  coral: "Coral",
  salmao: "Salmão",
  amarelo: "Amarelo",
  laranja: "Laranja",
  roxo: "Roxo",
  lilas: "Lilás",
  bege: "Bege",
  marrom: "Marrom",
  caramelo: "Caramelo",
  terracota: "Terracota",
  vinho: "Vinho",
  dourado: "Dourado",
  prata: "Prata",

  // Abreviações / nomes alternativos comuns
  marinho: "Azul Marinho",
  "azul marinho": "Azul Marinho",
  navy: "Azul Marinho",
  "azul navy": "Azul Marinho",
  royal: "Azul Royal",
  "azul royal": "Azul Royal",
  bebe: "Azul Bebê",
  "azul bebe": "Azul Bebê",
  "rosa bebe": "Rosa Bebê",
  "rosa cha": "Rosa Chá",
  mescla: "Cinza Mescla",
  "cinza mescla": "Cinza Mescla",
  "verde militar": "Verde Militar",
  militar: "Verde Militar",
  musgo: "Verde Musgo",
  "verde musgo": "Verde Musgo",
  "cinza escuro": "Grafite",
  chumbo: "Grafite",
  salmon: "Salmão",
  "lilac": "Lilás",
  camel: "Caramelo",
  terra: "Terracota",
  bordo: "Vinho",
  bordô: "Vinho",
  ouro: "Dourado",
  gold: "Dourado",
  silver: "Prata",
  off: "Bege",
  "off white": "Bege",
  creme: "Bege",
};

// ─── Normaliza um valor legado para lookup no mapa ───────────────────────────

function normalizeKey(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function mapColor(value: string): { mapped: string; status: "valid" | "mapped" | "unknown" } {
  // Já está na lista oficial
  if (VALID_COLORS.has(value)) {
    return { mapped: value, status: "valid" };
  }

  // Tenta encontrar no mapa (normalizado)
  const key = normalizeKey(value);
  const mapped = COLOR_MAP[key];

  if (mapped) {
    return { mapped, status: "mapped" };
  }

  // Tenta Title Case simples (ex: "PRETO" → "Preto")
  const titleCased = value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (VALID_COLORS.has(titleCased)) {
    return { mapped: titleCased, status: "mapped" };
  }

  return { mapped: value, status: "unknown" };
}

// ─── Tipos ───────────────────────────────────────────────────────────────────

type SanityVariant = {
  _key?: string;
  size?: string;
  color?: string;
  stock?: number;
  priceOverride?: number;
  sku?: string;
};

type SanityProduct = {
  _id: string;
  name?: string;
  slug?: { current?: string };
  variants?: SanityVariant[];
};

type ColorIssue = {
  productId: string;
  productName: string;
  variantKey: string;
  size: string;
  originalColor: string;
  suggestedColor: string;
  status: "valid" | "mapped" | "unknown";
};

// ─── Main ────────────────────────────────────────────────────────────────────

async function run() {
  const applyFlag = process.argv.includes("--apply");

  const writeToken = process.env.SANITY_WRITE_TOKEN?.trim() ?? "";

  if (!sanityProjectId || !sanityDataset) {
    console.error(
      "Erro: defina NEXT_PUBLIC_SANITY_PROJECT_ID e NEXT_PUBLIC_SANITY_DATASET em .env.local",
    );
    process.exitCode = 1;
    return;
  }

  if (applyFlag && !writeToken) {
    console.error(
      "Erro: defina SANITY_WRITE_TOKEN em .env.local para usar --apply",
    );
    process.exitCode = 1;
    return;
  }

  const client = createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    token: writeToken || undefined,
    useCdn: false,
    perspective: "published",
  });

  console.log(
    `\n${applyFlag ? "🔧 MODO APLICAR" : "🔍 MODO AUDITORIA (dry-run)"}\n`,
  );
  console.log(`Buscando produtos no dataset "${sanityDataset}"...`);

  const products = await client.fetch<SanityProduct[]>(
    `*[_type == "produto"]{
      _id,
      name,
      slug,
      variants[]{
        _key,
        size,
        color,
        stock,
        priceOverride,
        sku
      }
    }`,
  );

  console.log(`${products.length} produto(s) encontrado(s).\n`);

  const issues: ColorIssue[] = [];
  const unknowns: ColorIssue[] = [];

  for (const product of products) {
    if (!product.variants?.length) continue;

    for (const variant of product.variants) {
      if (!variant.color) continue;

      const { mapped, status } = mapColor(variant.color);

      if (status !== "valid") {
        const issue: ColorIssue = {
          productId: product._id,
          productName: product.name ?? product.slug?.current ?? product._id,
          variantKey: variant._key ?? "?",
          size: variant.size ?? "?",
          originalColor: variant.color,
          suggestedColor: mapped,
          status,
        };

        issues.push(issue);
        if (status === "unknown") {
          unknowns.push(issue);
        }
      }
    }
  }

  // ─── Relatório ──────────────────────────────────────────────────────────────

  if (!issues.length) {
    console.log("✅ Todas as cores estão na lista oficial. Nenhuma migração necessária.\n");
    return;
  }

  const mapped = issues.filter((i) => i.status === "mapped");

  if (mapped.length) {
    console.log(
      `📋 ${mapped.length} variação(ões) com cor não-padrão que PODEM ser migradas automaticamente:\n`,
    );

    for (const issue of mapped) {
      console.log(
        `  [${issue.productName}]  ${issue.size} / "${issue.originalColor}" → "${issue.suggestedColor}"`,
      );
    }

    console.log();
  }

  if (unknowns.length) {
    console.log(
      `⚠  ${unknowns.length} variação(ões) com cor DESCONHECIDA (precisam de intervenção manual):\n`,
    );

    for (const issue of unknowns) {
      console.log(
        `  [${issue.productName}]  ${issue.size} / "${issue.originalColor}" — sem sugestão automática`,
      );
    }

    console.log();
    console.log(
      "  → Para resolver: abra o produto no Studio e selecione a cor correta na lista.",
    );
    console.log(
      "  → Para adicionar ao mapa automático: edite COLOR_MAP neste script e rode novamente.\n",
    );
  }

  // ─── Aplicação ──────────────────────────────────────────────────────────────

  if (!applyFlag) {
    console.log(
      `ℹ  Rode com --apply para aplicar as ${mapped.length} migração(ões) automática(s).\n`,
    );
    return;
  }

  if (!mapped.length) {
    console.log("Nenhuma migração automática disponível. Verifique os desconhecidos acima.\n");
    return;
  }

  console.log(`Aplicando ${mapped.length} migração(ões)...\n`);

  // Agrupa por produto para fazer uma única mutação por documento
  const byProduct = new Map<string, { product: SanityProduct; issues: ColorIssue[] }>();

  for (const issue of mapped) {
    if (!byProduct.has(issue.productId)) {
      const product = products.find((p) => p._id === issue.productId)!;
      byProduct.set(issue.productId, { product, issues: [] });
    }
    byProduct.get(issue.productId)!.issues.push(issue);
  }

  let successCount = 0;
  let errorCount = 0;

  for (const [productId, { product, issues: productIssues }] of byProduct) {
    try {
      // Reconstrói o array de variants com as cores corrigidas
      const updatedVariants = (product.variants ?? []).map((variant) => {
        const issue = productIssues.find((i) => i.variantKey === variant._key);

        if (!issue) return variant;

        return { ...variant, color: issue.suggestedColor };
      });

      await client
        .patch(productId)
        .set({ variants: updatedVariants })
        .commit();

      for (const issue of productIssues) {
        console.log(
          `  ✅ [${issue.productName}]  ${issue.size} / "${issue.originalColor}" → "${issue.suggestedColor}"`,
        );
      }

      successCount++;
    } catch (error) {
      console.error(
        `  ❌ [${productId}] Erro ao atualizar:`,
        error instanceof Error ? error.message : error,
      );
      errorCount++;
    }
  }

  console.log(
    `\nMigração concluída: ${successCount} produto(s) atualizados, ${errorCount} erro(s).`,
  );

  if (unknowns.length) {
    console.log(
      `\n⚠  ${unknowns.length} variação(ões) desconhecidas precisam ser corrigidas manualmente no Studio.`,
    );
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
