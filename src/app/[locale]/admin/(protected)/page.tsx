import { setRequestLocale, getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { SubmissionTable } from "@/components/admin/SubmissionTable";
import { GradientText } from "@/components/shared/GradientText";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import Link from "next/link";
import type { ContactSubmission } from "@/types";

type Props = { params: Promise<{ locale: string }> };

export const metadata = { title: "Admin — ArtLogic" };

export default async function AdminPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "admin" });

  const rawSubmissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const submissions: ContactSubmission[] = rawSubmissions.map(
    (s: { id: string; name: string; email: string; phone: string | null; company: string | null; service: string | null; message: string; isRead: boolean; locale: string; createdAt: Date; updatedAt: Date }) => ({
      ...s,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    })
  );

  const unreadCount = submissions.filter((s) => !s.isRead).length;

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-sm text-white">
                Art<GradientText>Logic</GradientText>
              </span>
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-400 text-sm">{t("title")}</span>
          </div>
          <LogoutButton locale={locale} />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-2xl font-bold text-white">{t("submissions")}</h1>
          {unreadCount > 0 && (
            <Badge variant="purple" className="text-sm">
              {unreadCount} нових
            </Badge>
          )}
        </div>

        <SubmissionTable initialSubmissions={submissions} />
      </main>
    </div>
  );
}
