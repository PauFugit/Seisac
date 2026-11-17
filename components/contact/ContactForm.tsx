"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactData, type ContactInput } from "@/lib/contact-schema";
import { SERVICE_TYPE_OPTIONS } from "@/lib/services";
import { buildFormSummaryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

type Status = "idle" | "success" | "error";

export function ContactForm({ variant = "full" }: { variant?: "full" | "compact" }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState<ContactData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      message: "",
      preferWhatsapp: false,
      website: "",
    },
  });

  const onSubmit = async (data: ContactData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "No pudimos enviar tu mensaje.");
      setSent(data);
      setStatus("success");
      reset();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "No pudimos enviar tu mensaje. Inténtalo nuevamente.",
      );
      setStatus("error");
    }
  };

  const compact = variant === "compact";
  const f = (name: string) => `${uid}-${name}`;

  if (status === "success" && sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="flex flex-col items-start rounded-3xl border border-slate-200 bg-white p-8 shadow-[var(--shadow-card)] sm:p-10"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-signal-500/15 text-[#1F7A2E]">
          <CircleCheck className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-bold">¡Gracias, {sent.name.split(" ")[0]}! Recibimos tu mensaje.</h3>
        <p className="mt-3 text-slate-600">
          Te contactaremos a la brevedad{sent.preferWhatsapp ? " por WhatsApp" : ""}. Si es urgente, puedes
          escribirnos directamente.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
          <a
            href={buildWhatsAppUrl(buildFormSummaryMessage(sent))}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("whatsapp", "md")}
          >
            <WhatsAppIcon className="h-5 w-5" /> ¿Prefieres seguir por WhatsApp?
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setSent(null);
            }}
            className={buttonClasses("outline", "md")}
          >
            Enviar otro mensaje
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-variant={variant}
      noValidate
      aria-describedby={`${f("required-note")}`}
      className={`relative rounded-3xl border border-slate-200 bg-white shadow-[var(--shadow-card)] ${
        compact ? "p-6 sm:p-8" : "p-6 sm:p-10"
      }`}
    >
      <p id={f("required-note")} className="mb-6 text-sm text-slate-600">
        Los campos marcados con <span className="font-semibold text-blue-600">*</span> son obligatorios.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={f("name")} label="Nombre" required error={errors.name?.message}>
          <input
            id={f("name")}
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            {...register("name")}
            {...aria(f("name"), errors.name?.message)}
            className={inputCls(!!errors.name)}
          />
        </Field>

        <Field id={f("phone")} label="Teléfono" required error={errors.phone?.message} hint="+56 9 XXXX XXXX">
          <input
            id={f("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
            {...register("phone")}
            {...aria(f("phone"), errors.phone?.message, true)}
            className={inputCls(!!errors.phone)}
          />
        </Field>

        <Field id={f("email")} label="Correo" required error={errors.email?.message}>
          <input
            id={f("email")}
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.cl"
            {...register("email")}
            {...aria(f("email"), errors.email?.message)}
            className={inputCls(!!errors.email)}
          />
        </Field>

        <Field id={f("city")} label="Comuna / Ciudad" error={errors.city?.message}>
          <input
            id={f("city")}
            type="text"
            autoComplete="address-level2"
            placeholder="Ej.: Talca"
            {...register("city")}
            {...aria(f("city"), errors.city?.message)}
            className={inputCls(!!errors.city)}
          />
        </Field>

        <Field id={f("serviceType")} label="Tipo de servicio" required error={errors.serviceType?.message} full>
          <select
            id={f("serviceType")}
            defaultValue=""
            {...register("serviceType")}
            {...aria(f("serviceType"), errors.serviceType?.message)}
            className={`${inputCls(!!errors.serviceType)} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2307528A' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[length:20px] bg-[right_14px_center] bg-no-repeat pr-11`}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {SERVICE_TYPE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field id={f("message")} label="Mensaje" required error={errors.message?.message} full>
          <textarea
            id={f("message")}
            rows={compact ? 4 : 5}
            placeholder="Cuéntanos qué necesitas: tipo de lugar, problema actual, etc."
            {...register("message")}
            {...aria(f("message"), errors.message?.message)}
            className={`${inputCls(!!errors.message)} h-auto resize-y py-3`}
          />
        </Field>
      </div>

      {/* Honeypot anti-spam: oculto para personas */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={f("website")}>No completar este campo</label>
        <input id={f("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <label htmlFor={f("preferWhatsapp")} className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-slate-700">
        <input
          id={f("preferWhatsapp")}
          type="checkbox"
          {...register("preferWhatsapp")}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-blue-600"
        />
        Prefiero que me contacten por WhatsApp
      </label>

      <AnimatePresence>
        {status === "error" && serverError && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-800"
          >
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {serverError} También puedes escribirnos directamente por{" "}
              <a className="font-semibold underline" href={buildWhatsAppUrl("Hola SEISAC, quiero hacer una consulta.")} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              .
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonClasses("primary", "lg", "mt-8 w-full sm:w-auto")}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Enviando…
          </>
        ) : (
          <>
            Enviar mensaje <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

function aria(id: string, error?: string, hasHint = false) {
  const describedBy = [error ? `${id}-error` : null, hasHint ? `${id}-hint` : null].filter(Boolean).join(" ");
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
  } as const;
}

function inputCls(hasError: boolean) {
  return `block h-12 w-full rounded-xl border bg-slate-50 px-4 text-[0.95rem] text-navy-900 placeholder:text-slate-500 transition focus:bg-white focus:outline-none focus:ring-4 ${
    hasError
      ? "border-red-500 focus:border-red-600 focus:ring-red-500/15"
      : "border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-blue-600/15"
  }`;
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  full,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-semibold text-navy-700">
        <span>
          {label}
          {required && (
            <span className="text-blue-600" aria-hidden="true">
              {" "}*
            </span>
          )}
          {required && <span className="sr-only"> (obligatorio)</span>}
        </span>
        {hint && (
          <span id={`${id}-hint`} className="text-xs font-normal text-slate-600">
            {hint}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
          <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
