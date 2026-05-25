"use client";

import { useTranslations } from "next-intl";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TrendingUp, Users, CheckCircle2, Bell, BarChart3, ArrowUpRight } from "lucide-react";

function MockDashboard() {
  return (
    <div className="w-full h-full bg-brand-surface p-4 md:p-6 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-sm">ArtLogic CRM</h3>
          <p className="text-white/30 text-xs">Dashboard overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-white/30" strokeWidth={1.5} />
          <div className="w-7 h-7 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center font-bold">A</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Клієнти", value: "247", change: "+12%", icon: Users, color: "text-violet-400" },
          { label: "Угоди", value: "₴1.2M", change: "+8.3%", icon: TrendingUp, color: "text-indigo-400" },
          { label: "Виконано", value: "94.1%", change: "+2.7%", icon: CheckCircle2, color: "text-violet-300" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} strokeWidth={1.5} />
              <span className="text-emerald-400 text-[10px] font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-2.5 h-2.5" />
                {stat.change}
              </span>
            </div>
            <p className="text-white font-bold text-sm">{stat.value}</p>
            <p className="text-white/30 text-[10px]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="glass rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white text-xs font-medium">Активність за місяць</span>
          <BarChart3 className="w-3.5 h-3.5 text-white/30" strokeWidth={1.5} />
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {[38, 61, 47, 78, 53, 87, 68, 82, 57, 91, 73, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all duration-300"
              style={{
                height: `${h}%`,
                background: i >= 9
                  ? "linear-gradient(180deg, rgba(124,58,237,0.9), rgba(109,40,217,0.6))"
                  : "rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="glass rounded-xl p-3">
        <p className="text-white text-xs font-medium mb-2">Остання активність</p>
        <div className="space-y-2">
          {[
            { text: "Нова угода — ТОВ «Зорепад»", time: "3хв", color: "bg-violet-400" },
            { text: "Документ підписано — ФОП Мельник", time: "19хв", color: "bg-indigo-400" },
            { text: "EDI інтеграція — оновлено", time: "1г 7хв", color: "bg-violet-300" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${item.color} flex-shrink-0`} />
              <span className="text-white/50 text-[11px] flex-1">{item.text}</span>
              <span className="text-white/20 text-[10px] flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardScroll() {
  const t = useTranslations("dashboard");

  return (
    <section className="relative snap-section">
      <ContainerScroll
        titleComponent={
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-medium text-white/40 mb-5">
              Демо
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-[-0.02em] leading-tight">
              {t("title").split(" ").map((word: string, i: number, arr: string[]) =>
                i === arr.length - 1 ? (
                  <span key={i} className="text-violet-400">{word}</span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h2>
            <p className="text-white/40 text-[1rem] max-w-xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        }
      >
        <MockDashboard />
      </ContainerScroll>
    </section>
  );
}
