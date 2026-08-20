import { Link, useParams } from "react-router-dom";
import { usePatrimonio } from "../hooks/usePatrimonios";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import LocationMap from "../components/LocationMap";
import { ConservationBadge } from "../components/StatusBadge";
import type { PatrimonioResponse } from "../types/patrimonio";

const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
);
const IconEdit = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
);

function formatDate(value?: string): string {
  if (!value) return "Sin fecha";
  return new Date(value).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
}

function DetailField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="detail-field">
      <dt>{label}</dt>
      <dd>{value || "No registrado"}</dd>
    </div>
  );
}

function Coordinates({ record }: { record: PatrimonioResponse }) {
  const [longitude, latitude] = record.ubicacion.coordenadas.coordinates;
  return <span>{latitude.toFixed(6)}, {longitude.toFixed(6)}</span>;
}

export default function PatrimonioDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: record, isPending, error } = usePatrimonio(id);
  const isOnline = useOnlineStatus();

  if (isPending) return <div className="loading-state"><span className="loading-spinner" /> Cargando la ficha…</div>;
  if (!record || error) {
    return <div className="error-panel page-error" role="alert">No encontramos esta ficha. <Link className="text-link" to="/inventario">Volver al inventario</Link></div>;
  }

  return (
    <div className="page detail-page">
      <div className="page-heading">
        <div>
          <Link className="back-link" to="/inventario"><IconArrowLeft /> Volver al inventario</Link>
          <p className="eyebrow">{record.tipologia}</p>
          <h1>{record.nombre}</h1>
          <p>{record.ubicacion.direccion}</p>
        </div>
        <div className="heading-actions">
          {!isOnline && <span className="local-note">Vista guardada en este dispositivo</span>}
          <Link className="button button-secondary" to={"/inventario/" + record._id + "/editar"}><IconEdit /> Editar ficha</Link>
        </div>
      </div>

      <div className="detail-grid">
        <article className="detail-main">
          <div className="detail-card">
            <div className="detail-card-header"><h2>La historia del registro</h2><ConservationBadge value={record.estado_conservacion} /></div>
            <p className="detail-description">{record.descripcion}</p>
            <div className="detail-value"><span className="detail-label">¿Por qué importa?</span><p>{record.valor_patrimonial}</p></div>
          </div>

          {record.inmaterial.existe && (
            <div className="detail-card memory-card">
              <p className="eyebrow">Memoria viva</p>
              <h2>{record.inmaterial.tipo}</h2>
              <p>{record.inmaterial.contenido}</p>
            </div>
          )}

          <div className="detail-card">
            <div className="detail-card-header"><h2>Ubicación</h2></div>
            <p>{record.ubicacion.direccion}</p>
            <p className="muted-text"><Coordinates record={record} /></p>
            <LocationMap items={[record]} height="280px" />
          </div>
        </article>

        <aside className="detail-aside">
          <div className="detail-card">
            <h2>Datos de la ficha</h2>
            <dl className="detail-list">
              <DetailField label="Periodo histórico" value={record.periodo_historico} />
              <DetailField label="Estado" value={record.estado_conservacion} />
              <DetailField label="Fecha de registro" value={formatDate(record.fecha_registro)} />
              <DetailField label="Fuente" value={record.fuente} />
            </dl>
          </div>
          {record.imagenes.length > 0 && (
            <div className="detail-card">
              <h2>Imágenes de referencia</h2>
              <div className="image-list">
                {record.imagenes.map((image) => <a href={image.url} target="_blank" rel="noreferrer" key={image.url}>Abrir imagen ↗</a>)}
              </div>
            </div>
          )}
          <div className="legal-callout compact-callout">
            <strong>Registro preliminar</strong>
            <p>Esta ficha no constituye una declaratoria oficial ni reemplaza la valoración de la autoridad competente.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
