import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, formatChileanPhone, normalizeChileanPhone } from "@/lib/contact-schema";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";
import { sendWhatsAppNotification } from "@/lib/whatsapp-cloud";

export const runtime = "nodejs";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  // 1) Rate limit por IP
  const ip = getClientIp(req.headers);
  const rl = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Has enviado varios mensajes seguidos. Espera unos minutos e inténtalo de nuevo." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  // 2) Validación
  const json = await req.json().catch(() => null);
  if (!json || typeof json !== "object") {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // 3) Honeypot: si viene con contenido, fingimos éxito y no enviamos nada
  if (typeof (json as Record<string, unknown>).website === "string" && (json as Record<string, string>).website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Revisa los datos del formulario.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const phone = formatChileanPhone(normalizeChileanPhone(data.phone)!);

  // 4) Envío por Resend
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || "SEISAC Web <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] RESEND_API_KEY no configurada. Formulario recibido (modo desarrollo):", {
        ...data,
        phone,
      });
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] RESEND_API_KEY no configurada en producción.");
    return NextResponse.json(
      { error: "El formulario no está disponible en este momento." },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Nombre", data.name],
    ["Teléfono", phone],
    ["Correo", data.email],
    ["Comuna / Ciudad", data.city || "—"],
    ["Tipo de servicio", data.serviceType],
    ["Prefiere WhatsApp", data.preferWhatsapp ? "Sí" : "No"],
  ];

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#18334F">
    <div style="background:#18334F;padding:24px 28px;border-radius:12px 12px 0 0">
      <p style="margin:0;color:#5CC3E6;font-size:11px;letter-spacing:3px;text-transform:uppercase">Nuevo contacto web</p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:20px">${escapeHtml(data.name)} · ${escapeHtml(data.serviceType)}</h1>
    </div>
    <div style="border:1px solid #D9E2EC;border-top:0;padding:24px 28px;border-radius:0 0 12px 12px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 0;color:#475569;width:40%">${k}</td><td style="padding:8px 0;font-weight:600">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#475569;font-size:13px">Mensaje</p>
      <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.6">${escapeHtml(data.message)}</p>
      <p style="margin:24px 0 0">
        <a href="https://wa.me/${normalizeChileanPhone(data.phone)!.replace("+", "")}" style="display:inline-block;background:#36B64A;color:#18334F;padding:10px 18px;border-radius:999px;font-weight:600;text-decoration:none">Responder por WhatsApp</a>
      </p>
    </div>
  </div>`;

  const text = [
    "Nuevo contacto desde el sitio web",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Mensaje:",
    data.message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `Nuevo contacto web: ${data.serviceType} — ${data.name}`,
      html,
      text,
    });
    if (error) {
      console.error("[contact] Error de Resend:", error);
      return NextResponse.json(
        { error: "No pudimos enviar tu mensaje. Inténtalo nuevamente en unos minutos." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Excepción al enviar:", err);
    return NextResponse.json(
      { error: "No pudimos enviar tu mensaje. Inténtalo nuevamente en unos minutos." },
      { status: 502 },
    );
  }

  // 5) Notificación opcional por WhatsApp Cloud API (no bloquea ni falla el envío)
  await sendWhatsAppNotification(`📩 Nuevo formulario web\n${text}`).catch(() => undefined);

  return NextResponse.json({ ok: true });
}
