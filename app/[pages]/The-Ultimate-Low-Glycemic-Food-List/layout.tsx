import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "500+ Low Glycemic Index Food List (Complete Guide) | 2026",
  description:
    "Comprehensive glycemic index food chart with 500+ low GI foods, fruits, snacks, and meals. Complete low glycemic foods list with GI values, glycemic load, calories, and macros for diabetics and healthy eating.",
  keywords: [
    "glycemic index food chart",
    "low glycemic diet plan",
    "low glycemic fruits",
    "low gi diet plan",
    "glycemic index of foods",
    "low gi snacks",
    "high glycemic foods",
    "low glycemic snacks",
    "low gi fruits",
    "low gi meal plan",
    "low glycemic foods list",
    "gi index of foods",
    "low glycemic index meal plan",
    "glycemic index chart for diabetics",
    "gi index chart",
    "low gi foods chart",
    "low glycemic index snacks",
    "high glycemic fruits",
    "low glycemic load foods",
    "low gi rice for diabetics",
    "foods low in glycemic index",
    "low gi foods",
    "blood sugar diet",
    "diabetic diet foods",
  ],
  authors: [{ name: "Snapie AI" }],
  creator: "Snapie AI",
  publisher: "Snapie AI",
  alternates: {
    canonical: "/The-Ultimate-Low-Glycemic-Food-List",
  },
  openGraph: {
    type: "article",
    url: "https://snapie.fit/The-Ultimate-Low-Glycemic-Food-List",
    title: "500+ Low Glycemic Index Food List (Complete Guide) | 2026",
    description:
      "Comprehensive glycemic index food chart with 500+ low GI foods, fruits, snacks, and meals. Perfect for diabetics and anyone following a low glycemic diet plan.",
    siteName: "Snapie AI",
    images: [
      {
        url: "/og-low-glycemic-food-list.png",
        width: 1200,
        height: 630,
        alt: "500+ Low Glycemic Index Food List - Complete Guide",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "500+ Low Glycemic Index Food List (Complete Guide) | 2026",
    description:
      "Comprehensive glycemic index food chart with 500+ foods. GI values, calories, and macros for healthy eating.",
    images: ["/og-low-glycemic-food-list.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// JSON-LD Schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "500+ Low Glycemic Index Food List (Complete Guide) | 2026",
  description:
    "Comprehensive glycemic index food chart with 500+ low GI foods including fruits, vegetables, grains, snacks, and international cuisines. Complete with GI values, glycemic load, calories, and macros.",
  image: "https://snapie.fit/og-low-glycemic-food-list.png",
  author: {
    "@type": "Organization",
    name: "Snapie AI",
    url: "https://snapie.fit",
  },
  publisher: {
    "@type": "Organization",
    name: "Snapie AI",
    logo: {
      "@type": "ImageObject",
      url: "https://snapie.fit/logo.png",
    },
  },
  datePublished: "2026-01-27",
  dateModified: "2026-01-27",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://snapie.fit/The-Ultimate-Low-Glycemic-Food-List",
  },
  about: [
    {
      "@type": "Thing",
      name: "Glycemic Index",
    },
    {
      "@type": "Thing",
      name: "Low Glycemic Diet",
    },
    {
      "@type": "Thing",
      name: "Blood Sugar Control",
    },
    {
      "@type": "Thing",
      name: "Diabetes Management",
    },
  ],
};

// FAQ Schema for rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a glycemic index food chart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A glycemic index food chart ranks foods based on how quickly they raise blood sugar levels. Foods are scored from 0-100, with low GI foods (0-55) causing slower, steadier rises in blood sugar, while high glycemic foods (70+) cause rapid spikes.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best low glycemic fruits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best low gi fruits include cherries (GI 22), grapefruit (GI 25), apples (GI 36), pears (GI 38), strawberries (GI 40), and oranges (GI 43). These low glycemic fruits provide vitamins and fiber without causing blood sugar spikes.",
      },
    },
    {
      "@type": "Question",
      name: "What low gi snacks can I eat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Great low glycemic snacks include nuts and seeds (GI 0-20), Greek yogurt (GI 12), hummus with vegetables, dark chocolate 85% (GI 23), and fresh berries. These low glycemic index snacks keep you full without spiking blood sugar.",
      },
    },
    {
      "@type": "Question",
      name: "Is a glycemic index chart helpful for diabetics?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, a glycemic index chart for diabetics is extremely helpful. It helps identify foods low in glycemic index that won't cause rapid blood sugar spikes. Low GI foods chart usage can improve blood sugar control and HbA1c levels.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between GI and glycemic load?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glycemic index (GI) measures how fast a food raises blood sugar, while glycemic load (GL) accounts for serving size. Low glycemic load foods consider both the quality and quantity of carbs. GL = (GI × carbs per serving) / 100.",
      },
    },
    {
      "@type": "Question",
      name: "Which rice has the lowest GI for diabetics?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best low gi rice for diabetics includes basmati rice (GI 58), brown rice (GI 50), and wild rice (GI 45). Cooling cooked rice increases resistant starch, further lowering its glycemic impact.",
      },
    },
  ],
};

// ItemList Schema for the food database
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Low Glycemic Index Food List",
  description: "Comprehensive list of 500+ foods with glycemic index values",
  numberOfItems: 504,
  itemListOrder: "https://schema.org/ItemListUnordered",
};

export default function LowGlycemicFoodListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {children}
    </>
  );
}
