"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { ContactSubmission } from "@/types";
import {
  Check,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Globe,
} from "lucide-react";

function SubmissionRow({ submission, onMarkRead }: {
  submission: ContactSubmission;
  onMarkRead: (id: string, isRead: boolean) => void;
}) {
  const t = useTranslations("admin.table");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMarkRead = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !submission.isRead }),
      });
      if (res.ok) onMarkRead(submission.id, !submission.isRead);
    } finally {
      setLoading(false);
    }
  };

  const date = new Date(submission.createdAt).toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card rounded-xl overflow-hidden mb-3 transition-colors ${
        !submission.isRead ? "border-brand-purple/30" : ""
      }`}
    >
      {/* Row header */}
      <div className="p-4 flex items-center gap-4">
        {/* Unread dot */}
        <div className="flex-shrink-0">
          {!submission.isRead ? (
            <div className="w-2.5 h-2.5 rounded-full bg-brand-purple animate-pulse" />
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
          )}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {submission.name[0].toUpperCase()}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-white font-medium text-sm truncate">
              {submission.name}
            </span>
            {!submission.isRead && (
              <Badge variant="purple" className="text-[10px] py-0">New</Badge>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="truncate">{submission.email}</span>
            {submission.service && (
              <Badge variant="cyan" className="text-[10px] py-0">{submission.service}</Badge>
            )}
          </div>
        </div>

        {/* Date + actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-gray-600 text-xs hidden md:block">{date}</span>
          <button
            onClick={handleMarkRead}
            disabled={loading}
            title={submission.isRead ? "Mark unread" : "Mark read"}
            className="w-7 h-7 rounded-lg glass flex items-center justify-center text-gray-500 hover:text-green-400 transition-colors disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-7 h-7 rounded-lg glass flex items-center justify-center text-gray-500 hover:text-white transition-colors"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {submission.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <a href={`tel:${submission.phone}`} className="text-gray-300 hover:text-white">
                    {submission.phone}
                  </a>
                </div>
              )}
              {submission.company && (
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{submission.company}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <a href={`mailto:${submission.email}`} className="text-brand-blue-light hover:text-white">
                  {submission.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400">{submission.locale === "uk" ? "🇺🇦 UA" : "🇬🇧 EN"}</span>
              </div>
              <div className="md:col-span-2 flex items-start gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {submission.message}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SubmissionTable({
  initialSubmissions,
}: {
  initialSubmissions: ContactSubmission[];
}) {
  const t = useTranslations("admin");
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const handleMarkRead = (id: string, isRead: boolean) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isRead } : s))
    );
  };

  const filtered = filter === "unread"
    ? submissions.filter((s) => !s.isRead)
    : submissions;

  const unreadCount = submissions.filter((s) => !s.isRead).length;

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-gradient-brand text-white"
              : "glass text-gray-400 hover:text-white"
          }`}
        >
          {t("allSubmissions")} ({submissions.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            filter === "unread"
              ? "bg-gradient-brand text-white"
              : "glass text-gray-400 hover:text-white"
          }`}
        >
          {t("unreadSubmissions")}
          {unreadCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-brand-purple text-white text-[10px] flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center text-gray-500">
          {t("noSubmissions")}
        </div>
      ) : (
        <div>
          {filtered.map((s) => (
            <SubmissionRow
              key={s.id}
              submission={s}
              onMarkRead={handleMarkRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
