import { useQuery } from '@tanstack/react-query';
import { getServicesCatalogsAction } from '@/services/actions/servicesActions';

export const useServicesCatalogs = () => useQuery({
  queryKey: ['services', 'catalogs'],
  queryFn: getServicesCatalogsAction,
  staleTime: 5 * 60 * 1000,
});
