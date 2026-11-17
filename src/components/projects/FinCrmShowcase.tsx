"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import {
  ShoppingCart,
  FileText,
  Warehouse,
  Building2,
  Truck,
  MessageCircle,
  Sparkles,
  Wallet,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { CRM_FINANCE_TRIAL_URL } from "@/lib/links";

const SPRING = { ease: [0.16, 1, 0.3, 1] } as const;

const featureConfig = [
  { key: "orders", icon: ShoppingCart, colSpan: "md:col-span-2", featured: true },
  { key: "invoicing", icon: FileText, colSpan: "", featured: false },
  { key: "warehouse", icon: Warehouse, colSpan: "", featured: false },
  { key: "companies", icon: Building2, colSpan: "", featured: false },
  { key: "delivery", icon: Truck, colSpan: "md:col-span-2", featured: false },
  { key: "messaging", icon: MessageCircle, colSpan: "", featured: false },
  { key: "ai", icon: Sparkles, colSpan: "", featured: false },
  { key: "finance", icon: Wallet, colSpan: "md:col-span-2", featured: false },
] as const;

function FeatureCard({
  icon: Icon,
  colSpan,
  featured,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  colSpan: string;
  featured: boolean;
  title: string;
  description: string;
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  const handleMouseLeave = () => setSpotlight((s) => ({ ...s, visible: false }));

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.7, ...SPRING }}
      className={`group relative rounded-3xl overflow-hidden ${colSpan}`}
    >
      <div className="absolute inset-0 rounded-3xl bg-white/[0.025] border border-white/[0.07]" />
      <div
        className="relative m-[1px] rounded-[calc(1.5rem-1px)] overflow-hidden"
        style={{
          background: "rgba(10, 10, 26, 0.7)",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.07)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: spotlight.visible ? 1 : 0,
            background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, rgba(124,58,237,0.07), transparent 70%)`,
          }}
        />
        {featured && (
          <div className="absolute top-6 left-6 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
        )}
        <div className={`relative p-7 ${featured ? "md:p-10" : ""} flex flex-col h-full min-h-[170px]`}>
          <div className="mb-5">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-violet-500/15 group-hover:border-violet-500/30">
              <Icon className="w-5 h-5 text-violet-400" strokeWidth={1.5} />
            </div>
          </div>
          <h3 className={`text-white font-semibold mb-2 leading-snug ${featured ? "text-xl md:text-2xl" : "text-base"}`}>
            {title}
          </h3>
          <p className={`text-white/40 leading-relaxed ${featured ? "text-[0.95rem] max-w-md" : "text-sm"}`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function FinCrmShowcase() {
  const t = useTranslations("projects.fincrm");

  return (
    <SectionWrapper id="fincrm">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ...SPRING }}
        className="mb-12 max-w-3xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-medium text-violet-300 mb-5">
          {t("badge")}
        </span>
        <h2 className="text-3xl leading-tight md:text-title font-extrabold text-white tracking-[-0.02em] mb-5">
          {t("title")}
        </h2>
        <p className="text-white/45 text-base md:text-lg leading-relaxed mb-3">{t("description")}</p>
        <p className="text-white/30 text-sm leading-relaxed">{t("stack")}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-16">
        {featureConfig.map((feature, i) => (
          <FeatureCard
            key={feature.key}
            icon={feature.icon}
            colSpan={feature.colSpan}
            featured={feature.featured}
            title={t(`features.${feature.key}.title`)}
            description={t(`features.${feature.key}.desc`)}
            delay={i * 0.06}
          />
        ))}
      </div>

      {/* SaaS callout */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ...SPRING }}
        className="relative rounded-3xl overflow-hidden mb-10"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/[0.08] via-white/[0.02] to-transparent border border-white/[0.08]" />
        <div className="relative p-8 md:p-12">
          <h3 className="text-white font-bold text-xl md:text-2xl mb-3">{t("saas.title")}</h3>
          <p className="text-white/45 text-base leading-relaxed max-w-2xl mb-6">{t("saas.text")}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={CRM_FINANCE_TRIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors duration-200 active:scale-[0.97] shadow-lg shadow-violet-500/20 w-fit"
            >
              {t("ctaTrial")}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/contacts"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/55 transition-colors duration-200 hover:text-white w-fit"
            >
              {t("cta")}
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
