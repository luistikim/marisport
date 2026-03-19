import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "";

export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() ?? "2026-03-19";

export const sanityConfigured = Boolean(sanityProjectId && sanityDataset);
