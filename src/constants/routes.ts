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

  MYPAGE_EXPERT: {
    ROOT: '/mypage/expert',
    PROFILE: '/mypage/expert/profile', // 자기소개
    REVIEWS: '/mypage/expert/reviews', // 최근후기
    CREDENTIALS: '/mypage/expert/credentials', // 자격사항 등록
  },

  CATEGORY: {
    ROOT: '/category',
    WILDCARD: '/category/*',
  },
} as const;

export default ROUTES;
