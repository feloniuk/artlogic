"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Shield, Eye, TrendingUp, MapPin } from "lucide-react";

const SPRING = { ease: [0.16, 1, 0.3, 1] } as const;

const valuesConfig = [
  { key: "reliability", icon: Shield, accent: "text-violet-400" },
  { key: "clarity", icon: Eye, accent: "text-indigo-400" },
  { key: "growth", icon: TrendingUp, accent: "text-violet-300" },
  { key: "local", icon: MapPin, accent: "text-indigo-300" },
] as const;

export function ValuesSection() {
  const t = useTranslations("about.values");

  return (
    <SectionWrapper className="bg-brand-surface/20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ...SPRING }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-[2.8rem] font-extrabold text-white tracking-[-0.02em] leading-tight">
          <span className="text-violet-400">{t("title")}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {valuesConfig.map(({ key, icon: Icon, accent }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6, ...SPRING }}
            className="group relative"
          >
            {/* Outer bezel */}
            <div className="absolute inset-0 rounded-2xl bg-white/[0.025] border border-white/[0.07]" />

            {/* Inner */}
            <div
              className="relative m-[1px] rounded-[calc(1rem-1px)] p-6 transition-all duration-300 group-hover:bg-violet-500/[0.04]"
              style={{
                background: "rgba(10, 10, 26, 0.6)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-violet-500/15">
                <Icon className={`w-5 h-5 ${accent}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-semibold mb-2 text-base">{t(`${key}.title`)}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{t(`${key}.desc`)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
