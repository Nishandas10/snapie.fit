import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intermittent Fasting Calculator - Fasting Window Generator | Snapie.fit",
  description: "Free intermittent fasting calculator. Generate your personalized eating and fasting windows for 16:8, 18:6, or 20:4 methods. Includes fasting tracker and timeline.",
  keywords: ["intermittent fasting calculator", "fasting window calculator", "16:8 fasting schedule", "IF calculator", "fasting times", "eating window calculator", "when to eat intermittent fasting"],
  openGraph: {
    title: "Intermittent Fasting Window Generator - Snapie.fit",
    description: "Generate your personalized fasting and eating windows based on your wake time.",
    type: "website",
    url: "https://snapie.fit/calculators/intermittent-fasting-calculator",
  },
  alternates: {
    canonical: "https://snapie.fit/calculators/intermittent-fasting-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
