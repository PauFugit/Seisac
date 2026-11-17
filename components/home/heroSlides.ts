import { WA_MESSAGES } from "@/lib/whatsapp";

/**
 * Contenido del slider del Home.
 * Para cambiar un video, reemplaza los archivos en /public/videos manteniendo los nombres
 * (o cambia las rutas aquí). Ver README › "Videos del hero".
 */
export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  video: { mp4: string; webm: string; poster: string };
  whatsappMessage: string;
  /** Posición del acento luminoso del fallback (cuando no hay video) */
  accent: "left" | "right" | "center";
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "telecomunicaciones",
    eyebrow: "Telecomunicaciones",
    title: "Conectividad estable, en cada rincón",
    description: "WiFi, enlaces punto a punto y cableado certificado para tu hogar o negocio.",
    video: {
      mp4: "/videos/hero-1.mp4",
      webm: "/videos/hero-1.webm",
      poster: "/videos/hero-1.webp",
    },
    whatsappMessage: WA_MESSAGES.category("telecomunicaciones (WiFi, enlaces o cableado)"),
    accent: "right",
  },
  {
    id: "seguridad",
    eyebrow: "Seguridad y videovigilancia",
    title: "Protege lo que más importa",
    description: "Cámaras IP y 4K, visión nocturna y video porteros, con monitoreo desde tu celular.",
    video: {
      mp4: "/videos/hero-2.mp4",
      webm: "/videos/hero-2.webm",
      poster: "/videos/hero-2.webp",
    },
    whatsappMessage: WA_MESSAGES.category("cámaras de seguridad y videovigilancia"),
    accent: "left",
  },
  {
    id: "domicilio",
    eyebrow: "Servicio a domicilio",
    title: "Soluciones a tu alcance, donde lo necesites",
    description: "Vamos a tu casa o negocio. Llegamos incluso a zonas rurales y alejadas.",
    video: {
      mp4: "/videos/hero-3.mp4",
      webm: "/videos/hero-3.webm",
      poster: "/videos/hero-3.webp",
    },
    whatsappMessage:
      "Hola SEISAC, necesito una visita técnica a domicilio. ¿Llegan a mi zona?",
    accent: "center",
  },
];

export const HERO_INTERVAL_MS = 7000;
