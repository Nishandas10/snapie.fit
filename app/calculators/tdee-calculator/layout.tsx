import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TDEE Calculator - Calculate Total Daily Energy Expenditure | Snapie AI",
  description: "Free TDEE Calculator to find your Total Daily Energy Expenditure. Know exactly how many calories you burn daily based on your activity level. Perfect for weight loss, muscle gain, and maintenance.",
  keywords: "TDEE calculator, total daily energy expenditure calculator, daily calorie calculator, calorie needs calculator, weight loss calculator, maintenance calories, calorie burn calculator, activity level calculator",
  openGraph: {
    title: "TDEE Calculator - Calculate Total Daily Energy Expenditure | Snapie AI",
    description: "Calculate your Total Daily Energy Expenditure with our free TDEE calculator. Know exactly how many calories you burn daily.",
    url: "https://snapie.fit/calculators/tdee-calculator",
    siteName: "Snapie AI",
    images: [
      {
        url: "/screenshots/2.png",
        width: 1200,
        height: 630,
        alt: "TDEE Calculator - Snapie AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TDEE Calculator - Calculate Total Daily Energy Expenditure",
    description: "Free TDEE Calculator to find how many calories you burn daily. Essential for any fitness goal.",
    images: ["/screenshots/2.png"],
  },
  alternates: {
    canonical: "/calculators/tdee-calculator",
  },
};

export default function TDEECalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
