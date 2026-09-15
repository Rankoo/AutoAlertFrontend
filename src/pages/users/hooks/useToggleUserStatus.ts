import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserAction, updateUserAction } from '@/services/actions/usersActions';
import { userDetailQueryKey } from './usePrefetchUser';

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, isActive }: { userId: string; isActive: boolean }) => {
      const user = await queryClient.fetchQuery({
        queryKey: userDetailQueryKey(userId),
        queryFn: () => getUserAction(userId),
        staleTime: 5 * 60 * 1000,
      });

      await updateUserAction(userId, {
        documentTypeId: user.documentTypeId,
        roleId: user.roleId,
        names: user.names,
        lastNames: user.lastNames,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        documentNumber: user.documentNumber,
        position: user.position,
        isActive,
        changePassword: user.changePassword,
      });
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ['users', 'list'] }),
        queryClient.refetchQueries({ queryKey: ['users', 'quantities'] }),
        queryClient.invalidateQueries({ queryKey: userDetailQueryKey(variables.userId) }),
      ]);
    },
  });
};