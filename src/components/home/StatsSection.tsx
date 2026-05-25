"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const stats = [
  { key: "clients", value: 50, suffix: "+", prefix: "" },
  { key: "projects", value: 120, suffix: "+", prefix: "" },
  { key: "years", value: 10, suffix: "+", prefix: "" },
  { key: "uptime", value: 99.9, suffix: "%", prefix: "", isFloat: true },
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
  const { count, ref } = useAnimatedCounter(isFloat ? 999 : value, 2000);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.6 }}
      className="glass-card rounded-2xl p-6 text-center group hover:border-brand-purple/30 transition-colors"
    >
      <div className="text-4xl md:text-5xl font-bold mb-2">
        <span className="text-gradient">
          {isFloat ? (count / 10).toFixed(1) : count}
          {suffix}
        </span>
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
  );
}

export function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section className="py-12 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.key}
              value={stat.value}
              suffix={stat.suffix}
              label={t(stat.key)}
              isFloat={"isFloat" in stat}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
