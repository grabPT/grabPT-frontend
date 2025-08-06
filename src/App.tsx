import { type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import { ExpertDetailInfo } from '@/features/ExpertDetail/components/ExpertDetailInfo';
import ExpertDetailReviews from '@/features/ExpertDetail/components/ExpertDetailReviews';
import ExpertCredentials from '@/features/ExpertMypage/components/ExpertCredentials';
import ExpertDashboard from '@/features/ExpertMypage/components/ExpertDashboard';
import ExpertProfile from '@/features/ExpertMypage/components/ExpertProfile';
import ExpertReviews from '@/features/ExpertMypage/components/ExpertReviews';
import UserDashboard from '@/features/UserMypage/components/UserDashboard';
import UserRequests from '@/features/UserMypage/components/UserRequests';
import UserReviews from '@/features/UserMypage/components/UserReviews';
import UserSettings from '@/features/UserMypage/components/UserSettings';
import Layout from '@/layout/Layout';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import CategoryPage from '@/pages/Category/CategoryPage';
import { Chat } from '@/pages/Chat/Chat';
import ContractDetailPage from '@/pages/Contracts/ContractDetailPage';
import ContractFormPage from '@/pages/Contracts/ContractFormPage';
import { ExpertDetail } from '@/pages/ExpertDetail/ExpertDetail';
import ExpertMainPage from '@/pages/Home/ExpertMainPage';
import UserMainPage from '@/pages/Home/UserMainPage';
import ExpertMypage from '@/pages/MyPage/ExpertMypage';
import UserMypage from '@/pages/MyPage/UserMypage';
import ProposalDetailPage from '@/pages/Proposals/ProposalDetailPage';
import ProposalFormPage from '@/pages/Proposals/ProposalFormPage';
import ProposalsListPage from '@/pages/Proposals/ProposalsListPage';
import ProposalsForRequest from '@/pages/Requests/ProposalsForRequest';
import RequestDetailPage from '@/pages/Requests/RequestDetailPage';
import RequestFormPage from '@/pages/Requests/RequestFormPage';
import RequestsListPage from '@/pages/Requests/RequestsListPage';

const routes: RouteObject[] = [
  /* 온보딩 */
  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.SIGNUP, element: <Signup /> },

  /* 레이아웃 래퍼 */
  {
    path: ROUTES.HOME.ROOT,
    element: <Layout />,
    errorElement: <>없는 페이지입니다.</>,

    children: [
      // 홈
      { index: true, element: <UserMainPage /> },
      { path: ROUTES.HOME.EXPERT, element: <ExpertMainPage /> },

      // 카테고리
      { path: 'category/*', element: <CategoryPage /> },

      /* 마이페이지 ─ Expert */
      {
        path: ROUTES.MYPAGE.EXPERT,
        element: <ExpertMypage />,
        children: [
          { index: true, element: <ExpertDashboard /> },
          { path: ROUTES.MYPAGE.EXPERT_TABS.PROFILE, element: <ExpertProfile /> },
          { path: ROUTES.MYPAGE.EXPERT_TABS.REVIEWS, element: <ExpertReviews /> },
          { path: ROUTES.MYPAGE.EXPERT_TABS.CREDENTIALS, element: <ExpertCredentials /> },
        ],
      },

      /* 마이페이지 ─ User */
      {
        path: ROUTES.MYPAGE.USER,
        element: <UserMypage />,
        children: [
          { index: true, element: <UserDashboard /> },
          { path: ROUTES.MYPAGE.USER_TABS.REQUESTS, element: <UserRequests /> },
          { path: ROUTES.MYPAGE.USER_TABS.REVIEWS, element: <UserReviews /> },
          { path: ROUTES.MYPAGE.USER_TABS.SETTINGS, element: <UserSettings /> },
        ],
      },

      /* 전문가 상세 */
      {
        path: ROUTES.EXPERT_DETAIL.ROOT,
        element: <ExpertDetail />,
        children: [
          { index: true, element: <ExpertDetailInfo /> }, // 기본 탭
          { path: ROUTES.EXPERT_DETAIL.TABS.REVIEWS, element: <ExpertDetailReviews /> },
        ],
      },

      /* 요청서 */
      {
        path: ROUTES.REQUESTS.ROOT,
        children: [
          { index: true, element: <RequestsListPage /> }, // 리스트
          { path: ROUTES.REQUESTS.NEW, element: <RequestFormPage /> }, // 작성
          { path: ROUTES.REQUESTS.DETAIL, element: <RequestDetailPage /> }, // 요청서상세
          { path: ROUTES.REQUESTS.PROPOSALS, element: <ProposalsForRequest /> }, // 요청서의 제안서 리스트
        ],
      },

      // 제안서
      {
        path: ROUTES.PROPOSALS.ROOT,
        children: [
          { index: true, element: <ProposalsListPage /> },
          { path: ROUTES.PROPOSALS.NEW, element: <ProposalFormPage /> },
          { path: ROUTES.PROPOSALS.DETAIL, element: <ProposalDetailPage /> },
        ],
      },

      // 계약
      {
        path: ROUTES.CONTRACTS.ROOT,
        children: [
          { path: ROUTES.CONTRACTS.NEW, element: <ContractFormPage /> },
          { path: ROUTES.CONTRACTS.DETAIL, element: <ContractDetailPage /> },
        ],
      },
    ],
  },

  /* 채팅 (레이아웃 외부) */
  { path: ROUTES.CHAT.ROOT, element: <Chat /> },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
