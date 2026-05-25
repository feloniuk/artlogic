"use client";

import { useTranslations } from "next-intl";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { GradientText } from "@/components/shared/GradientText";
import { TrendingUp, Users, CheckCircle2, Bell, BarChart3, ArrowUpRight } from "lucide-react";

function MockDashboard() {
  return (
    <div className="w-full h-full bg-brand-surface p-4 md:p-6 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-sm">ArtLogic CRM</h3>
          <p className="text-gray-500 text-xs">Dashboard overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-gray-400" />
          <div className="w-7 h-7 rounded-full bg-gradient-brand text-white text-xs flex items-center justify-center font-bold">A</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Клієнти", value: "247", change: "+12%", icon: Users, color: "text-purple-400" },
          { label: "Угоди", value: "₴1.2M", change: "+8%", icon: TrendingUp, color: "text-blue-400" },
          { label: "Виконано", value: "94%", change: "+3%", icon: CheckCircle2, color: "text-cyan-400" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
              <span className="text-green-400 text-[10px] font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-2.5 h-2.5" />
                {stat.change}
              </span>
            </div>
            <p className="text-white font-bold text-sm">{stat.value}</p>
            <p className="text-gray-500 text-[10px]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="glass rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white text-xs font-medium">Активність за місяць</span>
          <BarChart3 className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: i >= 9
                  ? "linear-gradient(180deg, #7c3aed, #06b6d4)"
                  : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="glass rounded-xl p-3">
        <p className="text-white text-xs font-medium mb-2">Остання активність</p>
        <div className="space-y-1.5">
          {[
            { text: "Нова угода — ТОВ Альфа", time: "2хв", color: "bg-purple-400" },
            { text: "Документ підписано — ПП Бета", time: "15хв", color: "bg-blue-400" },
            { text: "Інтеграція EDI — оновлено", time: "1г", color: "bg-cyan-400" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
              <span className="text-gray-300 text-[11px] flex-1">{item.text}</span>
              <span className="text-gray-600 text-[10px]">{item.time}</span>
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
    <section className="relative bg-brand-bg">
      <ContainerScroll
        titleComponent={
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <GradientText>{t("title")}</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
