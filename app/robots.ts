// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/private/", "/_next/"], // Block internal Next.js paths too
    },
    sitemap: "https://snapie.fit/sitemap.xml",
  };
}
