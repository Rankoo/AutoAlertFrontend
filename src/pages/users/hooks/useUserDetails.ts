import { useQuery } from '@tanstack/react-query';
import { getUserAction } from '@/services/actions/usersActions';
import { userDetailQueryKey } from './usePrefetchUser';

export const useUserDetails = (userId?: string, enabled = true) => {
  return useQuery({
    queryKey: userId ? userDetailQueryKey(userId) : ['users', 'detail', 'empty'],
    queryFn: () => getUserAction(userId as string),
    enabled: Boolean(userId) && enabled,
    staleTime: 5 * 60 * 1000,
  });
};
