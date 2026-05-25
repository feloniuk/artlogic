"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { GradientText } from "@/components/shared/GradientText";
import { ArrowRight, Database, FileText, Bot, Code2, Globe } from "lucide-react";

const serviceConfig = [
  { key: "crm", icon: Database, color: "from-purple-500/20 to-purple-500/5", iconColor: "text-purple-400", glow: "group-hover:shadow-purple-500/20" },
  { key: "edi", icon: FileText, color: "from-blue-500/20 to-blue-500/5", iconColor: "text-blue-400", glow: "group-hover:shadow-blue-500/20" },
  { key: "bots", icon: Bot, color: "from-cyan-500/20 to-cyan-500/5", iconColor: "text-cyan-400", glow: "group-hover:shadow-cyan-500/20" },
  { key: "custom", icon: Code2, color: "from-indigo-500/20 to-indigo-500/5", iconColor: "text-indigo-400", glow: "group-hover:shadow-indigo-500/20" },
  { key: "web", icon: Globe, color: "from-violet-500/20 to-violet-500/5", iconColor: "text-violet-400", glow: "group-hover:shadow-violet-500/20" },
] as const;

function ServiceCard({
  serviceKey,
  icon: Icon,
  color,
  iconColor,
  glow,
  title,
  description,
  learnMore,
  delay,
}: {
  serviceKey: string;
  icon: React.ElementType;
  color: string;
  iconColor: string;
  glow: string;
  title: string;
  description: string;
  learnMore: string;
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      className={`group relative glass-card rounded-2xl p-6 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-white/15 ${glow} hover:shadow-xl`}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.04), transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>

      <Link
        href="/contacts"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple-light hover:text-white transition-colors"
      >
        {learnMore}
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <SectionWrapper id="services">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <GradientText>{t("title")}</GradientText>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceConfig.map((service, i) => (
          <ServiceCard
            key={service.key}
            serviceKey={service.key}
            icon={service.icon}
            color={service.color}
            iconColor={service.iconColor}
            glow={service.glow}
            title={t(`${service.key}.title`)}
            description={t(`${service.key}.description`)}
            learnMore={t("learnMore")}
            delay={i * 0.1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
