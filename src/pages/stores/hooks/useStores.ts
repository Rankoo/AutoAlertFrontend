import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getStoresAction } from '@/services/actions/storesActions';

export const useStores = (page = 1, pageSize = 10, search = '') => useQuery({
  queryKey: ['stores', 'list', { page, pageSize, search }],
  queryFn: () => getStoresAction({ page, pageSize, search }),
  placeholderData: keepPreviousData,
});
