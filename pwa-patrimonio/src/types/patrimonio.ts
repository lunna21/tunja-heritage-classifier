export type LocalDraftStatus = "draft" | "pending" | "review";
export type DraftMode = "create" | "update";

export interface GeoPoint {
  type: "Point";
  coordinates: [number, number];
}

export interface ImageReference {
  url: string;
}

export interface InmaterialData {
  existe: boolean;
  tipo: string;
  contenido: string;
}

export interface PatrimonioPayload {
  nombre: string;
  tipologia: string;
  periodo_historico: string;
  ubicacion: {
    direccion: string;
    coordenadas: GeoPoint;
  };
  descripcion: string;
  valor_patrimonial: string;
  estado_conservacion: string;
  inmaterial: InmaterialData;
  imagenes: ImageReference[];
  fuente: string;
  fecha_registro: string;
}

export interface PatrimonioResponse extends PatrimonioPayload {
  _id: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiErrorPayload {
  error: string;
  detalles?: string;
}

export interface LocalDraft {
  localId: string;
  mode: DraftMode;
  remoteId?: string;
  payload: PatrimonioPayload;
  status: LocalDraftStatus;
  updatedAt: string;
  lastError?: string;
}

export interface PatrimonioFilters {
  tipologia?: string;
  estado_conservacion?: string;
}

export interface PatrimonioFormValues {
  nombre: string;
  tipologia: string;
  periodo_historico: string;
  direccion: string;
  longitud: string;
  latitud: string;
  descripcion: string;
  valor_patrimonial: string;
  estado_conservacion: string;
  inmaterialExiste: boolean;
  inmaterialTipo: string;
  inmaterialContenido: string;
  fuente: string;
  fecha_registro: string;
  imagenes: string;
}
