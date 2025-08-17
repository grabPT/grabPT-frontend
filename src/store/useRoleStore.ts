import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Role } from '@/types/Role';

interface AuthState {
  role: Role | null;
  userId: number | null;
  setUserId: (id: number) => void;
  setRole: (role: Role) => void;
  isLoggedIn: boolean;
}

export const useRoleStore = create<AuthState>()(
  persist(
    (set) => ({
      role: 'GUEST',
      userId: null,
      isLoggedIn: false,
      setUserId(id: number) {
        set({ userId: id });
      },
      setRole: (role: Role) =>
        set({
          role,
          isLoggedIn: role === 'USER' || role === 'EXPERT',
        }),
    }),
    {
      name: 'role-storage',
    },
  ),
);
