"use client";

import {
  Sparkles,
  Settings2,
  Utensils,
  ArrowUpDown,
  Fingerprint,
  MapPin,
  RefreshCw,
  Globe,
  Check,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SwipeCard } from "@/components/SwipeCard";
import { OrganicShapes } from "@/components/OrganicShapes";
import { AccessForm } from "@/components/AccessForm";
import { Faq } from "@/components/Faq";
import { CTAButton, Section, SectionHead, GlassCard } from "@/components/primitives";
import { site } from "@/lib/site";

const NAV_LINKS = [
  { href: "#how", labelKey: "nav.howItWorks" },
  { href: "#features", labelKey: "nav.features" },
  { href: "#showcase", labelKey: "nav.thePicks" },
  { href: "#faq", labelKey: "nav.faq" },
  { href: "/for-business", labelKey: "nav.forBusiness" },
];

// Icons are structural, so they live in code and pair by index with the
// translated copy pulled from the locale files.
const STEP_ICONS = [Sparkles, Settings2, Utensils];
const FEATURE_ICONS = [ArrowUpDown, Sparkles, Fingerprint, MapPin, RefreshCw, Globe];

function IconChip({ icon: Icon, size = 48 }: { icon: typeof Sparkles; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-[14px] bg-primary/15 text-primary-light"
      style={{ width: size, height: size }}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </div>
  );
}

export function HomeContent() {
  const { t } = useTranslation();

  const stats = t("stats", { returnObjects: true }) as unknown as { n: string; l: string }[];
  const steps = t("how.steps", { returnObjects: true }) as unknown as { num: string; title: string; body: string }[];
  const features = t("features.items", { returnObjects: true }) as unknown as { title: string; body: string }[];
  const points = t("showcase.points", { returnObjects: true }) as unknown as { b: string; t: string }[];
  const testimonials = t("testimonials.items", { returnObjects: true }) as unknown as {
    quote: string;
    name: string;
    role: string;
  }[];
  const faqs = t("faq.items", { returnObjects: true }) as unknown as { q: string; a: string }[];

  return (
    <>
      <Nav links={NAV_LINKS} ctaHref="#access" ctaLabelKey="nav.requestAccess" />

      <main>
        {/* HERO */}
        <section className="relative flex items-center overflow-hidden py-12 md:min-h-[calc(100vh-70px)] md:py-14">
          <OrganicShapes
            shapes={[
              { size: 420, top: -160, right: -120 },
              { size: 360, bottom: -200, left: -140, delay: 8 },
            ]}
          />
          <div className="relative z-10 mx-auto grid w-full max-w-[1140px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1.05fr_0.95fr]">
            <div className="text-center md:text-left">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[13px] font-bold text-primary-light">
                <span className="h-[7px] w-[7px] animate-beta-pulse rounded-full bg-primary-light" />
                {t("hero.badge")}
              </span>
              <span className="eyebrow block">{t("hero.eyebrow")}</span>
              <h1 className="mt-3 text-[clamp(40px,9vw,60px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
                {t("hero.titleLine1")}
                <br />
                <span className="gradient-text">{t("hero.titleLine2")}</span>
              </h1>
              <p className="mx-auto mt-5 max-w-[520px] text-[clamp(17px,4.5vw,19px)] leading-relaxed text-foreground/70 md:mx-0">
                {t("hero.sub")}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5 md:justify-start">
                <CTAButton href="#access">{t("hero.cta1")}</CTAButton>
                <CTAButton href={site.appUrl} variant="ghost" external>
                  {t("hero.cta2")}
                </CTAButton>
              </div>
              <div className="mt-7 flex items-center justify-center gap-3.5 text-sm text-muted-foreground md:justify-start">
                <span className="inline-flex gap-0.5 text-primary-light">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                <span>{t("hero.trust")}</span>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="order-first md:order-last">
              <div className="relative mx-auto w-[300px] max-w-full rounded-[42px] bg-[#0c0c0c] p-[11px] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9),0_0_0_10px_#1b1714,0_0_0_11px_#2c2622]">
                <div className="absolute left-1/2 top-3 z-10 h-[26px] w-[110px] -translate-x-1/2 rounded-b-2xl bg-black" />
                <div className="relative overflow-hidden rounded-[32px] bg-[#0c0c0c] px-3 pb-3 pt-4">
                  <div className="mb-3.5 mt-1.5 flex items-center justify-between gap-2.5 px-1">
                    <div className="min-w-0">
                      <div className="whitespace-nowrap text-[18px] font-extrabold">{t("hero.greeting")}</div>
                      <div className="truncate text-[12px] text-muted-foreground">{t("hero.restaurant")}</div>
                    </div>
                    <div className="flex-shrink-0 whitespace-nowrap text-[12px] text-muted-foreground">1 / 10</div>
                  </div>
                  <SwipeCard
                    name="Arrabiata"
                    cuisine="Italian"
                    price="$9.02"
                    spiceLevel={4}
                    veggie
                    matchPercent={64}
                    match={t("demo.arrabiata.match")}
                    novelty={t("demo.arrabiata.novelty")}
                    reason={t("demo.arrabiata.reason")}
                    flavorBars={[
                      { label: t("flavors.spicy"), value: 80 },
                      { label: t("flavors.umami"), value: 62 },
                      { label: t("flavors.sour"), value: 38 },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <Section>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 text-center md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="flex flex-col items-center">
                <div className="flex min-h-[2.1em] items-end justify-center">
                  <span className="gradient-text text-[clamp(30px,7vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                    {s.n}
                  </span>
                </div>
                <div className="mt-2.5 text-sm leading-snug text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* HOW IT WORKS */}
        <Section id="how" warm>
          <SectionHead eyebrow={t("how.eyebrow")} title={t("how.title")}>
            {t("how.sub")}
          </SectionHead>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <GlassCard key={s.num} className="p-7">
                <div className="text-[13px] font-extrabold tracking-[0.1em] text-primary-light">{s.num}</div>
                <div className="mt-4">
                  <IconChip icon={STEP_ICONS[i]} />
                </div>
                <h3 className="mt-4 text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
              </GlassCard>
            ))}
          </div>
        </Section>

        {/* FEATURES */}
        <Section id="features">
          <SectionHead eyebrow={t("features.eyebrow")} title={t("features.title")}>
            {t("features.sub")}
          </SectionHead>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {features.map((f, i) => (
              <GlassCard key={f.title} className="p-6">
                <div className="mb-4">
                  <IconChip icon={FEATURE_ICONS[i]} size={44} />
                </div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{f.body}</p>
              </GlassCard>
            ))}
          </div>
        </Section>

        {/* SHOWCASE */}
        <Section id="showcase" warm>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
            <div className="mx-auto w-full max-w-[340px]">
              <SwipeCard
                name="Miso Black Cod"
                cuisine="Japanese"
                price="$28"
                spiceLevel={1}
                matchPercent={91}
                match={t("demo.miso.match")}
                novelty={t("demo.miso.novelty")}
                reason={t("demo.miso.reason")}
                flavorBars={[
                  { label: t("flavors.umami"), value: 92 },
                  { label: t("flavors.sweet"), value: 58 },
                  { label: t("flavors.rich"), value: 80 },
                ]}
              />
            </div>
            <div>
              <span className="eyebrow">{t("showcase.eyebrow")}</span>
              <h2 className="mt-3 text-[clamp(28px,6vw,40px)] font-extrabold leading-[1.1] tracking-[-0.02em]">
                {t("showcase.titleLine1")}
                <br />
                {t("showcase.titleLine2")}
              </h2>
              <ul className="mt-6 flex flex-col gap-[18px]">
                {points.map((p) => (
                  <li key={p.b} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-light">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[15.5px] leading-snug text-foreground/85">
                      <b className="font-bold">{p.b}</b> — {p.t}
                    </span>
                  </li>
                ))}
              </ul>
              <CTAButton href={site.appUrl} external className="mt-8">
                {t("showcase.cta")}
              </CTAButton>
            </div>
          </div>
        </Section>

        {/* TESTIMONIALS */}
        <Section>
          <SectionHead eyebrow={t("testimonials.eyebrow")} title={t("testimonials.title")} />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((q) => (
              <GlassCard key={q.name} className="p-6">
                <p className="text-[15.5px] leading-relaxed">&ldquo;{q.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-extrabold text-primary-light">
                    {q.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{q.name}</div>
                    <div className="text-[12.5px] text-muted-foreground">{q.role}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" warm>
          <SectionHead eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
          <Faq items={faqs} />
        </Section>

        {/* CTA / ACCESS */}
        <Section>
          <div
            id="access"
            className="relative overflow-hidden rounded-[32px] border border-primary/25 px-6 py-16 text-center md:px-10 md:py-20"
            style={{
              background:
                "radial-gradient(ellipse at 50% 120%, hsla(11,100%,34%,0.35), transparent 60%), #140f0d",
            }}
          >
            <div className="relative z-10">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[13px] font-bold text-primary-light">
                <span className="h-[7px] w-[7px] animate-beta-pulse rounded-full bg-primary-light" />
                {t("access.badge")}
              </span>
              <h2 className="text-[clamp(30px,7vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
                {t("access.title")}
              </h2>
              <p className="mx-auto mb-8 mt-4 max-w-[520px] text-[clamp(16px,4vw,18px)] text-foreground/70">
                {t("access.sub")}
              </p>
              <AccessForm />
              <p className="mx-auto mt-4 text-[13px] text-muted-foreground">
                {t("access.noteLead")}{" "}
                <a href={site.appUrl} className="font-semibold text-primary-light">
                  {t("access.openApp")}
                </a>
                .
              </p>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
