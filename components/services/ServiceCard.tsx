import type { Service } from "@/lib/services";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { ShieldBadge } from "@/components/ui/ShieldMark";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      id={service.id}
      className="group gradient-border group-hover-border relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-signal)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-start justify-between gap-4">
        <ShieldBadge>
          <Icon name={service.icon} className="h-6 w-6" />
        </ShieldBadge>
        {/* Ondas que se encienden en hover */}
        <svg viewBox="0 0 48 30" className="h-8 w-12 text-cyan-400" fill="none" aria-hidden="true">
          {[10, 18, 26].map((r, i) => (
            <path
              key={r}
              d={`M ${24 - r * 0.8} ${28 - r * 0.6} A ${r} ${r} 0 0 1 ${24 + r * 0.8} ${28 - r * 0.6}`}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={`wave-arc wave-arc-${i + 1} opacity-20`}
            />
          ))}
          <circle cx="24" cy="27" r="2" className="fill-signal-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </svg>
      </div>

      <h3 className="mt-6 text-lg font-semibold leading-snug">{service.name}</h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-slate-600">{service.description}</p>

      {service.tags && service.tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Características">
          {service.tags.map((t) => (
            <li
              key={t}
              className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-navy-700 ring-1 ring-slate-200"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      <a
        href={buildWhatsAppUrl(WA_MESSAGES.service(service.name))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 px-5 text-sm font-semibold text-navy-700 transition-all duration-300 hover:border-signal-500 hover:bg-signal-500 hover:text-navy-900"
      >
        <WhatsAppIcon className="h-4 w-4 text-[#2f7a17] transition-colors group-hover:text-current" />
        Consultar por WhatsApp
        <span className="sr-only"> sobre {service.name} (se abre en una nueva pestaña)</span>
      </a>
    </article>
  );
}
