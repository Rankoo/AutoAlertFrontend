import { useQuery } from '@tanstack/react-query';
import { getUsersCatalogsAction } from '@/services/actions/usersActions';
import { useUsersCatalogsStore } from '@/store/usersCatalogsStore';
import { useEffect } from 'react';

export const useUsersCatalogs = () => {
  const query = useQuery({
    queryKey: ['users', 'catalogs'],
    queryFn: getUsersCatalogsAction,
    staleTime: 5 * 60 * 1000,
  });

  const setCatalogs = useUsersCatalogsStore((state) => state.setCatalogs);

  useEffect(() => {
    if (query.data) {
      setCatalogs(query.data);
    }
  }, [query.data, setCatalogs]);

  return query;
};