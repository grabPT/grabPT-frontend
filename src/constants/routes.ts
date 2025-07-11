const ROUTES = {
  HOME: {
    ROOT: '/',
    USER: '/user',
    EXPERT: '/expert',
  },

  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },

  MYPAGE: {
    ROOT: '/mypage',
    USER: '/mypage/user',
    EXPERT: '/mypage/expert',
  },

  CATEGORY: {
    ROOT: '/category',
    WILDCARD: '/category/*',
  },
} as const;

export default ROUTES;
