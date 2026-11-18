/**
 * Comunas / ciudades del selector del formulario de contacto, agrupadas por región
 * (de norte a sur). Edita esta lista libremente.
 */
export const DEFAULT_CITY = "Santiago";
export const OTHER_CITY = "Otra comuna";

export const CITY_GROUPS: { region: string; cities: string[] }[] = [
  { region: "Arica y Parinacota", cities: ["Arica"] },
  { region: "Tarapacá", cities: ["Iquique", "Alto Hospicio"] },
  { region: "Antofagasta", cities: ["Antofagasta", "Calama"] },
  { region: "Atacama", cities: ["Copiapó", "Vallenar"] },
  { region: "Coquimbo", cities: ["La Serena", "Coquimbo", "Ovalle"] },
  {
    region: "Valparaíso",
    cities: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Quillota", "San Antonio", "Los Andes"],
  },
  {
    region: "Metropolitana",
    cities: [
      "Santiago",
      "Puente Alto",
      "Maipú",
      "La Florida",
      "Las Condes",
      "Providencia",
      "Ñuñoa",
      "Peñalolén",
      "San Bernardo",
      "Pudahuel",
      "Quilicura",
      "Colina",
      "Lampa",
      "Buin",
      "Paine",
      "Talagante",
      "Melipilla",
    ],
  },
  { region: "O'Higgins", cities: ["Rancagua", "San Fernando", "Rengo", "Santa Cruz", "Pichilemu"] },
  { region: "Maule", cities: ["Talca", "Curicó", "Linares", "Constitución", "Cauquenes"] },
  { region: "Ñuble", cities: ["Chillán", "Chillán Viejo", "San Carlos"] },
  {
    region: "Biobío",
    cities: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Coronel", "Los Ángeles"],
  },
  { region: "La Araucanía", cities: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol"] },
  { region: "Los Ríos", cities: ["Valdivia", "La Unión"] },
  { region: "Los Lagos", cities: ["Puerto Montt", "Puerto Varas", "Osorno", "Castro", "Ancud"] },
  { region: "Aysén", cities: ["Coyhaique", "Puerto Aysén"] },
  { region: "Magallanes", cities: ["Punta Arenas", "Puerto Natales"] },
];
