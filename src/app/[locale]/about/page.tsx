import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompanyStory } from "@/components/about/CompanyStory";
import { ValuesSection } from "@/components/about/ValuesSection";
import { TeamGrid } from "@/components/about/TeamGrid";
import { CtaSection } from "@/components/home/CtaSection";
import { GradientText } from "@/components/shared/GradientText";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Page hero */}
        <section className="relative py-20 px-4 md:px-8 overflow-hidden bg-brand-bg">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-purple/8 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <GradientText>{t("pageTitle")}</GradientText>
            </h1>
            <p className="text-gray-400 text-xl">{t("pageSubtitle")}</p>
          </div>
        </section>

        <CompanyStory />
        <ValuesSection />
        <TeamGrid />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
