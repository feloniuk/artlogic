import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
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
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
