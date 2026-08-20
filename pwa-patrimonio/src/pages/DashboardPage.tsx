import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ConnectionBanner from "../components/ConnectionBanner";
import RecordImagePreview from "../components/RecordImagePreview";
import { ConservationBadge } from "../components/StatusBadge";
import { usePatrimonios } from "../hooks/usePatrimonios";
import { getHealth } from "../lib/api";
import { listDrafts } from "../lib/storage";

/* ── Inline SVG Icons ────────────────────────────────── */
const IconGrid = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IconHeart = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.5-1.5 3-3.5 3-6 0-3-2-5-5-5-2 0-3.5 1-5 3C10.5 4 9 3 7 3 4 3 2 5 2 8c0 2.5 1.5 4.5 3 6l7 7z" />
  </svg>
);
const IconAlert = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconDraft = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const IconStar = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

function formatDate(value?: string): string {
  if (!value) return "Sin fecha";
  return new Date(value).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function DashboardPage() {
  const { data: patrimonios = [], isPending, error } = usePatrimonios();
  const { data: drafts = [] } = useQuery({
    queryKey: ["drafts"],
    queryFn: listDrafts,
  });
  const health = useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
    staleTime: 60_000,
  });
  const inRisk = patrimonios.filter(
    (item) => item.estado_conservacion === "En riesgo",
  ).length;
  const inmaterial = patrimonios.filter(
    (item) => item.inmaterial.existe,
  ).length;

  return (
    <div className="page">
      <div className="hero">
        <div>
          <h1>Patrimonio Cultural de Tunja</h1>
          <div className="hero-actions">
            <Link className="button button-primary" to="/inventario/nuevo">
              Crear nueva ficha
            </Link>
            <Link className="button button-secondary" to="/inventario">
              Explorar inventario
            </Link>
          </div>
        </div>

        <div className="hero-illustration" aria-hidden="true">
          <img
            className="hero-image"
            src="/Banner.png"
            alt=""
          />
          {/* <span className="illustration-sun" />
          <span className="illustration-building">
            <IconBuildingHero />
          </span>
          <span className="illustration-line" /> */}
        </div>
      </div>

      <ConnectionBanner />

      <section className="section-block" aria-labelledby="summary-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Panorama</p>
            <h2 id="summary-title">Tu inventario hasta ahora</h2>
          </div>
          <span className="api-status">
            <span
              className={
                health.data?.ok
                  ? "status-dot status-good"
                  : "status-dot status-muted"
              }
              aria-hidden="true"
            />
            {health.data?.ok ? "API disponible" : "Esperando API"}
          </span>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">
              <IconGrid />
            </span>
            <strong>{isPending ? "…" : patrimonios.length}</strong>
            <span>Fichas cargadas</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">
              <IconHeart />
            </span>
            <strong>{inmaterial}</strong>
            <span>Con memoria viva</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">
              <IconAlert />
            </span>
            <strong>{inRisk}</strong>
            <span>En riesgo</span>
          </div>
          <div className="stat-card stat-card-accent">
            <span className="stat-icon">
              <IconDraft />
            </span>
            <strong>{drafts.length}</strong>
            <span>Borradores locales</span>
          </div>
        </div>
      </section>

      {error && (
        <div className="error-panel" role="alert">
          No pudimos consultar la API. Si estás sin conexión, revisa los
          registros guardados localmente.
        </div>
      )}

      <section className="section-block" aria-labelledby="recent-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Últimas fichas</p>
            <h2 id="recent-title">Registros recientes</h2>
          </div>
          <Link className="text-link" to="/inventario">
            Ver inventario completo →
          </Link>
        </div>
        {patrimonios.length === 0 && !isPending ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">
              <IconStar />
            </span>
            <h3>El inventario está esperando tu primera historia.</h3>
            <p>
              Empieza con un lugar, objeto o práctica que la comunidad quiera
              conservar.
            </p>
            <Link className="button button-primary" to="/inventario/nuevo">
              Crear primera ficha
            </Link>
          </div>
        ) : (
          <div className="record-grid">
            {patrimonios.slice(0, 4).map((item) => (
              <Link
                className="record-card"
                to={"/inventario/" + item._id}
                key={item._id}
              >
                <RecordImagePreview name={item.nombre} images={item.imagenes} />
                <div className="record-card-top">
                  <span className="record-type">{item.tipologia}</span>
                  <ConservationBadge value={item.estado_conservacion} />
                </div>
                <h3>{item.nombre}</h3>
                <p>{item.ubicacion.direccion}</p>
                <small>{formatDate(item.fecha_registro)}</small>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
