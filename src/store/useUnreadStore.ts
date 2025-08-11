// src/store/useUnreadStore.ts
import { create } from 'zustand';

type UnreadState = {
  unreadCount: number;
  setUnReadCount: (n: number) => void;
  resetUnreadCount: () => void;
};

export const useUnreadStore = create<UnreadState>((set) => ({
  unreadCount: 0,
  setUnReadCount: (n) => set({ unreadCount: n }),
  resetUnreadCount: () => set({ unreadCount: 0 }),
}));
