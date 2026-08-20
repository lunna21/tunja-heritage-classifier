import { afterEach, describe, expect, it, vi } from "vitest";
import { getHealth, listPatrimonios } from "./api";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("cliente de API", () => {
  it("consulta el healthcheck", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true, mensaje: "API funcionando" }), {
        status: 200,
        headers: { "content-type": "application/json" }
      })
    );

    await expect(getHealth()).resolves.toEqual({ ok: true, mensaje: "API funcionando" });
  });

  it("serializa filtros compatibles con el endpoint actual", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("[]", { status: 200, headers: { "content-type": "application/json" } })
    );

    await listPatrimonios({ tipologia: "Arquitectónico", estado_conservacion: "Bueno" });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3000/api/patrimonios?tipologia=Arquitect%C3%B3nico&estado_conservacion=Bueno",
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });

  it("convierte una falla de red en un error reconocible", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    await expect(getHealth()).rejects.toMatchObject({ isNetworkError: true });
  });
});
