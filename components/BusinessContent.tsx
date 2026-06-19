"use client";

import Link from "next/link";
import {
  Microscope,
  FlaskConical,
  Users2,
  Search,
  Layers,
  Tag,
  Sparkles,
  LineChart,
  GitCompare,
  Store,
  TrendingUp,
  Check,
  ChefHat,
  ArrowLeft,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { OrganicShapes } from "@/components/OrganicShapes";
import { BusinessForm } from "@/components/BusinessForm";
import { CTAButton, Section, SectionHead, GlassCard } from "@/components/primitives";
import { site } from "@/lib/site";

const NAV_LINKS = [
  { href: "#tastehub", labelKey: "nav.tasteHub" },
  { href: "#modules", labelKey: "nav.whatItDoes" },
  { href: "#flywheel", labelKey: "nav.howItWorksBiz" },
  { href: "#contact", labelKey: "nav.talkToUs" },
  { href: "/", labelKey: "nav.forDiners" },
];

// Icons pair by index with the translated module/point copy.
const MODULE_ICONS = [Microscope, FlaskConical, Users2];
const MODULE_POINT_ICONS = [
  [Search, Tag, GitCompare, Layers],
  [Sparkles, LineChart, GitCompare, ChefHat],
  [TrendingUp, Layers, Store, Users2],
];

type Module = { tag: string; title: string; lead: string; body: string; points: string[] };

export function BusinessContent() {
  const { t } = useTranslation();

  const modules = t("biz.modules.items", { returnObjects: true }) as unknown as Module[];
  const outcomes = t("biz.outcomes", { returnObjects: true }) as unknown as { n: string; l: string }[];
  const flywheel = t("biz.flywheel.steps", { returnObjects: true }) as unknown as {
    num: string;
    title: string;
    body: string;
  }[];
  const restaurantPoints = t("biz.partners.restaurants.points", { returnObjects: true }) as unknown as string[];
  const investorPoints = t("biz.partners.investors.points", { returnObjects: true }) as unknown as string[];

  return (
    <>
      <Nav links={NAV_LINKS} ctaHref="#contact" ctaLabelKey="nav.talkToUs" />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <OrganicShapes
            shapes={[
              { size: 440, top: -180, right: -140 },
              { size: 320, bottom: -160, left: -120, delay: 9 },
            ]}
          />
          <div className="relative z-10 mx-auto max-w-[1140px] px-6">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> {t("biz.back")}
            </Link>
            <div className="max-w-[760px]">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[13px] font-bold text-primary-light">
                <span className="h-[7px] w-[7px] animate-beta-pulse rounded-full bg-primary-light" />
                {t("biz.badge")}
              </span>
              <span className="eyebrow block" id="tastehub">
                {t("biz.eyebrow")}
              </span>
              <h1 className="mt-3 text-[clamp(38px,8vw,58px)] font-extrabold leading-[1.04] tracking-[-0.03em]">
                {t("biz.titleLine1")}
                <br />
                <span className="gradient-text">{t("biz.titleLine2")}</span>
              </h1>
              <p className="mt-5 max-w-[620px] text-[clamp(17px,4.5vw,20px)] leading-relaxed text-foreground/70">
                {t("biz.heroSub")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <CTAButton href="#contact">{t("biz.cta1")}</CTAButton>
                <CTAButton href="#modules" variant="ghost">
                  {t("biz.cta2")}
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* THE PROBLEM */}
        <Section warm>
          <div className="mx-auto max-w-[820px]">
            <span className="eyebrow">{t("biz.problem.eyebrow")}</span>
            <h2 className="mt-3 text-[clamp(26px,6vw,38px)] font-extrabold leading-[1.12] tracking-[-0.02em]">
              {t("biz.problem.title")}
            </h2>
            <div className="mt-6 space-y-4 text-[clamp(16px,4vw,18px)] leading-relaxed text-foreground/75">
              <p>{t("biz.problem.p1")}</p>
              <p>{t("biz.problem.p2")}</p>
            </div>
          </div>
        </Section>

        {/* MODULES */}
        <Section id="modules">
          <SectionHead eyebrow={t("biz.modules.eyebrow")} title={t("biz.modules.title")}>
            {t("biz.modules.sub")}
          </SectionHead>

          <div className="flex flex-col gap-6">
            {modules.map((m, mi) => {
              const Icon = MODULE_ICONS[mi];
              return (
                <GlassCard key={m.tag} className="p-7 md:p-10">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center justify-center rounded-[15px] bg-primary/15 text-primary-light"
                          style={{ width: 52, height: 52 }}
                        >
                          <Icon className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <span className="eyebrow">{m.tag}</span>
                      </div>
                      <h3 className="mt-5 text-[clamp(22px,5vw,28px)] font-extrabold leading-tight">{m.title}</h3>
                      <p className="mt-3 text-[17px] font-semibold text-foreground/90">{m.lead}</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{m.body}</p>
                    </div>
                    <ul className="flex flex-col gap-3">
                      {m.points.map((point, pi) => {
                        const PointIcon = MODULE_POINT_ICONS[mi][pi];
                        return (
                          <li key={point} className="flex items-start gap-3 rounded-2xl bg-muted/40 p-4">
                            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-light">
                              <PointIcon className="h-[18px] w-[18px]" strokeWidth={2} />
                            </span>
                            <span className="mt-1 text-[14.5px] leading-snug text-foreground/85">{point}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </Section>

        {/* OUTCOMES */}
        <Section warm>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 text-center md:grid-cols-4">
            {outcomes.map((s) => (
              <div key={s.l} className="flex flex-col items-center">
                <div className="flex min-h-[2.1em] items-end justify-center">
                  <span className="gradient-text text-[clamp(22px,4.5vw,32px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                    {s.n}
                  </span>
                </div>
                <div className="mt-2.5 text-sm leading-snug text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* FLYWHEEL */}
        <Section id="flywheel">
          <SectionHead eyebrow={t("biz.flywheel.eyebrow")} title={t("biz.flywheel.title")}>
            {t("biz.flywheel.sub")}
          </SectionHead>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {flywheel.map((s) => (
              <GlassCard key={s.num} className="p-6">
                <div className="gradient-text text-3xl font-extrabold">{s.num}</div>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.body}</p>
              </GlassCard>
            ))}
          </div>
        </Section>

        {/* PARTNERS */}
        <Section warm>
          <SectionHead eyebrow={t("biz.partners.eyebrow")} title={t("biz.partners.title")}>
            {t("biz.partners.sub")}
          </SectionHead>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <GlassCard className="p-8 md:p-9">
              <div
                className="mb-5 flex items-center justify-center rounded-[15px] bg-primary/15 text-primary-light"
                style={{ width: 52, height: 52 }}
              >
                <Store className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-extrabold">{t("biz.partners.restaurants.title")}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                {t("biz.partners.restaurants.desc")}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {restaurantPoints.map((point) => (
                  <PartnerLi key={point} text={point} />
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-8 md:p-9">
              <div
                className="mb-5 flex items-center justify-center rounded-[15px] bg-primary/15 text-primary-light"
                style={{ width: 52, height: 52 }}
              >
                <TrendingUp className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-extrabold">{t("biz.partners.investors.title")}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                {t("biz.partners.investors.desc")}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {investorPoints.map((point) => (
                  <PartnerLi key={point} text={point} />
                ))}
              </ul>
            </GlassCard>
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact">
          <GlassCard className="px-6 py-12 text-center md:px-10 md:py-14">
            <h2 className="text-[clamp(24px,6vw,30px)] font-extrabold">{t("biz.contact.title")}</h2>
            <p className="mx-auto mt-2.5 max-w-[480px] text-[16px] leading-relaxed text-muted-foreground">
              {t("biz.contact.sub")}
            </p>
            <div className="mt-7">
              <BusinessForm />
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              {t("biz.contact.emailLead")}{" "}
              <a href={`mailto:${site.businessEmail}`} className="font-semibold text-primary-light">
                {site.businessEmail}
              </a>
            </p>
          </GlassCard>
        </Section>
      </main>

      <Footer />
    </>
  );
}

function PartnerLi({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-[14.5px] leading-snug text-foreground/85">
      <Check className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-primary-light" strokeWidth={2.5} />
      <span>{text}</span>
    </li>
  );
}
