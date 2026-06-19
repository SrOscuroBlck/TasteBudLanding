import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

// Mirrors the product app's i18next setup (tastebud-pal/src/lib/i18n.ts) so the
// marketing site and the app share one language model and the same persistence
// key ("tastebud-language"). Unlike the app, we do NOT attach the browser
// LanguageDetector at init: this module also runs during the static export
// (where window/navigator don't exist), and we want the prerendered HTML to be
// deterministic English for crawlers. Auto-detection happens client-side in
// I18nProvider after mount, which avoids any hydration mismatch.

export const LANGUAGE_STORAGE_KEY = "tastebud-language";
export const SUPPORTED_LANGUAGES = ["en", "es"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: "en",
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    interpolation: { escapeValue: false },
    returnNull: false,
    react: { useSuspense: false },
  });
}

// Same rule the user asked for: Spanish browsers (es, es-MX, es-ES…) get Spanish,
// everything else gets English. A stored choice always wins.
export function detectLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored;
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

export default i18n;
