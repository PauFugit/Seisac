"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PointerEvent } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Tarjeta destacada para "Qué hacemos" (fondo navy).
 * Superficie clara con borde cyan, ícono en badge con degradado de marca y,
 * en hover, un foco de luz que sigue al cursor + borde degradado completo.
 */
export function ServiceTile({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: IconName;
}) {
  const onPointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      href={href}
      onPointerMove={onPointerMove}
      className="service-tile group relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#1F4A78] via-navy-800 to-navy-900 p-6 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.75),inset_0_1px_0_rgb(255_255_255/0.08)] transition-all duration-500 ease-[var(--ease-signal)] hover:-translate-y-2 hover:shadow-[0_32px_60px_-24px_rgb(7_150_199/0.45),inset_0_1px_0_rgb(255_255_255/0.12)]"
    >
      {/* Foco de luz que sigue al cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--x, 50%) var(--y, 0%), rgb(7 150 199 / 0.22), transparent 65%)",
        }}
      />
      {/* Línea de acento superior */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-blue-500 via-cyan-400 to-signal-500 opacity-80 transition-all duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between">
        <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 from-5% via-cyan-400 via-40% to-signal-500 to-90% text-white shadow-[0_10px_28px_-8px_rgb(54_182_74/0.65)] ring-1 ring-signal-500/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_12px_32px_-6px_rgb(54_182_74/0.85)]">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl ring-2 ring-signal-500/60 transition-all duration-700 group-hover:scale-[1.35] group-hover:opacity-0"
          />
          {/* Punto "online" verde */}
          <span
            aria-hidden="true"
            className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-signal-500 ring-2 ring-navy-900 animate-online"
          />
          <Icon name={icon} className="h-7 w-7" strokeWidth={1.6} />
        </span>
      </div>

      <h3 className="mt-6 text-lg font-semibold leading-snug !text-white">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-200">{description}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition-colors group-hover:text-white">
        Ver más
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
