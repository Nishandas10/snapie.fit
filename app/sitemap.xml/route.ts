import { NextResponse } from "next/server";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://snapie.fit"
).replace(/\/$/, "");

const ROUTES: Array<{
  path: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/calculators", changeFrequency: "weekly", priority: 0.9 },
  {
    path: "/calculators/bmr-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/calculators/tdee-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/calculators/macro-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/calculators/bmi-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/calculators/calorie-deficit-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/calculators/body-fat-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/calculators/steps-to-calories-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/calculators/water-intake-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/calculators/protein-intake-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/calculators/intermittent-fasting-calculator",
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildSitemap = () => {
  const lastModified = new Date().toISOString();
  const urls = ROUTES.map((route) => {
    const loc = `${SITE_URL}${route.path}`;
    return [
      "  <url>",
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${lastModified}</lastmod>`,
      `    <changefreq>${route.changeFrequency}</changefreq>`,
      `    <priority>${route.priority.toFixed(1)}</priority>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
};

export const runtime = "nodejs";
export const revalidate = 86400;

export function GET() {
  const xml = buildSitemap();
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, must-revalidate",
    },
  });
}
