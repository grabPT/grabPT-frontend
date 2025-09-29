import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { SuggestRequestDto } from '@/features/SuggestForm/types/Suggest';

interface SuggestState {
  suggestInfo: SuggestRequestDto;
  setSuggestInfo: (info: Partial<SuggestRequestDto>) => void;
  getSuggestInfo: () => SuggestRequestDto;
}

export const useSuggestStore = create<SuggestState>()(
  persist(
    (set, get) => ({
      suggestInfo: {
        requestionId: null,
        price: 0,
        sessionCount: 0,
        message: '',
        location: '',
        sentAt: '',
        isAgreed: false,
      },

      setSuggestInfo: (info) =>
        set((state) => ({
          suggestInfo: { ...state.suggestInfo, ...info },
        })),

      getSuggestInfo: () => {
        const { suggestInfo } = get();
        return {
          requestionId: suggestInfo.requestionId,
          price: suggestInfo.price,
          sessionCount: suggestInfo.sessionCount,
          message: suggestInfo.message,
          location: suggestInfo.location,
          sentAt: suggestInfo.sentAt,
          isAgreed: suggestInfo.isAgreed,
        };
      },
    }),
    {
      name: 'suggest-role',
    },
  ),
);
