import type { MetadataRoute } from "next";import type { MetadataRoute } from "next";// app/sitemap.ts



export const dynamic = "force-static";import type { MetadataRoute } from "next";



const SITE_URL = "https://snapie.fit";export const dynamic = "force-static"; // Ensure it caches like a static file



export default function sitemap(): MetadataRoute.Sitemap {const SITE_URL = "https://snapie.fit";

  const routes = [

    { path: "/", priority: 1, changeFrequency: "daily" as const },const SITE_URL = "https://snapie.fit";

    { path: "/calculators", priority: 0.9, changeFrequency: "weekly" as const },

    {export default function sitemap(): MetadataRoute.Sitemap {

      path: "/calculators/bmr-calculator",

      priority: 0.8,export default function sitemap(): MetadataRoute.Sitemap {  const routes = [

      changeFrequency: "weekly" as const,

    },  const routes = [    { path: "/", priority: 1, changeFrequency: "daily" as const },

    {

      path: "/calculators/tdee-calculator",    { path: "/", priority: 1, changeFrequency: "daily" as const },    { path: "/calculators", priority: 0.9, changeFrequency: "weekly" as const },

      priority: 0.8,

      changeFrequency: "weekly" as const,    { path: "/calculators", priority: 0.9, changeFrequency: "weekly" as const },    {

    },

    {    {      path: "/calculators/bmr-calculator",

      path: "/calculators/macro-calculator",

      priority: 0.8,      path: "/calculators/bmr-calculator",      priority: 0.8,

      changeFrequency: "weekly" as const,

    },      priority: 0.8,      changeFrequency: "monthly" as const,

    {

      path: "/calculators/bmi-calculator",      changeFrequency: "weekly" as const,    },

      priority: 0.8,

      changeFrequency: "weekly" as const,    },    {

    },

    {    {      path: "/calculators/tdee-calculator",

      path: "/calculators/calorie-deficit-calculator",

      priority: 0.8,      path: "/calculators/tdee-calculator",      priority: 0.8,

      changeFrequency: "weekly" as const,

    },      priority: 0.8,      changeFrequency: "monthly" as const,

    {

      path: "/calculators/body-fat-calculator",      changeFrequency: "weekly" as const,    },

      priority: 0.8,

      changeFrequency: "weekly" as const,    },    {

    },

    {    {      path: "/calculators/macro-calculator",

      path: "/calculators/steps-to-calories-calculator",

      priority: 0.8,      path: "/calculators/macro-calculator",      priority: 0.8,

      changeFrequency: "weekly" as const,

    },      priority: 0.8,      changeFrequency: "monthly" as const,

    {

      path: "/calculators/water-intake-calculator",      changeFrequency: "weekly" as const,    },

      priority: 0.8,

      changeFrequency: "weekly" as const,    },    {

    },

    {    {      path: "/calculators/bmi-calculator",

      path: "/calculators/protein-intake-calculator",

      priority: 0.8,      path: "/calculators/bmi-calculator",      priority: 0.8,

      changeFrequency: "weekly" as const,

    },      priority: 0.8,      changeFrequency: "monthly" as const,

    {

      path: "/calculators/intermittent-fasting-calculator",      changeFrequency: "weekly" as const,    },

      priority: 0.8,

      changeFrequency: "weekly" as const,    },    {

    },

  ];    {      path: "/calculators/calorie-deficit-calculator",



  const lastModified = new Date();      path: "/calculators/calorie-deficit-calculator",      priority: 0.8,



  return routes.map((r) => ({      priority: 0.8,      changeFrequency: "monthly" as const,

    url: `${SITE_URL}${r.path}`,

    lastModified,      changeFrequency: "weekly" as const,    },

    changeFrequency: r.changeFrequency,

    priority: r.priority,    },    {

  }));

}    {      path: "/calculators/body-fat-calculator",


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
