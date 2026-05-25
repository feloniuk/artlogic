"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 glass rounded-lg p-1">
      <button
        onClick={() => handleSwitch("uk")}
        className={cn(
          "px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200",
          locale === "uk"
            ? "bg-gradient-brand text-white"
            : "text-gray-400 hover:text-white"
        )}
      >
        UA
      </button>
      <button
        onClick={() => handleSwitch("en")}
        className={cn(
          "px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200",
          locale === "en"
            ? "bg-gradient-brand text-white"
            : "text-gray-400 hover:text-white"
        )}
      >
        EN
      </button>
    </div>
  );
}
