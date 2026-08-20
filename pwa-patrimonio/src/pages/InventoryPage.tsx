import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LocationMap from "../components/LocationMap";
import { ConservationBadge } from "../components/StatusBadge";
import { usePatrimonios } from "../hooks/usePatrimonios";
import { ESTADO_OPTIONS, TIPOLOGIA_OPTIONS } from "../lib/catalogs";

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
);

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [tipologia, setTipologia] = useState("");
  const [estado, setEstado] = useState("");
  const { data: records = [], isPending, error, refetch } = usePatrimonios({ tipologia: tipologia || undefined, estado_conservacion: estado || undefined });

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return records;
    return records.filter((item) => [item.nombre, item.descripcion, item.ubicacion.direccion, item.tipologia].some((value) => value.toLowerCase().includes(normalized)));
  }, [records, search]);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Consulta interna</p>
          <h1>Inventario patrimonial</h1>
          <p>Busca y revisa las fichas que ya hacen parte de la memoria de Tunja.</p>
        </div>
        <Link className="button button-primary" to="/inventario/nuevo"><IconPlus /> Nueva ficha</Link>
      </div>

      <div className="filters-card">
        <label className="search-field">
          <span className="sr-only">Buscar en el inventario</span>
          <IconSearch />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Busca por nombre, lugar o palabra clave" />
        </label>
        <label className="compact-field">
          <span>Tipología</span>
          <select value={tipologia} onChange={(event) => setTipologia(event.target.value)}>
            <option value="">Todas</option>
            {TIPOLOGIA_OPTIONS.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label className="compact-field">
          <span>Conservación</span>
          <select value={estado} onChange={(event) => setEstado(event.target.value)}>
            <option value="">Todos</option>
            {ESTADO_OPTIONS.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>

      {error && (
        <div className="error-panel" role="alert">
          <strong>No pudimos cargar el inventario.</strong> {error instanceof Error ? error.message : "Intenta de nuevo."}
          <button className="button button-secondary button-small" type="button" onClick={() => void refetch()}>Intentar de nuevo</button>
        </div>
      )}

      <div className="inventory-meta">
        <span>{isPending ? "Cargando..." : filtered.length + " fichas visibles"}</span>
        <small>La API actual entrega máximo 100 registros por consulta.</small>
      </div>

      {!isPending && filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true"><IconSearch /></span>
          <h2>No encontramos coincidencias.</h2>
          <p>Prueba otra palabra o limpia los filtros para revisar todo el inventario.</p>
        </div>
      ) : (
        <div className="inventory-layout">
          <div className="record-grid">
            {filtered.map((item) => (
              <Link className="record-card" to={"/inventario/" + item._id} key={item._id}>
                <div className="record-card-top"><span className="record-type">{item.tipologia}</span><ConservationBadge value={item.estado_conservacion} /></div>
                <h2>{item.nombre}</h2>
                <p>{item.ubicacion.direccion}</p>
                <div className="record-card-footer">
                  <span>{item.inmaterial.existe ? "Incluye memoria viva" : "Bien material"}</span>
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
          <section className="map-card" aria-labelledby="map-title">
            <div className="section-heading compact"><div><p className="eyebrow">Territorio</p><h2 id="map-title">Dónde están</h2></div></div>
            <LocationMap items={filtered} height="440px" />
          </section>
        </div>
      )}
    </div>
  );
}
