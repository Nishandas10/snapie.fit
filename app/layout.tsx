import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://snapie.fit"),

  title: {
    default:
      "Snapie AI – AI Calorie Counter & Nutrition Tracker App",
    template: "%s | Snapie AI",
  },

  description:
    "Snapie AI is an AI-powered calorie counter that tracks calories, macros, micronutrients, vitamins & minerals from food photos. Built for Indian & global cuisines.",

  applicationName: "Snapie AI",
  category: "Health & Fitness",
  creator: "Five Point AI Labs",
  publisher: "Five Point AI Labs",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://snapie.fit",
    title: "Snapie AI – AI Calorie Counter & Nutrition Tracker",
    description:
      "Snap a photo and get instant calories, macros, vitamins & micronutrients. The smartest AI calorie counter.",
    siteName: "Snapie AI",
    locale: "en_US",
    images: [
      {
        url: "/screenshots/2.png",
        width: 1200,
        height: 630,
        alt: "Snapie AI – AI Calorie Counter App",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Snapie AI – AI Calorie Counter",
    description:
      "Track calories, macros & micronutrients using AI food photo recognition.",
    images: ["/screenshots/2.png"],
  },

  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: [
      {
        url: "/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Snapie AI",
    applicationCategory: "Health & Fitness",
    operatingSystem: "Android, Web",
    description:
      "AI-powered calorie counter that tracks calories, macros, vitamins & micronutrients from food photos.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "Five Point AI Labs",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Five Point AI Labs",
    url: "https://snapie.fit",
    logo: "https://snapie.fit/logo.png",
    sameAs: [
      "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI",
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Android App Indexing */}
        <link
          rel="alternate"
          href="android-app://com.Five_Point_AI_Labs.CalTrackAI/https/snapie.fit"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        {/* PWA / Mobile */}
        <meta name="theme-color" content="#10b981" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}