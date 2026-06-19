"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { endpoints, site } from "@/lib/site";

const inputClass =
  "h-[50px] w-full rounded-2xl border border-border bg-[hsla(15,8%,12%,0.7)] px-4 text-[14.5px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/55";

// Partner / restaurant / investor contact form. POSTs to
// NEXT_PUBLIC_BUSINESS_FORM_ENDPOINT when set, else confirms optimistically.
export function BusinessForm() {
  const { t } = useTranslation();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading" || state === "done") return;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    if (!endpoints.business) {
      setState("done");
      return;
    }
    try {
      setState("loading");
      const res = await fetch(endpoints.business, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, source: "for-business" }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/15 px-6 py-8 text-center text-[17px] font-bold text-primary-light">
        {t("form.done")}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto grid max-w-[620px] grid-cols-1 gap-3 text-left sm:grid-cols-2">
      <input name="name" required placeholder={t("form.name")} aria-label={t("form.name")} className={inputClass} />
      <input
        name="email"
        type="email"
        required
        placeholder={t("form.workEmail")}
        aria-label={t("form.workEmail")}
        className={inputClass}
      />
      <select name="role" required aria-label={t("form.roleLabel")} defaultValue="" className={`${inputClass} cursor-pointer appearance-none`}>
        <option value="" disabled>
          {t("form.roleDefault")}
        </option>
        <option>{t("form.roleRestaurant")}</option>
        <option>{t("form.roleGroup")}</option>
        <option>{t("form.roleInvestor")}</option>
        <option>{t("form.rolePress")}</option>
        <option>{t("form.roleOther")}</option>
      </select>
      <input name="company" placeholder={t("form.company")} aria-label={t("form.companyLabel")} className={inputClass} />
      <textarea
        name="message"
        placeholder={t("form.message")}
        aria-label={t("form.messageLabel")}
        className={`${inputClass} col-span-1 h-[100px] resize-y py-3.5 leading-relaxed sm:col-span-2`}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="col-span-1 inline-flex h-[52px] items-center justify-center rounded-full bg-primary px-7 text-base font-bold text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-glow active:scale-95 disabled:opacity-70 sm:col-span-2"
      >
        {state === "loading" ? t("form.sending") : t("form.send")}
      </button>
      {state === "error" && (
        <p className="col-span-1 text-center text-[13px] text-destructive-foreground/90 sm:col-span-2">
          {t("form.errorLead")}{" "}
          <a href={`mailto:${site.businessEmail}`} className="font-semibold text-primary-light">
            {site.businessEmail}
          </a>
          .
        </p>
      )}
    </form>
  );
}
