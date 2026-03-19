import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityDataset, sanityProjectId } from "./src/sanity/lib/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

if (!sanityProjectId || !sanityDataset) {
  throw new Error(
    "Defina NEXT_PUBLIC_SANITY_PROJECT_ID e NEXT_PUBLIC_SANITY_DATASET para abrir o Studio.",
  );
}

export default defineConfig({
  name: "marisport-studio",
  title: "Mari Sport Studio",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
