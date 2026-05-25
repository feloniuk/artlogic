"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LogOut } from "lucide-react";

export function LogoutButton({ locale }: { locale: string }) {
  const t = useTranslations("admin");
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login", { locale });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-gray-400 hover:text-white text-sm transition-colors"
    >
      <LogOut className="w-3.5 h-3.5" />
      {t("logout")}
    </button>
  );
}
