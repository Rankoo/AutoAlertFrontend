import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserAction, type CreateUserRequest } from '@/services/actions/usersActions';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserRequest) => createUserAction(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ['users', 'list'] }),
        queryClient.refetchQueries({ queryKey: ['users', 'quantities'] }),
      ]);
    },
  });
};