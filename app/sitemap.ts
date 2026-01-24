import type { MetadataRoute } from "next";// app/sitemap.ts

import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // Ensure it caches like a static file

const SITE_URL = "https://snapie.fit";

const SITE_URL = "https://snapie.fit";

export default function sitemap(): MetadataRoute.Sitemap {

export default function sitemap(): MetadataRoute.Sitemap {  const routes = [

  const routes = [    { path: "/", priority: 1, changeFrequency: "daily" as const },

    { path: "/", priority: 1, changeFrequency: "daily" as const },    { path: "/calculators", priority: 0.9, changeFrequency: "weekly" as const },

    { path: "/calculators", priority: 0.9, changeFrequency: "weekly" as const },    {

    {      path: "/calculators/bmr-calculator",

      path: "/calculators/bmr-calculator",      priority: 0.8,

      priority: 0.8,      changeFrequency: "monthly" as const,

      changeFrequency: "weekly" as const,    },

    },    {

    {      path: "/calculators/tdee-calculator",

      path: "/calculators/tdee-calculator",      priority: 0.8,

      priority: 0.8,      changeFrequency: "monthly" as const,

      changeFrequency: "weekly" as const,    },

    },    {

    {      path: "/calculators/macro-calculator",

      path: "/calculators/macro-calculator",      priority: 0.8,

      priority: 0.8,      changeFrequency: "monthly" as const,

      changeFrequency: "weekly" as const,    },

    },    {

    {      path: "/calculators/bmi-calculator",

      path: "/calculators/bmi-calculator",      priority: 0.8,

      priority: 0.8,      changeFrequency: "monthly" as const,

      changeFrequency: "weekly" as const,    },

    },    {

    {      path: "/calculators/calorie-deficit-calculator",

      path: "/calculators/calorie-deficit-calculator",      priority: 0.8,

      priority: 0.8,      changeFrequency: "monthly" as const,

      changeFrequency: "weekly" as const,    },

    },    {

    {      path: "/calculators/body-fat-calculator",

      path: "/calculators/body-fat-calculator",      priority: 0.8,

      priority: 0.8,      changeFrequency: "monthly" as const,

      changeFrequency: "weekly" as const,    },

    },    {

    {      path: "/calculators/steps-to-calories-calculator",

      path: "/calculators/steps-to-calories-calculator",      priority: 0.8,

      priority: 0.8,      changeFrequency: "monthly" as const,

      changeFrequency: "weekly" as const,    },

    },    {

    {      path: "/calculators/water-intake-calculator",

      path: "/calculators/water-intake-calculator",      priority: 0.8,

      priority: 0.8,      changeFrequency: "monthly" as const,

      changeFrequency: "weekly" as const,    },

    },    {

    {      path: "/calculators/protein-intake-calculator",

      path: "/calculators/protein-intake-calculator",      priority: 0.8,

      priority: 0.8,      changeFrequency: "monthly" as const,

      changeFrequency: "weekly" as const,    },

    },    {

    {      path: "/calculators/intermittent-fasting-calculator",

      path: "/calculators/intermittent-fasting-calculator",      priority: 0.8,

      priority: 0.8,      changeFrequency: "monthly" as const,

      changeFrequency: "weekly" as const,    },

    },  ];

  ];

  const lastModified = new Date();

  const lastModified = new Date();

  return routes.map((r) => ({

  return routes.map((r) => ({    url: `${SITE_URL}${r.path}`,

    url: `${SITE_URL}${r.path}`,    lastModified,

    lastModified,    changeFrequency: r.changeFrequency,

    changeFrequency: r.changeFrequency,    priority: r.priority,

    priority: r.priority,  }));

  }));}

}
