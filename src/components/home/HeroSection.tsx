"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { AutomationFlow } from "@/components/home/AutomationFlow";
import { ArrowRight, ArrowUpRight, ChevronDown, UserCheck } from "lucide-react";

const SPRING = { ease: [0.16, 1, 0.3, 1] } as const;
const FINCRM_URL = "https://crm-finance.com.ua/";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden snap-section">
      <BackgroundPaths />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-700/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-[clamp(6rem,12vh,8rem)] pb-[clamp(3rem,8vh,5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_1fr] gap-12 lg:gap-[clamp(2.5rem,4.5vw,4rem)] items-center">

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ...SPRING }}
            className="flex flex-col gap-7 lg:gap-[clamp(1.25rem,2.8vh,1.75rem)]"
          >
            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ...SPRING }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/8 px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-medium text-violet-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                {t("badge")}
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ...SPRING }}
              className="text-[2.6rem] leading-[1.06] md:text-[3.5rem] lg:text-display font-extrabold tracking-[-0.025em] text-white text-balance"
            >
              {t("title")}
              <br />
              <span className="text-violet-400 font-extrabold">{t("titleHighlight")}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ...SPRING }}
              className="text-white/50 text-[1.05rem] leading-relaxed max-w-md"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ...SPRING }}
              className="flex flex-col sm:flex-row gap-3 pt-1"
            >
              {/* Primary CTA — nested icon architecture */}
              <Link
                href="/contacts"
                className="group inline-flex items-center justify-between gap-3 pl-6 pr-2 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-xl shadow-violet-500/20 transition-colors duration-150 active:scale-[0.97]"
                style={{ transition: "background-color 160ms ease-out, transform 100ms ease-out" }}
              >
                {t("ctaPrimary")}
                {/* Nested icon circle */}
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/8 text-white/70 hover:text-white font-medium text-sm border border-white/8 hover:border-white/15 transition-all duration-200"
              >
                {t("ctaSecondary")}
                <ChevronDown className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex items-center gap-6 pt-1"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-700 border-2 border-brand-bg flex items-center justify-center">
                  <UserCheck className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white/35 text-xs font-medium">{t("trustClients")}</span>
              </div>

              <div className="w-px h-3 bg-white/10" />

              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-white/35 text-xs font-medium">{t("trustSupport")}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — live automation pipeline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.0, ...SPRING }}
            className="relative w-full max-w-[600px] mx-auto lg:mx-0 lg:justify-self-end"
          >
            <AutomationFlow />

            {/* Caption + quiet direct link to the product's free trial */}
            <div className="mt-5 lg:mt-[clamp(0.75rem,2vh,1.25rem)] flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs font-medium lg:justify-end">
              <Link
                href="/projects"
                className="text-white/40 transition-colors duration-200 hover:text-white"
              >
                {t("flow.caption")}
              </Link>
              <span aria-hidden className="hidden h-3 w-px bg-white/10 sm:block" />
              <a
                href={FINCRM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-violet-300/80 underline decoration-violet-400/30 underline-offset-4 transition-colors duration-200 hover:text-violet-200 hover:decoration-violet-300/70"
              >
                {t("flow.trial")}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-[clamp(0.75rem,2.5vh,2rem)] left-1/2 -translate-x-1/2 hidden lg:flex [@media(max-height:780px)]:!hidden flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
