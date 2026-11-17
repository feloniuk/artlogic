"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Cookie } from "lucide-react";

export const CONSENT_COOKIE = "cookie_consent";
export type ConsentValue = "all" | "essential";

const MAX_AGE_S = 60 * 60 * 24 * 365;

export function getConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(all|essential)`));
  return (match?.[1] as ConsentValue) ?? null;
}

function saveConsent(value: ConsentValue) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${MAX_AGE_S}; Path=/; SameSite=Lax${secure}`;
  // Analytics or other optional scripts added later can listen for this.
  window.dispatchEvent(new CustomEvent("cookie-consent", { detail: value }));
}

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent()) return;
    const id = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(id);
  }, []);

  const choose = (value: ConsentValue) => {
    saveConsent(value);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-text"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/[0.08] bg-[#0c0c20]/95 shadow-[0_-20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:gap-8 md:px-8 md:py-5">
            <div className="flex min-w-0 flex-1 items-start gap-3.5 md:items-center">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10">
                <Cookie className="h-4 w-4 text-violet-300" strokeWidth={1.75} />
              </span>
              <p className="text-[13px] leading-relaxed text-white/50">
                <span id="cookie-consent-title" className="font-semibold text-white">
                  {t("title")}.
                </span>{" "}
                <span id="cookie-consent-text">
                  <span className="md:hidden">{t("textShort")}</span>
                  <span className="hidden md:inline">{t("text")}</span>
                </span>
              </p>
            </div>

            <div className="flex flex-shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("essential")}
                className="flex-1 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[13px] font-medium text-white/70 transition-colors duration-150 hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] md:flex-none"
              >
                {t("essential")}
              </button>
              <button
                type="button"
                onClick={() => choose("all")}
                className="flex-1 whitespace-nowrap rounded-full bg-violet-600 px-6 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-violet-500/20 transition-colors duration-150 hover:bg-violet-500 active:scale-[0.98] md:flex-none"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
