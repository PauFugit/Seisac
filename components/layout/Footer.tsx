import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { SERVICE_CATEGORIES } from "@/lib/services";
import { buildWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { Container, TechGrid } from "@/components/ui/primitives";
import { SignalWaves } from "@/components/ui/SignalWaves";
import { FacebookIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Logo } from "./Logo";

const socialIcons = {
  facebook: { Icon: FacebookIcon, label: "Facebook" },
  instagram: { Icon: InstagramIcon, label: "Instagram" },
  linkedin: { Icon: LinkedinIcon, label: "LinkedIn" },
} as const;

export function Footer() {
  const year = new Date().getFullYear();
  const socials = (Object.keys(SITE.social) as (keyof typeof SITE.social)[]).filter(
    (k) => SITE.social[k],
  );

  return (
    <footer id="site-footer" className="relative isolate overflow-hidden bg-navy-900 text-slate-200">
      <TechGrid className="opacity-60" />
      <SignalWaves
        className="absolute -right-40 -top-40 -z-10 h-[640px] w-[640px] opacity-60"
        rings={6}
      />
      <Container className="relative pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" compactOnMobile={false} />
            <p className="mt-6 max-w-xs font-display text-xl font-semibold leading-snug text-white">
              {SITE.slogan}.
            </p>
            <a
              href={buildWhatsAppUrl(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-signal-400 hover:text-signal-500"
            >
              <WhatsAppIcon className="h-4 w-4" /> Escríbenos por WhatsApp
            </a>
          </div>

          <nav aria-label="Navegación del pie" className="lg:col-span-2">
            <h2 className="eyebrow !font-sans !tracking-[0.22em] text-cyan-300">Sitio</h2>
            <ul className="mt-5 space-y-3" role="list">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-200 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow !font-sans !tracking-[0.22em] text-cyan-300">Servicios</h2>
            <ul className="mt-5 space-y-3" role="list">
              {SERVICE_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link href={`/servicios#${c.id}`} className="text-slate-200 transition hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/servicios#como-trabajamos" className="text-slate-200 transition hover:text-white">
                  Servicio a domicilio
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow !font-sans !tracking-[0.22em] text-cyan-300">Contacto</h2>
            <ul className="mt-5 space-y-4 text-sm" role="list">
              <li>
                <a href={`tel:${SITE.phoneHref}`} className="flex items-start gap-3 hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" strokeWidth={1.5} aria-hidden="true" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 break-all hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" strokeWidth={1.5} aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" strokeWidth={1.5} aria-hidden="true" />
                <span>
                  {SITE.coverage.label}
                  <span className="block text-slate-300">{SITE.coverage.detail}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" strokeWidth={1.5} aria-hidden="true" />
                {SITE.hours.label}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-300">
            © {year} {SITE.legalName}. Todos los derechos reservados.
          </p>
          {socials.length > 0 && (
            <ul className="flex items-center gap-2" role="list">
              {socials.map((k) => {
                const { Icon, label } = socialIcons[k];
                return (
                  <li key={k}>
                    <a
                      href={SITE.social[k]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} de SEISAC`}
                      className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 transition hover:bg-white/10 hover:text-white hover:ring-cyan-300/50"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}
