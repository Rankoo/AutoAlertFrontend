import { useQuery } from '@tanstack/react-query';
import { getStoresQuantitiesAction } from '@/services/actions/storesActions';

export const useStoresQuantities = () => useQuery({
  queryKey: ['stores', 'quantities'],
  queryFn: getStoresQuantitiesAction,
});
