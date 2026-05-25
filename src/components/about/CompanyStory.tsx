"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GradientText } from "@/components/shared/GradientText";

export function CompanyStory() {
  const t = useTranslations("about");

  const timelineYears = ["2022", "2023", "2024", "2025"] as const;

  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Story text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <GradientText>{t("story.title")}</GradientText>
            </h2>
            <div className="space-y-4 text-gray-400 text-base leading-relaxed">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h3 className="text-xl font-bold text-white mb-8">
              {t("timeline.title")}
            </h3>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-brand-purple via-brand-blue to-brand-cyan" />

              <div className="space-y-8">
                {timelineYears.map((year, i) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex gap-6 relative"
                  >
                    {/* Dot */}
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    </div>

                    <div className="pb-2">
                      <span className="text-brand-purple-light font-bold text-sm">
                        {year}
                      </span>
                      <p className="text-gray-300 text-sm mt-0.5 leading-relaxed">
                        {t(`timeline.${year}`)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
