import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PatrimonioForm from "../components/PatrimonioForm";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { ApiRequestError, createPatrimonio, updatePatrimonio } from "../lib/api";
import { makeDraft } from "../lib/sync";
import { deleteDraft, getDraft, saveDraft } from "../lib/storage";
import { usePatrimonio } from "../hooks/usePatrimonios";
import type { PatrimonioPayload } from "../types/patrimonio";

const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
);

export default function NewPatrimonioPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draft") ?? undefined;
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isOnline = useOnlineStatus();
  const [submitError, setSubmitError] = useState("");
  const recordQuery = usePatrimonio(id ?? "");
  const draftQuery = useQuery({
    queryKey: ["draft", draftId],
    queryFn: () => getDraft(draftId as string),
    enabled: Boolean(draftId)
  });

  const initialPayload = useMemo(() => draftQuery.data?.payload ?? recordQuery.data, [draftQuery.data, recordQuery.data]);
  const isLoading = (isEditing && recordQuery.isPending) || (Boolean(draftId) && draftQuery.isPending);

  if (isLoading) {
    return <div className="loading-state"><span className="loading-spinner" /> Cargando la ficha…</div>;
  }

  if (isEditing && !initialPayload && recordQuery.error) {
    return (
      <div className="error-panel page-error" role="alert">
        No encontramos esta ficha. <Link className="text-link" to="/inventario">Volver al inventario</Link>
      </div>
    );
  }

  async function persistLocal(payload: PatrimonioPayload, status: "draft" | "pending"): Promise<void> {
    const saved = makeDraft(payload, {
      mode: isEditing ? "update" : "create",
      remoteId: id,
      status
    });
    await saveDraft(draftId && draftQuery.data ? { ...saved, localId: draftId } : saved);
  }

  async function handleDraft(payload: PatrimonioPayload): Promise<void> {
    await persistLocal(payload, "draft");
  }

  async function handleSubmit(payload: PatrimonioPayload): Promise<void> {
    setSubmitError("");
    if (!isOnline) {
      await persistLocal(payload, "pending");
      navigate("/borradores");
      return;
    }

    try {
      const response = isEditing && id ? await updatePatrimonio(id, payload) : await createPatrimonio(payload);
      if (draftId) await deleteDraft(draftId);
      await queryClient.invalidateQueries({ queryKey: ["patrimonios"] });
      await queryClient.invalidateQueries({ queryKey: ["patrimonio", response._id] });
      navigate("/inventario/" + response._id);
    } catch (error) {
      if (error instanceof ApiRequestError && error.isNetworkError) {
        await persistLocal(payload, "pending");
        navigate("/borradores");
        return;
      }
      setSubmitError(error instanceof Error ? error.message : "No se pudo guardar la ficha.");
    }
  }

  return (
    <div className="page">
      <div className="page-heading form-page-heading">
        <div>
          <Link className="back-link" to={isEditing ? "/inventario/" + id : "/inventario"}><IconArrowLeft /> Volver</Link>
          <p className="eyebrow">{isEditing ? "Actualizar registro" : "Nueva ficha"}</p>
          <h1>{isEditing ? "Completa la memoria de este registro" : "Cuenta una historia del territorio"}</h1>
          <p>Avanza a tu ritmo. Puedes guardar un borrador y retomarlo después.</p>
        </div>
      </div>
      {submitError && <div className="error-panel" role="alert"><strong>No pudimos guardar la ficha.</strong> {submitError}</div>}
      {draftId && <div className="info-panel">Estás editando un borrador local. Tus cambios todavía no reemplazan el registro de la API.</div>}
      <PatrimonioForm initialPayload={initialPayload} editing={isEditing} onSubmit={handleSubmit} onSaveDraft={handleDraft} />
    </div>
  );
}
