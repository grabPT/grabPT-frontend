import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Role } from '@/types/Role';

export type AuthStatus = 'Loading' | 'Authorized' | 'Unauthorized';
interface AuthState {
  status: AuthStatus;
  role: Role | null;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
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
      setAccessToken: (accessToken) => set({ accessToken: accessToken ?? null }),
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
