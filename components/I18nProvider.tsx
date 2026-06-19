"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { detectLanguage } from "@/lib/i18n";

// Wraps the app in the shared i18next instance and performs language detection
// once, after mount. Server render and first client render are both English
// (i18n.lng === "en"), so hydration matches; the effect then switches Spanish
// browsers over and syncs <html lang>.
export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lng = detectLanguage();
    if (i18n.language !== lng) i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
