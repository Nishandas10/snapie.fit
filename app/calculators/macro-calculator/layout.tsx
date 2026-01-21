import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Macro Calculator - Calculate Protein, Carbs & Fats | Snapie AI",
  description: "Free Macro Calculator to find your optimal macronutrient split. Calculate protein, carbs, and fat targets based on your goals - weight loss, muscle building, or maintenance.",
  keywords: "macro calculator, macronutrient calculator, protein calculator, carbs calculator, fat calculator, IIFYM calculator, flexible dieting, muscle building macros, weight loss macros, keto macros",
  openGraph: {
    title: "Macro Calculator - Calculate Protein, Carbs & Fats | Snapie AI",
    description: "Calculate your optimal macros for weight loss, muscle gain, or maintenance. Free macro calculator with personalized protein, carbs, and fat targets.",
    url: "https://snapie.fit/calculators/macro-calculator",
    siteName: "Snapie AI",
    images: [
      {
        url: "/screenshots/2.png",
        width: 1200,
        height: 630,
        alt: "Macro Calculator - Snapie AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Macro Calculator - Calculate Your Optimal Macros",
    description: "Free Macro Calculator for protein, carbs, and fats. Get personalized targets for your fitness goals.",
    images: ["/screenshots/2.png"],
  },
  alternates: {
    canonical: "/calculators/macro-calculator",
  },
};

export default function MacroCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
