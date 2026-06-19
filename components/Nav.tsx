"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BrandLogo } from "./BrandLogo";
import { LanguageToggle } from "./LanguageToggle";
import { site } from "@/lib/site";

type NavItem = { href: string; labelKey: string };

// Sticky, blurred top nav. Link labels come from i18n. On the one-pager the
// links are in-page anchors; on the business page they jump back to the home
// sections (prefixed with "/"). Collapses to a slide-down sheet on mobile.
// A visible EN/ES picker sits next to the actions on every breakpoint.
export function Nav({
  links,
  ctaHref = "/#access",
  ctaLabelKey = "nav.requestAccess",
}: {
  links: NavItem[];
  ctaHref?: string;
  ctaLabelKey?: string;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 border-b border-[hsla(35,20%,50%,0.08)] bg-[hsla(0,0%,5%,0.72)] backdrop-blur-[14px]">
      <div className="mx-auto flex h-[70px] max-w-[1140px] items-center justify-between px-6">
        <Link href="/" aria-label="TasteBud home" className="flex items-center">
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap text-[15px] font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {t(l.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="ml-5 hidden items-center gap-2.5 lg:flex">
          <LanguageToggle />
          <a
            href={site.appUrl}
            className="inline-flex h-[42px] items-center justify-center whitespace-nowrap rounded-full border border-border bg-[hsla(35,100%,93%,0.06)] px-4 text-sm font-bold text-foreground transition-colors hover:bg-[hsla(35,100%,93%,0.1)]"
          >
            {t("nav.login")}
          </a>
          <Link
            href={ctaHref}
            className="inline-flex h-[42px] items-center justify-center whitespace-nowrap rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-glow active:scale-95"
          >
            {t(ctaLabelKey)}
          </Link>
        </div>

        {/* Below lg: language picker stays visible alongside the menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-[hsla(35,100%,93%,0.06)] text-foreground active:scale-95"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <nav
          className="border-t border-[hsla(35,20%,50%,0.08)] bg-[hsla(0,0%,5%,0.97)] px-6 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                {t(l.labelKey)}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2.5">
              <a
                href={site.appUrl}
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-[hsla(35,100%,93%,0.06)] px-5 text-base font-bold text-foreground active:scale-95"
              >
                {t("nav.login")}
              </a>
              <Link
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-base font-bold text-primary-foreground active:scale-95"
              >
                {t(ctaLabelKey)}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
