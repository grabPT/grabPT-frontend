import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { SortByType } from '@/types/SortType';

/*
'요청현황' 목록 정렬 상태관리
*/

interface SortState {
  sort: SortByType;
  handleChangeToLatest: () => void; // "최신순"으로 변경
  handleChangeToPrice: () => void; // "가격 높은순"으로 변경
}

export const useSortRequestsStore = create<SortState>()(
  persist(
    (set) => ({
      sort: 'latest',
      handleChangeToLatest: () => set({ sort: 'latest' }),
      handleChangeToPrice: () => set({ sort: 'price' }),
    }),
    {
      name: 'sort-storage',
    },
  ),
);
