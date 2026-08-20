import { describe, expect, it } from "vitest";
import { formValuesToPayload, isHttpsUrl, patrimonioFormSchema, splitImageUrls } from "./form";
import type { PatrimonioFormValues } from "../types/patrimonio";

const validValues: PatrimonioFormValues = {
  nombre: "Casa del Fundador",
  tipologia: "Arquitectónico",
  periodo_historico: "Colonial",
  direccion: "Carrera 9 junto a la Plaza de Bolívar",
  longitud: "-73.362",
  latitud: "5.535",
  descripcion: "Edificación reconocida por la comunidad como parte de la memoria de Tunja.",
  valor_patrimonial: "Tiene valor histórico, social y arquitectónico para la comunidad.",
  estado_conservacion: "Bueno",
  inmaterialExiste: false,
  inmaterialTipo: "",
  inmaterialContenido: "",
  fuente: "Observación de campo y conversación comunitaria",
  fecha_registro: "2026-08-19",
  imagenes: "https://example.com/casa.jpg"
};

describe("ficha patrimonial", () => {
  it("acepta una ficha completa y conserva el orden GeoJSON", () => {
    const result = patrimonioFormSchema.safeParse(validValues);
    expect(result.success).toBe(true);

    const payload = formValuesToPayload(validValues);
    expect(payload.ubicacion.coordenadas.coordinates).toEqual([-73.362, 5.535]);
    expect(payload.imagenes).toEqual([{ url: "https://example.com/casa.jpg" }]);
    expect(payload.fecha_registro).toContain("2026-08-19");
  });

  it("rechaza coordenadas fuera de rango e imágenes no HTTPS", () => {
    const result = patrimonioFormSchema.safeParse({
      ...validValues,
      longitud: "-181",
      imagenes: "http://example.com/casa.jpg"
    });
    expect(result.success).toBe(false);
    expect(isHttpsUrl("http://example.com/casa.jpg")).toBe(false);
  });

  it("rechaza fechas imposibles y valores fuera de los catálogos", () => {
    const result = patrimonioFormSchema.safeParse({
      ...validValues,
      fecha_registro: "2026-02-30",
      estado_conservacion: "Excelente"
    });
    expect(result.success).toBe(false);
  });

  it("exige los campos de patrimonio inmaterial cuando se activa la opción", () => {
    const result = patrimonioFormSchema.safeParse({
      ...validValues,
      inmaterialExiste: true,
      inmaterialTipo: "",
      inmaterialContenido: ""
    });
    expect(result.success).toBe(false);
  });

  it("separa enlaces escritos por línea o coma", () => {
    expect(splitImageUrls("https://a.test/1.jpg" + String.fromCharCode(10) + " https://b.test/2.jpg,https://c.test/3.jpg")).toEqual([
      "https://a.test/1.jpg",
      "https://b.test/2.jpg",
      "https://c.test/3.jpg"
    ]);
  });
});
