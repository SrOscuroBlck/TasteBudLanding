"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { endpoints, site } from "@/lib/site";

// Beta email capture. POSTs to NEXT_PUBLIC_ACCESS_FORM_ENDPOINT when configured;
// otherwise confirms optimistically so the page works with no backend.
export function AccessForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading" || state === "done") return;

    if (!endpoints.access) {
      setState("done");
      return;
    }
    try {
      setState("loading");
      const res = await fetch(endpoints.access, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "landing-access" }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="mx-auto max-w-[460px] rounded-full border border-primary/40 bg-primary/15 px-6 py-4 text-center font-bold text-primary-light">
        {t("access.done")}
      </div>
    );
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mx-auto flex max-w-[460px] flex-wrap gap-2.5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("access.placeholder")}
          aria-label={t("access.emailLabel")}
          className="h-[52px] min-w-[200px] flex-1 rounded-full border border-border bg-[hsla(15,8%,12%,0.7)] px-5 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/55"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex h-[52px] items-center justify-center rounded-full bg-primary px-7 text-base font-bold text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-glow active:scale-95 disabled:opacity-70"
        >
          {state === "loading" ? t("access.sending") : t("access.button")}
        </button>
      </form>
      {state === "error" && (
        <p className="mx-auto mt-3 max-w-[460px] text-center text-[13px] text-destructive-foreground/90">
          {t("access.errorLead")}{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-primary-light">
            {site.email}
          </a>{" "}
          {t("access.errorTail")}
        </p>
      )}
    </>
  );
}
