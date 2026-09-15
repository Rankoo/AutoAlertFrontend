export interface Service { id: string; storeId: string; storeName: string | null; name: string; provider: string | null; accountNumber: string | null; dueDate: string | null; amount: number | null; status: string | null; createdAt?: string; updatedAt?: string | null; }
export interface PagedServices { services: Service[]; page: number; pageSize: number; totalItems: number; totalPages: number; }
export interface ServicesCatalogs { stores: { id: string; name: string }[]; }
export interface ServicesQuantities { totalServices: number; pendingServices: number; dueSoon: number; pendingAmount: number; }
