import { NavLink, Outlet, Link } from "react-router-dom";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { useQuery } from "@tanstack/react-query";
import { listDrafts } from "../lib/storage";

function navClass({ isActive }: { isActive: boolean }): string {
  return isActive ? "nav-link nav-link-active" : "nav-link";
}

/* ── Inline SVG Icons ────────────────────────────────── */
const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21V12h6v9"/></svg>
);
const IconArchive = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="5" rx="1"/><path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/><path d="M10 13h4"/></svg>
);
const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
);
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
);
const IconBrandMark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/><path d="M10 10h.01"/><path d="M14 10h.01"/></svg>
);

export default function Layout() {
  const isOnline = useOnlineStatus();
  const { data: drafts = [] } = useQuery({
    queryKey: ["drafts"],
    queryFn: listDrafts
  });

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" to="/">
            <span className="brand-mark" aria-hidden="true"><IconBrandMark /></span>
            <span>
              <strong>Patrimonio de Tunja</strong>
              <small>Inventario preliminar interno</small>
            </span>
          </Link>
          <div className={isOnline ? "connection-chip connection-online" : "connection-chip connection-offline"} role="status">
            <span className="status-dot" aria-hidden="true" />
            {isOnline ? "Conectado" : "Sin conexión"}
          </div>
        </div>
      </header>

      <div className="shell-body">
        <aside className="sidebar" aria-label="Navegación principal">
          <nav className="nav-list">
            <NavLink className={navClass} to="/" end>
              <IconHome /> Inicio
            </NavLink>
            <NavLink className={navClass} to="/inventario">
              <IconArchive /> Inventario
            </NavLink>
            <NavLink className={navClass} to="/inventario/nuevo">
              <IconPlus /> Nueva ficha
            </NavLink>
            <NavLink className={navClass} to="/borradores">
              <IconClock /> Borradores
              {drafts.length > 0 && <span className="nav-count">{drafts.length}</span>}
            </NavLink>
          </nav>

        </aside>

        <main className="main-content">
          {!isOnline && (
            <div className="offline-banner" role="alert">
              <strong>Estás trabajando sin conexión.</strong> Puedes guardar borradores; se sincronizarán cuando vuelva Internet.
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
