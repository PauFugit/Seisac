import "server-only";
import { SITE } from "./site";

/**
 * Integración opcional con WhatsApp Business Cloud API (Meta).
 * DESACTIVADA por defecto: se activa solo si WHATSAPP_NOTIFY_ENABLED=true
 * y existen WHATSAPP_TOKEN y WHATSAPP_PHONE_NUMBER_ID.
 *
 * Importante: fuera de la ventana de 24 h de conversación, Meta solo permite
 * enviar mensajes de PLANTILLA aprobada. Ver README › "WhatsApp Business Cloud API".
 */
export function isWhatsAppCloudEnabled() {
  return (
    process.env.WHATSAPP_NOTIFY_ENABLED === "true" &&
    !!process.env.WHATSAPP_TOKEN &&
    !!process.env.WHATSAPP_PHONE_NUMBER_ID
  );
}

export async function sendWhatsAppNotification(text: string): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  if (!isWhatsAppCloudEnabled()) return { ok: true, skipped: true };

  const to = process.env.WHATSAPP_NOTIFY_TO || SITE.whatsapp;
  const url = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { preview_url: false, body: text.slice(0, 4000) },
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[whatsapp-cloud] Error de Meta:", res.status, body);
      return { ok: false, error: `Meta respondió ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("[whatsapp-cloud] Error de red:", err);
    return { ok: false, error: "Error de red" };
  }
}
