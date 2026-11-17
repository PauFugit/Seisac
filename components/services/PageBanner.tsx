import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container, TechGrid } from "@/components/ui/primitives";
import { SignalWaves } from "@/components/ui/SignalWaves";

/** Header de páginas internas: fondo navy + grilla técnica + ondas + breadcrumb. */
export function PageBanner({
  eyebrow,
  title,
  description,
  crumb,
  children,
  size = "lg",
}: {
  eyebrow: string;
  title: string;
  description: string;
  crumb: string;
  children?: ReactNode;
  size?: "lg" | "sm";
}) {
  return (
    <section
      className={`relative isolate flex items-end overflow-hidden bg-navy-900 ${
        size === "lg" ? "min-h-[max(50vh,460px)] pb-16 pt-32" : "min-h-[340px] pb-14 pt-32"
      }`}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-700" />
      <TechGrid />
      <SignalWaves className="absolute -right-32 top-1/2 -z-10 h-[680px] w-[680px] -translate-y-1/2 opacity-80" rings={6} />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <Container className="relative">
        <nav aria-label="Ruta de navegación">
          <ol className="flex items-center gap-1.5 text-sm text-slate-300">
            <li>
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-white">
              {crumb}
            </li>
          </ol>
        </nav>
        <p className="eyebrow mt-8 flex items-center gap-3 text-cyan-300">
          <span className="h-px w-8 bg-cyan-300/70" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] !text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">{description}</p>
        {children}
      </Container>
    </section>
  );
}
