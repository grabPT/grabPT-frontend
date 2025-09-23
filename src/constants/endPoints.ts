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
    EMAIL_CHECK: '/api/auth/check-email',
    REISSUE: '/api/auth/reissue',
    NICKNAME_CHECK: '/api/auth/check-nickname',
    LOGOUT: '/api/auth/logout',
    REGEX: /\/api\/auth\/(reissue|logout)/,
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
    CERTIFICATIONS: {
      certifications: '/mypage/pro/certification',
    },
    REVIEWS: {
      reviews: `/mypage/pro/reviews`,
    },
    PROFILE: {
      profile: '/mypage/pro/',
    },
  },
  CATEGORY: {
    realtime: (categoryCode: SportsSlugType) => `/api/v1/requests/${categoryCode}`,
    PROREVIEWS: {
      reviews: (userId: number) => `/reviews/${userId}`,
    },
  },

  REQUESTS: {
    LIST: {
      list: '/api/requestion/nearby',
    },
    FORM: {},
    DETAIL: {},
    SUGGESTS_FOR_REQUESTS: (requestionId: number) =>
      `/api/suggestion/requestionList/${requestionId}`,
  },

  SUGGESTS: {
    list: '/api/suggestion/mySuggestions',
  },

  CHAT: {
    list: '/chatRoom/list',
    messages: (roomId: number) => `/chatRoom/${roomId}/messages`,
    unreadCount: '/chat/unreadCount',
  },
  SETTLEMENT: { settlement: '/api/trainer/dashboard', user_settlement: '/api/user/dashboard' },
  CONTRACTS: {},

  // …필요한 도메인 계속 추가
} as const;
