import { lazy, Suspense, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { syncPendingDrafts } from "./lib/sync";
import { useOnlineStatus } from "./hooks/useOnlineStatus";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const DraftsPage = lazy(() => import("./pages/DraftsPage"));
const InventoryPage = lazy(() => import("./pages/InventoryPage"));
const NewPatrimonioPage = lazy(() => import("./pages/NewPatrimonioPage"));
const PatrimonioDetailPage = lazy(() => import("./pages/PatrimonioDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function StorageEventsBridge() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const refreshDrafts = () => {
      void queryClient.invalidateQueries({ queryKey: ["drafts"] });
    };
    window.addEventListener("patrimonio-storage-change", refreshDrafts);
    return () => window.removeEventListener("patrimonio-storage-change", refreshDrafts);
  }, [queryClient]);

  return null;
}

function AutoSync() {
  const isOnline = useOnlineStatus();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isOnline) return;
    void syncPendingDrafts().then((result) => {
      if (result.synced > 0) {
        void queryClient.invalidateQueries({ queryKey: ["patrimonios"] });
      }
    });
  }, [isOnline, queryClient]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <StorageEventsBridge />
      <AutoSync />
      <Suspense fallback={<div className="loading-state"><span className="loading-spinner" /> Abriendo la aplicación…</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="inventario" element={<InventoryPage />} />
            <Route path="inventario/nuevo" element={<NewPatrimonioPage />} />
            <Route path="inventario/:id" element={<PatrimonioDetailPage />} />
            <Route path="inventario/:id/editar" element={<NewPatrimonioPage />} />
            <Route path="borradores" element={<DraftsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
