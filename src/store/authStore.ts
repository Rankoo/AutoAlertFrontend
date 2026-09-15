import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

const getInitialAuthState = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: getInitialAuthState(),
  setAuthenticated: (value: boolean) =>
    set(() => {
      if (typeof window !== 'undefined') {
        if (value) {
          localStorage.setItem('isAuthenticated', 'true');
        } else {
          localStorage.removeItem('isAuthenticated');
        }
      }
      return { isAuthenticated: value };
    }),
}));
