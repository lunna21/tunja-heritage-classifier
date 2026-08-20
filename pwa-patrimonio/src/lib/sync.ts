import { createPatrimonio, updatePatrimonio } from "./api";
import { cachePatrimonios, deleteDraft, listDrafts, saveDraft } from "./storage";
import type { LocalDraft, PatrimonioResponse } from "../types/patrimonio";

export interface SyncResult {
  attempted: number;
  synced: number;
  needsReview: number;
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "No fue posible sincronizar este registro.";
}

export async function syncPendingDrafts(): Promise<SyncResult> {
  const drafts = (await listDrafts()).filter((draft) => draft.status === "pending");
  const result: SyncResult = { attempted: drafts.length, synced: 0, needsReview: 0 };

  for (const draft of drafts) {
    try {
      let response: PatrimonioResponse;
      if (draft.mode === "update" && draft.remoteId) {
        response = await updatePatrimonio(draft.remoteId, draft.payload);
      } else if (draft.mode === "create") {
        response = await createPatrimonio(draft.payload);
      } else {
        throw new Error("El borrador no tiene un identificador remoto para actualizar.");
      }

      await cachePatrimonios([response]);
      await deleteDraft(draft.localId);
      result.synced += 1;
    } catch (error) {
      await saveDraft({
        ...draft,
        status: "review",
        updatedAt: new Date().toISOString(),
        lastError: errorMessage(error)
      });
      result.needsReview += 1;
    }
  }

  return result;
}

export function makeDraft(
  payload: LocalDraft["payload"],
  options: Pick<LocalDraft, "mode" | "remoteId" | "status">
): LocalDraft {
  return {
    localId: crypto.randomUUID(),
    payload,
    mode: options.mode,
    remoteId: options.remoteId,
    status: options.status,
    updatedAt: new Date().toISOString()
  };
}
