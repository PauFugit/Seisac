import Link from "next/link";
import { SERVICE_AREAS } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";
import { PageBanner } from "./PageBanner";

/** Banner de /servicios con la franja de las 5 áreas (banner corporativo recreado en código). */
export function ServicesBanner() {
  return (
    <PageBanner
      crumb="Servicios"
      eyebrow="Telecomunicaciones y seguridad"
      title="Nuestros servicios"
      description="Instalamos, configuramos y reparamos redes, cámaras y accesos para hogares y negocios, con servicio técnico a domicilio en zonas urbanas y rurales."
    >
      <ul
        className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5"
        role="list"
      >
        {SERVICE_AREAS.map((a) => (
          <li key={a.title} className="bg-navy-900/80 backdrop-blur-sm">
            <Link
              href={a.href}
              className="group flex h-full items-center gap-3 px-4 py-4 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white sm:px-5"
            >
              <Icon name={a.icon} className="h-6 w-6 shrink-0 text-cyan-300 transition-transform group-hover:scale-110" />
              <span className="leading-snug">{a.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageBanner>
  );
}
