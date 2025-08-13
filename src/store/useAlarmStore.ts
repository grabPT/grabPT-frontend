import { create } from 'zustand';

type AlarmState = {
  alarmCount: number | null;
  setAlarmCount: (n: number) => void;
  resetAlarmCount: () => void;
};

export const useAlarmStore = create<AlarmState>((set) => ({
  alarmCount: 0,
  setAlarmCount: (n) => set({ alarmCount: n }),
  resetAlarmCount: () => set({ alarmCount: 0 }),
}));
