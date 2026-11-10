"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  LayoutDashboard,
  Lock,
  ShoppingCart,
  Truck,
  Wallet,
} from "lucide-react";

const SPRING = { ease: [0.16, 1, 0.3, 1] } as const;
const FINCRM_URL = "https://crm-finance.com.ua/";

const INTEGRATIONS = ["Horoshop", "Prom.ua", "Нова Пошта", "WayForPay", "SMS-Fly", "Telegram"];
const FACTS = ["integrations", "start", "trial"] as const;

const QUEUE = [
  { no: "#1045", source: "Horoshop", amount: "₴2 480", status: "paid" },
  { no: "#1044", source: "Prom.ua", amount: "₴915", status: "shipped" },
  { no: "#1043", source: "Horoshop", amount: "₴6 730", status: "invoice" },
  { no: "#1042", source: "Prom.ua", amount: "₴1 290", status: "new" },
] as const;

const STATUS_STYLE: Record<(typeof QUEUE)[number]["status"], string> = {
  paid: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  shipped: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
  invoice: "bg-violet-400/10 text-violet-300 border-violet-400/20",
  new: "bg-white/5 text-white/55 border-white/10",
};

const CHART_LINE =
  "M0 62 C20 58 30 50 48 52 S78 40 96 44 S126 30 144 34 S176 22 194 26 S226 12 246 16 S282 6 300 4";

function ProductMock() {
  const t = useTranslations("fincrmHome.mock");

  const tiles = [
    { key: "orders", value: "126", icon: ShoppingCart },
    { key: "ttn", value: "42", icon: Truck },
    { key: "invoices", value: "18", icon: FileText },
  ] as const;

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/10 blur-3xl" />

      <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] p-1.5">
        <div
          className="overflow-hidden rounded-[calc(1.75rem-6px)] bg-brand-surface"
          style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08)" }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
            <div className="mx-auto flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[10px] text-white/45">
              <Lock className="h-2.5 w-2.5" />
              crm-finance.com.ua
            </div>
            <div className="w-[42px]" />
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="hidden w-12 flex-shrink-0 flex-col items-center gap-4 border-r border-white/[0.06] py-5 sm:flex">
              {[LayoutDashboard, ShoppingCart, FileText, Truck, Wallet].map((Icon, i) => (
                <span
                  key={i}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                    i === 0 ? "bg-violet-500/20 text-violet-300" : "text-white/25"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
              ))}
            </div>

            <div className="min-w-0 flex-1 space-y-3 p-4 sm:p-5">
              {/* Revenue */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] text-white/40">{t("revenue")}</p>
                    <p className="mt-1 text-2xl font-extrabold tracking-tight tabular-nums text-white sm:text-[1.7rem]">
                      ₴184&nbsp;320
                    </p>
                  </div>
                  <span className="flex items-center gap-0.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    <ArrowUpRight className="h-2.5 w-2.5" />
                    18,4%
                  </span>
                </div>
                <svg viewBox="0 0 300 70" preserveAspectRatio="none" className="mt-3 h-16 w-full" fill="none">
                  <defs>
                    <linearGradient id="fincrm-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#7c3aed" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={`${CHART_LINE} L300 70 L0 70 Z`}
                    fill="url(#fincrm-area)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  />
                  <motion.path
                    d={CHART_LINE}
                    stroke="#a78bfa"
                    strokeWidth={2}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 1.4, ease: "easeInOut" }}
                  />
                </svg>
              </div>

              {/* Tiles */}
              <div className="grid grid-cols-3 gap-3">
                {tiles.map((tile) => (
                  <div key={tile.key} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                    <tile.icon className="h-3.5 w-3.5 text-violet-300/80" strokeWidth={1.75} />
                    <p className="mt-2 text-base font-bold tabular-nums text-white">{tile.value}</p>
                    <p className="truncate text-[10px] text-white/35">{t(tile.key)}</p>
                  </div>
                ))}
              </div>

              {/* Queue */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center justify-between px-4 py-3">
                  <p className="text-xs font-semibold text-white/85">{t("queue")}</p>
                  <p className="text-[10px] text-white/30">{t("allSources")}</p>
                </div>
                <ul className="divide-y divide-white/[0.05] border-t border-white/[0.05]">
                  {QUEUE.map((row, i) => (
                    <motion.li
                      key={row.no}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ...SPRING }}
                      className="flex items-center gap-3 px-4 py-2.5 text-[11px]"
                    >
                      <span className="font-mono text-white/75">{row.no}</span>
                      <span className="text-white/35">{row.source}</span>
                      <span className="ml-auto font-semibold tabular-nums text-white/80">{row.amount}</span>
                      <span
                        className={`w-[84px] rounded-full border px-2 py-0.5 text-center text-[10px] font-medium ${STATUS_STYLE[row.status]}`}
                      >
                        {t(`status.${row.status}`)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FinCrmSpotlight() {
  const t = useTranslations("fincrmHome");

  return (
    <section id="fincrm" className="relative overflow-hidden px-4 py-24 md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ...SPRING }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/[0.07] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            {t("eyebrow")}
          </span>

          <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-white md:text-[2.75rem]">
            {t("title")} <span className="text-violet-400">{t("titleHighlight")}</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/50">{t("text")}</p>

          {/* Facts */}
          <dl className="mt-9 grid grid-cols-3 border-y border-white/[0.08]">
            {FACTS.map((fact, i) => (
              <div
                key={fact}
                className={`py-5 ${i > 0 ? "border-l border-white/[0.08] pl-4 sm:pl-6" : ""} ${
                  i < FACTS.length - 1 ? "pr-3" : ""
                }`}
              >
                <dt className="sr-only">{t(`facts.${fact}.label`)}</dt>
                <dd>
                  <span className="block whitespace-nowrap text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    {t(`facts.${fact}.value`)}
                  </span>
                  <span aria-hidden className="mt-1 block text-xs leading-snug text-white/40">
                    {t(`facts.${fact}.label`)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          {/* Integrations */}
          <div className="mt-7">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
              {t("integrationsLabel")}
            </p>
            <ul className="flex flex-wrap gap-2">
              {INTEGRATIONS.map((name) => (
                <li
                  key={name}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={FINCRM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-3 rounded-full bg-violet-600 py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-xl shadow-violet-500/20 transition-colors duration-150 hover:bg-violet-500 active:scale-[0.97]"
            >
              {t("ctaTry")}
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
            >
              {t("ctaMore")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* Product */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, duration: 0.9, ...SPRING }}
        >
          <ProductMock />
        </motion.div>
      </div>
    </section>
  );
}
