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
    NEW: '/contracts/new',
    DETAIL: '/contracts/:id',
  },
} as const;

export const urlFor = {
  expertDetail: (id: string | number) => `/expert/${id}`,
  requestDetail: (id: string | number) => `/matching/requests/${id}`,
  requestProposals: (id: string | number) => `/matching/requests/${id}/proposals`,
  proposalDetail: (id: string | number) => `/matching/proposals/${id}`,
  contractDetail: (id: string | number) => `/contracts/${id}`,
} as const;

export default ROUTES;
