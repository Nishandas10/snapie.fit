// app/sitemap.ts
import type { MetadataRoute } from "next";

// Generates sitemap.xml at build time or on request (depending on your Next.js config)
// Set NEXT_PUBLIC_SITE_URL in your environment (e.g., https://snapie.fit)
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://snapie.fit"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  // List only public, crawlable routes here. Auth-only pages are intentionally excluded.
  const routes: Array<{
    path: string;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
  }> = [{ path: "/", priority: 1, changeFrequency: "daily" }];

  const lastModified = new Date();

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency || "weekly",
    priority: r.priority ?? 0.7,
  }));
}
