import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AlarmState = {
  alarmCount: number | null;
  setAlarmCount: (n: number) => void;
  resetAlarmCount: () => void;
};

export const useAlarmStore = create<AlarmState>()(
  persist(
    (set) => ({
      alarmCount: 0,
      setAlarmCount: (n) => set({ alarmCount: n }),
      resetAlarmCount: () => set({ alarmCount: 0 }),
    }),
    {
      name: 'alarm-storage',
    },
  ),
);
