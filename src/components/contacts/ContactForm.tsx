"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10).max(2000),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations("contacts.form");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const services = ["crm", "edi", "bots", "custom", "web", "other"] as const;

  const inputClass = "bg-brand-surface border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-brand-purple focus-visible:border-brand-purple/50 h-11";

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8">
      <h3 className="text-white font-semibold text-lg mb-6">{t("title")}</h3>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white font-semibold text-xl mb-2">{t("successTitle")}</h4>
            <p className="text-gray-400">{t("successMessage")}</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm text-brand-purple-light hover:text-white transition-colors"
            >
              ← Нова заявка
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">{t("name")}</Label>
                <Input
                  {...register("name")}
                  placeholder={t("namePlaceholder")}
                  className={cn(inputClass, errors.name && "border-red-500/50")}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">{t("email")}</Label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className={cn(inputClass, errors.email && "border-red-500/50")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">
                  {t("phone")} <span className="text-gray-600 text-xs">{t("optional")}</span>
                </Label>
                <Input
                  {...register("phone")}
                  placeholder={t("phonePlaceholder")}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">
                  {t("company")} <span className="text-gray-600 text-xs">{t("optional")}</span>
                </Label>
                <Input
                  {...register("company")}
                  placeholder={t("companyPlaceholder")}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">
                {t("service")} <span className="text-gray-600 text-xs">{t("optional")}</span>
              </Label>
              <select
                {...register("service")}
                className={cn(
                  "flex h-11 w-full rounded-md border border-white/10 bg-brand-surface px-3 py-2 text-sm text-gray-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple",
                  "appearance-none cursor-pointer"
                )}
              >
                <option value="" className="bg-brand-surface">{t("servicePlaceholder")}</option>
                {services.map((s) => (
                  <option key={s} value={s} className="bg-brand-surface">
                    {t(`services.${s}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">{t("message")}</Label>
              <Textarea
                {...register("message")}
                placeholder={t("messagePlaceholder")}
                rows={5}
                className={cn(
                  "bg-brand-surface border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-brand-purple focus-visible:border-brand-purple/50",
                  errors.message && "border-red-500/50"
                )}
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {t("errorMessage")}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-gradient-brand text-white font-semibold text-sm shadow-lg shadow-purple-500/20 hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t("submit")}
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
