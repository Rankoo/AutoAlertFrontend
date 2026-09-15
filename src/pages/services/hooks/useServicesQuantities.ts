import { useQuery } from '@tanstack/react-query';
import { getServicesQuantitiesAction } from '@/services/actions/servicesActions';

export const useServicesQuantities = () => useQuery({
  queryKey: ['services', 'quantities'],
  queryFn: getServicesQuantitiesAction,
});
