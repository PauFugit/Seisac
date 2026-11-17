import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { buttonClasses, OnlineDot, TechGrid } from "@/components/ui/primitives";
import { SignalWaves } from "@/components/ui/SignalWaves";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Tarjeta navy con los datos de contacto directos. */
export function ContactInfo({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-label="Datos de contacto directo"
      className={`relative isolate overflow-hidden rounded-3xl bg-navy-900 p-8 text-slate-200 shadow-[var(--shadow-lift)] sm:p-10 ${className}`}
    >
      <TechGrid className="opacity-70" />
      <SignalWaves className="absolute -bottom-40 -right-40 -z-10 h-[460px] w-[460px]" rings={5} />

      <p className="inline-flex items-center gap-2.5 rounded-full bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white ring-1 ring-white/10">
        <OnlineDot /> Respondemos rápido por WhatsApp
      </p>

      <h3 className="mt-6 text-2xl font-bold !text-white">Habla directo con nosotros</h3>
      <p className="mt-2 text-slate-300">Cotiza, agenda una visita o resuelve tus dudas.</p>

      <ul className="mt-8 space-y-6" role="list">
        <li className="flex gap-4">
          <IconWrap><Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" /></IconWrap>
          <div>
            <p className="eyebrow text-cyan-300">WhatsApp / Teléfono</p>
            <a href={`tel:${SITE.phoneHref}`} className="mt-1 block font-display text-lg font-semibold text-white hover:text-cyan-300">
              {SITE.phoneDisplay}
            </a>
          </div>
        </li>
        <li className="flex gap-4">
          <IconWrap><Mail className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" /></IconWrap>
          <div className="min-w-0">
            <p className="eyebrow text-cyan-300">Correo</p>
            <a href={`mailto:${SITE.email}`} className="mt-1 block break-all font-medium text-white hover:text-cyan-300">
              {SITE.email}
            </a>
          </div>
        </li>
        <li className="flex gap-4">
          <IconWrap><MapPin className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" /></IconWrap>
          <div>
            <p className="eyebrow text-cyan-300">Cobertura</p>
            <p className="mt-1 font-medium text-white">{SITE.coverage.label}</p>
            <p className="text-sm text-slate-300">{SITE.coverage.detail}</p>
          </div>
        </li>
        <li className="flex gap-4">
          <IconWrap><Clock className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" /></IconWrap>
          <div>
            <p className="eyebrow text-cyan-300">Horario</p>
            <p className="mt-1 font-medium text-white">{SITE.hours.label}</p>
          </div>
        </li>
      </ul>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col 2xl:flex-row">
        <a
          href={buildWhatsAppUrl(WA_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("whatsapp", "md", "flex-1")}
        >
          <WhatsAppIcon className="h-5 w-5" /> Escribir por WhatsApp
        </a>
        <a href={`tel:${SITE.phoneHref}`} className={buttonClasses("outline-light", "md", "flex-1")}>
          <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" /> Llamar
        </a>
      </div>
    </aside>
  );
}

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 text-cyan-300 ring-1 ring-white/10">
      {children}
    </span>
  );
}
