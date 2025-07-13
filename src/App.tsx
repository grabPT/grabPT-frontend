import { type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import UserSettings from '@/features/UserMypage/UserSettings';
import UserDashboard from '@/features/UserMypage/components/UserDashboard';
import UserRequests from '@/features/UserMypage/components/UserRequests';
import UserReviews from '@/features/UserMypage/components/UserReviews';
import Layout from '@/layout/Layout';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import TrainerMypage from '@/pages/TrainerMypage';
import UserMypage from '@/pages/UserMypage';

// 라우터
const routes: RouteObject[] = [
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
  { path: ROUTES.LOGIN, element: <Login /> },
  {
    path: ROUTES.HOME,
    element: <Layout />,
    errorElement: <>없는 페이지입니다.</>,
    children: [
      { index: true, element: <>홈페이지</> },

      {
        path: 'mypage',
        children: [
          { path: 'trainer', element: <TrainerMypage /> },

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

// 프로텍트 라우팅
// const protectedRoutes = createBrowserRouter([
//   {
//     path: ROUTES.HOME,
//     element: (
//       <ProtectedLayout>
//         <Layout />
//       </ProtectedLayout>
//     ),
//     children: [
//       { path: ROUTES.MYPAGE, element: <Mypage /> },
//     ],
//   },
// ]);

// protectedRoutes 사용 시 ...protectedRoutes 추가
const router = createBrowserRouter([...routes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
