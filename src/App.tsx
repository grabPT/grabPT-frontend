import { type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import UserDashboard from '@/features/UserMypage/components/UserDashboard';
import UserRequests from '@/features/UserMypage/components/UserRequests';
import UserReviews from '@/features/UserMypage/components/UserReviews';
import UserSettings from '@/features/UserMypage/components/UserSettings';
import Layout from '@/layout/Layout';
import CategoryPage from '@/pages/CategoryPage';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import TrainerMypage from '@/pages/TrainerMypage';
import UserMainPage from '@/pages/UserMainPage';
import UserMypage from '@/pages/UserMypage';

/* ───────── 라우트 테이블 ───────── */
const routes: RouteObject[] = [
  /* 인증 */
  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.SIGNUP, element: <Signup /> },

  /* 공통 레이아웃 (Header‧Footer 포함) */
  {
    path: ROUTES.HOME.ROOT,
    element: <Layout />,
    errorElement: <>없는 페이지입니다.</>,

    children: [
      /* 기본 화면 → UserMainPage  */
      { index: true, element: <UserMainPage /> },

      /* 카테고리 */
      {
        path: ROUTES.CATEGORY.WILDCARD.slice(1), // "category/*"
        element: <CategoryPage />,
      },

      /* 마이페이지 */
      {
        path: 'mypage',
        children: [
          { path: 'expert', element: <TrainerMypage /> },

          {
            path: 'user',
            element: <UserMypage />,
            children: [
              { index: true, element: <UserDashboard /> },
              { path: 'requests', element: <UserRequests /> },
              { path: 'reviews', element: <UserReviews /> },
              { path: 'settings', element: <UserSettings /> },
            ],
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
