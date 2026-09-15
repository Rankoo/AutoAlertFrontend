import { useQueryClient } from '@tanstack/react-query';
import { getUserAction } from '@/services/actions/usersActions';

export const userDetailQueryKey = (userId: string) => ['users', 'detail', userId] as const;

export const usePrefetchUser = () => {
  const queryClient = useQueryClient();

  return (userId: string) => queryClient.prefetchQuery({
    queryKey: userDetailQueryKey(userId),
    queryFn: () => getUserAction(userId),
    staleTime: 5 * 60 * 1000,
  });
};