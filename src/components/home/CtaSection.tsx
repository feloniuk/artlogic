"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const SPRING = { ease: [0.16, 1, 0.3, 1] } as const;

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="py-28 px-4 md:px-8 relative overflow-hidden snap-section min-h-[60dvh] flex items-center">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-700/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ...SPRING }}
        >
          {/* Outer bezel */}
          <div className="rounded-[2.5rem] bg-white/[0.025] border border-white/[0.08] p-1.5">
            {/* Inner core with grain */}
            <div
              className="relative rounded-[calc(2.5rem-6px)] overflow-hidden"
              style={{
                background: "rgba(10, 10, 26, 0.8)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Noise grain overlay on card */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "repeat",
                }}
              />

              {/* Glow inside card */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-violet-600/12 rounded-full blur-3xl pointer-events-none" />

              <div className="relative px-10 py-14 md:px-20 md:py-20 text-center">
                {/* Icon pill */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/25 mb-8 mx-auto">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2L13 8H17L14 12L15.5 18L10 15L4.5 18L6 12L3 8H7L10 2Z" fill="#a78bfa" fillOpacity="0.9" />
                  </svg>
                </div>

                <h2 className="text-3xl md:text-[2.8rem] font-extrabold text-white mb-4 tracking-[-0.025em] text-balance leading-tight">
                  {t("title")}
                </h2>

                <p className="text-white/40 text-[1rem] mb-10 max-w-xl mx-auto leading-relaxed" style={{ textWrap: "pretty" } as React.CSSProperties}>
                  {t("subtitle")}
                </p>

                {/* Nested pill button */}
                <Link
                  href="/contacts"
                  className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-2xl shadow-violet-500/30 active:scale-[0.97]"
                  style={{ transition: "background-color 160ms ease-out, transform 100ms ease-out" }}
                >
                  {t("button")}
                  <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
