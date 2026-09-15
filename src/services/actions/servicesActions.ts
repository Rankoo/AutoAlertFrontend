import axios from 'axios';
import { autoAlertBackend } from '@/api/AutoAlertBackend';
import type { PagedServices, Service, ServicesCatalogs, ServicesQuantities } from '@/pages/services/types';
export interface GetServicesParams { page: number; pageSize: number; search?: string; storeId?: string; }
export interface ServiceRequest { storeId: string; name: string; provider: string; accountNumber: string; dueDate: string; amount: number | null; status: string; }
export const getServicesCatalogsAction = async (): Promise<ServicesCatalogs> => (await autoAlertBackend.get('/services/catalogs')).data;
export const getServicesQuantitiesAction = async (): Promise<ServicesQuantities> => (await autoAlertBackend.get('/services/quantities')).data;
export const getServicesAction = async ({ page, pageSize, search, storeId }: GetServicesParams): Promise<PagedServices> => (await autoAlertBackend.get('/services', { params: { page, pageSize, ...(search?.trim() ? { search: search.trim() } : {}), ...(storeId ? { storeId } : {}) } })).data;
export const getServiceAction = async (id: string): Promise<Service> => (await autoAlertBackend.get(`/services/${id}`)).data;
export const createServiceAction = async (payload: ServiceRequest): Promise<void> => { await autoAlertBackend.post('/services', payload); };
export const updateServiceAction = async (id: string, payload: ServiceRequest): Promise<void> => { await autoAlertBackend.put(`/services/${id}`, payload); };
export const deleteServiceAction = async (id: string): Promise<void> => { await autoAlertBackend.delete(`/services/${id}`); };
export const getServicesApiError = (error: unknown, fallback: string) => axios.isAxiosError(error) && typeof error.response?.data === 'string' ? error.response.data : error instanceof Error ? error.message : fallback;
