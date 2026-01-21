import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Fitness Calculators - BMR, TDEE, Macros, BMI, Body Fat | Snapie AI",
  description: "Free fitness and nutrition calculators: BMR Calculator, TDEE Calculator, Macro Calculator, BMI Calculator, Body Fat Calculator, and Calorie Deficit Planner. Accurate, science-based tools for your fitness goals.",
  keywords: "fitness calculators, BMR calculator, TDEE calculator, macro calculator, BMI calculator, body fat calculator, calorie calculator, nutrition calculator, weight loss calculator, muscle building calculator",
  openGraph: {
    title: "Free Fitness Calculators - BMR, TDEE, Macros, BMI, Body Fat | Snapie AI",
    description: "Free, accurate fitness calculators for BMR, TDEE, macros, BMI, body fat, and calorie planning. Science-based tools for your health goals.",
    url: "https://snapie.fit/calculators",
    siteName: "Snapie AI",
    images: [
      {
        url: "/screenshots/2.png",
        width: 1200,
        height: 630,
        alt: "Free Fitness Calculators - Snapie AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Fitness Calculators - BMR, TDEE, Macros & More",
    description: "Free fitness calculators for BMR, TDEE, macros, BMI, body fat, and calorie planning. Start your fitness journey.",
    images: ["/screenshots/2.png"],
  },
  alternates: {
    canonical: "/calculators",
  },
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
