import { create } from 'zustand';

import type { Role } from '@/routes/types';
import { decodeCookie } from '@/utils/decodeCookie';

type AuthStatus = 'Loading' | 'Guest' | 'Authorized';

interface AuthState {
  status: AuthStatus;
  role: Role | null;
  isLoggedIn: boolean;
  bootstrap: () => Promise<void>;
}

export const useRoleStore = create<AuthState>((set) => ({
  status: 'Loading',
  role: null,
  isLoggedIn: false,
  bootstrap: async () => {
    // Set timeout at the very top
    const timeout = setTimeout(() => {
      set({ status: 'Guest', role: null, isLoggedIn: false });
    }, 3000); // 3초
    try {
      // Cookie-based accessToken retrieval via decoded cookie helper
      const tokenValue = decodeCookie('accessToken');
      const roleValue = decodeCookie('role');
      const token = tokenValue ? decodeURIComponent(tokenValue) : null;
      const roleRaw = roleValue ? decodeURIComponent(roleValue) : null;
      if (!token) {
        set({ status: 'Guest', role: 'GUEST', isLoggedIn: false });
        return;
      }
      const role = roleRaw === '1' ? 'USER' : roleRaw === '2' ? 'EXPERT' : 'GUEST';
      set({ status: 'Authorized', role, isLoggedIn: true });
    } finally {
      clearTimeout(timeout);
    }
  },
}));
