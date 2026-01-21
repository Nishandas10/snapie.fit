import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator - Calculate Body Mass Index | Snapie AI",
  description: "Free BMI Calculator to find your Body Mass Index. Instantly calculate if you're at a healthy weight for your height. Includes BMI chart, categories, and health recommendations.",
  keywords: "BMI calculator, body mass index calculator, weight calculator, healthy weight calculator, BMI chart, BMI categories, obesity calculator, overweight calculator, underweight calculator",
  openGraph: {
    title: "BMI Calculator - Calculate Body Mass Index | Snapie AI",
    description: "Calculate your Body Mass Index (BMI) instantly. Find out if you're at a healthy weight with our free BMI calculator.",
    url: "https://snapie.fit/calculators/bmi-calculator",
    siteName: "Snapie AI",
    images: [
      {
        url: "/screenshots/2.png",
        width: 1200,
        height: 630,
        alt: "BMI Calculator - Snapie AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator - Calculate Your Body Mass Index",
    description: "Free BMI Calculator to check if you're at a healthy weight. Includes BMI categories and health tips.",
    images: ["/screenshots/2.png"],
  },
  alternates: {
    canonical: "/calculators/bmi-calculator",
  },
};

export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
