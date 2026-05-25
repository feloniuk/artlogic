"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const SPRING = { ease: [0.16, 1, 0.3, 1] } as const;

/* More organic, believable numbers */
const stats = [
  { key: "clients", value: 53, suffix: "+", prefix: "", isFloat: false },
  { key: "projects", value: 127, suffix: "+", prefix: "", isFloat: false },
  { key: "years", value: 8, suffix: "+", prefix: "", isFloat: false },
  { key: "uptime", value: 997, suffix: "%", prefix: "", isFloat: true }, // displayed as 99.7
] as const;

function StatCard({
  value,
  suffix,
  label,
  isFloat,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  isFloat?: boolean;
  delay: number;
}) {
  const { count, ref } = useAnimatedCounter(isFloat ? value : value, 1800);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
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
        className="relative m-[1px] rounded-[calc(1rem-1px)] px-6 py-7 text-center transition-all duration-300 group-hover:bg-violet-500/[0.04]"
        style={{
          background: "rgba(10, 10, 26, 0.6)",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="text-4xl md:text-5xl font-extrabold mb-1.5 tracking-[-0.03em] text-white tabular-nums">
          {isFloat ? (count / 10).toFixed(1) : count}
          <span className="text-violet-400">{suffix}</span>
        </div>
        <p className="text-white/35 text-sm font-medium">{label}</p>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section className="py-8 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.key}
              value={stat.value}
              suffix={stat.suffix}
              label={t(stat.key)}
              isFloat={"isFloat" in stat && stat.isFloat}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
