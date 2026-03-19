import { createClient } from "next-sanity";
import {
  sanityApiVersion,
  sanityConfigured,
  sanityDataset,
  sanityProjectId,
} from "@/sanity/lib/env";

export const sanityClient = sanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
    })
  : null;

