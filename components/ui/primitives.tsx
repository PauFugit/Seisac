import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ------------------------------ Container ------------------------------ */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
}) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}>{children}</Tag>
  );
}

/* ------------------------------ Button ------------------------------ */
type Variant = "primary" | "whatsapp" | "outline" | "ghost-light" | "outline-light";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-[var(--ease-signal)] disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-blue-600 text-white shadow-[0_8px_24px_-10px_rgb(7_82_138/0.7)] hover:bg-blue-500 hover:shadow-[0_12px_28px_-10px_rgb(10_99_163/0.8)] hover:-translate-y-0.5",
  // Verde de señal con texto navy (contraste AA ≈ 8:1)
  whatsapp:
    "bg-signal-500 text-navy-900 shadow-[0_8px_24px_-10px_rgb(54_182_74/0.8)] hover:bg-signal-400 hover:-translate-y-0.5",
  outline:
    "border border-blue-600/30 text-blue-600 hover:border-blue-600 hover:bg-blue-600/5",
  "ghost-light":
    "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm hover:bg-white/20 hover:ring-white/40",
  "outline-light": "border border-white/30 text-white hover:border-cyan-300 hover:text-cyan-300",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  external,
  ...rest
}: ButtonLinkProps) {
  const cls = buttonClasses(variant, size, className);
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/* ------------------------------ SectionTitle ------------------------------ */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  id,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  id?: string;
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`eyebrow mb-4 inline-flex items-center gap-3 ${
            dark ? "text-cyan-300" : "text-blue-600"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-px w-8 ${dark ? "bg-cyan-300/60" : "bg-blue-600/50"}`}
          />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={`text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${
          dark ? "!text-white" : ""
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            dark ? "text-slate-200" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------ OnlineDot ------------------------------ */
export function OnlineDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-signal-500 animate-online ${className}`}
    />
  );
}

/* ------------------------------ TechGrid ------------------------------ */
export function TechGrid({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`tech-grid pointer-events-none absolute inset-0 ${className}`} />;
}
