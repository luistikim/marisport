import { createClient } from "next-sanity";
import {
  sanityApiVersion,
  sanityConfigured,
  sanityDataset,
  sanityProjectId,
} from "@/sanity/lib/env";

function createSanityClient(useCdn: boolean) {
  return sanityConfigured
    ? createClient({
        projectId: sanityProjectId,
        dataset: sanityDataset,
        apiVersion: sanityApiVersion,
        useCdn,
      })
    : null;
}

export function getClient() {
  return createSanityClient(true);
}

export function getClientNoCache() {
  return createSanityClient(false);
}

export const sanityClient = getClient();
export const sanityClientNoCache = getClientNoCache();
