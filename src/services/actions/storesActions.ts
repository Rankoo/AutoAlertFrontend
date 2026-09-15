import axios from 'axios';
import { autoAlertBackend } from '@/api/AutoAlertBackend';
import type { PagedStores, Store, StoresQuantities } from '@/pages/stores/types';

export interface GetStoresParams {
  page: number;
  pageSize: number;
  search?: string;
}

export interface StoreRequest {
  name: string;
  address: string;
  city: string;
}

export const getStoresQuantitiesAction = async (): Promise<StoresQuantities> => {
  const { data } = await autoAlertBackend.get<StoresQuantities>('/stores/quantities');
  return data;
};

export const getStoresAction = async ({ page, pageSize, search }: GetStoresParams): Promise<PagedStores> => {
  const { data } = await autoAlertBackend.get<PagedStores>('/stores', {
    params: {
      page,
      pageSize,
      ...(search?.trim() ? { search: search.trim() } : {}),
    },
  });
  return data;
};

export const getStoreAction = async (storeId: string): Promise<Store> => {
  const { data } = await autoAlertBackend.get<Store>(`/stores/${storeId}`);
  return data;
};

export const createStoreAction = async (payload: StoreRequest): Promise<void> => {
  await autoAlertBackend.post('/stores', payload);
};

export const updateStoreAction = async (storeId: string, payload: StoreRequest): Promise<void> => {
  await autoAlertBackend.put(`/stores/${storeId}`, payload);
};

export const deleteStoreAction = async (storeId: string): Promise<void> => {
  await autoAlertBackend.delete(`/stores/${storeId}`);
};

export const getStoresApiError = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === 'string' && data.trim()) return data;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};
