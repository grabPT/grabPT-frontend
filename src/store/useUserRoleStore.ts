import { create } from 'zustand';

interface UserRoleStore {
  isExpert: boolean;
  toggleExpert: () => void;
}

export const useUserRoleStore = create<UserRoleStore>()((set) => ({
  isExpert: false,
  toggleExpert: () => set((s) => ({ isExpert: !s.isExpert })),
}));
