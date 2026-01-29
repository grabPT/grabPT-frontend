import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Role } from '@/types/Role';

interface AuthState {
  role: Role | null;
  userId: number | null;
  profileImage: string | null;
  setUserId: (id: number) => void;
  setProfileImage: (image: string | null) => void; // 이미지 업데이트
  setRole: (role: Role) => void;
  isLoggedIn: boolean;
  resetAuth: () => void;
}

export const useRoleStore = create<AuthState>()(
  persist(
    (set) => ({
      role: 'GUEST',
      userId: null,
      profileImage: null,
      isLoggedIn: false,
      setUserId(id: number) {
        set({ userId: id });
      },
      setProfileImage(image: string | null) {
        set({ profileImage: image });
      },
      setRole: (role: Role) =>
        set({
          role,
          isLoggedIn: role === 'USER' || role === 'PRO',
        }),
      resetAuth: () =>
        set({
          role: 'GUEST',
          userId: null,
          profileImage: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: 'role-storage',
    },
  ),
);
