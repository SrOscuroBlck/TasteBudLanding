"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/site";

type Section = { h: string; p?: string[]; items?: string[] };

// Renders a full legal document (Privacy or Terms) from the locale files:
// title, "last updated" line, intro paragraph(s), then numbered sections —
// each with optional paragraphs and an optional bulleted list — plus a contact
// block with a real mailto link.
export function LegalContent({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useTranslation();
  const base = `legal.${kind}`;
  const intro = t(`${base}.intro`, { returnObjects: true }) as unknown as string[];
  const sections = t(`${base}.sections`, { returnObjects: true }) as unknown as Section[];

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
        <p className="mt-3 text-sm text-muted-foreground">
          {t("legal.updatedLabel")}: {t("legal.updated")}
        </p>

        <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-foreground/80">
          {intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-9 space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-bold text-foreground">{s.h}</h2>
              {s.p?.map((para, i) => (
                <p key={i} className="mt-2.5 text-[15px] leading-relaxed text-foreground/80">
                  {para}
                </p>
              ))}
              {s.items && (
                <ul className="mt-3 flex flex-col gap-2.5">
                  {s.items.map((it, i) => (
                    <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-foreground/80">
                      <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h2 className="text-lg font-bold text-foreground">{t("legal.contactHeading")}</h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/80">
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
