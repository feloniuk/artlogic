import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contacts/ContactForm";
import { ContactInfo } from "@/components/contacts/ContactInfo";
import { MapEmbed } from "@/components/contacts/MapEmbed";
import { GradientText } from "@/components/shared/GradientText";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacts" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
  };
}

export default async function ContactsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contacts" });

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-24 md:py-36 px-4 md:px-8 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-medium text-white/40 mb-6">
              Контакти
            </span>
            <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white mb-5 tracking-[-0.025em] text-balance leading-tight">
              <GradientText>{t("pageTitle")}</GradientText>
            </h1>
            <p className="text-white/40 text-lg leading-relaxed max-w-xl mx-auto">{t("pageSubtitle")}</p>
          </div>
        </section>

        {/* Form + Info */}
        <section className="py-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Form — wider */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>

              {/* Info */}
              <div className="lg:col-span-2">
                <ContactInfo />
                <MapEmbed />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
