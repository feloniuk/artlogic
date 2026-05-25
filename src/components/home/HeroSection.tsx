"use client";

import dynamic from "next/dynamic";
import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ArrowRight, ChevronDown } from "lucide-react";

const SplineScene = dynamic(
  () =>
    import("@/components/ui/splite").then((mod) => ({ default: mod.SplineScene })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-violet-600/10 blur-3xl animate-pulse" />
      </div>
    ),
  }
);

const SPRING = { ease: [0.16, 1, 0.3, 1] } as const;

export function HeroSection() {
  const t = useTranslations("hero");
  const splineContainerRef = useRef<HTMLDivElement>(null);

  const handleSectionMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!splineContainerRef.current) return;
      const canvas = splineContainerRef.current.querySelector("canvas");
      if (!canvas || e.target === canvas) return;
      canvas.dispatchEvent(
        new PointerEvent("pointermove", {
          bubbles: false,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
          screenX: e.screenX,
          screenY: e.screenY,
          movementX: e.movementX,
          movementY: e.movementY,
          pointerId: 1,
          pointerType: "mouse",
          isPrimary: true,
        })
      );
    },
    []
  );

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden snap-section"
      onMouseMove={handleSectionMouseMove}
    >
      <BackgroundPaths />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-700/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[75vh]">

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ...SPRING }}
            className="flex flex-col gap-7"
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
              className="text-[2.6rem] md:text-[3.5rem] lg:text-[4.2rem] font-extrabold leading-[1.06] tracking-[-0.025em] text-white text-balance"
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
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {[
                    { initials: "OM", bg: "bg-violet-700" },
                    { initials: "DK", bg: "bg-indigo-700" },
                    { initials: "VB", bg: "bg-violet-800" },
                  ].map(({ initials, bg }, i) => (
                    <div
                      key={initials}
                      className={`w-7 h-7 rounded-full ${bg} border-2 border-brand-bg flex items-center justify-center text-[9px] font-bold text-white`}
                      style={{ zIndex: 3 - i }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="text-white/35 text-xs font-medium">50+ клієнтів</span>
              </div>

              <div className="w-px h-3 bg-white/10" />

              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-white/35 text-xs font-medium">99.7% uptime</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Spline 3D in double-bezel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.0, ...SPRING }}
            className="relative h-[380px] md:h-[480px] lg:h-[560px]"
          >
            {/* Outer bezel */}
            <div className="absolute inset-0 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] p-1.5">
              {/* Inner core */}
              <div className="relative w-full h-full rounded-[calc(2rem-6px)] overflow-hidden bg-brand-surface" style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08)" }}>
                <div ref={splineContainerRef} className="absolute inset-0">
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none rounded-b-[2rem]" />

            {/* Ambient glow behind bezel */}
            <div className="absolute inset-4 bg-violet-600/8 rounded-[2rem] blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
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
