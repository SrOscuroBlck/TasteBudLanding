"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { endpoints, site } from "@/lib/site";

// Beta email capture, wired to the SAME early-access endpoint as the product app
// (POST { email } → { status }). Mirrors the app's handling: access_requested /
// already_requested are success, invalid_email and 429 get specific messages,
// and anything else falls back to a "contact us" error.
type State = "idle" | "loading" | "done" | "already" | "error";

export function AccessForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading" || state === "done" || state === "already") return;

    setErrorMsg(null);
    setState("loading");
    try {
      const res = await fetch(endpoints.access, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 429) {
        const body = await res.json().catch(() => ({ retry_after: 60 }));
        const minutes = Math.ceil((body.retry_after ?? 60) / 60);
        setErrorMsg(t("access.errorRate", { minutes }));
        setState("error");
        return;
      }

      const data = (await res.json().catch(() => ({}))) as { status?: string };
      switch (data.status) {
        case "access_requested":
          setState("done");
          break;
        case "already_requested":
          setState("already");
          break;
        case "invalid_email":
          setErrorMsg(t("access.errorInvalid"));
          setState("error");
          break;
        default:
          // not_active / unexpected shape / non-2xx → generic contact fallback
          setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "done" || state === "already") {
    return (
      <div className="mx-auto max-w-[460px] rounded-[28px] border border-primary/40 bg-primary/15 px-6 py-4 text-center font-bold text-primary-light">
        {t(state === "already" ? "access.alreadyDone" : "access.done")}
      </div>
    );
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mx-auto flex max-w-[460px] flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("access.placeholder")}
          aria-label={t("access.emailLabel")}
          className="h-[52px] w-full rounded-full border border-border bg-[hsla(15,8%,12%,0.7)] px-5 text-center text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/55 sm:flex-1 sm:text-left"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-primary px-7 text-base font-bold text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-glow active:scale-95 disabled:opacity-70 sm:w-auto"
        >
          {state === "loading" ? t("access.sending") : t("access.button")}
        </button>
      </form>
      {state === "error" && (
        <p className="mx-auto mt-3 max-w-[460px] text-center text-[13px] text-destructive-foreground/90">
          {errorMsg ?? (
            <>
              {t("access.errorLead")}{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary-light">
                {site.email}
              </a>{" "}
              {t("access.errorTail")}
            </>
          )}
        </p>
      )}
    </>
  );
}
