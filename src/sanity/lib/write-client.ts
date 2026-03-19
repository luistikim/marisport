import { createClient } from "@sanity/client";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "./env.ts";

const writeToken = process.env.SANITY_WRITE_TOKEN?.trim() ?? "";

if (!writeToken) {
  // The seed script will surface a clearer error, but this keeps the helper safe to import.
}

export const sanityWriteConfigured = Boolean(
  sanityProjectId && sanityDataset && writeToken,
);

export const sanityWriteClient = sanityWriteConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      token: writeToken,
      useCdn: false,
      perspective: "published",
    })
  : null;
