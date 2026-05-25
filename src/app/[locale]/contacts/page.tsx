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
        <section className="relative py-20 px-4 md:px-8 overflow-hidden bg-brand-bg">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-blue/8 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <GradientText>{t("pageTitle")}</GradientText>
            </h1>
            <p className="text-gray-400 text-xl">{t("pageSubtitle")}</p>
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
