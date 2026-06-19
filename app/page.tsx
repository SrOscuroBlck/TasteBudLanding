import type { Metadata } from "next";
import { HomeContent } from "@/components/HomeContent";
import { site } from "@/lib/site";
import en from "@/locales/en.json";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

// SoftwareApplication + FAQPage structured data. Kept in English (the default,
// prerendered language) so it matches the static HTML crawlers receive.
const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: site.name,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web, iOS, Android",
      description: site.description,
      url: site.url,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      inLanguage: ["en", "es"],
    },
    {
      "@type": "FAQPage",
      mainEntity: en.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <HomeContent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
    </>
  );
}
