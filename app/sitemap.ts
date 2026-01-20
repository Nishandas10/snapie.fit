// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://snapie.fit";

  // Use a strictly formatted URL for the root
  return [
    {
      url: baseUrl, // Just the main domain
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // REMOVE all the objects with #features, #compare, etc.
    // Google ignores hashes (#) for indexing purposes anyway.
  ];
}
