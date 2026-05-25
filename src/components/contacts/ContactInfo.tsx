import React from "react";
import { useTranslations } from "next-intl";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export function ContactInfo() {
  const t = useTranslations("contacts.info");

  const items: Array<{
    icon: React.ElementType;
    label: string;
    color: string;
    bg: string;
    href?: string;
  }> = [
    { icon: MapPin, label: t("address"), color: "text-purple-400", bg: "from-purple-500/20 to-purple-500/5" },
    { icon: Mail, label: t("email"), color: "text-blue-400", bg: "from-blue-500/20 to-blue-500/5", href: `mailto:${t("email")}` },
    { icon: Phone, label: t("phone"), color: "text-cyan-400", bg: "from-cyan-500/20 to-cyan-500/5", href: `tel:${t("phone").replace(/\s/g, "")}` },
    { icon: Clock, label: t("hours"), color: "text-violet-400", bg: "from-violet-500/20 to-violet-500/5" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-lg mb-6">{t("title")}</h3>
      {items.map(({ icon: Icon, label, color, bg, href }) => (
        <div
          key={label}
          className="flex items-center gap-4 glass-card rounded-xl p-4 hover:border-white/15 transition-colors"
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          {href ? (
            <a href={href} className="text-gray-300 hover:text-white transition-colors text-sm">
              {label}
            </a>
          ) : (
            <span className="text-gray-300 text-sm">{label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
