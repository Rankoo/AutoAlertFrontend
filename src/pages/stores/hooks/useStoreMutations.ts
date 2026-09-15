import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStoreAction, deleteStoreAction, updateStoreAction, type StoreRequest } from '@/services/actions/storesActions';

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStoreAction,
    onSuccess: () => refreshStores(queryClient),
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ storeId, payload }: { storeId: string; payload: StoreRequest }) => updateStoreAction(storeId, payload),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        refreshStores(queryClient),
        queryClient.invalidateQueries({ queryKey: ['stores', 'detail', variables.storeId] }),
      ]);
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStoreAction,
    onSuccess: () => refreshStores(queryClient),
  });
};

const refreshStores = async (queryClient: ReturnType<typeof useQueryClient>) => {
  await Promise.all([
    queryClient.refetchQueries({ queryKey: ['stores', 'list'] }),
    queryClient.refetchQueries({ queryKey: ['stores', 'quantities'] }),
  ]);
};
