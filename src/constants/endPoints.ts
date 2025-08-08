import type { SportsSlugType } from '@/types/SportsType';

export const END_POINT = {
  AUTH: {},

  HOME: {},

  MYPAGE: {},

  CATEGORY: {
    realtime: (categoryCode: SportsSlugType) => `/api/v1/requests/${categoryCode}`,
  },

  REQUESTS: {
    LIST: {
      list: '/api/requestion/nearby',
    },
    FORM: {},
    DETAIL: {},
    PROPOSALS_FOR_REQUESTS: (requestionId: number) =>
      `/api/suggestion/requestionList/${requestionId}`,
  },

  PROPOSALS: {
    list: '/api/suggestion/mySuggestions',
  },

  CHAT: {},

  CONTRACTS: {},

  // …필요한 도메인 계속 추가
} as const;
