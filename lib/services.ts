/**
 * FUENTE ÚNICA de servicios del sitio.
 * Se usa en: Home (resumen), /servicios (cards), formulario (select), footer y JSON-LD.
 *
 * Para agregar/editar un servicio, modifica solo este archivo.
 * `icon` es una clave del mapa en components/ui/Icon.tsx.
 */
import type { IconName } from "@/components/ui/Icon";

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  tags?: string[];
};

export type ServiceCategory = {
  id: "telecomunicaciones" | "seguridad" | "control-accesos";
  name: string;
  eyebrow: string;
  intro: string;
  icon: IconName;
  services: Service[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "telecomunicaciones",
    name: "Telecomunicaciones",
    eyebrow: "Redes y conectividad",
    // TODO: validar con cliente (texto redactado)
    intro:
      "Diseñamos e instalamos redes estables para tu hogar o negocio, desde un punto de acceso WiFi hasta enlaces de larga distancia en zonas rurales.",
    icon: "wifi",
    services: [
      {
        id: "puntos-acceso-wifi",
        name: "Instalación y configuración de puntos de acceso WiFi",
        // TODO: validar con cliente (descripción redactada)
        description:
          "Si tu WiFi no llega bien a todos los espacios, instalamos y configuramos puntos de acceso bien ubicados para que tengas señal estable donde la necesitas.",
        icon: "router",
        tags: ["WiFi", "Hogar y oficina"],
      },
      {
        id: "ampliacion-cobertura-wifi",
        name: "Ampliación de cobertura WiFi",
        // TODO: validar con cliente (descripción redactada)
        description:
          "Si hay zonas de tu casa, patio o local donde la señal se corta, extendemos la cobertura con los equipos adecuados para que te conectes sin interrupciones.",
        icon: "wifi",
        tags: ["WiFi", "Cobertura"],
      },
      {
        id: "enlaces-punto-a-punto",
        name: "Enlaces inalámbricos punto a punto",
        // TODO: validar con cliente (descripción redactada)
        description:
          "Si necesitas llevar internet a otra construcción, bodega o terreno sin tender cables, instalamos un enlace inalámbrico dedicado entre ambos puntos.",
        icon: "radioTower",
        tags: ["Larga distancia", "Rural"],
      },
      {
        id: "cableado-estructurado",
        name: "Tendido y certificación de cableado estructurado",
        description:
          "Si tienes problemas de conectividad en tus dispositivos pese a tener buena cobertura WiFi, solucionamos el inconveniente instalando cableado estructurado y certificando su buen funcionamiento.",
        icon: "cable",
        tags: ["Certificado"],
      },
      {
        id: "redes-zonas-rurales",
        name: "Diseño de redes para zonas rurales o alejadas",
        // TODO: validar con cliente (descripción redactada)
        description:
          "Si estás lejos de la ciudad, evaluamos tu terreno y diseñamos una red a la medida para que tengas conectividad confiable, aunque estés alejado.",
        icon: "mountain",
        tags: ["Rural", "Diseño a medida"],
      },
      {
        id: "antenas-satelitales",
        name: "Instalación de antenas satelitales",
        description:
          "Si vives en un lugar donde no hay cable operadores, contamos con la alternativa: conectamos tu hogar a internet mediante servicios satelitales, instalamos la antena y diseñamos la red interna de tu domicilio para conectar todo lo que necesitas.",
        icon: "satellite",
        tags: ["Satelital", "Rural"],
      },
      {
        id: "diagnostico-redes",
        name: "Diagnóstico y optimización de redes existentes",
        description:
          "Si tu servicio ya no funciona como antes o notas que es ineficiente, diagnosticamos la red actual de tu domicilio y vemos si requiere actualizar equipos o reemplazar cableado en malas condiciones.",
        icon: "gauge",
        tags: ["Diagnóstico", "Optimización"],
      },
    ],
  },
  {
    id: "seguridad",
    name: "Seguridad y videovigilancia",
    eyebrow: "Protección para tu espacio",
    // TODO: validar con cliente (texto redactado)
    intro:
      "Proyectamos e instalamos sistemas de cámaras y video porteros pensados para tu espacio, con acceso remoto desde tu celular.",
    icon: "cctv",
    services: [
      {
        id: "diseno-seguridad-camaras",
        name: "Diseño de seguridad para la instalación de cámaras",
        // TODO: validar con cliente (descripción redactada)
        description:
          "Antes de instalar, recorremos tu propiedad y definimos dónde ubicar cada cámara para cubrir accesos y puntos críticos sin dejar zonas ciegas.",
        icon: "shieldCheck",
        tags: ["Levantamiento", "Proyecto"],
      },
      {
        id: "camaras-ip-analogicas",
        name: "Instalación de cámaras IP y analógicas HD / 4K",
        // TODO: validar con cliente (descripción ampliada a partir de la base entregada)
        description:
          "Instalamos cámaras de interior, exterior, antivandálicas y con visión nocturna, en tecnología IP o analógica HD / 4K.",
        icon: "cctv",
        tags: ["4K", "Visión nocturna", "Antivandálicas"],
      },
      {
        id: "camaras-especializadas",
        name: "Cámaras especializadas",
        // TODO: validar con cliente (descripción ampliada a partir de la base entregada)
        description:
          "Para necesidades específicas instalamos cámaras PTZ, domo, con audio, reconocimiento facial o lectura de placas patentes.",
        icon: "scanFace",
        tags: ["PTZ", "Reconocimiento facial", "Lectura de patentes"],
      },
      {
        id: "video-porteros",
        name: "Video porteros",
        // TODO: validar con cliente (descripción redactada)
        description:
          "Ve y habla con quien está en tu puerta antes de abrir. Instalamos video porteros para casas, edificios y locales.",
        icon: "video",
        tags: ["Audio y video"],
      },
      {
        id: "mantenimiento-video-porteros",
        name: "Mantenimiento y reparación de video porteros",
        // TODO: validar con cliente (descripción redactada)
        description:
          "Si tu video portero no tiene imagen, no suena o dejó de abrir, lo revisamos y reparamos, o te recomendamos el reemplazo adecuado.",
        icon: "wrench",
        tags: ["Reparación"],
      },
    ],
  },
  {
    id: "control-accesos",
    name: "Control de accesos y automatización",
    eyebrow: "Accesos inteligentes",
    // TODO: validar con cliente (texto redactado)
    intro:
      "Controla quién entra y automatiza tus accesos con soluciones prácticas y seguras para tu hogar o negocio.",
    icon: "keyRound",
    services: [
      {
        id: "chapas-inteligentes",
        name: "Chapas inteligentes",
        // TODO: validar con cliente (descripción redactada)
        description:
          "Abre tu puerta con clave, huella o desde el celular. Instalamos y configuramos chapas inteligentes para que dejes de depender de las llaves.",
        icon: "lock",
        tags: ["Huella", "Clave", "App"],
      },
      {
        id: "portones-electricos",
        name: "Portones eléctricos",
        // TODO: validar con cliente (descripción redactada)
        description:
          "Automatizamos tu portón para que lo abras con control remoto de forma cómoda y segura, sin bajarte del auto.",
        icon: "doorOpen",
        tags: ["Automatización", "Control remoto"],
      },
    ],
  },
];

/** Las 5 áreas del banner corporativo (resumen en Home y banner de /servicios). */
export const SERVICE_AREAS: {
  title: string;
  icon: IconName;
  href: string;
  description: string;
}[] = [
  {
    title: "Redes y Telecomunicaciones",
    icon: "wifi",
    href: "/servicios#telecomunicaciones",
    description: "WiFi, enlaces punto a punto, cableado certificado y antenas satelitales.",
  },
  {
    title: "Cámaras de Seguridad",
    icon: "cctv",
    href: "/servicios#seguridad",
    description: "Cámaras IP y 4K, visión nocturna, cámaras especializadas y video porteros.",
  },
  {
    title: "Control de Accesos",
    icon: "keyRound",
    href: "/servicios#control-accesos",
    description: "Chapas inteligentes y portones eléctricos.",
  },
  {
    title: "Instalación, Configuración y Reparación",
    icon: "wrench",
    href: "/servicios#telecomunicaciones",
    description: "Dejamos todo funcionando y reparamos lo que ya tienes instalado.",
  },
  {
    title: "Servicio a Domicilio",
    icon: "truck",
    href: "/servicios#como-trabajamos",
    description: "Vamos a tu casa o negocio, también a zonas rurales y alejadas.",
  },
];

export const SERVICE_TYPE_OPTIONS = [
  "Telecomunicaciones",
  "Seguridad y videovigilancia",
  "Control de accesos y automatización",
  "Otro",
] as const;

export const ALL_SERVICES = SERVICE_CATEGORIES.flatMap((c) => c.services);
