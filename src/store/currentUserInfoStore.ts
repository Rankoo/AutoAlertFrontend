import { create } from 'zustand';
import type { CurrentUserInfo } from '../services/actions/authActions';

type CurrentUserInfoState = {
  userInfo?: CurrentUserInfo | undefined;
  setUserInfo: (userInfo: CurrentUserInfo | undefined) => void;
}

export const useCurrentUserInfoStore = create<CurrentUserInfoState>((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo: CurrentUserInfo | undefined) => set({ userInfo }),
}));