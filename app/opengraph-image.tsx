import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "SEISAC – Telecomunicaciones y Seguridad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const rings = [120, 200, 280, 360, 440];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #18334F 0%, #224A73 60%, #07528A 100%)",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {rings.map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              right: 180 - r,
              top: 315 - r,
              width: r * 2,
              height: r * 2,
              borderRadius: "50%",
              border: "2px solid rgba(92,195,230,0.22)",
            }}
          />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 90px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <svg width="120" height="135" viewBox="0 0 64 72">
              <path
                d="M32 2C40 6 50 8 60 9v25c0 18-12 29-28 36C16 63 4 52 4 34V9c10-1 20-3 28-7Z"
                fill="none"
                stroke="#ffffff"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              <path d="M16.4 30.4a22 22 0 0 1 31.2 0" fill="none" stroke="#5CC3E6" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M21.4 35.4a15 15 0 0 1 21.2 0" fill="none" stroke="#5CC3E6" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M26.3 40.3a8 8 0 0 1 11.4 0" fill="none" stroke="#5CC3E6" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="32" cy="48.5" r="3.8" fill="#36B64A" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 104, fontWeight: 800, color: "#fff", letterSpacing: -3 }}>
                SEIS<span style={{ color: "#0796C7" }}>AC</span>
              </div>
              <div style={{ fontSize: 22, letterSpacing: 6, color: "#D9E2EC" }}>TELECOMUNICACIONES Y SEGURIDAD</div>
            </div>
          </div>
          <div style={{ marginTop: 56, fontSize: 40, color: "#fff", fontWeight: 600 }}>{SITE.slogan}</div>
          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#D9E2EC" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#36B64A" }} />
            Redes · Cámaras de seguridad · Control de accesos · Servicio a domicilio
          </div>
        </div>
      </div>
    ),
    size,
  );
}
