"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Monitor, DollarSign, UserCheck, Cpu } from "lucide-react";

const SPRING = { ease: [0.16, 1, 0.3, 1] } as const;

const advantages = [
  { key: "crm", icon: Monitor },
  { key: "finance", icon: DollarSign },
  { key: "individual", icon: UserCheck },
  { key: "tech", icon: Cpu },
] as const;

export function StatsSection() {
  const t = useTranslations("advantages");

  return (
    <section className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ...SPRING }}
          className="mb-12 md:mb-16"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
            {t("eyebrow")}
          </span>
          <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-[-0.02em] text-white md:text-5xl">
            {t("title")} <span className="text-violet-400">{t("titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ...SPRING }}
              className={`group relative border-b border-white/[0.08] py-8 sm:px-7 lg:border-b-0 lg:py-10 ${
                i % 2 === 0 ? "sm:pl-0" : "sm:border-l"
              } ${i === 0 ? "lg:pl-0" : "lg:border-l lg:pl-7"}`}
            >
              {/* Accent line that grows on hover */}
              <span className="absolute left-0 top-[-1px] h-px w-0 bg-violet-400 transition-all duration-500 ease-out group-hover:w-full" />

              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs text-violet-400/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <adv.icon
                  className="h-5 w-5 text-white/25 transition-colors duration-300 group-hover:text-violet-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mb-3 text-lg font-bold leading-snug text-white">{t(`${adv.key}.title`)}</h3>
              <p className="text-sm leading-relaxed text-white/45">{t(`${adv.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
