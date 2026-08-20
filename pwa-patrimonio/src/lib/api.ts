import type {
  ApiErrorPayload,
  PatrimonioFilters,
  PatrimonioPayload,
  PatrimonioResponse
} from "../types/patrimonio";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

export class ApiRequestError extends Error {
  readonly status?: number;
  readonly details?: string;
  readonly isNetworkError: boolean;

  constructor(message: string, options: { status?: number; details?: string; isNetworkError?: boolean } = {}) {
    super(message);
    this.name = "ApiRequestError";
    this.status = options.status;
    this.details = options.details;
    this.isNetworkError = options.isNetworkError ?? false;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...init?.headers
      }
    });
  } catch {
    throw new ApiRequestError("No fue posible conectarse con la API.", { isNetworkError: true });
  }

  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json") ? ((await response.json()) as unknown) : undefined;

  if (!response.ok) {
    const errorBody = (body ?? {}) as Partial<ApiErrorPayload>;
    throw new ApiRequestError(errorBody.error || "La API rechazó la solicitud.", {
      status: response.status,
      details: errorBody.detalles
    });
  }

  return body as T;
}

export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

export function getHealth(): Promise<{ ok: boolean; mensaje: string }> {
  return request("/api/health");
}

export function listPatrimonios(filters: PatrimonioFilters = {}): Promise<PatrimonioResponse[]> {
  const params = new URLSearchParams();
  if (filters.tipologia) params.set("tipologia", filters.tipologia);
  if (filters.estado_conservacion) params.set("estado_conservacion", filters.estado_conservacion);
  const query = params.toString();
  return request(`/api/patrimonios${query ? `?${query}` : ""}`);
}

export function getPatrimonio(id: string): Promise<PatrimonioResponse> {
  return request(`/api/patrimonios/${encodeURIComponent(id)}`);
}

export function createPatrimonio(payload: PatrimonioPayload): Promise<PatrimonioResponse> {
  return request("/api/patrimonios", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function updatePatrimonio(id: string, payload: PatrimonioPayload): Promise<PatrimonioResponse> {
  return request(`/api/patrimonios/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}
