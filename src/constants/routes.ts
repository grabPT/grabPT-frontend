const ROUTES = {
  HOME: {
    ROOT: '/',
    USER: '/user',
    EXPERT: '/expert',
    GUEST: '/guest',
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
    EXPERT: '/mypage/expert',
    EXPERT_TABS: {
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

  EXPERT_DETAIL: {
    ROOT: '/expert/:id',
    TABS: {
      INFO: 'info',
      REVIEWS: 'reviews',
    },
  },
  EXPERT_SETTLEMENT: '/expert/settlement',
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

  // REQUESTS: {
  //   ROOT: '/requests',
  //   NEW: '/requests/new',
  //   DETAIL: '/requests/:id',
  //   PROPOSALS: '/requests/:id/proposals',
  // },

  // PROPOSALS: {
  //   ROOT: '/proposals',
  //   NEW: '/proposals/new',
  //   DETAIL: '/proposals/:id',
  // },

  CONTRACTS: {
    ROOT: '/contracts',
    NEW: '/contracts/new/:id',
    DETAIL: '/contracts/:id',
  },
} as const;

export const urlFor = {
  expertDetail: (id: number | undefined) => `/expert/${id}`,
  requestDetail: (id: number | undefined) => `/matching/requests/${id}`,
  requestProposals: (id: number | undefined) => `/matching/requests/${id}/proposals`,
  proposalDetail: (id: number | undefined) => `/matching/proposals/${id}`,
  contractForm: (id: number | undefined) => `/contracts/new/${id}`,
  contractDetail: (id: number | undefined) => `/contracts/${id}`,
} as const;

export default ROUTES;
