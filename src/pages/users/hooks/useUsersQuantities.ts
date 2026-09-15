import { useQuery } from "@tanstack/react-query";
import { getUsersQuantitiesAction } from "@/services/actions/usersActions";

export const useUsersQuantities = () => {
  return useQuery({
    queryKey: ["users", "quantities"],
    queryFn: getUsersQuantitiesAction,
  });
};
