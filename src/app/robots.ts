import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = getSiteContent();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
