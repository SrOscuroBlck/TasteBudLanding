import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { site } from "@/lib/site";
import { I18nProvider } from "@/components/I18nProvider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "TasteBud",
    "dish recommendations",
    "what to order",
    "restaurant recommendations",
    "personalized dining",
    "food recommender",
    "menu recommendations",
    "AI food app",
    "taste profile",
    "qué pedir en un restaurante",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    site: site.twitter,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  category: "food",
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  width: "device-width",
  initialScale: 1,
};

// Organization + WebSite structured data — site-wide, helps Google build a
// knowledge panel and enables sitelinks search.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand-icon.svg`,
      description: site.description,
      email: site.email,
      sameAs: [site.appUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: ["en", "es"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // lang defaults to "en" for crawlers and the static export; I18nProvider
    // updates it client-side when a Spanish browser is detected.
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className="font-sans">
        <I18nProvider>{children}</I18nProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
