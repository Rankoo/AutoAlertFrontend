import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserAction, type UpdateUserRequest } from '@/services/actions/usersActions';

interface UpdateUserVariables {
  userId: string;
  payload: UpdateUserRequest;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }: UpdateUserVariables) => updateUserAction(userId, payload),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ['users', 'list'] }),
        queryClient.refetchQueries({ queryKey: ['users', 'quantities'] }),
        queryClient.invalidateQueries({ queryKey: ['users', 'detail', variables.userId] }),
      ]);
    },
  });
};