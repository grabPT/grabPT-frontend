import type { SportsSlugType } from '@/types/SportsType';

export const END_POINT = {
  AUTH: {
    SIGNUP: {
      userSignup: '/api/auth/user-signup',
      proSignup: '/api/auth/pro-signup',
    },
    SMS_VERIFY: {
      send: '/api/sms/send',
      verify: '/api/sms/verify-sms',
    },
    NICKNAME_CHECK: '/api/auth/check-nickname',
    LOGOUT: '/api/auth/logout',
    SOCIAL_INFO: '/api/auth/temp-info',
  },

  HOME: {},

  MYPAGE: {
    REQUESTS: {
      requests: `/mypage/requests`,
    },
    REVIEWS: {
      reviews: `/mypage/reviews`,
    },
  },
  MYPROPAGE: {
    CREDENTIALS: {
      credentials: '/mypage/pro/certification',
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
