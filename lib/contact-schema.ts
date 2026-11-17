import { z } from "zod";
import { SERVICE_TYPE_OPTIONS } from "./services";

/** Normaliza un teléfono chileno a +569XXXXXXXX (acepta espacios, guiones y con o sin +56). */
export function normalizeChileanPhone(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  if (/^569\d{8}$/.test(digits)) return `+${digits}`;
  if (/^9\d{8}$/.test(digits)) return `+56${digits}`;
  return null;
}

export function formatChileanPhone(normalized: string) {
  const d = normalized.replace(/[^\d]/g, ""); // 569XXXXXXXX
  return `+56 9 ${d.slice(3, 7)} ${d.slice(7)}`;
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre (mínimo 2 caracteres).")
    .max(80, "El nombre es demasiado largo."),
  phone: z
    .string()
    .trim()
    .min(1, "Ingresa tu teléfono.")
    .refine((v) => normalizeChileanPhone(v) !== null, {
      message: "Usa el formato +56 9 XXXX XXXX.",
    }),
  email: z
    .string()
    .trim()
    .min(1, "Ingresa tu correo.")
    .email("Ingresa un correo válido, por ejemplo nombre@correo.cl."),
  city: z.string().trim().max(80, "Texto demasiado largo.").optional().or(z.literal("")),
  serviceType: z.enum(SERVICE_TYPE_OPTIONS, {
    message: "Selecciona el tipo de servicio.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(2000, "El mensaje es demasiado largo (máximo 2000 caracteres)."),
  preferWhatsapp: z.boolean().optional(),
  /** Honeypot: debe quedar vacío. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
