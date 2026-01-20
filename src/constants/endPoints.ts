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
    ROOT: '/mypage',
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
    PTPRICE: {
      ptPrice: '/mypage/pro/ptPrice',
    },
    PTPROGRAM: {
      ptProgram: '/mypage/pro/ptProgram',
    },
    PHOTOS: {
      photos: '/mypage/pro/photos',
    },
    DESCRIPTION: {
      description: '/mypage/pro/description',
    },
    CENTER: {
      center: '/mypage/pro/center',
    },
  },

  CATEGORY: {
    realtime: (categoryCode: SportsSlugType) => `/api/v1/requests/${categoryCode}`,
    PROREVIEWS: {
      reviews: (userId: number) => `/reviews/${userId}`,
    },
    proList: (categoryCode: string) =>
      `/api/v1/category/${encodeURIComponent(categoryCode)}/trainers`,
  },

  PRODETAIL: {
    profile: (userId: number) => `/api/category-proprofile/${userId}`,
  },

  REQUESTS: {
    POST: '/api/requestion',
    LIST: {
      list: '/api/requestion/nearby',
    },
    FORM: {},
    PATCH: (requestionId: number) => `/api/requestion/${requestionId}`,
    DELETE: (requestionId: number) => `/api/requestion/${requestionId}`,
    GET_DETAIL: (requestionId: number) => `/api/requestion/${requestionId}`,
    GET_CAN_EDIT: (requestionId: number) => `/api/requestion/${requestionId}/requestion-can-edit`,
    SUGGESTS_FOR_REQUESTS: (requestionId: number) =>
      `/api/suggestion/suggestion/suggestionList/${requestionId}`,
  },

  SUGGESTS: {
    list: '/api/suggestion/mySuggestions',
    suggestDetail: (suggestionId: number) => `/api/suggestion/${suggestionId}`,
    save: '/api/suggestion',
  },

  CHAT: {
    list: '/chatRoom/list',
    request: '/chatRoom/request',
    upload: (roomId: number) => `/chatRoom/${roomId}/upload`,
    messages: (roomId: number) => `/chatRoom/${roomId}/messages`,
    unreadCount: '/chat/unreadCount',
    readWhenExist: (roomId: number) => `/chatRoom/${roomId}/readWhenExist`,
    readWhenEnter: (roomId: number) => `/chatRoom/${roomId}/readWhenEnter`,
  },

  ALARM: {
    read: (alarmId: number) => `/api/alarm/${alarmId}/read`,
    list: '/api/alarmList',
  },

  SETTLEMENT: { settlement: '/api/trainer/dashboard', user_settlement: '/api/user/dashboard' },

  CONTRACTS: {
    //사용처가 여기긴 한데 추후에 API 분리 가능성 있음
    CUSTOMORDER: {
      customOrder: '/customOrder',
    },
    // 계약서 생성 및 저장

    submitPdf: (contractId: number) => `/contract/${contractId}/submit`,
    //이것도 조회 안됨
    // pdfLink: (contractId: number) => `/contract/${contractId}/pdf`,

    // 이건 왜 쓰인 곳이 없지
    userWrite: (contractId: number) => `/contract/${contractId}/user`,
    proWrite: (contractId: number) => `/contract/${contractId}/pro`,

    // 서명 업로드
    uploadUserSign: (contractId: number) => `/contract/${contractId}/uploadUserSign`,
    uploadProSign: (contractId: number) => `/contract/${contractId}/uploadProSign`,

    // 계약서 조회
    detail: (contractId: number) => `/contract/${contractId}`,
  },

  REVIEWS: {
    reviews: '/reviews',
  },
  PAYMENT: {
    paymentCallbalck: '/paymentCallback',
  },
  MATCHING: {
    matching: '/matching',
  },
  // …필요한 도메인 계속 추가
} as const;
