export interface PagedStores {
  stores: Store[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface Store {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export interface StoresQuantities {
  totalStores: number;
  storesWithServices: number;
  citiesCount: number;
  storesCreatedLastSevenDays: number;
}
