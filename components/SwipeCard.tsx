"use client";

import { Flame, Leaf, Sparkles, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dishGradient } from "@/lib/dishGradient";

// A faithful, self-contained recreation of the product app's recommendation
// card (tastebud-pal Recommendations.tsx) for use in marketing mockups. Shows a
// dish-identity gradient "photo", dietary/price/match badges, the title, a
// confidence ring, flavor bars and the warm "why you'll love it" reason.

export type FlavorBar = { label: string; value: number };

export type SwipeCardProps = {
  name: string;
  cuisine: string;
  price?: string;
  spiceLevel?: number;
  veggie?: boolean;
  matchPercent: number;
  match: string;
  novelty?: string;
  description?: string;
  reason: string;
  flavorBars?: FlavorBar[];
};

function MatchRing({ percent }: { percent: number }) {
  const { t } = useTranslation();
  const r = 26;
  const c = 2 * Math.PI * r;
  const filled = (percent / 100) * c;
  return (
    <div className="relative flex-shrink-0" style={{ width: 64, height: 64 }}>
      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="hsl(var(--primary-light))"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-extrabold leading-none text-foreground">{percent}</span>
        <span className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">{t("card.match")}</span>
      </div>
    </div>
  );
}

export function SwipeCard({
  name,
  cuisine,
  price,
  spiceLevel = 0,
  veggie = false,
  matchPercent,
  match,
  novelty,
  reason,
  flavorBars = [],
}: SwipeCardProps) {
  const { t } = useTranslation();
  const isSpicy = spiceLevel >= 3;

  return (
    <div className="overflow-hidden rounded-[20px] border border-border bg-card shadow-elevated">
      {/* "Photo" area: dish-identity gradient + watermark + overlay */}
      <div className="relative h-44" style={{ background: dishGradient(name, cuisine) }}>
        <span className="pointer-events-none absolute -bottom-8 -right-3 select-none text-[9rem] font-black leading-none text-white/[0.06]">
          {name.charAt(0)}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* Top badges */}
        <div className="absolute inset-x-0 top-3 flex items-start justify-between gap-2 px-3">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {isSpicy && (
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive/90 px-2 py-1 text-[10px] font-semibold text-destructive-foreground backdrop-blur-sm">
                <Flame className="h-2.5 w-2.5" /> {t("card.spicy")}
              </span>
            )}
            {veggie && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-700/90 px-2 py-1 text-[10px] font-semibold text-foreground backdrop-blur-sm">
                <Leaf className="h-2.5 w-2.5" /> {t("card.veggie")}
              </span>
            )}
            {novelty && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-1 text-[10px] font-semibold text-amber-300 backdrop-blur-sm">
                {novelty}
              </span>
            )}
          </div>
          <div className="flex flex-shrink-0 flex-col items-end gap-1">
            {price && (
              <span className="whitespace-nowrap rounded-full bg-card/80 px-2 py-1 text-[10px] font-semibold text-foreground backdrop-blur-sm">
                {price}
              </span>
            )}
            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-card/80 px-2.5 py-1 text-[10px] font-semibold text-primary-light backdrop-blur-sm">
              <Star className="h-2.5 w-2.5 flex-shrink-0 fill-current" /> {match}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3">
          <div className="eyebrow !text-primary-light">{cuisine}</div>
          <h3 className="mt-0.5 text-2xl font-extrabold leading-tight text-foreground">{name}</h3>
        </div>
      </div>

      {/* Body: match + flavor bars + warm reason */}
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-4">
          <MatchRing percent={matchPercent} />
          {flavorBars.length > 0 && (
            <div className="flex-1 space-y-2">
              {flavorBars.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5">
                  <span className="w-12 flex-shrink-0 text-[11px] font-medium text-foreground/60">{f.label}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                      style={{ width: `${f.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2.5 rounded-2xl bg-muted/50 p-3">
          <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-light" />
          <p className="text-[13px] leading-relaxed text-foreground/80">{reason}</p>
        </div>
      </div>
    </div>
  );
}
