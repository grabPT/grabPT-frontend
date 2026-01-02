const ROUTES = {
  HOME: {
    ROOT: '/',
    PRO: '/pro',
  },

  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    CALLBACK: '/authcallback',
  },

  OAUTH: '/auth/callback',

  CHAT: {
    ROOT: '/chat',
  },

  CATEGORY: {
    ROOT: '/category',
    CATEGORY_DETAIL: '/category/:slug',
  },

  MYPAGE: {
    ROOT: '/mypage',
    USER: '/mypage/user',
    PRO: '/mypage/pro',
    PRO_TABS: {
      DASHBOARD: '', // index
      PROFILE: 'profile',
      REVIEW_LIST: 'reviewlist',
      CERTIFICATIONS: 'certifications',
    },
    USER_TABS: {
      DASHBOARD: '', // index
      REQUEST_LIST: 'requestlist',
      REVIEW_LIST: 'reviewlist',
      SETTINGS: 'settings',
    },
  },

  PRO_DETAIL: {
    ROOT: '/pro/:id',
    TABS: {
      INFO: 'info',
      REVIEW_LIST: 'reviewlist',
    },
  },

  PRO_SETTLEMENT: '/pro/settlement',
  USER_SETTLEMENT: '/user/settlement',
  MATCHING_STATUS: {
    ROOT: '/matching',

    REQUESTS: {
      ROOT: '/matching/requestlist',
      NEW: '/matching/requests/new',
      DETAIL: '/matching/requests/:id',
      SUGGESTS: '/matching/requests/:id/suggestList',
    },

    SUGGESTS: {
      ROOT: '/matching/suggestList',
      NEW: '/matching/suggests/new',
      DETAIL: '/matching/suggests/:id',
    },
  },
  CONTRACTS: {
    ROOT: '/contracts',
    NEW: '/contracts/new/:id',
    DETAIL: '/contracts/:id',
  },
} as const;

export const urlFor = {
  proDetail: (id: number | undefined) => `/pro/${id}`,
  requestDetail: (id: number | undefined) => `/matching/requests/${id}`,
  requestSuggests: (id: number | undefined) => `/matching/requests/${id}/suggestList`,
  suggestDetail: (id: number | undefined) => `/matching/suggests/${id}`,
  contractForm: (id: number | undefined) => `/contracts/new/${id}`,
  contractDetail: (id: number | undefined) => `/contracts/${id}`,
  categoryDetail: (slug: string | undefined) => `/category/${slug}`,
} as const;

export default ROUTES;
