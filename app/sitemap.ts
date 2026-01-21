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
  }> = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/calculators", priority: 0.9, changeFrequency: "weekly" },
    {
      path: "/calculators/bmr-calculator",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/calculators/tdee-calculator",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/calculators/macro-calculator",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/calculators/bmi-calculator",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/calculators/calorie-deficit-calculator",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/calculators/body-fat-calculator",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/calculators/steps-to-calories-calculator",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/calculators/water-intake-calculator",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/calculators/protein-intake-calculator",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/calculators/intermittent-fasting-calculator",
      priority: 0.8,
      changeFrequency: "monthly",
    },
  ];

  const lastModified = new Date();

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency || "weekly",
    priority: r.priority ?? 0.7,
  }));
}
