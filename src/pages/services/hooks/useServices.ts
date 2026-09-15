import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getServicesAction } from '@/services/actions/servicesActions';

export const useServices = (page = 1, pageSize = 10, search = '', storeId?: string) => useQuery({
  queryKey: ['services', 'list', { page, pageSize, search, storeId }],
  queryFn: () => getServicesAction({ page, pageSize, search, storeId }),
  placeholderData: keepPreviousData,
});
