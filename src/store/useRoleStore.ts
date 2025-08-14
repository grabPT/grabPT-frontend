import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Role } from '@/routes/types';

export type AuthStatus = 'Loading' | 'Authorized';
interface AuthState {
  status: AuthStatus;
  role: Role | null;
  setRole: (role: Role) => void;
  isLoggedIn: boolean;
}

export const useRoleStore = create<AuthState>()(
  persist(
    (set) => ({
      status: 'Loading',
      role: null,
      isLoggedIn: false,
      setRole: (role: Role) =>
        set({
          status: role === 'USER' || role === 'EXPERT' ? 'Authorized' : 'Loading',
          role,
          isLoggedIn: role !== null,
        }),
    }),
    {
      name: 'role-storage',
    },
  ),
);
