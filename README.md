# SEISAC – Telecomunicaciones y Seguridad

Sitio corporativo de **SEISAC** · _"Soluciones a tu alcance, donde lo necesites"_.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react · react-hook-form + zod · Resend.

---

## 1. Instalación

Requisitos: Node.js 20+ (probado con Node 24).

```bash
npm install
cp .env.example .env.local   # completar variables (ver abajo)
npm run dev                  # http://localhost:3000
```

| Script          | Qué hace                      |
| --------------- | ----------------------------- |
| `npm run dev`   | Servidor de desarrollo        |
| `npm run build` | Build de producción           |
| `npm run start` | Sirve el build de producción  |
| `npm run lint`  | ESLint (config de Next.js)    |

## 2. Estructura

```
app/
  layout.tsx            Layout global (fuentes, navbar, footer, WhatsApp flotante, JSON-LD)
  page.tsx              Home
  servicios/page.tsx    Servicios
  contacto/page.tsx     Contacto
  api/contact/route.ts  Envío del formulario (Resend + honeypot + rate limit)
  api/whatsapp/route.ts WhatsApp Business Cloud API (desactivado por defecto)
  sitemap.ts · robots.ts · opengraph-image.tsx · icon.svg · not-found.tsx
  globals.css           Tokens de marca (@theme) y utilidades
components/
  layout/   Navbar, Footer, Logo, WhatsAppFloat
  home/     HeroSlider (+ heroSlides.ts), AboutPreview, ServicesPreview, ProcessBand, ContactSection
  services/ PageBanner, ServicesBanner, ServiceCategory, ServiceCard, ServicesCta
  contact/  ContactForm, ContactInfo
  ui/       primitives (Button, Container, SectionTitle…), Icon, ShieldMark, SignalWaves, Motion, BrandIcons
lib/
  site.ts            Datos de contacto, horario, cobertura, redes  ← editar aquí
  services.ts        Servicios (fuente única)                      ← editar aquí
  whatsapp.ts        buildWhatsAppUrl() y mensajes pre-rellenados
  contact-schema.ts  Validación zod (compartida cliente/servidor)
  seo.ts · rate-limit.ts · whatsapp-cloud.ts
public/
  brand/   logo-icon.svg (escudo recreado en SVG) · logo-full.png / logo-icon.png (originales)
  videos/  hero-1..3 (.mp4 / .webm / .webp)
```

## 3. Identidad visual

Los colores del logo están definidos como tokens en `app/globals.css` (`@theme`) y se usan como clases de Tailwind:

| Token        | Hex       | Uso                                                  |
| ------------ | --------- | ---------------------------------------------------- |
| `navy-900`   | `#0B2545` | Fondos oscuros, footer, overlay del hero            |
| `navy-700`   | `#123E73` | Títulos                                              |
| `blue-600`   | `#0B6FB8` | Primario, botones, links                             |
| `blue-500`   | `#0A84C6` | Hover, acentos                                       |
| `cyan-400`   | `#1FB5D9` | Acentos secundarios, ondas, foco                     |
| `signal-500` | `#6CC24A` | Solo “online”, CTA de WhatsApp y puntos de énfasis   |
| `slate-50`   | `#F5F8FB` | Fondos claros                                        |

Notas de accesibilidad: los botones verdes usan **texto navy** (blanco sobre verde no cumple AA). Para texto secundario sobre fondos claros se usa `slate-600` (`slate-500` sobre `#F5F8FB` queda bajo 4.5:1).

**Logo:** el navbar y el footer usan el logo recreado en código (`components/layout/Logo.tsx`), nítido y con versión clara para fondos oscuros. Si prefieres los PNG oficiales, deja los archivos en `public/brand/logo-full.png` y `logo-icon.png` y reemplaza el contenido de `Logo.tsx` por un `<Image>` (ojo: el navbar va sobre fondo oscuro, necesitarás una versión en blanco).

## 4. Videos del hero

El slider busca estos archivos en `public/videos/`:

| Slide | Archivos                                       | Qué clip poner                                                                  |
| ----- | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| 1     | `hero-1.mp4`, `hero-1.webm`, `hero-1.webp`     | Técnico instalando red: access point en el cielo, rack, cableado, crimpado RJ45 |
| 2     | `hero-2.mp4`, `hero-2.webm`, `hero-2.webp`     | Cámara de seguridad: domo/bala girando, vista nocturna, monitoreo en celular    |
| 3     | `hero-3.mp4`, `hero-3.webm`, `hero-3.webp`     | Técnico llegando a domicilio: camioneta, camino rural, saludo en la puerta      |

Recomendaciones: 10–20 s en loop, sin audio, 1920×1080 (o 1280×720), tomas tranquilas y oscuras/azuladas (el texto va encima con overlay navy), **≤ 3–4 MB por archivo**. El `.webp` es el poster (primer frame) que se muestra mientras carga.

```bash
# MP4 H.264
ffmpeg -i original.mov -an -vf "scale=1920:-2,fps=30" -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart hero-1.mp4
# WebM VP9
ffmpeg -i original.mov -an -vf "scale=1920:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 hero-1.webm
# Poster
ffmpeg -i hero-1.mp4 -frames:v 1 -vf "scale=1920:-2" -q:v 80 hero-1.webp
```

**Mientras no existan los videos** no se rompe nada: cada slide muestra un fondo de gradiente de marca animado. Solo se monta el video del slide activo y se precarga el siguiente. Con `prefers-reduced-motion` no hay rotación automática ni reproducción de video.

### Cambiar textos del slider

Edita `components/home/heroSlides.ts` (eyebrow, título, bajada, rutas de video y mensaje de WhatsApp de cada slide). El intervalo está en `HERO_INTERVAL_MS` (7000 ms).

## 5. Editar servicios

Todo sale de **`lib/services.ts`**: Home, `/servicios`, select del formulario, footer y JSON-LD.

- Agregar un servicio: añade un objeto `{ id, name, description, icon, tags }` dentro de la categoría. `id` se usa como ancla (`/servicios#id`).
- `icon` es una clave de `components/ui/Icon.tsx`; para usar otro ícono de lucide, impórtalo y agrégalo al mapa `ICONS`.
- Los textos marcados con `// TODO: validar con cliente` fueron redactados y deben revisarse.
- `SERVICE_AREAS` son las 5 áreas del banner corporativo (tiles del Home y franja de `/servicios`).

Datos de contacto, horario, cobertura y redes sociales: **`lib/site.ts`** (deja una red social en `""` para ocultarla).

## 6. Formulario de contacto + Resend

1. Crea una cuenta en [resend.com](https://resend.com) y genera una API key.
2. Verifica el dominio (ej. `seisac.cl`) en Resend → Domains (registros DNS SPF/DKIM).
3. En `.env.local` (y en Vercel):
   ```
   RESEND_API_KEY=re_xxx
   CONTACT_TO_EMAIL=contacto@seisac.cl
   CONTACT_FROM_EMAIL="SEISAC Web <web@seisac.cl>"
   ```
   Mientras no verifiques dominio puedes usar `onboarding@resend.dev` como remitente (solo envía a tu propio correo de Resend).

Comportamiento:
- Validación zod idéntica en cliente y servidor (teléfono chileno `+56 9 XXXX XXXX`, acepta espacios o sin `+56`).
- **Honeypot** (`website`) y **rate limit** de 5 envíos / 10 min por IP (en memoria; para algo estricto usar Upstash/Vercel KV).
- Sin `RESEND_API_KEY`: en desarrollo el formulario responde OK y escribe los datos en la consola; en producción responde 503 con un mensaje amable.
- El correo llega con `reply-to` del cliente y un botón “Responder por WhatsApp”.

## 7. WhatsApp

- Número: `NEXT_PUBLIC_WHATSAPP_NUMBER` (formato `56962262519`, sin `+` ni espacios). Valor por defecto en `lib/site.ts`.
- `buildWhatsAppUrl(message)` en `lib/whatsapp.ts`. Mensajes pre-rellenados en `WA_MESSAGES` (general, flotante, diagnóstico, por servicio, por categoría) y `buildFormSummaryMessage()` tras enviar el formulario.
- Botón flotante global: se oculta cuando el footer es visible.

### WhatsApp Business Cloud API (opcional, desactivada)

`lib/whatsapp-cloud.ts` + `app/api/whatsapp/route.ts` permiten notificar a la empresa por WhatsApp cuando llega un formulario.

1. Meta for Developers → crea una app tipo Business → agrega el producto **WhatsApp**.
2. Obtén el **Phone number ID** y genera un **token permanente** (usuario del sistema en Business Manager).
3. Variables:
   ```
   WHATSAPP_NOTIFY_ENABLED=true
   WHATSAPP_TOKEN=EAAG...
   WHATSAPP_PHONE_NUMBER_ID=1234567890
   WHATSAPP_NOTIFY_TO=56962262519
   ```
4. Importante: fuera de la ventana de 24 h de conversación Meta solo permite **mensajes de plantilla** aprobados. Para producción crea una plantilla (ej. `nuevo_contacto_web`) y cambia el `body` en `sendWhatsAppNotification()` a `type: "template"`.

Sin credenciales, todo sigue funcionando: la notificación se omite silenciosamente.

## 8. Despliegue en Vercel

1. Sube el repo a GitHub/GitLab.
2. En Vercel: **Add New → Project** → importa el repo (framework detectado: Next.js).
3. En **Settings → Environment Variables** agrega las variables de `.env.example` (incluye `NEXT_PUBLIC_SITE_URL=https://www.seisac.cl`).
4. Deploy. Luego conecta el dominio en **Settings → Domains**.

`NEXT_PUBLIC_SITE_URL` se usa para canonical, sitemap, robots, Open Graph y JSON-LD.

## 9. SEO y accesibilidad incluidos

- Metadata por página, Open Graph generado (`app/opengraph-image.tsx`), favicon SVG del escudo, `sitemap.xml`, `robots.txt`, `lang="es-CL"`.
- JSON-LD `LocalBusiness` con servicios, teléfono, horario y área de servicio.
- Skip link, foco visible cyan, menú móvil con focus trap y cierre con Esc, carrusel accesible (pausa con hover/foco, botón de pausa, flechas de teclado), `prefers-reduced-motion` respetado.
