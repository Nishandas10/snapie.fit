import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly disable trailing slashes (Next.js default, but ensures consistency with sitemap)
  trailingSlash: false,
};

export default nextConfig;
