import { useQuery } from '@tanstack/react-query';
import { getServiceAction } from '@/services/actions/servicesActions';

export const useServiceDetails = (serviceId?: string, enabled = true) => useQuery({
  queryKey: ['services', 'detail', serviceId],
  queryFn: () => getServiceAction(serviceId!),
  enabled: Boolean(serviceId) && enabled,
});
