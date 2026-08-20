export const TIPOLOGIA_OPTIONS = [
  {
    value: "Arquitectónico",
    label: "Arquitectónico",
    hint: "Edificaciones, templos, casas, plazas o conjuntos construidos."
  },
  {
    value: "Urbanístico",
    label: "Urbanístico",
    hint: "Calles, sectores, trazados o espacios públicos con valor cultural."
  },
  {
    value: "Mueble",
    label: "Bien mueble",
    hint: "Objetos, piezas artísticas, documentos u obras que pueden trasladarse."
  },
  {
    value: "Paisaje cultural",
    label: "Paisaje cultural",
    hint: "Territorios donde se relacionan valores naturales, históricos y sociales."
  },
  {
    value: "Patrimonio inmaterial",
    label: "Manifestación inmaterial",
    hint: "Saberes, prácticas, expresiones, rituales, fiestas o técnicas vivas."
  },
  {
    value: "Otra",
    label: "Otra tipología",
    hint: "Usa esta opción cuando ninguna categoría describe bien el caso."
  }
] as const;

export const ESTADO_OPTIONS = [
  { value: "Bueno", label: "Bueno" },
  { value: "Regular", label: "Regular" },
  { value: "Malo", label: "Malo" },
  { value: "En riesgo", label: "En riesgo" },
  { value: "No determinado", label: "Todavía no lo sé" }
] as const;

export const PCI_OPTIONS = [
  "Tradiciones y expresiones orales",
  "Artes del espectáculo",
  "Usos sociales, rituales y actos festivos",
  "Conocimientos relacionados con la naturaleza y el universo",
  "Técnicas artesanales tradicionales",
  "Otra manifestación"
] as const;

export const PERIOD_OPTIONS = [
  "Prehispánico",
  "Colonial",
  "Republicano",
  "Siglo XIX",
  "Siglo XX",
  "Siglo XVIII",
  "Siglo XXI",
  "Contemporáneo",
  "No determinado"
] as const;
