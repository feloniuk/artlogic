import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FinCrmShowcase } from "@/components/projects/FinCrmShowcase";
import { CtaSection } from "@/components/home/CtaSection";
import { GradientText } from "@/components/shared/GradientText";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Page hero */}
        <section className="relative py-24 md:py-36 px-4 md:px-8 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-700/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-medium text-white/40 mb-6">
              ArtLogic
            </span>
            <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white mb-5 tracking-[-0.025em] text-balance leading-tight">
              <GradientText>{t("pageTitle")}</GradientText>
            </h1>
            <p className="text-white/40 text-lg leading-relaxed max-w-2xl mx-auto">{t("pageSubtitle")}</p>
          </div>
        </section>

        {/* Intro */}
        <section className="px-4 md:px-8 mb-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 rounded-3xl bg-white/[0.025] border border-white/[0.07]" />
              <div
                className="relative m-[1px] rounded-[calc(1.5rem-1px)] p-8 md:p-10"
                style={{
                  background: "rgba(10, 10, 26, 0.6)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <h2 className="text-white font-bold text-xl md:text-2xl mb-3">{t("intro.title")}</h2>
                <p className="text-white/45 text-base leading-relaxed max-w-3xl">{t("intro.text")}</p>
              </div>
            </div>
          </div>
        </section>

        <FinCrmShowcase />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
