import { BadgeCheck, MessageCircle, Search, Wrench } from "lucide-react";
import { Container, SectionTitle } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Motion";

const STEPS = [
  { icon: MessageCircle, title: "Contacto", text: "Nos escribes por WhatsApp o el formulario y nos cuentas qué necesitas." },
  { icon: Search, title: "Diagnóstico en terreno", text: "Visitamos el lugar, evaluamos y te proponemos la mejor solución." },
  { icon: Wrench, title: "Instalación", text: "Instalamos y configuramos todo de forma ordenada y segura." },
  { icon: BadgeCheck, title: "Certificación y soporte", text: "Probamos que todo funcione y seguimos disponibles para ti." },
];

export function ProcessBand({ id }: { id?: string }) {
  return (
    <section id={id} aria-labelledby="process-title" className="bg-slate-50 py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            id="process-title"
            align="center"
            eyebrow="Cómo trabajamos"
            title="De tu mensaje a una instalación funcionando"
            description="Un proceso simple y transparente, con servicio técnico a domicilio de principio a fin."
          />
        </Reveal>

        <div className="relative mt-16">
        {/* Línea de conexión tipo señal */}
        <span
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-blue-600/0 via-blue-600/40 to-cyan-400/0 lg:block"
        />
        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={0.08 * i} className="relative flex flex-col items-center text-center">
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-white text-blue-600 shadow-[var(--shadow-card)] ring-1 ring-blue-600/15">
                  <s.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-navy-900 font-display text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-slate-600">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        </div>
      </Container>
    </section>
  );
}
