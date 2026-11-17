import Link from "next/link";
import { ShieldMark } from "@/components/ui/ShieldMark";

/**
 * Logo SEISAC recreado en código (nítido en cualquier resolución y con versión
 * clara para fondos oscuros). Si prefieres usar los PNG oficiales de
 * /public/brand, reemplaza el contenido por <Image src="/brand/logo-full.png" .../>.
 */
export function Logo({
  tone = "dark",
  compactOnMobile = false,
  size = "md",
  className = "",
}: {
  /** "lg" = versión grande del navbar (50% más grande, escalada por breakpoint) */
  size?: "md" | "lg";
  /** "dark" = texto navy (fondos claros) · "light" = texto blanco (fondos oscuros) */
  tone?: "dark" | "light";
  compactOnMobile?: boolean;
  className?: string;
}) {
  const light = tone === "light";
  const lg = size === "lg";
  const cls = lg
    ? {
        gap: "gap-2.5 sm:gap-3",
        shield: "h-[52px] w-[46px] sm:h-[60px] sm:w-[53px] lg:h-[66px] lg:w-[58px]",
        word: "text-[1.75rem] sm:text-[2rem] lg:text-[2.2rem]",
        tag: "mt-1.5 text-[0.53rem] tracking-[0.13em] sm:text-[0.66rem] sm:tracking-[0.18em] lg:text-[0.75rem] lg:tracking-[0.2em]",
      }
    : {
        gap: "gap-2.5",
        shield: "h-10 w-9 sm:h-11 sm:w-10",
        word: "text-[1.45rem]",
        tag: "mt-1 text-[0.5rem] tracking-[0.2em]",
      };
  return (
    <Link
      href="/"
      aria-label="SEISAC – Telecomunicaciones y Seguridad, ir al inicio"
      className={`group inline-flex min-w-0 items-center ${cls.gap} ${className}`}
    >
      <ShieldMark tone={light ? "light" : "color"} className={`${cls.shield} shrink-0`} />
      <span className={`${compactOnMobile ? "hidden sm:flex" : "flex"} flex-col leading-none`}>
        <span
          className={`font-display ${cls.word} font-extrabold tracking-[-0.02em] ${
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
          className={`${cls.tag} whitespace-nowrap font-semibold ${
            light ? "text-slate-200" : "text-slate-600"
          }`}
        >
          TELECOMUNICACIONES Y SEGURIDAD
        </span>
      </span>
    </Link>
  );
}
