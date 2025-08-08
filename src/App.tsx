import { useEffect } from 'react';

import { Navigate, type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import UnreadCountController from '@/features/Chat/controller/UnreadCountController';
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
import MatchingStatusPage from '@/pages/MatchingStatus/MatchingStatusPage';
import ExpertMypage from '@/pages/MyPage/ExpertMypage';
import UserMypage from '@/pages/MyPage/UserMypage';
import ProposalDetailPage from '@/pages/Proposals/ProposalDetailPage';
import ProposalFormPage from '@/pages/Proposals/ProposalFormPage';
import ProposalsListPage from '@/pages/Proposals/ProposalsListPage';
import ProposalsForRequest from '@/pages/Requests/ProposalsForRequest';
import RequestDetailPage from '@/pages/Requests/RequestDetailPage';
import RequestFormPage from '@/pages/Requests/RequestFormPage';
import RequestsListPage from '@/pages/Requests/RequestsListPage';
import { useStompStore } from '@/store/useStompStore';

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

      // 요청, 제안 현황 리스트
      {
        path: ROUTES.MATCHING_STATUS.ROOT, // '/matching'
        element: <MatchingStatusPage />, // Tabs 포함
        children: [
          { index: true, element: <Navigate to="requests" replace /> },

          { path: ROUTES.MATCHING_STATUS.REQUESTS.ROOT, element: <RequestsListPage /> }, // /matching/requests
          { path: ROUTES.MATCHING_STATUS.PROPOSALS.ROOT, element: <ProposalsListPage /> }, // /matching/proposals
        ],
      },

      // 요청서
      { path: ROUTES.MATCHING_STATUS.REQUESTS.NEW, element: <RequestFormPage /> },
      { path: ROUTES.MATCHING_STATUS.REQUESTS.DETAIL, element: <RequestDetailPage /> },
      { path: ROUTES.MATCHING_STATUS.REQUESTS.PROPOSALS, element: <ProposalsForRequest /> },

      // 제안서
      { path: ROUTES.MATCHING_STATUS.PROPOSALS.NEW, element: <ProposalFormPage /> },
      { path: ROUTES.MATCHING_STATUS.PROPOSALS.DETAIL, element: <ProposalDetailPage /> },

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
  const init = useStompStore((s) => s.init);
  const teardown = useStompStore((s) => s.teardown);

  useEffect(() => {
    init(); // 앱 켜질 때 연결 시작
    return () => teardown(); // 필요 시 정리 (SPA면 생략 가능)
  }, [init, teardown]);

  return (
    <>
      <RouterProvider router={router} />
      <UnreadCountController />
    </>
  );
}
