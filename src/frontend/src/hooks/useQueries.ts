import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Haircut } from "../backend.d";
import { useActor } from "./useActor";

export function useBCVRate() {
  const { actor, isFetching } = useActor();
  return useQuery<number>({
    queryKey: ["bcvRate"],
    queryFn: async () => {
      if (!actor) return 0;
      return actor.getBCVRate();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useHaircuts() {
  const { actor, isFetching } = useActor();
  return useQuery<Haircut[]>({
    queryKey: ["haircuts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHaircutsArray();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateBCVRate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rate: number) => {
      if (!actor) throw new Error("No actor");
      return actor.updateBCVRate(rate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bcvRate"] });
    },
  });
}
