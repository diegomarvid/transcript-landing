import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const pages = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/changelog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/support", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
