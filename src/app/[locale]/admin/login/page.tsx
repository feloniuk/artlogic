import { setRequestLocale } from "next-intl/server";
import { LoginForm } from "@/components/admin/LoginForm";

type Props = { params: Promise<{ locale: string }> };

export const metadata = { title: "Admin Login — ArtLogic" };

export default async function AdminLoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LoginForm />;
}
