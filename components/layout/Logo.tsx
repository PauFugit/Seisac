import Link from "next/link";
import { ShieldMark } from "@/components/ui/ShieldMark";

/**
 * Logo SEISAC recreado en código (nítido en cualquier resolución y con versión
 * clara para fondos oscuros). Si prefieres usar los PNG oficiales de
 * /public/brand, reemplaza el contenido por <Image src="/brand/logo-full.png" .../>.
 */
export function Logo({
  tone = "dark",
  compactOnMobile = true,
  className = "",
}: {
  /** "dark" = texto navy (fondos claros) · "light" = texto blanco (fondos oscuros) */
  tone?: "dark" | "light";
  compactOnMobile?: boolean;
  className?: string;
}) {
  const light = tone === "light";
  return (
    <Link
      href="/"
      aria-label="SEISAC – Telecomunicaciones y Seguridad, ir al inicio"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <ShieldMark tone={light ? "light" : "color"} className="h-10 w-9 shrink-0 sm:h-11 sm:w-10" />
      <span className={`${compactOnMobile ? "hidden sm:flex" : "flex"} flex-col leading-none`}>
        <span
          className={`font-display text-[1.45rem] font-extrabold tracking-[-0.02em] ${
            light ? "text-white" : "text-navy-700"
          }`}
        >
          SEIS
          <span
            className={
              light
                ? "bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent"
            }
          >
            AC
          </span>
        </span>
        <span
          className={`mt-1 text-[0.5rem] font-semibold tracking-[0.2em] ${
            light ? "text-slate-200" : "text-slate-600"
          }`}
        >
          TELECOMUNICACIONES Y SEGURIDAD
        </span>
      </span>
    </Link>
  );
}
