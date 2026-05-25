"use client";

import dynamic from "next/dynamic";
import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/shared/GradientText";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

const SplineScene = dynamic(
  () =>
    import("@/components/ui/splite").then((mod) => ({ default: mod.SplineScene })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-gradient-brand opacity-20 blur-3xl animate-pulse" />
      </div>
    ),
  }
);

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
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-bg"
      onMouseMove={handleSectionMouseMove}
    >
      <BackgroundPaths />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge
                variant="purple"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm"
              >
                <Sparkles className="w-3 h-3" />
                {t("badge")}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            >
              <span className="text-white">{t("title")}</span>
              <br />
              <GradientText variant="subtle">{t("titleHighlight")}</GradientText>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-gray-400 text-lg leading-relaxed max-w-xl"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:opacity-90 transition-all hover:scale-105 hover:shadow-purple-500/40"
              >
                {t("ctaPrimary")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all"
              >
                {t("ctaSecondary")}
                <ChevronDown className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center gap-6 pt-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["OM", "DK", "VB"].map((initials, i) => (
                    <div
                      key={initials}
                      className="w-8 h-8 rounded-full bg-gradient-brand border-2 border-brand-bg flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ zIndex: 3 - i }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="text-gray-400 text-sm">50+ клієнтів</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-gray-400 text-sm">99.9% uptime</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content — Spline 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <div ref={splineContainerRef} className="absolute inset-0 rounded-2xl overflow-hidden">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
            {/* Gradient overlay bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
