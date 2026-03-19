import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

const routes = ["", "/produtos", "/quem-somos", "/contato", "/carrinho"];

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: updatedAt,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
