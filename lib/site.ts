// Single source of truth for brand metadata, URLs and contact info used across
// the marketing site and its SEO metadata. Update here, not in components.

export const site = {
  name: "TasteBud",
  domain: "tastebud-co.com",
  url: "https://tastebud-co.com",
  appUrl: "https://app.tastebud-co.com",
  apiUrl: "https://api.tastebud-co.com/api/v1",
  tagline: "Finding your taste, one dish at a time",
  description:
    "TasteBud learns what you love and hands you the dishes worth ordering — at any restaurant, each with a warm reason why. Stop scrolling menus, start tasting.",
  email: "admin@tastebud.com",
  businessEmail: "admin@tastebud.com",
  twitter: "@tastebud",
  locale: "en_US",
} as const;

// Where the forms POST.
// - `access` defaults to the SAME early-access endpoint the product app uses
//   (POST { email } → { status }), so the landing's "Request your invite" is
//   wired to the real waitlist out of the box. Override with an env var if needed.
// - `business` has no app equivalent; point it at your backend or a Formspree
//   URL via env var, otherwise it confirms optimistically.
export const endpoints = {
  access: process.env.NEXT_PUBLIC_ACCESS_FORM_ENDPOINT ?? `${site.apiUrl}/early-access/request`,
  business: process.env.NEXT_PUBLIC_BUSINESS_FORM_ENDPOINT ?? "",
} as const;
