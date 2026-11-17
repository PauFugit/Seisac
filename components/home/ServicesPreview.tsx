import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";
import { Container, SectionTitle, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Motion";
import { SignalWaves } from "@/components/ui/SignalWaves";

export function ServicesPreview() {
  return (
    <section
      aria-labelledby="services-preview-title"
      className="relative isolate overflow-hidden bg-navy-900 py-24 sm:py-32"
    >
      <TechGrid />
      <SignalWaves className="absolute -left-48 -top-48 -z-10 h-[600px] w-[600px] opacity-60" rings={6} />

      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionTitle
              id="services-preview-title"
              dark
              eyebrow="Qué hacemos"
              title="Soluciones integrales en telecomunicaciones y seguridad"
              description="Desde el diagnóstico hasta la instalación y el soporte. Elige un área para ver el detalle de cada servicio."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 font-semibold text-cyan-300 hover:text-white"
            >
              Ver todos los servicios <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {SERVICE_AREAS.map((a, i) => (
            <Reveal as="li" key={a.title} delay={0.06 * i} className="h-full">
                <Link
                  href={a.href}
                  className="group gradient-border group-hover-border relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
                >
                  <span className="relative grid h-14 w-14 place-items-center">
                    <span className="absolute inset-0 rounded-full border border-cyan-300/20 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-0" aria-hidden="true" />
                    <span className="absolute inset-0 rounded-full border border-cyan-300/30" aria-hidden="true" />
                    <Icon name={a.icon} className="h-6 w-6 text-cyan-300" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold leading-snug !text-white">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{a.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                    Ver más
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
                  </span>
                </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
