"use client";

import { useTranslation } from "react-i18next";
import { LANGUAGE_STORAGE_KEY } from "@/lib/i18n";

// EN / ES switch, styled to match the product app's LanguageToggle. Persists the
// choice under the same localStorage key the app uses.
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const isEs = i18n.language?.startsWith("es");

  const toggle = () => {
    const next = isEs ? "en" : "es";
    i18n.changeLanguage(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      document.documentElement.lang = next;
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("nav.toggleLanguage")}
      className={`flex items-center gap-1 rounded-full border border-border bg-[hsla(35,100%,93%,0.06)] px-2.5 py-1.5 text-xs font-medium text-foreground/70 transition-all active:scale-95 ${className}`}
    >
      <span className={isEs ? "text-foreground/40" : "font-semibold text-foreground"}>EN</span>
      <span className="text-foreground/20">/</span>
      <span className={isEs ? "font-semibold text-foreground" : "text-foreground/40"}>ES</span>
    </button>
  );
}
