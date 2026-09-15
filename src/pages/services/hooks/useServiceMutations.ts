import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createServiceAction, deleteServiceAction, updateServiceAction, type ServiceRequest } from '@/services/actions/servicesActions';

const refreshServices = (queryClient: ReturnType<typeof useQueryClient>) => Promise.all([
  queryClient.refetchQueries({ queryKey: ['services', 'list'] }),
  queryClient.refetchQueries({ queryKey: ['services', 'quantities'] }),
]);

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: createServiceAction, onSuccess: () => refreshServices(queryClient) });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, payload }: { serviceId: string; payload: ServiceRequest }) => updateServiceAction(serviceId, payload),
    onSuccess: (_data, { serviceId }) => Promise.all([
      refreshServices(queryClient),
      queryClient.invalidateQueries({ queryKey: ['services', 'detail', serviceId] }),
    ]),
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: deleteServiceAction, onSuccess: () => refreshServices(queryClient) });
};
