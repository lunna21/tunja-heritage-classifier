import type { LocalDraftStatus } from "../types/patrimonio";

const labels: Record<LocalDraftStatus, string> = {
  draft: "Borrador",
  pending: "Pendiente de enviar",
  review: "Revisar antes de enviar"
};

export function DraftStatusBadge({ status }: { status: LocalDraftStatus }) {
  return <span className={"badge badge-" + status}>{labels[status]}</span>;
}

export function ConservationBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase().replaceAll(" ", "-");
  return <span className={"badge badge-conservation badge-" + normalized}>{value}</span>;
}
