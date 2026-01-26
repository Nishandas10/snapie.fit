import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://snapie.fit";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "daily" as const },
    { path: "/calculators", priority: 0.9, changeFrequency: "weekly" as const },
    {
      path: "/calculators/bmr-calculator",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/calculators/tdee-calculator",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/calculators/macro-calculator",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/calculators/bmi-calculator",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/calculators/calorie-deficit-calculator",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/calculators/body-fat-calculator",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/calculators/steps-to-calories-calculator",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/calculators/water-intake-calculator",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/calculators/protein-intake-calculator",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/calculators/intermittent-fasting-calculator",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    // Blog/Guide Pages
    {
      path: "/guide/The-Ultimate-Low-Glycemic-Food-List",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/guide/7-Day-Low-Glycemic-Diet-Plan-for-Beginners",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
  ];

  const lastModified = new Date();

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
