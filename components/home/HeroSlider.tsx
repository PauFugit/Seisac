"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ButtonLink, Container, OnlineDot, TechGrid } from "@/components/ui/primitives";
import { SignalWaves } from "@/components/ui/SignalWaves";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { HERO_INTERVAL_MS, HERO_SLIDES, type HeroSlide } from "./heroSlides";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSlider() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const progressRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const elapsed = useRef(0);

  const total = HERO_SLIDES.length;
  const autoplay = !reduce && !userPaused;
  const paused = !autoplay || hoverPaused || focusPaused || tabHidden;

  const goTo = useCallback(
    (i: number) => {
      elapsed.current = 0;
      setIndex(((i % total) + total) % total);
    },
    [total],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Pausa cuando la pestaña no está visible
  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Temporizador + barras de progreso (actualiza el DOM directamente, sin re-render)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const paint = () => {
      progressRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = i < index ? 1 : i > index ? 0 : autoplay ? elapsed.current / HERO_INTERVAL_MS : 1;
        el.style.transform = `scaleY(${Math.min(p, 1)})`;
      });
    };
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused) {
        elapsed.current += dt;
        if (elapsed.current >= HERO_INTERVAL_MS) {
          elapsed.current = 0;
          setIndex((v) => (v + 1) % total);
          return;
        }
      }
      paint();
      raf = requestAnimationFrame(tick);
    };
    paint();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, paused, autoplay, total]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const slide = HERO_SLIDES[index];
  const nextIndex = (index + 1) % total;

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Servicios destacados de SEISAC"
      className="relative isolate flex min-h-[max(600px,100svh)] flex-col justify-center overflow-hidden bg-navy-900 pb-10 pt-28 sm:pb-24"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusPaused(false);
      }}
      onKeyDown={onKeyDown}
    >
      {/* Capa de medios: crossfade entre slides */}
      <div className="absolute inset-0 -z-10">
        {HERO_SLIDES.map((s, i) => {
          // Solo montamos el slide activo y precargamos el siguiente
          const mounted = i === index || i === nextIndex;
          if (!mounted) return null;
          return (
            <motion.div
              key={s.id}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === index ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 1.4, ease: EASE }}
              aria-hidden="true"
            >
              <SlideFallback slide={s} />
              <SlideVideo slide={s} active={i === index} allowPlay={!reduce} />
            </motion.div>
          );
        })}
        {/* Overlay degradado navy para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/70 to-navy-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/50" />
        <TechGrid className="opacity-50" />
      </div>

      <SignalWaves
        className="absolute -right-24 top-1/2 -z-10 hidden h-[720px] w-[720px] -translate-y-1/2 opacity-70 lg:block"
        rings={6}
        animated={!reduce}
      />

      <h1 className="sr-only">SEISAC – Telecomunicaciones y Seguridad: {"Soluciones a tu alcance, donde lo necesites"}</h1>
      <Container className="relative">
        <div className="max-w-2xl">
          <div
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.6)] backdrop-blur-md sm:p-10"
            aria-live={paused ? "polite" : "off"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} de ${total}: ${slide.eyebrow}`}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.1 } },
                  exit: { opacity: 0, transition: { duration: reduce ? 0 : 0.3 } },
                }}
              >
                <motion.p variants={item(reduce)} className="eyebrow flex items-center gap-3 text-cyan-300">
                  <span className="h-px w-8 bg-cyan-300/70" aria-hidden="true" />
                  {slide.eyebrow}
                </motion.p>
                <motion.h2
                  variants={item(reduce)}
                  className="mt-5 text-[2.35rem] font-extrabold leading-[1.05] !text-white sm:text-5xl lg:text-6xl"
                >
                  {slide.title}
                </motion.h2>
                <motion.p variants={item(reduce)} className="mt-5 max-w-xl text-lg leading-relaxed text-slate-200">
                  {slide.description}
                </motion.p>
                <motion.div variants={item(reduce)} className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/servicios" size="lg">
                    Ver servicios <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </ButtonLink>
                  <ButtonLink href={buildWhatsAppUrl(slide.whatsappMessage)} variant="whatsapp" size="lg">
                    <WhatsAppIcon className="h-5 w-5" /> Cotizar por WhatsApp
                  </ButtonLink>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <a
            href={buildWhatsAppUrl(slide.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2.5 pl-2 text-sm text-slate-200 transition-colors hover:text-white"
          >
            <OnlineDot />
            <span>
              ¿Tienes un proyecto en mente?{" "}
              <span className="font-semibold text-white underline decoration-signal-500/60 underline-offset-4 transition-colors group-hover:decoration-signal-500">
                Conversemos y te asesoramos
              </span>
            </span>
          </a>
        </div>
      </Container>

      {/* Controles */}
      <div className="relative mt-8 sm:absolute sm:inset-x-0 sm:bottom-8 sm:mt-0">
        <Container className="flex items-center gap-3 sm:justify-end sm:gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Diapositiva anterior"
            className="grid h-10 w-10 place-items-center rounded-full text-slate-200 ring-1 ring-white/20 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>

          {/* Indicadores "barras de señal" */}
          <div className="flex items-end gap-1.5" role="group" aria-label="Seleccionar diapositiva">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir a diapositiva ${i + 1}: ${s.eyebrow}`}
                aria-current={i === index ? "true" : undefined}
                className="group flex h-10 items-end px-1"
              >
                <span
                  className="relative block w-2.5 overflow-hidden rounded-sm bg-white/20 transition group-hover:bg-white/30"
                  style={{ height: `${14 + i * 9}px` }}
                >
                  <span
                    ref={(el) => {
                      progressRefs.current[i] = el;
                    }}
                    className="absolute inset-0 origin-bottom [transform:scaleY(0)] bg-gradient-to-t from-blue-500 to-cyan-400"
                  />
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Diapositiva siguiente"
            className="grid h-10 w-10 place-items-center rounded-full text-slate-200 ring-1 ring-white/20 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>

          {!reduce && (
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              aria-label={userPaused ? "Reanudar rotación automática" : "Pausar rotación automática"}
              aria-pressed={userPaused}
              className="grid h-10 w-10 place-items-center rounded-full text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              {userPaused ? <Play className="h-4 w-4" strokeWidth={1.5} /> : <Pause className="h-4 w-4" strokeWidth={1.5} />}
            </button>
          )}

          <span className="ml-1 font-display text-sm tabular-nums text-slate-200">
            0{index + 1}
            <span className="text-slate-400"> / 0{total}</span>
          </span>
        </Container>
      </div>
    </section>
  );
}

function item(reduce: boolean | null) {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease: EASE } },
  };
}

/** Video de fondo. Si el archivo no existe o falla, queda visible el fallback. */
function SlideVideo({
  slide,
  active,
  allowPlay,
}: {
  slide: HeroSlide;
  active: boolean;
  allowPlay: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active && allowPlay) {
      v.play().catch(() => {
        /* autoplay bloqueado: se mantiene el poster */
      });
    } else {
      v.pause();
    }
  }, [active, allowPlay, ready]);

  if (failed) return null;

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      muted
      loop
      playsInline
      preload="auto"
      poster={slide.video.poster}
      onLoadedData={() => setReady(true)}
      tabIndex={-1}
    >
      <source src={slide.video.webm} type="video/webm" />
      <source src={slide.video.mp4} type="video/mp4" onError={() => setFailed(true)} />
    </video>
  );
}

/** Fondo de respaldo animado (gradiente de marca + luz difusa + ondas). */
function SlideFallback({ slide }: { slide: HeroSlide }) {
  const pos =
    slide.accent === "left"
      ? "left-[-10%] top-[10%]"
      : slide.accent === "center"
        ? "left-[30%] top-[30%]"
        : "right-[-10%] top-[-10%]";
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
      <div
        className={`hero-fallback-blob absolute ${pos} h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgb(31_181_217/0.35),transparent_60%)] blur-2xl`}
      />
      <div className="hero-fallback-blob absolute bottom-[-30%] left-[20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgb(11_111_184/0.45),transparent_60%)] blur-2xl [animation-delay:-6s]" />
    </div>
  );
}
