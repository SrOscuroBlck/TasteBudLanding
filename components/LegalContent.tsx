"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/site";

// Shared layout for the placeholder Privacy / Terms pages. Section copy is
// pulled from the locale files under legal.privacy / legal.terms.
export function LegalContent({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useTranslation();
  const base = `legal.${kind}`;

  const sections =
    kind === "privacy"
      ? [
          { h: t(`${base}.collectHeading`), b: t(`${base}.collectBody`) },
          { h: t(`${base}.useHeading`), b: t(`${base}.useBody`) },
        ]
      : [
          { h: t(`${base}.betaHeading`), b: t(`${base}.betaBody`) },
          { h: t(`${base}.useHeading`), b: t(`${base}.useBody`) },
        ];

  return (
    <>
      <Nav
        links={[
          { href: "/", labelKey: "nav.home" },
          { href: "/for-business", labelKey: "nav.forBusiness" },
        ]}
      />
      <main className="mx-auto max-w-[760px] px-6 py-16">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("legal.back")}
        </Link>
        <h1 className="text-[clamp(30px,7vw,42px)] font-extrabold tracking-[-0.02em]">{t(`${base}.title`)}</h1>
        <p className="mt-4 text-muted-foreground">{t("legal.placeholderNote")}</p>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-foreground/80">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-bold text-foreground">{s.h}</h2>
              <p className="mt-2">{s.b}</p>
            </section>
          ))}
          <section>
            <h2 className="text-xl font-bold text-foreground">{t("legal.contactHeading")}</h2>
            <p className="mt-2">
              {t("legal.contactLead")}{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary-light">
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
