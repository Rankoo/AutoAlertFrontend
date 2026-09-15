import { autoAlertBackend } from "../../api/AutoAlertBackend";
import type { PagedUsers, User } from "@/pages/users/types";

export type UsersQuantities = Record<string, number>;

export interface UserCatalogItem {
  id: string;
  name: string;
}

export interface UsersCatalogs {
  documentTypes: UserCatalogItem[];
  roles: UserCatalogItem[];
  permissions: UserCatalogItem[];
}

export const getUsersCatalogsAction = async (): Promise<UsersCatalogs> => {
  const { data } = await autoAlertBackend.get<UsersCatalogs>('/users/catalogs');
  return data;
};

export const getUsersQuantitiesAction = async (): Promise<UsersQuantities> => {
  const { data } = await autoAlertBackend.get<UsersQuantities>("/users/quantities");
  return data;
};

export interface GetUsersParams {
  page: number;
  pageSize: number;
  roleId?: string;
  search?: string;
  isActive?: boolean;
}

export const getUsersAction = async ({
  page,
  pageSize,
  roleId,
  search,
  isActive,
}: GetUsersParams): Promise<PagedUsers> => {
  const { data } = await autoAlertBackend.get<PagedUsers>("/users", {
    params: {
      page,
      pageSize,
      ...(roleId ? { roleId } : {}),
      ...(search?.trim() ? { search: search.trim() } : {}),
      ...(isActive !== undefined ? { isActive } : {}),
    },
  });

  return data;
};

export const getUserAction = async (userId: string): Promise<User> => {
  const { data } = await autoAlertBackend.get<User>(`/users/${userId}`);
  return data;
};

export interface CreateUserRequest {
  documentTypeId: string;
  roleId: string;
  names: string;
  lastNames: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  documentNumber: string;
  position: string;
  isActive: boolean;
  changePassword: boolean;
}

export const createUserAction = async (payload: CreateUserRequest): Promise<void> => {
  await autoAlertBackend.post('/users', payload);
};

export type UpdateUserRequest = Omit<CreateUserRequest, 'password'> & {
  password?: string;
};

export const updateUserAction = async (userId: string, payload: UpdateUserRequest): Promise<void> => {
  await autoAlertBackend.put(`/users/${userId}`, payload);
};
