import imageUrlBuilder from "@sanity/image-url";
import { sanityConfigured, sanityDataset, sanityProjectId } from "@/sanity/lib/env";

const builder = sanityConfigured
  ? imageUrlBuilder({
      projectId: sanityProjectId,
      dataset: sanityDataset,
    })
  : null;

export function sanityImageUrl(
  source: unknown | undefined,
) {
  if (!builder || !source) {
    return null;
  }

  return builder.image(source as Parameters<typeof builder.image>[0]).url();
}
