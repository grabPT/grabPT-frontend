import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { SportItem } from '@/constants/sports';

type SelectedSportState = {
  selected: SportItem | null;
  setSelected: (sport: SportItem | null) => void;
  clear: () => void;
};

export const useSelectedSportStore = create<SelectedSportState>()(
  persist(
    (set) => ({
      selected: null,
      setSelected: (sport) => set({ selected: sport }),
      clear: () => set({ selected: null }),
    }),
    {
      name: 'selected-sport', // storage key
      storage: createJSONStorage(() => sessionStorage), // 필요하면 localStorage로 교체
    },
  ),
);
