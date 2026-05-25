import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Zap, Share2, ExternalLink, Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg text-white">
                Art<span className="text-gradient">Logic</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="mailto:info@artlogic.com.ua"
                className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-cyan transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-blue transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-purple-light transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              {t("services")}
            </h4>
            <ul className="space-y-2.5">
              {["CRM/ERP", "EDI", "AI Чат-боти", "Розробка ПЗ", "Вебзастосунки"].map(
                (service) => (
                  <li key={service}>
                    <Link
                      href="/#services"
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {service}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              {t("company")}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {t("contacts")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            {t("copyright", { year })}
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-500 text-xs">artlogic.com.ua</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
