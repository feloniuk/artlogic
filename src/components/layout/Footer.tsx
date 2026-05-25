import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5" style={{ background: "rgba(12,12,32,0.85)", backdropFilter: "blur(20px)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-5">
              <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/25 transition-transform duration-200 group-hover:scale-105">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 1L9.5 9.5H2.5L6 1Z" fill="white" fillOpacity="0.9" />
                </svg>
              </div>
              <span className="font-bold text-base text-white">
                Art<span className="text-violet-400">Logic</span>
              </span>
            </Link>
            <p className="text-white/35 text-sm leading-relaxed max-w-[220px]" style={{ textWrap: "pretty" } as React.CSSProperties}>
              {t("tagline")}
            </p>
            <div className="flex items-center gap-2.5 mt-6">
              <a
                href="mailto:info@artlogic.com.ua"
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-white/40 hover:text-white hover:bg-white/8 text-xs font-medium transition-all duration-150"
              >
                info@artlogic.com.ua
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-[0.1em] mb-5">
              {t("services")}
            </h4>
            <ul className="space-y-3">
              {["CRM/ERP", "EDI", "AI чат-боти", "Розробка ПЗ", "Вебзастосунки"].map(
                (service) => (
                  <li key={service}>
                    <Link
                      href="/#services"
                      className="text-white/35 hover:text-white text-sm transition-colors duration-150"
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
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-[0.1em] mb-5">
              {t("company")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/35 hover:text-white text-sm transition-colors duration-150">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-white/35 hover:text-white text-sm transition-colors duration-150">
                  {t("contacts")}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-white/35 hover:text-white text-sm transition-colors duration-150">
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            {t("copyright", { year })}
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white/20 text-xs">artlogic.com.ua</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
