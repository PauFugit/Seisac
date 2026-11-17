type Props = {
  className?: string;
  /** Número de anillos concéntricos */
  rings?: number;
  /** Color del trazo (usa clases text-*) */
  tone?: "light" | "dark";
  /** Pulso tipo radar muy lento */
  animated?: boolean;
  /** "circle" = anillos completos, "arc" = ondas WiFi (semicírculo superior) */
  shape?: "circle" | "arc";
};

/**
 * Motivo gráfico central del sitio: ondas de señal concéntricas.
 * Decorativo (aria-hidden). Las animaciones se anulan con prefers-reduced-motion (globals.css).
 */
export function SignalWaves({
  className = "",
  rings = 5,
  tone = "light",
  animated = true,
  shape = "circle",
}: Props) {
  const color = tone === "light" ? "text-cyan-300" : "text-blue-600";
  const items = Array.from({ length: rings }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 400 400"
      className={`pointer-events-none select-none ${color} ${className}`}
      aria-hidden="true"
      fill="none"
    >
      {items.map((i) => {
        const r = 40 + i * (150 / Math.max(rings - 1, 1));
        const opacity = 0.34 - i * (0.24 / rings);
        const style = animated
          ? { animationDelay: `${i * 0.6}s`, transformOrigin: "200px 200px" }
          : undefined;
        return shape === "circle" ? (
          <circle
            key={i}
            cx="200"
            cy="200"
            r={r}
            stroke="currentColor"
            strokeWidth={1}
            strokeOpacity={opacity}
            className={animated ? "animate-radar" : undefined}
            style={style}
          />
        ) : (
          <path
            key={i}
            d={`M ${200 - r * 0.766} ${200 - r * 0.643} A ${r} ${r} 0 0 1 ${200 + r * 0.766} ${200 - r * 0.643}`}
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeOpacity={opacity + 0.1}
            className={animated ? "animate-radar" : undefined}
            style={style}
          />
        );
      })}
      {/* Anillo base estático para que el motivo nunca desaparezca */}
      {shape === "circle" && (
        <circle cx="200" cy="200" r="40" stroke="currentColor" strokeOpacity={0.25} />
      )}
    </svg>
  );
}
