import { type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import { ExpertDetailInfo } from '@/features/ExpertDetail/components/ExpertDetailInfo';
import ExpertCredentials from '@/features/ExpertMypage/components/ExpertCredentials';
import ExpertDashboard from '@/features/ExpertMypage/components/ExpertDashboard';
import ExpertProfile from '@/features/ExpertMypage/components/ExpertProfile';
import ExpertReviews from '@/features/ExpertMypage/components/ExpertReviews';
import UserDashboard from '@/features/UserMypage/components/UserDashboard';
import UserRequests from '@/features/UserMypage/components/UserRequests';
import UserReviews from '@/features/UserMypage/components/UserReviews';
import UserSettings from '@/features/UserMypage/components/UserSettings';
import Layout from '@/layout/Layout';
import CategoryPage from '@/pages/CategoryPage';
import { Chat } from '@/pages/Chat';
import { ExpertDetail } from '@/pages/ExpertDetail';
import ExpertMypage from '@/pages/ExpertMypage';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import UserMainPage from '@/pages/UserMainPage';
import UserMypage from '@/pages/UserMypage';
import ExpertDetailReviews from '@/features/ExpertDetail/components/ExpertDetailReviews';

const routes: RouteObject[] = [
  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.SIGNUP, element: <Signup /> },
  {
    path: ROUTES.HOME.ROOT, // "/"
    element: <Layout />,
    errorElement: <>없는 페이지입니다.</>,

    children: [
      { index: true, element: <UserMainPage /> },

      { path: ROUTES.CATEGORY.ROOT.slice(1) + '/*', element: <CategoryPage /> },

      {
        path: ROUTES.MYPAGE.ROOT.slice(1),
        children: [
          {
            path: ROUTES.MYPAGE_EXPERT.ROOT.replace(ROUTES.MYPAGE.ROOT, '').slice(1),
            element: <ExpertMypage />,
            children: [
              { index: true, element: <ExpertDashboard /> },
              {
                path: ROUTES.MYPAGE_EXPERT.PROFILE.replace(ROUTES.MYPAGE_EXPERT.ROOT + '/', ''),
                element: <ExpertProfile />,
              },
              {
                path: ROUTES.MYPAGE_EXPERT.REVIEWS.replace(ROUTES.MYPAGE_EXPERT.ROOT + '/', ''),
                element: <ExpertReviews />,
              },
              {
                path: ROUTES.MYPAGE_EXPERT.CREDENTIALS.replace(ROUTES.MYPAGE_EXPERT.ROOT + '/', ''),
                element: <ExpertCredentials />,
              },
            ],
          },

          {
            path: ROUTES.MYPAGE.USER.replace(ROUTES.MYPAGE.ROOT, '').slice(1),
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
      {
        path: ROUTES.EXPERTDETAIL.ROOT.slice(1),
        element: <ExpertDetail />,
        children: [
          {
            path: ROUTES.EXPERTDETAIL.INFO.replace(ROUTES.EXPERTDETAIL.ROOT + '/', ''),
            element: <ExpertDetailInfo />,
          },
          {
            path: ROUTES.EXPERTDETAIL.REVIEWS.replace(ROUTES.EXPERTDETAIL.ROOT + '/', ''),
            element: <ExpertDetailReviews />,
          },
        ],
      },
    ],
  },
  /* 채팅 */
  { path: ROUTES.CHAT.ROOT, element: <Chat /> },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
