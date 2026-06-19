// Single source of truth for brand metadata, URLs and contact info used across
// the marketing site and its SEO metadata. Update here, not in components.

export const site = {
  name: "TasteBud",
  domain: "tastebud-co.com",
  url: "https://tastebud-co.com",
  appUrl: "https://app.tastebud-co.com",
  tagline: "Finding your taste, one dish at a time",
  description:
    "TasteBud learns what you love and hands you the dishes worth ordering — at any restaurant, each with a warm reason why. Stop scrolling menus, start tasting.",
  email: "admin@tastebud.com",
  businessEmail: "admin@tastebud.com",
  twitter: "@tastebud",
  locale: "en_US",
} as const;

// Where the email-capture and business forms POST. Wire these to your backend,
// Formspree, or a serverless function via env vars at build time. When unset,
// the forms fall back to an optimistic "you're on the list" confirmation so the
// page is fully functional out of the box.
export const endpoints = {
  access: process.env.NEXT_PUBLIC_ACCESS_FORM_ENDPOINT ?? "",
  business: process.env.NEXT_PUBLIC_BUSINESS_FORM_ENDPOINT ?? "",
} as const;
