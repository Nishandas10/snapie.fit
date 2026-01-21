import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steps to Calories Calculator - Convert Steps to Calories Burned | Snapie.fit",
  description: "Free steps to calories converter. Calculate how many calories you burn from walking or running based on your step count, weight, and pace. Perfect for tracking fitness goals.",
  keywords: ["steps to calories calculator", "step counter calories", "walking calorie calculator", "10000 steps calories", "steps burned calculator", "fitness calculator", "walking exercise calories"],
  openGraph: {
    title: "Steps to Calories Calculator - Snapie.fit",
    description: "Convert your daily steps into calories burned. See how walking contributes to your fitness goals.",
    type: "website",
    url: "https://snapie.fit/calculators/steps-to-calories-calculator",
  },
  alternates: {
    canonical: "https://snapie.fit/calculators/steps-to-calories-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
