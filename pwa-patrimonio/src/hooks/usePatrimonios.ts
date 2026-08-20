import { useQuery } from "@tanstack/react-query";
import { getPatrimonio, listPatrimonios, type ApiRequestError } from "../lib/api";
import { cachePatrimonios, getCachedPatrimonio, getCachedPatrimonios } from "../lib/storage";
import type { PatrimonioFilters } from "../types/patrimonio";

export function usePatrimonios(filters: PatrimonioFilters = {}) {
  return useQuery({
    queryKey: ["patrimonios", filters],
    queryFn: async () => {
      try {
        const result = await listPatrimonios(filters);
        await cachePatrimonios(result);
        return result;
      } catch (error) {
        if ((error as ApiRequestError).isNetworkError) {
          return getCachedPatrimonios(filters);
        }
        throw error;
      }
    },
    staleTime: 30_000
  });
}

export function usePatrimonio(id: string) {
  return useQuery({
    queryKey: ["patrimonio", id],
    queryFn: async () => {
      try {
        const result = await getPatrimonio(id);
        await cachePatrimonios([result]);
        return result;
      } catch (error) {
        if ((error as ApiRequestError).isNetworkError) {
          const cached = await getCachedPatrimonio(id);
          if (cached) return cached;
        }
        throw error;
      }
    },
    enabled: Boolean(id),
    staleTime: 30_000
  });
}
