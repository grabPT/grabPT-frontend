import { create } from 'zustand';

import type { RequestDetailStepDto, RequestPriceStepDto } from '@/features/Request/types/Request';
import type { SportsTypeStepDto } from '@/types/Common';

interface RequestState {
  sportsTypeInfo: SportsTypeStepDto;
  priceInfo: RequestPriceStepDto;
  detailInfo: RequestDetailStepDto;

  setSportsTypeInfo: (info: Partial<SportsTypeStepDto>) => void;
  setPriceInfo: (info: Partial<RequestPriceStepDto>) => void;
  setDetailInfo: (info: Partial<RequestDetailStepDto>) => void;
}

export const useRequestStore = create<
  RequestState & {
    getRequestDto: () => any;
  }
>((set, get) => ({
  sportsTypeInfo: { categoryId: 0 },
  priceInfo: { price: 20000, sessionCount: 20 },
  detailInfo: {
    purpose: [],
    ageGroup: null,
    userGender: '',
    availableDays: [],
    availableTimes: [],
    trainerGender: '',
    startPreference:'',
    content:'',
  },
  setSportsTypeInfo: (info) =>
    set((state) => ({ sportsTypeInfo: { ...state.sportsTypeInfo, ...info } })),
  setDetailInfo: (info) => set((state) => ({ detailInfo: { ...state.detailInfo, ...info } })),
  setPriceInfo: (info) => set((state) => ({ priceInfo: { ...state.priceInfo, ...info } })),

  getRequestDto: () => {
    const state = get();
    return {
      categoryId: state.sportsTypeInfo.categoryId,
      price: state.priceInfo.price,
      sessionCount: state.priceInfo.sessionCount,
      purpose: state.detailInfo.purpose,
      ageGroup: state.detailInfo.ageGroup,
      userGender: state.detailInfo.userGender,
      availableDays: state.detailInfo.availableDays,
      availableTimes: state.detailInfo.availableTimes,
      trainerGender: state.detailInfo.trainerGender,
      startPreference: state.detailInfo.startPreference,
      content: state.detailInfo.content,
    };
  },
}));
