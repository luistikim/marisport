import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityDataset, sanityProjectId } from "./src/sanity/lib/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "marisport-studio",
  title: "Mari Sport Studio",
  projectId: sanityProjectId || "missing-project-id",
  dataset: sanityDataset || "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
