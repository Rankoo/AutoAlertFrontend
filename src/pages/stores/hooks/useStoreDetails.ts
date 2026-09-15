import { useQuery } from '@tanstack/react-query';
import { getStoreAction } from '@/services/actions/storesActions';

export const storeDetailQueryKey = (storeId: string) => ['stores', 'detail', storeId] as const;

export const useStoreDetails = (storeId?: string, enabled = true) => useQuery({
  queryKey: storeId ? storeDetailQueryKey(storeId) : ['stores', 'detail', 'empty'],
  queryFn: () => getStoreAction(storeId as string),
  enabled: Boolean(storeId) && enabled,
  staleTime: 5 * 60 * 1000,
});
