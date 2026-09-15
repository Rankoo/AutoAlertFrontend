import { useQueryClient } from '@tanstack/react-query';
import { getStoreAction } from '@/services/actions/storesActions';
import { storeDetailQueryKey } from './useStoreDetails';

export const usePrefetchStore = () => {
  const queryClient = useQueryClient();

  return (storeId: string) => queryClient.prefetchQuery({
    queryKey: storeDetailQueryKey(storeId),
    queryFn: () => getStoreAction(storeId),
    staleTime: 5 * 60 * 1000,
  });
};
