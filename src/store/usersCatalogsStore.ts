import { create } from 'zustand';
import type { UsersCatalogs } from '@/services/actions/usersActions';

interface UsersCatalogsState {
  catalogs?: UsersCatalogs;
  setCatalogs: (catalogs: UsersCatalogs) => void;
  clearCatalogs: () => void;
}

export const useUsersCatalogsStore = create<UsersCatalogsState>((set) => ({
  catalogs: undefined,
  setCatalogs: (catalogs) => set({ catalogs }),
  clearCatalogs: () => set({ catalogs: undefined }),
}));
