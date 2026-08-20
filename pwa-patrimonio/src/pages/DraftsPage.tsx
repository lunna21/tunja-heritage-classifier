import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DraftStatusBadge } from "../components/StatusBadge";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { deleteDraft, listDrafts } from "../lib/storage";
import { syncPendingDrafts } from "../lib/sync";

const IconSync = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3"/><path d="M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
);
const IconClock = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
);

function formatDate(value: string): string {
  return new Date(value).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });
}

export default function DraftsPage() {
  const isOnline = useOnlineStatus();
  const queryClient = useQueryClient();
  const { data: drafts = [], isPending } = useQuery({ queryKey: ["drafts"], queryFn: listDrafts });
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSync(): Promise<void> {
    setSyncing(true);
    setMessage("");
    const result = await syncPendingDrafts();
    setMessage(result.attempted === 0 ? "No hay fichas pendientes de sincronizar." : result.synced + " ficha(s) sincronizada(s).");
    await queryClient.invalidateQueries({ queryKey: ["drafts"] });
    await queryClient.invalidateQueries({ queryKey: ["patrimonios"] });
    setSyncing(false);
  }

  async function handleDelete(localId: string): Promise<void> {
    if (!window.confirm("¿Eliminar este borrador guardado solo en este dispositivo?")) return;
    await deleteDraft(localId);
    await queryClient.invalidateQueries({ queryKey: ["drafts"] });
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Trabajo en curso</p>
          <h1>Borradores locales</h1>
          <p>Estas fichas todavía viven en este dispositivo y no hacen parte de la API hasta sincronizarlas.</p>
        </div>
        <button className="button button-primary" type="button" onClick={() => void handleSync()} disabled={!isOnline || syncing}>
          {syncing ? "Sincronizando..." : <><IconSync /> Sincronizar ahora</>}
        </button>
      </div>

      {message && <div className="success-message" role="status">{message}</div>}
      {!isOnline && <div className="info-panel">Conéctate a Internet para enviar los registros pendientes.</div>}

      {isPending ? (
        <div className="loading-state"><span className="loading-spinner" /> Revisando el dispositivo…</div>
      ) : drafts.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true"><IconClock /></span>
          <h2>No tienes borradores locales.</h2>
          <p>Cuando una ficha quede a medias o estés sin conexión, aparecerá aquí.</p>
          <Link className="button button-primary" to="/inventario/nuevo">Crear una ficha</Link>
        </div>
      ) : (
        <div className="draft-list">
          {drafts.map((draft) => (
            <article className="draft-card" key={draft.localId}>
              <div className="draft-card-content">
                <div className="record-card-top"><DraftStatusBadge status={draft.status} /><span className="draft-mode">{draft.mode === "create" ? "Nueva ficha" : "Edición"}</span></div>
                <h2>{draft.payload.nombre || "Ficha sin nombre todavía"}</h2>
                <p>{draft.payload.ubicacion.direccion || "Sin ubicación registrada"}</p>
                <small>Guardado {formatDate(draft.updatedAt)}</small>
                {draft.lastError && <p className="draft-error"><strong>Motivo:</strong> {draft.lastError}</p>}
              </div>
              <div className="draft-actions">
                <Link className="button button-secondary button-small" to={draft.mode === "update" && draft.remoteId ? "/inventario/" + draft.remoteId + "/editar?draft=" + draft.localId : "/inventario/nuevo?draft=" + draft.localId}>Continuar</Link>
                <button className="button button-ghost button-small danger-text" type="button" onClick={() => void handleDelete(draft.localId)}>Eliminar local</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
