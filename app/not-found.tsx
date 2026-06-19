"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { CTAButton } from "@/components/primitives";
import { BrandLogo } from "@/components/BrandLogo";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <Link href="/" className="mb-10">
        <BrandLogo size={24} />
      </Link>
      <p className="eyebrow">{t("notFound.code")}</p>
      <h1 className="mt-3 text-[clamp(32px,8vw,52px)] font-extrabold tracking-[-0.02em]">{t("notFound.title")}</h1>
      <p className="mt-4 max-w-[420px] text-muted-foreground">{t("notFound.body")}</p>
      <div className="mt-8">
        <CTAButton href="/">{t("notFound.cta")}</CTAButton>
      </div>
    </main>
  );
}
