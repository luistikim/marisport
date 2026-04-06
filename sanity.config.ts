import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import {
  BulbOutlineIcon,
  ColorWheelIcon,
  ControlsIcon,
  DashboardIcon,
  EditIcon,
  EnvelopeIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  HomeIcon,
  ImageIcon,
  PackageIcon,
  RestoreIcon,
  StarIcon,
  TagIcon,
  WarningOutlineIcon,
} from "@sanity/icons";
import { schemaTypes } from "./src/sanity/schemaTypes";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "";

// ─── Filtros GROQ reutilizáveis ───────────────────────────────────────────────
// "ativo != false" inclui documentos sem o campo ativo (compatibilidade)
const PRODUTO = `_type == "produto"`;
const ATIVO = `${PRODUTO} && ativo != false`;
const INATIVO = `${PRODUTO} && ativo == false`;

export default defineConfig({
  name: "default",
  title: "Mari Sport Studio",
  basePath: "/studio",
  projectId: sanityProjectId || "missing-project-id",
  dataset: sanityDataset || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Mari Sport")
          .items([
            // ─── Todos os produtos ────────────────────────────────────────────
            S.listItem()
              .title("Todos os Produtos")
              .icon(PackageIcon)
              .child(
                S.documentTypeList("produto")
                  .title("Todos os Produtos")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),

            // ─── Gestão do Catálogo (sub-lista com visões filtradas) ──────────
            S.listItem()
              .title("Gestão do Catálogo")
              .icon(DashboardIcon)
              .child(
                S.list()
                  .title("Gestão do Catálogo")
                  .items([
                    // Visões por estado de publicação
                    S.listItem()
                      .title("Produtos Ativos")
                      .icon(EyeOpenIcon)
                      .child(
                        S.documentList()
                          .title("Produtos Ativos")
                          .filter(ATIVO)
                          .defaultOrdering([
                            { field: "order", direction: "asc" },
                          ]),
                      ),

                    S.listItem()
                      .title("Produtos Inativos")
                      .icon(EyeClosedIcon)
                      .child(
                        S.documentList()
                          .title("Produtos Inativos")
                          .filter(INATIVO)
                          .defaultOrdering([
                            { field: "name", direction: "asc" },
                          ]),
                      ),

                    S.listItem()
                      .title("Em Destaque (Home)")
                      .icon(StarIcon)
                      .child(
                        S.documentList()
                          .title("Em Destaque")
                          .filter(`${PRODUTO} && featured == true`)
                          .defaultOrdering([
                            { field: "order", direction: "asc" },
                          ]),
                      ),

                    S.listItem()
                      .title("Novidades")
                      .icon(TagIcon)
                      .child(
                        S.documentList()
                          .title("Produtos Novos")
                          .filter(`${PRODUTO} && isNew == true`)
                          .defaultOrdering([
                            { field: "order", direction: "asc" },
                          ]),
                      ),

                    S.divider(),

                    // Visões de qualidade — identificam problemas de cadastro
                    S.listItem()
                      .title("Sem Preço Definido")
                      .icon(WarningOutlineIcon)
                      .child(
                        S.documentList()
                          .title("Ativos Sem Preço")
                          .filter(`${ATIVO} && !defined(unitPrice)`)
                          .defaultOrdering([
                            { field: "name", direction: "asc" },
                          ]),
                      ),

                    S.listItem()
                      .title("Sem Imagem Principal")
                      .icon(ImageIcon)
                      .child(
                        S.documentList()
                          .title("Ativos Sem Imagem")
                          .filter(`${ATIVO} && !defined(image.asset)`)
                          .defaultOrdering([
                            { field: "name", direction: "asc" },
                          ]),
                      ),

                    S.listItem()
                      .title("Sem Descrição Curta")
                      .icon(EditIcon)
                      .child(
                        S.documentList()
                          .title("Ativos Sem Descrição")
                          .filter(
                            `${ATIVO} && (!defined(shortDescription) || shortDescription == "")`,
                          )
                          .defaultOrdering([
                            { field: "name", direction: "asc" },
                          ]),
                      ),

                    S.listItem()
                      .title("Dados Legados (migrar)")
                      .icon(RestoreIcon)
                      .child(
                        S.documentList()
                          .title("Dados Legados para Migrar")
                          .filter(
                            // Tem tamanhos ou cores legados E não tem variações estruturadas
                            `${PRODUTO} && (count(sizes) > 0 || count(colors) > 0) && (!defined(variants) || count(variants) == 0)`,
                          )
                          .defaultOrdering([
                            { field: "name", direction: "asc" },
                          ]),
                      ),
                  ]),
              ),

            S.listItem()
              .title("Categorias")
              .icon(ColorWheelIcon)
              .child(
                S.documentTypeList("categoria")
                  .title("Categorias")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),

            S.divider(),

            // ─── Conteúdo do site ─────────────────────────────────────────────
            S.listItem()
              .title("Home")
              .icon(HomeIcon)
              .child(
                S.document()
                  .schemaType("home")
                  .documentId("home")
                  .title("Página inicial"),
              ),

            S.listItem()
              .title("Sobre a Marca")
              .icon(BulbOutlineIcon)
              .child(
                S.document()
                  .schemaType("sobreMarca")
                  .documentId("sobreMarca")
                  .title("Sobre a Marca"),
              ),

            S.listItem()
              .title("Contato")
              .icon(EnvelopeIcon)
              .child(
                S.document()
                  .schemaType("contato")
                  .documentId("contato")
                  .title("Contato"),
              ),

            S.divider(),

            // ─── Configurações ───────────────────────────────────────────────
            S.listItem()
              .title("Configurações do Site")
              .icon(ControlsIcon)
              .child(
                S.document()
                  .schemaType("configuracaoSite")
                  .documentId("configuracaoSite")
                  .title("Configurações do Site"),
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
