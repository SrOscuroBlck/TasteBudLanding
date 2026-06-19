"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { BrandLogo } from "./BrandLogo";
import { site } from "@/lib/site";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-20 border-t border-[hsla(35,20%,50%,0.08)] px-6 pb-10 pt-14">
      <div className="mx-auto max-w-[1140px]">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-[300px]">
            <Link href="/" aria-label="TasteBud home" className="mb-4 inline-flex">
              <BrandLogo size={20} />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("footer.tagline")}</p>
          </div>

          <FooterCol
            title={t("footer.product")}
            links={[
              { href: "/#how", label: t("footer.howItWorks") },
              { href: "/#features", label: t("footer.features") },
              { href: "/#showcase", label: t("footer.thePicks") },
              { href: "/#access", label: t("footer.requestAccess") },
            ]}
          />
          <FooterCol
            title={t("footer.company")}
            links={[
              { href: "/for-business", label: t("footer.forBusiness") },
              { href: "/for-business#tastehub", label: t("footer.tasteHub") },
              { href: `mailto:${site.email}`, label: t("footer.contact") },
            ]}
          />
          <FooterCol
            title={t("footer.legal")}
            links={[
              { href: "/privacy", label: t("footer.privacy") },
              { href: "/terms", label: t("footer.terms") },
            ]}
          />
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted-foreground">
          <span>© {new Date().getFullYear()} TasteBud. {t("footer.rights")}</span>
          <span>{site.domain}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {title}
      </h4>
      {links.map((l) => (
        <Link
          key={l.label}
          href={l.href}
          className="mb-2.5 block text-[14.5px] text-foreground/70 transition-colors hover:text-foreground"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
