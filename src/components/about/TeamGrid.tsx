"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { GradientText } from "@/components/shared/GradientText";
import { ExternalLink } from "lucide-react";

const teamKeys = ["ceo", "cto", "lead", "ba"] as const;
const gradients = [
  "from-purple-500 to-blue-500",
  "from-blue-500 to-cyan-500",
  "from-cyan-500 to-violet-500",
  "from-violet-500 to-purple-500",
];

export function TeamGrid() {
  const t = useTranslations("about.team");

  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          <GradientText>{t("title")}</GradientText>
        </h2>
        <p className="text-gray-400">{t("subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamKeys.map((key, i) => {
          const name = t(`members.${key}.name`);
          const initials = name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .slice(0, 2);

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Avatar */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                >
                  {initials}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-brand-surface" />
              </div>

              <h3 className="text-white font-semibold mb-1">{name}</h3>
              <p className="text-gray-500 text-sm mb-4">
                {t(`members.${key}.role`)}
              </p>

              <a
                href="#"
                className="inline-flex items-center justify-center w-8 h-8 glass rounded-lg text-gray-400 hover:text-brand-blue-light transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
