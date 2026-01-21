import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMR Calculator - Calculate Your Basal Metabolic Rate | Snapie AI",
  description: "Free BMR Calculator to find your Basal Metabolic Rate. Calculate how many calories your body burns at rest using the accurate Mifflin-St Jeor equation. Essential for weight loss and nutrition planning.",
  keywords: "BMR calculator, basal metabolic rate calculator, calculate BMR, resting metabolic rate, calorie calculator, metabolism calculator, weight loss calculator, BMR formula, Mifflin-St Jeor equation",
  openGraph: {
    title: "BMR Calculator - Calculate Your Basal Metabolic Rate | Snapie AI",
    description: "Calculate your Basal Metabolic Rate (BMR) with our free calculator. Know exactly how many calories your body burns at rest.",
    url: "https://snapie.fit/calculators/bmr-calculator",
    siteName: "Snapie AI",
    images: [
      {
        url: "/screenshots/2.png",
        width: 1200,
        height: 630,
        alt: "BMR Calculator - Snapie AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMR Calculator - Calculate Your Basal Metabolic Rate",
    description: "Free BMR Calculator to find how many calories your body burns at rest. Essential for weight loss planning.",
    images: ["/screenshots/2.png"],
  },
  alternates: {
    canonical: "/calculators/bmr-calculator",
  },
};

export default function BMRCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
