import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { LocalDraft, PatrimonioFilters, PatrimonioResponse } from "../types/patrimonio";

interface PatrimonioDatabase extends DBSchema {
  drafts: {
    key: string;
    value: LocalDraft;
    indexes: {
      "by-status": string;
      "by-updated-at": string;
    };
  };
  patrimonios: {
    key: string;
    value: PatrimonioResponse;
    indexes: {
      "by-updated-at": string;
    };
  };
}

const DATABASE_NAME = "patrimonio-tunja-pwa";
const DATABASE_VERSION = 1;

let databasePromise: Promise<IDBPDatabase<PatrimonioDatabase>> | undefined;

function getDatabase(): Promise<IDBPDatabase<PatrimonioDatabase>> {
  databasePromise ??= openDB<PatrimonioDatabase>(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
      const drafts = database.createObjectStore("drafts", { keyPath: "localId" });
      drafts.createIndex("by-status", "status");
      drafts.createIndex("by-updated-at", "updatedAt");

      const patrimonios = database.createObjectStore("patrimonios", { keyPath: "_id" });
      patrimonios.createIndex("by-updated-at", "updated_at");
    }
  });
  return databasePromise;
}

function notifyStorageChange(): void {
  window.dispatchEvent(new CustomEvent("patrimonio-storage-change"));
}

export async function saveDraft(draft: LocalDraft): Promise<void> {
  const database = await getDatabase();
  await database.put("drafts", draft);
  notifyStorageChange();
}

export async function getDraft(localId: string): Promise<LocalDraft | undefined> {
  const database = await getDatabase();
  return database.get("drafts", localId);
}

export async function listDrafts(): Promise<LocalDraft[]> {
  const database = await getDatabase();
  const drafts = await database.getAll("drafts");
  return drafts.sort((first, second) => second.updatedAt.localeCompare(first.updatedAt));
}

export async function deleteDraft(localId: string): Promise<void> {
  const database = await getDatabase();
  await database.delete("drafts", localId);
  notifyStorageChange();
}

export async function cachePatrimonios(patrimonios: PatrimonioResponse[]): Promise<void> {
  const database = await getDatabase();
  const transaction = database.transaction("patrimonios", "readwrite");
  await Promise.all(patrimonios.map((patrimonio) => transaction.store.put(patrimonio)));
  await transaction.done;
}

export async function getCachedPatrimonios(filters: PatrimonioFilters = {}): Promise<PatrimonioResponse[]> {
  const database = await getDatabase();
  const patrimonios = await database.getAll("patrimonios");
  return patrimonios
    .filter((patrimonio) => !filters.tipologia || patrimonio.tipologia === filters.tipologia)
    .filter((patrimonio) => !filters.estado_conservacion || patrimonio.estado_conservacion === filters.estado_conservacion)
    .sort((first, second) => (second.created_at ?? "").localeCompare(first.created_at ?? ""))
    .slice(0, 100);
}

export async function getCachedPatrimonio(id: string): Promise<PatrimonioResponse | undefined> {
  const database = await getDatabase();
  return database.get("patrimonios", id);
}
