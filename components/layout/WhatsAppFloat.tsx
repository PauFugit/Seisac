"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Botón flotante global de WhatsApp. Se oculta cuando el footer está visible. */
export function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7"
        >
          <span
            role="tooltip"
            id="wa-float-tip"
            className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-navy-900 px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
          >
            ¿Hablamos?
          </span>
          <a
            href={buildWhatsAppUrl(WA_MESSAGES.float)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp (se abre en una nueva pestaña)"
            aria-describedby="wa-float-tip"
            className="relative grid h-14 w-14 place-items-center rounded-full bg-signal-500 text-navy-900 shadow-[0_12px_30px_-8px_rgb(108_194_74/0.7)] transition-transform duration-300 hover:scale-105 animate-online"
          >
            <WhatsAppIcon className="h-7 w-7" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
