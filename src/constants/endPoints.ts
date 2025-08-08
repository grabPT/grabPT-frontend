import type { SportsSlugType } from '@/types/SportsType';

export const END_POINT = {
  AUTH: {},

  HOME: {},

  MYPAGE: {
    LIST: {
      //요청서 조회 페이지만 있어서 list로 작성
      list: `/api/requestion/my`,
    },
  },

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

  CHAT: {
    list: '/chatRoom/list',
    messages: (roomId: number) => `/chatRoom/${roomId}/messages`,
  },

  CONTRACTS: {},

  // …필요한 도메인 계속 추가
} as const;
