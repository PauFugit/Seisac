import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container, SectionTitle, TechGrid } from "@/components/ui/primitives";
import { Counter, Reveal } from "@/components/ui/Motion";
import { ShieldMark } from "@/components/ui/ShieldMark";
import { SignalWaves } from "@/components/ui/SignalWaves";
import { ALL_SERVICES, SERVICE_CATEGORIES } from "@/lib/services";

/**
 * Foto opcional para "Quiénes somos" (se recorta en forma de escudo).
 * Ej.: "/images/quienes-somos.webp". Mientras sea null se muestra la composición gráfica.
 */
// TODO: validar con cliente — foto real del equipo/técnico en terreno
const ABOUT_IMAGE: string | null = null;

const PILLARS: { icon: IconName; title: string; text: string }[] = [
  { icon: "truck", title: "Servicio a domicilio", text: "Vamos a tu casa o negocio con todo lo necesario." },
  { icon: "badgeCheck", title: "Instalación certificada", text: "Probamos y certificamos cada instalación." },
  { icon: "mapPin", title: "Zonas rurales y urbanas", text: "Llegamos también a sectores alejados." },
  { icon: "activity", title: "Diagnóstico y soporte", text: "Revisamos lo que tienes y te acompañamos después." },
];

export function AboutPreview() {
  return (
    <section aria-labelledby="about-title" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <SectionTitle
              id="about-title"
              eyebrow="Quiénes somos"
              title={
                <>
                  Tecnología confiable, <span className="text-brand-gradient">cerca de ti</span>
                </>
              }
              description="En SEISAC diseñamos, instalamos y mantenemos soluciones de telecomunicaciones y seguridad para hogares y negocios. Llegamos donde nos necesites, incluso a zonas rurales, con un servicio técnico cercano, certificado y a domicilio."
            />
          </Reveal>

          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2" role="list">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.05 * i} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-50 text-blue-600 ring-1 ring-blue-600/10">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display font-semibold text-navy-700">{p.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">{p.text}</span>
                  </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <Link
              href="/servicios"
              className="group mt-10 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-500"
            >
              Conoce nuestros servicios
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <SignalWaves
            tone="dark"
            className="absolute left-1/2 top-1/2 -z-0 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-70"
            rings={6}
          />
          <div className="relative mx-auto aspect-[64/72] w-full max-w-[420px] drop-shadow-[0_40px_60px_rgb(24_51_79/0.28)]">
            <div className="clip-shield absolute inset-0 overflow-hidden bg-navy-900">
              {ABOUT_IMAGE ? (
                <>
                  <Image
                    src={ABOUT_IMAGE}
                    alt="Técnico de SEISAC realizando una instalación en terreno"
                    fill
                    sizes="(min-width: 1024px) 420px, 80vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-brand-gradient opacity-90" />
                  <TechGrid className="opacity-80" />
                  <SignalWaves
                    shape="arc"
                    className="absolute left-1/2 top-[58%] h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2"
                    rings={5}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <ShieldMark tone="light" className="h-28 w-24 opacity-95" />
                  </div>
                </>
              )}
            </div>

            {/* Tarjeta flotante con contadores */}
            <div className="absolute -bottom-6 left-1/2 flex w-[88%] -translate-x-1/2 justify-around rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-[var(--shadow-lift)] backdrop-blur-md sm:-left-6 sm:w-auto sm:translate-x-0 sm:gap-8 sm:px-7">
              <Stat value={SERVICE_CATEGORIES.length} label="áreas de especialidad" />
              <Stat value={ALL_SERVICES.length} label="servicios" />
              <Stat value={100} suffix="%" label="a domicilio" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Stat({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-2xl font-bold text-navy-700 sm:text-3xl">
        <Counter to={value} suffix={suffix} />
      </p>
      <p className="mt-0.5 text-xs text-slate-600">{label}</p>
    </div>
  );
}
