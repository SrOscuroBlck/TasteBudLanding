import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Trailing slashes match `trailingSlash: true` and the pages' canonical URLs,
  // so each sitemap entry points at the final URL with no redirect hop.
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/for-business/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
