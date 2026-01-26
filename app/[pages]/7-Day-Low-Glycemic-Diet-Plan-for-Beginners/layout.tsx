import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "7-Day Low Glycemic Diet Plan for Beginners (with Recipes & Macros)",
  description:
    "Complete 7-day low glycemic diet plan with 35 delicious recipes, exact calories, macros, and shopping lists. Control blood sugar, boost energy, and lose weight with this beginner-friendly low GI diet plan.",
  keywords: [
    "low glycemic diet plan",
    "low gi diet plan",
    "7 day low glycemic meal plan",
    "low glycemic recipes",
    "low gi foods",
    "blood sugar diet",
    "low glycemic meal plan for weight loss",
    "diabetic diet plan",
    "low gi diet for beginners",
    "glycemic index diet",
    "low glycemic breakfast",
    "low glycemic lunch",
    "low glycemic dinner",
    "low gi snacks",
    "blood sugar control diet",
  ],
  authors: [{ name: "Snapie AI" }],
  creator: "Snapie AI",
  publisher: "Snapie AI",
  alternates: {
    canonical: "/7-Day-Low-Glycemic-Diet-Plan-for-Beginners",
  },
  openGraph: {
    type: "article",
    url: "https://snapie.fit/7-Day-Low-Glycemic-Diet-Plan-for-Beginners",
    title: "7-Day Low Glycemic Diet Plan for Beginners (with Recipes & Macros)",
    description:
      "Complete 7-day low glycemic diet plan with 35 delicious recipes, exact calories, macros, and shopping lists. Control blood sugar, boost energy, and lose weight.",
    siteName: "Snapie AI",
    images: [
      {
        url: "/og-low-glycemic-diet-plan.png",
        width: 1200,
        height: 630,
        alt: "7-Day Low Glycemic Diet Plan for Beginners",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "7-Day Low Glycemic Diet Plan for Beginners",
    description:
      "Complete 7-day low GI diet plan with recipes, calories & macros. Free PDF download included.",
    images: ["/og-low-glycemic-diet-plan.png"],
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
  headline: "7-Day Low Glycemic Diet Plan for Beginners (with Recipes)",
  description:
    "A complete 7-day low glycemic diet plan designed for beginners with 35 delicious recipes, exact calorie counts, macros, and shopping lists.",
  image: "https://snapie.fit/og-low-glycemic-diet-plan.png",
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
  datePublished: "2026-01-26",
  dateModified: "2026-01-26",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://snapie.fit/7-Day-Low-Glycemic-Diet-Plan-for-Beginners",
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
      name: "Meal Planning",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is a low glycemic diet good for weight loss?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! A low GI diet is excellent for weight loss. It keeps you feeling full longer, reduces insulin levels (helping your body burn fat more efficiently), and naturally reduces cravings for sugary, high-calorie foods. Studies show people on low GI diets lose more weight and keep it off longer.",
      },
    },
    {
      "@type": "Question",
      name: "Can I follow a low glycemic diet plan if I have diabetes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A low glycemic diet is often recommended for people with type 2 diabetes or prediabetes, as it helps manage blood sugar levels naturally. However, if you're taking diabetes medication (especially insulin), always consult with your healthcare provider before making dietary changes.",
      },
    },
    {
      "@type": "Question",
      name: "What foods are included in a low GI diet plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Low GI foods include proteins (chicken, fish, eggs), non-starchy vegetables (spinach, broccoli, bell peppers), legumes (lentils, chickpeas, black beans), whole grains (steel-cut oats, quinoa, barley), low-sugar fruits (berries, apples, pears), and dairy (Greek yogurt, cheese).",
      },
    },
    {
      "@type": "Question",
      name: "How long until I see results on a low glycemic diet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most people notice improved energy levels and reduced cravings within 3-5 days. Weight loss typically becomes noticeable after 2-3 weeks. Blood sugar improvements can be seen almost immediately. For lasting results, follow a low GI eating pattern for at least 8-12 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "How many calories are in this 7-day low GI meal plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This meal plan averages around 1,500-1,700 calories per day, which works well for moderate weight loss for most adults. You can adjust portions based on your individual calorie needs.",
      },
    },
  ],
};

const recipeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "7-Day Low Glycemic Diet Plan Recipes",
  description: "35 delicious low GI recipes for a complete week of healthy eating",
  numberOfItems: 35,
  itemListElement: [
    {
      "@type": "Recipe",
      position: 1,
      name: "Greek Yogurt Power Bowl",
      description: "Creamy Greek yogurt topped with fresh berries, chia seeds, and almond butter",
      recipeCategory: "Breakfast",
      nutrition: {
        "@type": "NutritionInformation",
        calories: "385 calories",
        proteinContent: "28g",
        carbohydrateContent: "32g",
        fatContent: "18g",
        fiberContent: "8g",
      },
    },
    {
      "@type": "Recipe",
      position: 2,
      name: "Mediterranean Chickpea Salad",
      description: "Hearty chickpeas with cucumber, tomatoes, feta cheese, and olive oil dressing",
      recipeCategory: "Lunch",
      nutrition: {
        "@type": "NutritionInformation",
        calories: "445 calories",
        proteinContent: "18g",
        carbohydrateContent: "42g",
        fatContent: "24g",
        fiberContent: "12g",
      },
    },
    {
      "@type": "Recipe",
      position: 3,
      name: "Grilled Salmon with Quinoa & Vegetables",
      description: "Omega-3 rich salmon fillet served with fluffy quinoa and roasted broccoli",
      recipeCategory: "Dinner",
      nutrition: {
        "@type": "NutritionInformation",
        calories: "520 calories",
        proteinContent: "42g",
        carbohydrateContent: "35g",
        fatContent: "22g",
        fiberContent: "7g",
      },
    },
  ],
};

export default function LowGlycemicDietPlanLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      {children}
    </>
  );
}
