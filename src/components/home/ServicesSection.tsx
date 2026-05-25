"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ArrowRight, Database, FileText, Bot, Code2, Globe } from "lucide-react";

const SPRING = { ease: [0.16, 1, 0.3, 1] } as const;

/* Asymmetric bento layout:
   [  CRM wide (col 1–2)  ] [ EDI        ]
   [ Bots  ] [ Custom     ] [ Web wide   ]
*/
const serviceConfig = [
  {
    key: "crm",
    icon: Database,
    colSpan: "md:col-span-2",
    accent: "text-violet-400",
    glow: "violet",
    featured: true,
  },
  {
    key: "edi",
    icon: FileText,
    colSpan: "",
    accent: "text-indigo-400",
    glow: "indigo",
    featured: false,
  },
  {
    key: "bots",
    icon: Bot,
    colSpan: "",
    accent: "text-violet-300",
    glow: "violet",
    featured: false,
  },
  {
    key: "custom",
    icon: Code2,
    colSpan: "",
    accent: "text-indigo-300",
    glow: "indigo",
    featured: false,
  },
  {
    key: "web",
    icon: Globe,
    colSpan: "md:col-span-2",
    accent: "text-violet-400",
    glow: "violet",
    featured: false,
  },
] as const;

function ServiceCard({
  serviceKey,
  icon: Icon,
  colSpan,
  accent,
  glow,
  featured,
  title,
  description,
  learnMore,
  delay,
}: {
  serviceKey: string;
  icon: React.ElementType;
  colSpan: string;
  accent: string;
  glow: string;
  featured: boolean;
  title: string;
  description: string;
  learnMore: string;
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  const handleMouseLeave = () => setSpotlight(s => ({ ...s, visible: false }));

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.7, ...SPRING }}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${colSpan}`}
    >
      {/* Outer bezel */}
      <div className="absolute inset-0 rounded-3xl bg-white/[0.025] border border-white/[0.07]" />

      {/* Inner card */}
      <div
        className="relative m-[1px] rounded-[calc(1.5rem-1px)] overflow-hidden"
        style={{
          background: "rgba(10, 10, 26, 0.7)",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.07)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Cursor spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: spotlight.visible ? 1 : 0,
            background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, rgba(124,58,237,0.07), transparent 70%)`,
          }}
        />

        {/* Glow behind icon for featured cards */}
        {featured && (
          <div className="absolute top-6 left-6 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
        )}

        <div className={`relative p-7 ${featured ? "md:p-10" : ""} flex flex-col h-full min-h-[180px]`}>
          {/* Icon */}
          <div className="mb-5">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-violet-500/15 group-hover:border-violet-500/30">
              <Icon className={`w-5 h-5 ${accent}`} strokeWidth={1.5} />
            </div>
          </div>

          <h3 className={`text-white font-semibold mb-2 leading-snug ${featured ? "text-xl md:text-2xl" : "text-base"}`}>
            {title}
          </h3>

          <p className={`text-white/40 leading-relaxed mb-5 flex-1 ${featured ? "text-[0.95rem] max-w-md" : "text-sm"}`}>
            {description}
          </p>

          {/* Link */}
          <Link
            href="/contacts"
            className={`inline-flex items-center gap-1.5 text-sm font-medium ${accent} hover:text-white transition-colors duration-150 group/link w-fit`}
          >
            {learnMore}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <SectionWrapper id="services" className="snap-section min-h-[100dvh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ...SPRING }}
        className="mb-14"
      >
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-medium text-white/40 mb-5">
          {t("subtitle")}
        </span>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-[-0.02em] leading-tight max-w-xl">
          {t("title").split(" ").map((word, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i} className="text-violet-400">{word}</span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h2>
      </motion.div>

      {/* Asymmetric bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {serviceConfig.map((service, i) => (
          <ServiceCard
            key={service.key}
            serviceKey={service.key}
            icon={service.icon}
            colSpan={service.colSpan}
            accent={service.accent}
            glow={service.glow}
            featured={service.featured}
            title={t(`${service.key}.title`)}
            description={t(`${service.key}.description`)}
            learnMore={t("learnMore")}
            delay={i * 0.08}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
