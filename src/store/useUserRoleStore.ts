import { create } from 'zustand';

interface UserRoleStore {
  isExpert: boolean;
  isLoggedIn: boolean;

  toggleExpert: () => void;
  setLoggedIn: (state: boolean) => void;
}

export const useUserRoleStore = create<UserRoleStore>()((set) => ({
  isExpert: false,
  isLoggedIn: true,

  toggleExpert: () =>
    set((s) => ({
      isExpert: !s.isExpert,
    })),
  setLoggedIn: (state) =>
    set(() => ({
      isLoggedIn: state,
    })),
}));
