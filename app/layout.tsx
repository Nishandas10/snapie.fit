import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snapie AI - AI Calorie Counter & Nutrition Tracker App | Track Calories, Macros & Micronutrients",
  description: "Snapie AI is the 1st AI-powered calorie counter that goes beyond calories. Track micronutrients, vitamins, macros with photo recognition. Best calorie tracker for Indian, Asian & global cuisines. Free nutrition tracking app.",
  keywords: "calorie counter, calorie tracker, nutrition tracker, AI calorie counter, food calorie counter, nutrition tracking app, calorie counting app, macro tracker, micronutrient tracker, vitamin tracker, AI food scanner, calorie counter app, best calorie tracker, nutrition app, diet tracker, food tracker, calorie calculator, Indian food calories, meal tracker",
  authors: [{ name: "Five Point AI Labs" }],
  creator: "Five Point AI Labs",
  publisher: "Five Point AI Labs",
  applicationName: "Snapie AI",
  openGraph: {
    title: "Snapie AI - AI Calorie Counter & Nutrition Tracker",
    description: "The 1st AI calorie counter that tracks micronutrients & vitamins. Snap a photo, get instant calories, macros & 20+ nutrients. Free download.",
    type: "website",
    locale: "en_US",
    siteName: "Snapie AI",
    url: "https://snapie.fit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapie AI - AI Calorie Counter & Nutrition Tracker",
    description: "The 1st AI calorie counter that tracks micronutrients & vitamins. Snap a photo, get instant calories, macros & 20+ nutrients.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://snapie.fit" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
