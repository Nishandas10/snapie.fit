import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://snapie.fit'),
  title: {
    default: "Snapie AI - AI Calorie Counter & Nutrition Tracker App | Track Calories, Macros & Micronutrients",
    template: "%s | Snapie AI",
  },
  description: "Snapie AI is the 1st AI-powered calorie counter that goes beyond calories. Track micronutrients, vitamins, macros with photo recognition. Best calorie tracker for Indian, Asian & global cuisines. Free nutrition tracking app.",
  keywords: "calorie counter, calorie tracker, nutrition tracker, AI calorie counter, food calorie counter, nutrition tracking app, calorie counting app, macro tracker, micronutrient tracker, vitamin tracker, AI food scanner, calorie counter app, best calorie tracker, nutrition app, diet tracker, food tracker, calorie calculator, Indian food calories, meal tracker, health app, weight loss app, fitness tracker",
  authors: [{ name: "Five Point AI Labs" }],
  creator: "Five Point AI Labs",
  publisher: "Five Point AI Labs",
  applicationName: "Snapie AI",
  category: "Health & Fitness",
  openGraph: {
    title: "Snapie AI - AI Calorie Counter & Nutrition Tracker Assistant",
    description: "The 1st AI calorie counter that tracks micronutrients & vitamins. Snap a photo, get instant calories, macros & 20+ nutrients. Free download.",
    type: "website",
    locale: "en_US",
    siteName: "Snapie AI",
    url: "https://snapie.fit",
    images: [
      {
        url: "/screenshots/1.png",
        width: 1200,
        height: 630,
        alt: "Snapie AI - AI Calorie Counter App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapie AI - AI Calorie Counter & Nutrition Tracker",
    description: "The 1st AI calorie counter that tracks micronutrients & vitamins. Snap a photo, get instant calories, macros & 20+ nutrients.",
    images: ["/screenshots/1.png"],
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
  alternates: {
    canonical: "https://snapie.fit",
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: '/favicon_io/favicon.ico' },
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/favicon_io/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/favicon_io/android-chrome-512x512.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Snapie AI',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'The 1st AI-powered calorie counter that goes beyond calories. Track micronutrients, vitamins, macros with photo recognition.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '200',
    },
    author: {
      '@type': 'Organization',
      name: 'Five Point AI Labs',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Five Point AI Labs',
    url: 'https://snapie.fit',
    logo: 'https://snapie.fit/logo.png',
    sameAs: [
      'https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI',
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://snapie.fit" />
        <link rel="icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
        <meta name="theme-color" content="#10b981" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
