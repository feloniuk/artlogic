import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect(`/${locale}/admin/login`);
  }

  return <>{children}</>;
}
