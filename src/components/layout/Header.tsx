"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/#services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contacts", key: "contacts" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Floating pill nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-500",
            isScrolled
              ? "bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40"
              : "bg-black/30 backdrop-blur-xl border border-white/5"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-2 group mr-1">
            <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30 transition-transform duration-200 group-hover:scale-110">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1L9.5 9.5H2.5L6 1Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <span className="font-bold text-sm tracking-tight text-white hidden sm:block">
              Art<span className="text-violet-400">Logic</span>
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10 hidden md:block mx-1" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
                  pathname === href
                    ? "text-white bg-white/10"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10 hidden md:block mx-1" />

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            <LocaleSwitcher />
            <Link
              href="/contacts"
              className="px-4 py-1.5 text-sm font-semibold rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-all duration-200 active:scale-[0.97] shadow-lg shadow-violet-500/25"
              style={{ transition: "background-color 160ms ease-out, transform 100ms ease-out" }}
            >
              {t("getStarted")}
            </Link>
          </div>

          {/* Mobile: locale + hamburger */}
          <div className="flex md:hidden items-center gap-2 ml-1">
            <LocaleSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors relative"
              aria-label="Toggle menu"
            >
              {/* Hamburger morph to X */}
              <span className="relative w-4 h-3 flex flex-col justify-between">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute top-0 left-0 w-full h-px bg-white rounded-full origin-center"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-[5px] left-0 w-full h-px bg-white rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute bottom-0 left-0 w-full h-px bg-white rounded-full origin-center"
                />
              </span>
            </button>
          </div>
        </motion.div>
      </header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop blur */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-3xl" />

            {/* Menu content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1], delay: 0.05 }}
              className="relative flex flex-col items-center justify-center min-h-screen gap-2 px-8"
            >
              {navLinks.map(({ href, key }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-xs"
                >
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-6 py-4 rounded-2xl text-xl font-semibold transition-colors text-center",
                      pathname === href
                        ? "bg-violet-600/20 text-white border border-violet-500/30"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xs mt-4"
              >
                <Link
                  href="/contacts"
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-4 text-xl font-bold rounded-full bg-violet-600 hover:bg-violet-500 text-white text-center active:scale-[0.97] transition-all duration-150"
                >
                  {t("getStarted")}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
