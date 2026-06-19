import Link from "next/link";
import type { ReactNode } from "react";

// Small presentational building blocks shared by the landing and business
// pages, so section rhythm and button styling stay consistent.

export function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-base font-bold transition-all active:scale-95";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary-dark hover:shadow-glow"
      : "border border-border bg-[hsla(35,100%,93%,0.06)] text-foreground hover:bg-[hsla(35,100%,93%,0.1)]";
  const cls = `${base} ${styles} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Section({
  id,
  warm = false,
  children,
  className = "",
}: {
  id?: string;
  warm?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative py-16 md:py-[84px] ${
        warm ? "bg-[linear-gradient(180deg,#0c0c0c,#140f0d_50%,#0c0c0c)]" : ""
      } ${className}`}
    >
      <div className="mx-auto max-w-[1140px] px-6">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto mb-12 max-w-[680px] text-center md:mb-[52px]">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-[clamp(28px,6vw,42px)] font-extrabold leading-[1.1] tracking-[-0.02em]">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-[clamp(16px,4vw,18px)] leading-relaxed text-muted-foreground">{children}</p>
      )}
    </div>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`glass rounded-[20px] ${className}`}>{children}</div>;
}
