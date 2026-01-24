// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

const SITE_URL = "https://snapie.fit";

// List only public, crawlable routes here
const routes = [
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

function generateSitemapXml(): string {
  const lastModified = new Date().toISOString();

  const urlEntries = routes
    .map(
      (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSitemapXml();

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}
