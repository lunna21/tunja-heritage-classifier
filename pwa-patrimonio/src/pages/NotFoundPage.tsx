import { Link } from "react-router-dom";

const IconQuestion = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);

export default function NotFoundPage() {
  return (
    <div className="empty-state page-empty">
      <span className="empty-icon" aria-hidden="true"><IconQuestion /></span>
      <h1>Esta página no existe.</h1>
      <p>Regresa al inicio para continuar con tu inventario.</p>
      <Link className="button button-primary" to="/">Volver al inicio</Link>
    </div>
  );
}
