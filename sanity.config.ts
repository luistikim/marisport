import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "";

export default defineConfig({
  name: "default",
  title: "Mari Sport Studio",
  basePath: "/studio",
  projectId: sanityProjectId || "missing-project-id",
  dataset: sanityDataset || "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
