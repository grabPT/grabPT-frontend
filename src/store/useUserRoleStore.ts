import { create } from 'zustand';

interface UserRoleStore {
  isExpert: boolean;
  isLoggedIn: boolean;

  toggleExpert: () => void;
  LogIn: () => void;
  LogOut: () => void;
  toggleLoggedIn: () => void;
}

export const useUserRoleStore = create<UserRoleStore>()((set) => ({
  isExpert: false,
  isLoggedIn: false,

  toggleExpert: () =>
    set((s) => ({
      isExpert: !s.isExpert,
    })),
  LogIn: () =>
    set(() => ({
      isLoggedIn: true,
    })),
  LogOut: () =>
    set(() => ({
      isLoggedIn: false,
    })),
  toggleLoggedIn: () =>
    set((s) => ({
      isLoggedIn: !s.isLoggedIn,
    })),
}));
