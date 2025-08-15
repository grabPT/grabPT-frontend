import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Role } from '@/types/Role';

interface AuthState {
  role: Role | null;
  setRole: (role: Role) => void;
  isLoggedIn: boolean;
}

export const useRoleStore = create<AuthState>()(
  persist(
    (set) => ({
      role: 'GUEST',
      accessToken: null,
      isLoggedIn: false,
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
