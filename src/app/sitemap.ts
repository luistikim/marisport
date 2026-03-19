import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/content";

const routes = ["", "/produtos", "/quem-somos", "/contato", "/carrinho"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { siteUrl } = await getSiteSettings();
  const updatedAt = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: updatedAt,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
