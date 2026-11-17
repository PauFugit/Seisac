import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/services";
import { ServiceTile } from "./ServiceTile";
import { Container, SectionTitle, TechGrid } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Motion";
import { SignalWaves } from "@/components/ui/SignalWaves";

export function ServicesPreview() {
  return (
    <section
      aria-labelledby="services-preview-title"
      className="relative isolate overflow-hidden bg-navy-950 py-24 sm:py-32"
    >
      <TechGrid />
      {/* Halo central que realza las tarjetas */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_at_50%_80%,rgb(7_82_138/0.28),transparent_65%)]"
      />
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

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4" role="list">
          {SERVICE_AREAS.map((a, i) => (
            <Reveal as="li" key={a.title} delay={0.06 * i} className="h-full">
              <ServiceTile title={a.title} description={a.description} href={a.href} icon={a.icon} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
