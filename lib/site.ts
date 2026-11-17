/**
 * Datos centrales de la empresa. Cualquier cambio de contacto se hace SOLO aquí.
 */
export const SITE = {
  name: "SEISAC",
  legalName: "SEISAC – Telecomunicaciones y Seguridad",
  tagline: "Telecomunicaciones y Seguridad",
  slogan: "Soluciones a tu alcance, donde lo necesites",
  description:
    "Redes, telecomunicaciones, cámaras de seguridad y control de accesos con servicio técnico a domicilio. Llegamos a zonas urbanas y rurales de Chile.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seisac.cl").replace(/\/$/, ""),
  locale: "es_CL",

  /** Formato internacional sin "+" ni espacios (lo usa wa.me). */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "56962262519",
  /** Formato legible para mostrar en pantalla. */
  phoneDisplay: "+56 9 6226 2519",
  /** Formato para enlaces tel: */
  phoneHref: "+56962262519",

  // TODO: validar con cliente — correo definitivo de la empresa
  email: "contacto@seisac.cl",

  // TODO: validar con cliente — región y comunas de cobertura reales
  coverage: {
    label: "Región / comunas por confirmar",
    detail: "Zonas urbanas y rurales, con visita a domicilio.",
    areas: ["Chile"],
  },

  // TODO: validar con cliente — horario de atención real
  hours: {
    label: "Lunes a sábado, 9:00 a 19:00",
    schema: ["Mo-Sa 09:00-19:00"],
  },

  // TODO: validar con cliente — URLs reales de redes sociales (dejar vacío para ocultar)
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
] as const;
