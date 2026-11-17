import { useId } from "react";

type Props = {
  className?: string;
  /** "color" = colores de marca; "mono" = currentColor (para fondos de color) */
  tone?: "color" | "mono" | "light";
  title?: string;
};

/** Ícono del escudo SEISAC recreado en SVG (escudo + ondas WiFi + punto verde). */
export function ShieldMark({ className, tone = "color", title }: Props) {
  const id = useId().replace(/:/g, "");
  const shieldStroke =
    tone === "color" ? `url(#s${id})` : tone === "light" ? "#ffffff" : "currentColor";
  const waveStroke =
    tone === "color" ? `url(#w${id})` : tone === "light" ? "#6FD3EC" : "currentColor";
  return (
    <svg
      viewBox="0 0 64 72"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {tone === "color" && (
        <defs>
          <linearGradient id={`s${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#123E73" />
            <stop offset="1" stopColor="#0B6FB8" />
          </linearGradient>
          <linearGradient id={`w${id}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0B6FB8" />
            <stop offset="1" stopColor="#1FB5D9" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M32 2C40 6 50 8 60 9v25c0 18-12 29-28 36C16 63 4 52 4 34V9c10-1 20-3 28-7Z"
        fill="none"
        stroke={shieldStroke}
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <g fill="none" stroke={waveStroke} strokeWidth="4.5" strokeLinecap="round">
        <path d="M16.4 30.4a22 22 0 0 1 31.2 0" />
        <path d="M21.4 35.4a15 15 0 0 1 21.2 0" />
        <path d="M26.3 40.3a8 8 0 0 1 11.4 0" />
      </g>
      <circle cx="32" cy="48.5" r="3.8" fill="#6CC24A" />
    </svg>
  );
}

/** Badge pequeño con forma de escudo que contiene un ícono (cards de servicios). */
export function ShieldBadge({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={`relative inline-grid h-16 w-14 shrink-0 place-items-center ${className}`}>
      <svg viewBox="0 0 64 72" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d="M32 2C40 6 50 8 60 9v25c0 18-12 29-28 36C16 63 4 52 4 34V9c10-1 20-3 28-7Z"
          className={
            dark
              ? "fill-white/5 stroke-cyan-400/50"
              : "fill-slate-50 stroke-blue-600/25 transition-colors duration-300 group-hover:fill-blue-600/5 group-hover:stroke-blue-600/60"
          }
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`relative -mt-1 ${dark ? "text-cyan-300" : "text-blue-600"}`}>
        {children}
      </span>
    </span>
  );
}
