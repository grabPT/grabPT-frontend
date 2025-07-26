import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/*
'요청현황' 목록 정렬 상태관리
*/

interface SortState {
  sort: string;
  handleChangeToLatest: () => void; // "최신순"으로 변경
  handleChangeToPrice: () => void; // "가격 높은순"으로 변경
}

export const useSortRequestsStore = create<SortState>()(
  persist(
    (set) => ({
      sort: '최신순',
      handleChangeToLatest: () => set({ sort: '최신순' }),
      handleChangeToPrice: () => set({ sort: '가격 높은순' }),
    }),
    {
      name: 'sort-storage',
    },
  ),
);
