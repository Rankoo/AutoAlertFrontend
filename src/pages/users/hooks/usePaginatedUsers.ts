import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsersAction } from "@/services/actions/usersActions";

export const usePaginatedUsers = (page = 1, pageSize = 10, roleId?: string, search?: string, isActive?: boolean) => {
  return useQuery({
    queryKey: ["users", "list", { page, pageSize, roleId, search, isActive }],
    queryFn: () => getUsersAction({ page, pageSize, roleId, search, isActive }),
    placeholderData: keepPreviousData,
  });
};