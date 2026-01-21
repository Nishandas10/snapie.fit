import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorie Deficit Calculator - Weight Loss & Gain Planner | Snapie AI",
  description: "Free Calorie Deficit Calculator to plan weight loss or muscle gain. Get personalized daily calorie targets, see how long to reach your goal weight, and create a sustainable nutrition plan.",
  keywords: "calorie deficit calculator, weight loss calculator, calorie surplus calculator, weight gain calculator, calorie planner, how many calories to lose weight, fat loss calculator, bulking calculator, cutting calculator",
  openGraph: {
    title: "Calorie Deficit Calculator - Weight Loss & Gain Planner | Snapie AI",
    description: "Plan your calorie deficit or surplus for weight loss or muscle gain. Get personalized daily calorie targets and timeline to reach your goals.",
    url: "https://snapie.fit/calculators/calorie-deficit-calculator",
    siteName: "Snapie AI",
    images: [
      {
        url: "/screenshots/2.png",
        width: 1200,
        height: 630,
        alt: "Calorie Deficit Calculator - Snapie AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calorie Deficit Calculator - Plan Your Weight Goals",
    description: "Free calculator to plan weight loss or gain. Get personalized calorie targets and see your timeline to success.",
    images: ["/screenshots/2.png"],
  },
  alternates: {
    canonical: "/calculators/calorie-deficit-calculator",
  },
};

export default function CalorieDeficitCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
