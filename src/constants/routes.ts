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
  },

  MYPAGE: {
    ROOT: '/mypage',
    USER: '/mypage/user',
    PRO: '/mypage/pro',
    PRO_TABS: {
      DASHBOARD: '', // index
      PROFILE: 'profile',
      REVIEWS: 'reviews',
      CREDENTIALS: 'credentials',
    },
    USER_TABS: {
      DASHBOARD: '', // index
      REQUESTS: 'requests',
      REVIEWS: 'reviews',
      SETTINGS: 'settings',
    },
  },

  PRO_DETAIL: {
    ROOT: '/pro/:id',
    TABS: {
      INFO: 'info',
      REVIEWS: 'reviews',
    },
  },
  PRO_SETTLEMENT: '/pro/settlement',
  USER_SETTLEMENT: '/user/settlement',
  MATCHING_STATUS: {
    ROOT: '/matching',

    REQUESTS: {
      ROOT: '/matching/requests',
      NEW: '/matching/requests/new',
      DETAIL: '/matching/requests/:id',
      PROPOSALS: '/matching/requests/:id/proposals',
    },

    PROPOSALS: {
      ROOT: '/matching/proposals',
      NEW: '/matching/proposals/new',
      DETAIL: '/matching/proposals/:id',
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
  requestProposals: (id: number | undefined) => `/matching/requests/${id}/proposals`,
  proposalDetail: (id: number | undefined) => `/matching/proposals/${id}`,
  contractForm: (id: number | undefined) => `/contracts/new/${id}`,
  contractDetail: (id: number | undefined) => `/contracts/${id}`,
} as const;

export default ROUTES;
