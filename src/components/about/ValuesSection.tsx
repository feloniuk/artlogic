"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { GradientText } from "@/components/shared/GradientText";
import { Shield, Eye, TrendingUp, MapPin } from "lucide-react";

const valuesConfig = [
  { key: "reliability", icon: Shield, color: "from-purple-500/20 to-purple-500/5", iconColor: "text-purple-400" },
  { key: "clarity", icon: Eye, color: "from-blue-500/20 to-blue-500/5", iconColor: "text-blue-400" },
  { key: "growth", icon: TrendingUp, color: "from-cyan-500/20 to-cyan-500/5", iconColor: "text-cyan-400" },
  { key: "local", icon: MapPin, color: "from-violet-500/20 to-violet-500/5", iconColor: "text-violet-400" },
] as const;

export function ValuesSection() {
  const t = useTranslations("about.values");

  return (
    <SectionWrapper className="bg-brand-surface/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          <GradientText>{t("title")}</GradientText>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {valuesConfig.map(({ key, icon: Icon, color, iconColor }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <h3 className="text-white font-semibold mb-2">{t(`${key}.title`)}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t(`${key}.desc`)}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
