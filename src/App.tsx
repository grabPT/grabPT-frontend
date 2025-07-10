import { type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import Layout from '@/layout/Layout';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';

import Category from './features/Category/pages/CategoryPage';
import UserMainPage from './features/home/pages/UserMainPage';

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
    errorElement: <>없는페이지입니다</>,
    children: [
      {
        index: true,
        element: <>홈페이지</>,
      },
      {
        path: ROUTES.SIGNUP,
        element: <Signup />,
      },
      {
        path: ROUTES.USER_PAGE, // 'user'
        element: <UserMainPage />,
      },
      {
        path: ROUTES.CATEGORY,
        element: <Category />,
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
