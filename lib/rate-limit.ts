/**
 * Rate limit simple en memoria por IP (ventana deslizante).
 * Nota: en Vercel cada instancia serverless tiene su propia memoria, por lo que
 * es una protección básica. Para algo estricto usar Upstash Redis / Vercel KV.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    const retryAfter = Math.ceil((windowMs - (now - recent[0])) / 1000);
    return { ok: false as const, retryAfter };
  }
  recent.push(now);
  hits.set(key, recent);

  // Limpieza ocasional para no crecer indefinidamente
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return { ok: true as const };
}

export function getClientIp(headers: Headers) {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
