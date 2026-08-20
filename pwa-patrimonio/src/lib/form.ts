import { z } from "zod";
import { ESTADO_OPTIONS, PERIOD_OPTIONS, TIPOLOGIA_OPTIONS } from "./catalogs";
import type { PatrimonioFormValues, PatrimonioPayload, PatrimonioResponse } from "../types/patrimonio";

const coordinate = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(1, `Escribe la ${label}.`)
    .refine((value) => {
      const number = Number(value);
      return Number.isFinite(number) && number >= min && number <= max;
    }, `La ${label} debe estar entre ${min} y ${max}.`);

const catalogValue = (options: readonly string[], message: string) =>
  z
    .string()
    .trim()
    .min(1, message)
    .refine((value) => options.includes(value), message);

function isValidDateInput(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export const patrimonioFormSchema = z
  .object({
    nombre: z.string().trim().min(2, "Escribe el nombre del bien o manifestación."),
    tipologia: catalogValue(TIPOLOGIA_OPTIONS.map((option) => option.value), "Selecciona una tipología válida."),
    periodo_historico: catalogValue([...PERIOD_OPTIONS], "Selecciona un periodo histórico válido."),
    direccion: z.string().trim().min(3, "Escribe una dirección o referencia del lugar."),
    longitud: coordinate("longitud", -180, 180),
    latitud: coordinate("latitud", -90, 90),
    descripcion: z.string().trim().min(20, "Cuéntanos un poco más: usa al menos 20 caracteres."),
    valor_patrimonial: z.string().trim().min(10, "Describe por qué es importante para la comunidad."),
    estado_conservacion: catalogValue([...ESTADO_OPTIONS.map((option) => option.value)], "Selecciona un estado de conservación válido."),
    inmaterialExiste: z.boolean(),
    inmaterialTipo: z.string().trim(),
    inmaterialContenido: z.string().trim(),
    fuente: z.string().trim().min(3, "Indica la fuente de la información."),
    fecha_registro: z
      .string()
      .trim()
      .min(1, "Indica la fecha del registro.")
      .refine(isValidDateInput, "La fecha del registro no es válida."),
    imagenes: z.string().trim()
  })
  .superRefine((value, context) => {
    if (value.inmaterialExiste && value.inmaterialTipo.length < 3) {
      context.addIssue({
        code: "custom",
        path: ["inmaterialTipo"],
        message: "Selecciona el tipo de manifestación inmaterial."
      });
    }

    if (value.inmaterialExiste && value.inmaterialContenido.length < 10) {
      context.addIssue({
        code: "custom",
        path: ["inmaterialContenido"],
        message: "Describe brevemente la manifestación y quiénes la mantienen viva."
      });
    }

    const invalidImage = splitImageUrls(value.imagenes).find((url) => !isHttpsUrl(url));
    if (invalidImage) {
      context.addIssue({
        code: "custom",
        path: ["imagenes"],
        message: "Cada imagen debe ser una URL HTTPS válida."
      });
    }
  });

export function splitImageUrls(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((url) => url.trim())
    .filter(Boolean);
}

export function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function formValuesToPayload(values: PatrimonioFormValues): PatrimonioPayload {
  const date = new Date(`${values.fecha_registro}T12:00:00`);
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;

  return {
    nombre: values.nombre.trim(),
    tipologia: values.tipologia.trim(),
    periodo_historico: values.periodo_historico.trim(),
    ubicacion: {
      direccion: values.direccion.trim(),
      coordenadas: {
        type: "Point",
        coordinates: [Number(values.longitud), Number(values.latitud)]
      }
    },
    descripcion: values.descripcion.trim(),
    valor_patrimonial: values.valor_patrimonial.trim(),
    estado_conservacion: values.estado_conservacion.trim(),
    inmaterial: {
      existe: values.inmaterialExiste,
      tipo: values.inmaterialExiste ? values.inmaterialTipo.trim() : "",
      contenido: values.inmaterialExiste ? values.inmaterialContenido.trim() : ""
    },
    imagenes: splitImageUrls(values.imagenes).map((url) => ({ url })),
    fuente: values.fuente.trim(),
    fecha_registro: safeDate.toISOString()
  };
}

function dateToInputValue(value?: string): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  return value.slice(0, 10);
}

export function payloadToFormValues(payload?: PatrimonioPayload | PatrimonioResponse): PatrimonioFormValues {
  return {
    nombre: payload?.nombre ?? "",
    tipologia: payload?.tipologia ?? "",
    periodo_historico: payload?.periodo_historico ?? "",
    direccion: payload?.ubicacion.direccion ?? "",
    longitud: payload ? String(payload.ubicacion.coordenadas.coordinates[0]) : "",
    latitud: payload ? String(payload.ubicacion.coordenadas.coordinates[1]) : "",
    descripcion: payload?.descripcion ?? "",
    valor_patrimonial: payload?.valor_patrimonial ?? "",
    estado_conservacion: payload?.estado_conservacion ?? "",
    inmaterialExiste: payload?.inmaterial.existe ?? false,
    inmaterialTipo: payload?.inmaterial.tipo ?? "",
    inmaterialContenido: payload?.inmaterial.contenido ?? "",
    fuente: payload?.fuente ?? "",
    fecha_registro: dateToInputValue(payload?.fecha_registro),
    imagenes: payload?.imagenes.map((image) => image.url).join("\n") ?? ""
  };
}
