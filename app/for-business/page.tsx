import type { Metadata } from "next";
import { BusinessContent } from "@/components/BusinessContent";
import { site } from "@/lib/site";

const TITLE = "TasteHub — Taste intelligence for restaurants";
const DESC =
  "TasteHub turns TasteBud’s taste graph into an operating system for your menu: diagnose why a dish isn’t selling, design new dishes with a flavor copilot, and know your diners by taste — not by guesswork.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/for-business" },
  openGraph: {
    title: `${TITLE} · ${site.name}`,
    description: DESC,
    url: `${site.url}/for-business`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · ${site.name}`,
    description: DESC,
    images: ["/og-image.png"],
  },
};

// Service + Breadcrumb structured data (English, matching the prerendered HTML).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "TasteHub",
      serviceType: "Restaurant taste intelligence platform",
      provider: { "@type": "Organization", name: site.name, url: site.url },
      description: DESC,
      areaServed: "Worldwide",
      url: `${site.url}/for-business`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "For business", item: `${site.url}/for-business` },
      ],
    },
  ],
};

export default function ForBusinessPage() {
  return (
    <>
      <BusinessContent />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
