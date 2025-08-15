import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Role } from '@/types/Role';

export type AuthStatus = 'Loading' | 'Authorized' | 'Unauthorized';
interface AuthState {
  status: AuthStatus;
  role: Role | null;

  setRole: (role: Role) => void;
  isLoggedIn: boolean;
}

export const useRoleStore = create<AuthState>()(
  persist(
    (set) => ({
      status: 'Unauthorized',
      role: null,
      accessToken: null,
      isLoggedIn: false,
      setRole: (role: Role) =>
        set({
          status: role === 'USER' || role === 'EXPERT' ? 'Authorized' : 'Unauthorized',
          role,
          isLoggedIn: role === 'USER' || role === 'EXPERT',
        }),
    }),
    {
      name: 'role-storage',
    },
  ),
);
