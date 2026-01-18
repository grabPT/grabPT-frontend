import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UnreadState = {
  unreadCount: number;
  setUnReadCount: (n: number) => void;
  resetUnreadCount: () => void;
};

export const useUnreadStore = create<UnreadState>()(
  persist(
    (set) => ({
      unreadCount: 0,
      setUnReadCount: (n) => set({ unreadCount: n }),
      resetUnreadCount: () => set({ unreadCount: 0 }),
    }),
    {
      name: 'unread-storage',
    },
  ),
);
