import { useOnlineStatus } from "../hooks/useOnlineStatus";

const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconWifiOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.65"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/><path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/><path d="M5 13a10 10 0 0 1 5.24-2.76"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
);

export default function ConnectionBanner() {
  const isOnline = useOnlineStatus();
  return (
    <div className={isOnline ? "connection-card online" : "connection-card offline"} role="status">
      <span className="connection-icon" aria-hidden="true">{isOnline ? <IconCheck /> : <IconWifiOff />}</span>
      <div>
        <strong>{isOnline ? "Conexión disponible" : "Captura sin conexión activa"}</strong>
        <p>
          {isOnline
            ? "Los registros nuevos se guardan en la API y también quedan disponibles localmente."
            : "Tus fichas se conservarán en este dispositivo hasta que puedas sincronizarlas."}
        </p>
      </div>
    </div>
  );
}
