import { SITE } from "./site";

export function buildWhatsAppUrl(message: string, phone: string = SITE.whatsapp) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Mensajes pre-rellenados según el contexto desde donde se abre el chat. */
export const WA_MESSAGES = {
  general: "Hola SEISAC, me gustaría cotizar un servicio. ¿Me pueden ayudar?",
  float: "Hola SEISAC, vengo desde su sitio web y tengo una consulta.",
  diagnosis:
    "Hola SEISAC, no tengo claro qué servicio necesito. ¿Pueden hacer un diagnóstico?",
  service: (serviceName: string) =>
    `Hola SEISAC, me interesa el servicio: ${serviceName}. ¿Me pueden dar más información?`,
  category: (categoryName: string) =>
    `Hola SEISAC, me interesa cotizar servicios de ${categoryName}. ¿Me pueden dar más información?`,
} as const;

export function buildFormSummaryMessage(data: {
  name: string;
  city?: string;
  serviceType: string;
  message: string;
}) {
  const lines = [
    `Hola SEISAC, soy ${data.name}. Acabo de enviar el formulario de su web.`,
    `• Servicio: ${data.serviceType}`,
    data.city ? `• Comuna/Ciudad: ${data.city}` : null,
    `• Detalle: ${data.message}`,
  ].filter(Boolean);
  return lines.join("\n");
}
