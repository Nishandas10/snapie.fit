import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Water Intake Calculator - Daily Water Needs Calculator | Snapie.fit",
  description: "Free water intake calculator. Calculate your optimal daily water consumption based on weight, activity level, and climate. Stay properly hydrated for better health.",
  keywords: ["water intake calculator", "daily water needs", "hydration calculator", "how much water to drink", "water consumption calculator", "hydration needs", "water per day calculator"],
  openGraph: {
    title: "Water Intake Calculator - Snapie.fit",
    description: "Calculate your optimal daily water intake based on weight and activity level.",
    type: "website",
    url: "https://snapie.fit/calculators/water-intake-calculator",
  },
  alternates: {
    canonical: "https://snapie.fit/calculators/water-intake-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
