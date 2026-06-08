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

function AdvantageCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.7, ...SPRING }}
      className="group relative"
    >
      {/* Outer bezel */}
      <div className="absolute inset-0 rounded-2xl bg-white/[0.025] border border-white/[0.07]" />

      {/* Inner */}
      <div
        className="relative m-[1px] rounded-[calc(1rem-1px)] px-6 py-7 transition-all duration-300 group-hover:bg-violet-500/[0.04]"
        style={{
          background: "rgba(10, 10, 26, 0.6)",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-violet-400" />
        </div>
        <h3 className="text-white font-bold text-base mb-2">{title}</h3>
        <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const t = useTranslations("advantages");

  return (
    <section className="py-8 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {advantages.map((adv, i) => (
            <AdvantageCard
              key={adv.key}
              icon={adv.icon}
              title={t(`${adv.key}.title`)}
              desc={t(`${adv.key}.desc`)}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
