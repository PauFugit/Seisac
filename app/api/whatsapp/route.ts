/**
 * POST /api/whatsapp — Notificación a la empresa vía WhatsApp Business Cloud API (Meta).
 *
 * ⚠️ PREPARADO PERO DESACTIVADO POR DEFECTO.
 * Para activarlo define en .env.local / Vercel:
 *   WHATSAPP_NOTIFY_ENABLED=true
 *   WHATSAPP_TOKEN=...            (token permanente de usuario del sistema)
 *   WHATSAPP_PHONE_NUMBER_ID=...  (ID del número emisor en Meta)
 *   WHATSAPP_NOTIFY_TO=569...     (opcional; por defecto NEXT_PUBLIC_WHATSAPP_NUMBER)
 *
 * Además, /api/contact llama directamente a sendWhatsAppNotification() al recibir
 * un formulario, por lo que esta ruta solo es necesaria para pruebas o integraciones
 * externas. Requiere el header `x-internal-key` igual a WHATSAPP_TOKEN para evitar abuso.
 *
 * Si no hay credenciales responde 200 con { skipped: true } y no rompe nada.
 */
import { NextResponse } from "next/server";
import { isWhatsAppCloudEnabled, sendWhatsAppNotification } from "@/lib/whatsapp-cloud";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ enabled: isWhatsAppCloudEnabled() });
}

export async function POST(req: Request) {
  if (!isWhatsAppCloudEnabled()) {
    return NextResponse.json({ ok: true, skipped: true, reason: "WhatsApp Cloud API desactivada" });
  }
  if (req.headers.get("x-internal-key") !== process.env.WHATSAPP_TOKEN) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { text?: unknown } | null;
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text) return NextResponse.json({ error: "Falta el campo 'text'" }, { status: 400 });

  const result = await sendWhatsAppNotification(text);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
