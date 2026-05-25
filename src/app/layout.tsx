import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://artlogic.com.ua"
  ),
  title: {
    default: "ArtLogic — IT Автоматизація бізнесу",
    template: "%s | ArtLogic",
  },
  description:
    "Автоматизація бізнес-процесів для малого та середнього бізнесу України. CRM/ERP інтеграції, документообіг, чат-боти, замовна розробка.",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://artlogic.com.ua",
    siteName: "ArtLogic",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${manrope.variable} font-sans`}>{children}</body>
    </html>
  );
}
