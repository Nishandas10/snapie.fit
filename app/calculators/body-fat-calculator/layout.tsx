import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Body Fat Calculator - Estimate Your Body Fat Percentage | Snapie AI",
  description: "Free Body Fat Calculator using the U.S. Navy method. Estimate your body fat percentage accurately with simple body measurements. Includes body fat categories and composition analysis.",
  keywords: "body fat calculator, body fat percentage calculator, navy body fat calculator, body composition calculator, fat percentage calculator, lean mass calculator, body fat measurement, body fat estimation",
  openGraph: {
    title: "Body Fat Calculator - Estimate Your Body Fat Percentage | Snapie AI",
    description: "Calculate your body fat percentage with our free calculator using the U.S. Navy method. Get accurate body composition estimates.",
    url: "https://snapie.fit/calculators/body-fat-calculator",
    siteName: "Snapie AI",
    images: [
      {
        url: "/screenshots/2.png",
        width: 1200,
        height: 630,
        alt: "Body Fat Calculator - Snapie AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Fat Calculator - Estimate Your Body Fat %",
    description: "Free body fat calculator using the accurate U.S. Navy method. Understand your body composition.",
    images: ["/screenshots/2.png"],
  },
  alternates: {
    canonical: "/calculators/body-fat-calculator",
  },
};

export default function BodyFatCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
