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

  REQUESTS: {
    ROOT: '/requests',
    NEW: '/requests/new',
    DETAIL: '/requests/:id',
    PROPOSALS: '/requests/:id/proposals',
  },

  PROPOSALS: {
    ROOT: '/proposals',
    NEW: '/proposals/new',
    DETAIL: '/proposals/:id',
  },

  CONTRACTS: {
    NEW: '/contracts/new',
    DETAIL: '/contracts/:id',
  },
} as const;

export default ROUTES;
