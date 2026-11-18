# SEISAC – Telecomunicaciones y Seguridad

Sitio corporativo de **SEISAC**, empresa chilena de telecomunicaciones, seguridad electrónica y control de accesos.

> _"Soluciones a tu alcance, donde lo necesites"_

![Next.js](https://img.shields.io/badge/Next.js-15-000?logo=nextdotjs) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white) ![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)

---

## Contenido

1. [Características](#1-características)
2. [Stack](#2-stack)
3. [Inicio rápido](#3-inicio-rápido)
4. [Variables de entorno](#4-variables-de-entorno)
5. [Estructura del proyecto](#5-estructura-del-proyecto)
6. [Cómo editar el contenido](#6-cómo-editar-el-contenido)
7. [Identidad visual](#7-identidad-visual)
8. [Videos del hero](#8-videos-del-hero)
9. [Formulario de contacto (Resend)](#9-formulario-de-contacto-resend)
10. [WhatsApp](#10-whatsapp)
11. [Despliegue en Vercel](#11-despliegue-en-vercel)
12. [SEO, accesibilidad y rendimiento](#12-seo-accesibilidad-y-rendimiento)
13. [Solución de problemas](#13-solución-de-problemas)
14. [Pendientes con el cliente](#14-pendientes-con-el-cliente)
15. [Declaración de uso de IA](#15-declaración-de-uso-de-ia)

---

## 1. Características

- **3 páginas:** Inicio (`/`), Servicios (`/servicios`) y Contacto (`/contacto`), más una página 404 propia.
- **Hero con slider de video:** 3 slides con transición suave, barras de progreso y pausa automática. Si aún no hay videos, cada slide muestra un fondo animado de marca.
- **Servicios desde una sola fuente** (`lib/services.ts`): alimenta el Inicio, `/servicios`, el selector del formulario, el footer y los datos estructurados para Google.
- **Formulario de contacto** con validación en cliente y servidor, selector de comuna agrupado por región (Santiago por defecto), protección anti-spam y envío de correo con Resend.
- **WhatsApp en todo el sitio:** botón flotante y botones con mensajes pre-escritos según el servicio. Hay una integración opcional con la WhatsApp Business Cloud API (desactivada).
- **SEO local:** metadata por página, imagen Open Graph generada, `sitemap.xml`, `robots.txt` y JSON-LD `LocalBusiness`.
- **Accesible y responsivo:** navegación por teclado, foco visible, menú móvil accesible y respeto de `prefers-reduced-motion`.

## 2. Stack

| Área            | Tecnología                                                   |
| --------------- | ------------------------------------------------------------ |
| Framework       | Next.js 15 (App Router) + React 19                           |
| Lenguaje        | TypeScript 5                                                 |
| Estilos         | Tailwind CSS v4 (tokens de marca en `@theme`)                |
| Animaciones     | Framer Motion                                                |
| Íconos          | lucide-react + SVG propios (marcas y logo)                   |
| Formularios     | react-hook-form + zod (esquema compartido cliente/servidor)  |
| Correo          | Resend                                                       |
| Tipografías     | Sora (títulos) e Inter (texto) vía `next/font`               |
| Hosting         | Vercel                                                       |

> TypeScript está fijado en la versión 5: la 6 rompe el tipado de los imports CSS de Next 15.

## 3. Inicio rápido

Requisitos: **Node.js 20 o superior** (probado con Node 24).

```bash
git clone https://github.com/PauFugit/Seisac.git
cd Seisac
npm install
cp .env.example .env.local   # luego completa las variables (sección 4)
npm run dev                  # http://localhost:3000
```

| Script          | Qué hace                         |
| --------------- | -------------------------------- |
| `npm run dev`   | Servidor de desarrollo           |
| `npm run build` | Build de producción              |
| `npm run start` | Sirve el build de producción     |
| `npm run lint`  | ESLint (configuración de Next)   |

## 4. Variables de entorno

Copia `.env.example` a **`.env.local`** y complétalo. Ese archivo no se sube a Git.

| Variable                      | Obligatoria | Descripción                                                                 |
| ----------------------------- | ----------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | Sí (prod)   | URL pública, ej. `https://www.seisac.cl`. Se usa en canonical, sitemap y OG |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No          | Número sin `+` ni espacios, ej. `56962262519`                               |
| `RESEND_API_KEY`              | Sí (prod)   | API key de Resend                                                           |
| `CONTACT_TO_EMAIL`            | Sí          | Casilla que recibe los formularios                                          |
| `CONTACT_FROM_EMAIL`          | Sí          | Remitente. Debe ser de un dominio verificado en Resend (ver sección 9)      |
| `WHATSAPP_NOTIFY_ENABLED`     | No          | `true` para activar la notificación por WhatsApp Cloud API                  |
| `WHATSAPP_TOKEN`              | No          | Token permanente de Meta                                                    |
| `WHATSAPP_PHONE_NUMBER_ID`    | No          | Phone number ID de Meta                                                     |
| `WHATSAPP_NOTIFY_TO`          | No          | Número que recibe la notificación                                           |

> ⚠️ **Nunca pongas claves reales en `.env.example`**: ese archivo sí se sube al repositorio. Si una clave llega a publicarse, revócala en el panel del proveedor y genera una nueva.
>
> Next.js lee `.env.local` antes que `.env`. Si una variable aparece vacía en `.env.local`, ese valor vacío es el que se usa.

## 5. Estructura del proyecto

```
app/
  layout.tsx              Layout global: fuentes, navbar, footer, WhatsApp flotante, JSON-LD
  page.tsx                Inicio
  servicios/page.tsx      Servicios
  contacto/page.tsx       Contacto
  api/contact/route.ts    Envío del formulario (Resend + honeypot + rate limit)
  api/whatsapp/route.ts   WhatsApp Business Cloud API (desactivado por defecto)
  sitemap.ts · robots.ts · opengraph-image.tsx · icon.svg · not-found.tsx
  globals.css             Tokens de marca (@theme), utilidades y animaciones
components/
  layout/    Navbar, Footer, Logo, WhatsAppFloat
  home/      HeroSlider (+ heroSlides.ts), AboutPreview, ServicesPreview, ServiceTile, ProcessBand, ContactSection
  services/  PageBanner, ServicesBanner, ServiceCategory, ServiceCard, ServicesCta
  contact/   ContactForm, ContactInfo
  ui/        primitives (Button, Container, SectionTitle…), Icon, ShieldMark, SignalWaves, Motion, BrandIcons
lib/
  site.ts            Datos de contacto, horario, cobertura y redes      ← editar aquí
  services.ts        Servicios (fuente única)                           ← editar aquí
  cities.ts          Comunas del selector del formulario                ← editar aquí
  whatsapp.ts        buildWhatsAppUrl() y mensajes pre-escritos
  contact-schema.ts  Validación zod compartida (incluye teléfono chileno)
  seo.ts · rate-limit.ts · whatsapp-cloud.ts
public/
  brand/   logo-icon.svg (escudo de la marca en SVG)
  videos/  hero-1..3 (.mp4 / .webm / .webp), aún por agregar
```

## 6. Cómo editar el contenido

| Quiero cambiar…                              | Archivo                              |
| -------------------------------------------- | ------------------------------------ |
| Teléfono, correo, horario, cobertura, redes  | `lib/site.ts`                        |
| Servicios, categorías y sus descripciones    | `lib/services.ts`                    |
| Comunas del formulario y comuna por defecto  | `lib/cities.ts` (`DEFAULT_CITY`)     |
| Textos y videos del slider                   | `components/home/heroSlides.ts`      |
| Mensajes pre-escritos de WhatsApp            | `lib/whatsapp.ts` (`WA_MESSAGES`)    |
| Colores y tipografías                        | `app/globals.css` (`@theme`)         |

**Servicios:**
- Para agregar un servicio, añade `{ id, name, description, icon, tags }` dentro de su categoría. El `id` se usa como ancla (`/servicios#id`).
- `icon` es una clave de `components/ui/Icon.tsx`. Para usar otro ícono de lucide, impórtalo y agrégalo al mapa `ICONS`.
- `SERVICE_AREAS` son las 5 áreas que aparecen como tarjetas en el Inicio y en la franja de `/servicios`.

**Redes sociales:** si dejas una red en `""` en `lib/site.ts`, se oculta del sitio.

## 7. Identidad visual

La paleta está definida como tokens en `app/globals.css` y se usa con clases de Tailwind (`bg-blue-600`, `text-signal-500`, etc.).

| Token        | Hex       | Uso                                                       |
| ------------ | --------- | --------------------------------------------------------- |
| `blue-600`   | `#07528A` | **Azul principal**: botones, links, marca                 |
| `cyan-400`   | `#0796C7` | **Celeste secundario**: acentos, ondas, foco              |
| `signal-500` | `#36B64A` | **Verde de detalles**: CTA de WhatsApp, puntos “online”   |
| `navy-900`   | `#18334F` | **Azul oscuro**: fondos oscuros, títulos, footer          |
| `navy-950`   | `#10243A` | Fondo de secciones profundas (servicios del Inicio)       |
| `navy-800`   | `#1E4062` | Superficies sobre fondo oscuro (tarjetas)                 |
| `blue-500`   | `#0A63A3` | Hover del azul principal                                  |
| `cyan-300`   | `#5CC3E6` | Texto celeste sobre fondos oscuros                        |
| `signal-400` | `#4CC65F` | Hover del verde                                           |
| `slate-50`   | `#F5F8FB` | Fondos claros                                             |

**Accesibilidad de color:**
- Los botones verdes usan **texto navy**, porque el blanco sobre verde no alcanza contraste AA.
- Sobre fondos oscuros, el texto celeste usa `cyan-300`.
- Para texto secundario sobre fondos claros se usa `slate-600`.

**Logo:** el navbar y el footer usan el logo recreado en código (`components/layout/Logo.tsx`). Es nítido en cualquier pantalla y tiene versión clara para fondos oscuros. Si prefieres los PNG oficiales, déjalos en `public/brand/` y reemplaza el contenido de `Logo.tsx` por un `<Image>`. El navbar va sobre fondo oscuro, así que necesitarás una versión en blanco.

## 8. Videos del hero

El slider busca estos archivos en `public/videos/`:

| Slide | Archivos                                   | Qué clip poner                                                                  |
| ----- | ------------------------------------------ | ------------------------------------------------------------------------------- |
| 1     | `hero-1.mp4`, `hero-1.webm`, `hero-1.webp` | Técnico instalando red: access point en el cielo, rack, cableado, crimpado RJ45 |
| 2     | `hero-2.mp4`, `hero-2.webm`, `hero-2.webp` | Cámara de seguridad: domo o bala girando, vista nocturna, monitoreo en celular  |
| 3     | `hero-3.mp4`, `hero-3.webm`, `hero-3.webp` | Técnico llegando a domicilio: camioneta, camino rural, saludo en la puerta      |

**Recomendaciones para los clips:**
- Duración de 10 a 20 s en loop, sin audio.
- Resolución de 1920×1080 (o 1280×720).
- Tomas tranquilas y oscuras o azuladas, porque el texto va encima.
- **Máximo 3 a 4 MB por archivo.**
- El `.webp` es el poster que se ve mientras carga el video.

```bash
# MP4 H.264
ffmpeg -i original.mov -an -vf "scale=1920:-2,fps=30" -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart hero-1.mp4
# WebM VP9
ffmpeg -i original.mov -an -vf "scale=1920:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 hero-1.webm
# Poster
ffmpeg -i hero-1.mp4 -frames:v 1 -vf "scale=1920:-2" -q:v 80 hero-1.webp
```

**Comportamiento:**
- Mientras no existan los videos, nada se rompe: cada slide muestra un fondo de gradiente animado.
- Solo se monta el video del slide activo y se precarga el siguiente.
- Con `prefers-reduced-motion` no hay rotación automática ni reproducción de video.
- El intervalo entre slides está en `HERO_INTERVAL_MS` (7000 ms), en `components/home/heroSlides.ts`.

## 9. Formulario de contacto (Resend)

### Configuración

1. Crea una cuenta en [resend.com](https://resend.com) y genera una API key.
2. Configura `.env.local` y las variables de Vercel:
   ```
   RESEND_API_KEY=re_xxx
   CONTACT_TO_EMAIL=correo-que-recibe@ejemplo.cl
   CONTACT_FROM_EMAIL="SEISAC Web <onboarding@resend.dev>"
   ```

### El remitente: modo prueba y dominio propio

Resend **solo envía desde dominios verificados**. Una dirección `@gmail.com` u otro correo gratuito **no sirve como remitente** y produce este error:

```
The gmail.com domain is not verified.
```

| Etapa                         | `CONTACT_FROM_EMAIL`                 | Limitación                                                                       |
| ----------------------------- | ------------------------------------ | -------------------------------------------------------------------------------- |
| Modo prueba (sin dominio)     | `SEISAC Web <onboarding@resend.dev>` | Solo envía al correo con que se creó la cuenta de Resend (`CONTACT_TO_EMAIL`)    |
| Producción (dominio verificado) | `SEISAC Web <web@seisac.cl>`       | Ninguna. Antes, verifica `seisac.cl` en Resend → Domains (registros DNS SPF/DKIM) |

### Comportamiento del formulario

- **Campos:** nombre, teléfono, correo, comuna (Santiago por defecto), tipo de servicio, mensaje y la opción "Prefiero que me contacten por WhatsApp".
- **Validación:** el mismo esquema zod se aplica en cliente y servidor. El teléfono chileno se acepta como `+56 9 XXXX XXXX`, con o sin espacios y con o sin `+56`.
- **Anti-spam:** un campo honeypot oculto (`website`) y un límite de 5 envíos cada 10 minutos por IP. El límite vive en memoria; para algo más estricto, usa Upstash o Vercel KV.
- **Sin `RESEND_API_KEY`:** en desarrollo responde OK y muestra los datos en la consola. En producción responde 503 con un mensaje amable.
- **Correo recibido:** viene con diseño de marca. "Responder" contesta directo al cliente (`reply-to`) y además trae un botón "Responder por WhatsApp".
- **Tras enviar:** el cliente ve una confirmación con la opción de seguir la conversación por WhatsApp, con el resumen de su solicitud ya escrito.

## 10. WhatsApp

- **Número:** se define en `NEXT_PUBLIC_WHATSAPP_NUMBER`. Si falta, se usa el de `lib/site.ts` (+56 9 6226 2519).
- **Enlaces:** se arman con `buildWhatsAppUrl(message)`, en `lib/whatsapp.ts`.
- **Mensajes pre-escritos:** están en `WA_MESSAGES` (general, flotante, diagnóstico, por servicio y por categoría).
- **Botón flotante:** aparece en todo el sitio y se oculta cuando el footer está visible.

### WhatsApp Business Cloud API (opcional, desactivada)

`lib/whatsapp-cloud.ts` y `app/api/whatsapp/route.ts` permiten notificar a la empresa por WhatsApp cada vez que llega un formulario.

1. En Meta for Developers, crea una app tipo Business y agrégale el producto **WhatsApp**.
2. Obtén el **Phone number ID** y genera un **token permanente** (usuario del sistema en Business Manager).
3. Define las variables:
   ```
   WHATSAPP_NOTIFY_ENABLED=true
   WHATSAPP_TOKEN=EAAG...
   WHATSAPP_PHONE_NUMBER_ID=1234567890
   WHATSAPP_NOTIFY_TO=56962262519
   ```
4. Ten en cuenta que, fuera de la ventana de 24 h de conversación, Meta solo permite **mensajes de plantilla aprobados**. Para producción:
   - Crea una plantilla, por ejemplo `nuevo_contacto_web`.
   - En `sendWhatsAppNotification()`, cambia el `body` a `type: "template"`.

Sin credenciales todo sigue funcionando: la notificación simplemente se omite.

## 11. Despliegue en Vercel

1. En Vercel, ve a **Add New → Project** e importa el repositorio `PauFugit/Seisac`. Next.js se detecta solo.
2. En **Settings → Environment Variables**, agrega las variables de la sección 4. Los archivos `.env` no se suben, así que **hay que cargarlas a mano**.
3. Haz Deploy y conecta el dominio en **Settings → Domains**.
4. Cada push a `main` genera un nuevo despliegue. Si cambias variables de entorno, haz **Redeploy** para que se apliquen.

## 12. SEO, accesibilidad y rendimiento

**SEO**
- Metadata por página e imagen Open Graph generada (`app/opengraph-image.tsx`).
- Favicon SVG del escudo, `sitemap.xml`, `robots.txt` y `lang="es-CL"`.
- JSON-LD `LocalBusiness` con servicios, teléfono, horario y área de servicio.

**Accesibilidad**
- Enlace para saltar al contenido y foco visible celeste.
- Menú móvil con focus trap y cierre con Esc.
- Carrusel accesible: se pausa con hover o foco, tiene botón de pausa y responde a las flechas del teclado.
- Formularios con etiquetas, mensajes de error asociados y `aria-invalid`.
- `prefers-reduced-motion` respetado en todo el sitio.

**Rendimiento**
- Fuentes optimizadas con `next/font`.
- Videos cargados bajo demanda y cabeceras de caché para `/videos`.
- Cabeceras de seguridad configuradas en `next.config.ts`.

## 13. Solución de problemas

| Síntoma                                                          | Causa probable / solución                                                                                     |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| “No pudimos enviar tu mensaje…” al enviar el formulario          | Resend rechazó el envío. Revisa la consola del servidor (o *Logs* en Vercel). Lo más común es que el remitente no tenga dominio verificado (sección 9) |
| El formulario funciona en local pero no en Vercel                | Faltan las variables de entorno en Vercel o falta un Redeploy después de agregarlas                           |
| “El formulario no está disponible en este momento” (503)         | Falta `RESEND_API_KEY` en producción                                                                         |
| Cambié el `.env` y no pasa nada                                  | Reinicia `npm run dev`. Revisa también que `.env.local` no tenga la misma variable vacía                      |
| Error de tipos con `./globals.css` al compilar                   | Se instaló TypeScript 6. Vuelve a la 5 con `npm i -D typescript@5`                                            |

## 14. Pendientes con el cliente

Los textos y datos marcados con `// TODO: validar con cliente` son provisorios:

- [ ] Correo definitivo, horario de atención, cobertura real y URLs de redes sociales (`lib/site.ts`).
- [ ] Revisar las descripciones redactadas de servicios y categorías (`lib/services.ts`).
- [ ] Foto real del equipo o de un técnico en terreno (`components/home/AboutPreview.tsx`).
- [ ] Videos y posters del hero (`public/videos/`).
- [ ] Verificar el dominio `seisac.cl` en Resend y cambiar el remitente.
- [ ] Definir `NEXT_PUBLIC_SITE_URL` con el dominio final.

## 15. Declaración de uso de IA

Este proyecto se desarrolló con apoyo de inteligencia artificial generativa, de forma transparente y con supervisión humana.

- **Herramienta:** [Claude Code](https://claude.com/claude-code), de Anthropic, con el modelo Claude Opus 5.5.
- **Para qué se usó:**
  - Generar la estructura del proyecto, los componentes y la lógica (formulario, API de contacto, integración con WhatsApp y SEO).
  - Ajustar el diseño a la paleta de marca.
  - Redactar textos provisorios de servicios.
  - Diagnosticar errores, por ejemplo la configuración del remitente en Resend.
  - Escribir esta documentación.
- **Supervisión humana:** cada cambio fue solicitado, revisado y aprobado por una persona del equipo antes de subirse al repositorio. El sitio se verificó con `npm run build`, `npm run lint` y revisiones visuales.
- **Contenido generado:** los textos redactados con IA están marcados con `// TODO: validar con cliente`. No deben considerarse definitivos hasta que SEISAC los revise y apruebe.
- **Datos y seguridad:** las credenciales (API keys, tokens) se manejan solo en variables de entorno locales o en Vercel, y no forman parte del repositorio.
- **Responsabilidad:** la responsabilidad final sobre el código, el contenido publicado y su exactitud es del equipo humano a cargo del proyecto.

Los commits hechos con asistencia de IA incluyen la línea `Co-Authored-By: Claude`, para que quede trazabilidad en el historial de Git.
