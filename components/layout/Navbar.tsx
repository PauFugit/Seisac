"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { buttonClasses, Container, OnlineDot } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Focus trap + Esc + bloqueo de scroll del body
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
    focusables()[0]?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || open;
  const waUrl = buildWhatsAppUrl(WA_MESSAGES.general, SITE.whatsapp);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-white/10 bg-navy-900/75 shadow-[0_10px_30px_-15px_rgb(7_26_51/0.6)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900"
      >
        Saltar al contenido
      </a>
      <Container as="nav" className="flex h-20 items-center justify-between gap-4 sm:h-[88px] lg:h-24 lg:gap-6">
        <Logo tone="light" size="lg" />

        <ul className="hidden items-center gap-1 md:flex" role="list">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
                    active ? "text-white" : "text-slate-200 hover:text-white"
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-4 -bottom-0.5 flex items-center justify-center"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    >
                      <span className="h-[2px] w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                    </motion.span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("whatsapp", "sm", "max-sm:hidden md:max-lg:hidden")}
          >
            <WhatsAppIcon className="h-4 w-4" />
            Cotiza por WhatsApp
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-grid h-11 w-11 place-items-center rounded-full text-white ring-1 ring-white/20 transition hover:bg-white/10 md:hidden"
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="h-[calc(100dvh-80px)] sm:h-[calc(100dvh-88px)] overflow-y-auto border-t border-white/10 bg-navy-900/95 backdrop-blur-xl md:hidden"
          >
            <Container className="flex flex-col gap-2 py-8">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-4 font-display text-2xl font-semibold ${
                    isActive(l.href) ? "bg-white/10 text-white" : "text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {l.label}
                  {isActive(l.href) && <span className="h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true" />}
                </Link>
              ))}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("whatsapp", "lg", "mt-6 w-full")}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Cotiza por WhatsApp
              </a>
              <p className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-200">
                <OnlineDot /> Disponibles ahora · {SITE.phoneDisplay}
              </p>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
