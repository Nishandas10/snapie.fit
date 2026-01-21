import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protein Intake Calculator - Daily Protein Needs Calculator | Snapie.fit",
  description: "Free protein intake calculator. Calculate your optimal daily protein based on weight, activity level, and fitness goals. Perfect for muscle building, fat loss, or maintenance.",
  keywords: ["protein intake calculator", "daily protein calculator", "how much protein do I need", "protein for muscle building", "protein calculator bodybuilding", "protein requirements", "protein per kg calculator"],
  openGraph: {
    title: "Protein Intake Calculator - Snapie.fit",
    description: "Calculate your optimal daily protein intake based on weight and fitness goals.",
    type: "website",
    url: "https://snapie.fit/calculators/protein-intake-calculator",
  },
  alternates: {
    canonical: "https://snapie.fit/calculators/protein-intake-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
