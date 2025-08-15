import { Navigate } from 'react-router-dom';

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
import AlarmController from '@/layout/controller/AlarmController';
import { AuthCallback } from '@/pages/Auth/AuthCallback';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import CategoryPage from '@/pages/Category/CategoryPage';
import { Chat } from '@/pages/Chat/Chat';
import ContractDetailPage from '@/pages/Contracts/ContractDetailPage';
import ContractFormPage from '@/pages/Contracts/ContractFormPage';
import { ExpertDetail } from '@/pages/ExpertDetail/ExpertDetail';
import ExpertMainPage from '@/pages/Home/ExpertMainPage';
import { Settlement } from '@/pages/Home/Settlement';
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
import type { AppRoute } from '@/types/Role';

/**
 * 권한 메모
 * - guestOnly: 로그인 상태면 진입 차단 (예: 로그인/회원가입 페이지)
 * - roles: 로그인 필수 + 해당 역할만 접근
 *   - USER, EXPERT 등은 프로젝트의 실제 Role enum/union에 맞춰 조정하세요.
 *
 * Guard/Builder를 쓰지 않는다면 roles/guestOnly는 무시됩니다.
 */
export const routesManifest: AppRoute[] = [
  /* 온보딩 (게스트 전용) */
  // 나중에 guestOnly 옵션 추가해여함
  { path: ROUTES.AUTH.LOGIN, element: <Login />, guestOnly: true },
  { path: ROUTES.AUTH.SIGNUP, element: <Signup />, guestOnly: true },
  { path: ROUTES.AUTH.CALLBACK, element: <AuthCallback /> },
  /* 레이아웃 래퍼 */
  {
    path: ROUTES.HOME.ROOT,
    element: (
      <>
        <Layout />
        {/* 필요 시 전역 컨트롤러를 레이아웃 안으로 이동 */}
        <UnreadCountController />
        <AlarmController />
      </>
    ),
    errorElement: <>없는 페이지입니다.</>,

    children: [
      // 홈
      { index: true, element: <UserMainPage />, roles: ['USER', 'GUEST'] }, // 필요 시 roles: ['USER']
      { path: ROUTES.HOME.EXPERT, element: <ExpertMainPage />, roles: ['EXPERT'] }, // 필요 시 roles: ['EXPERT']

      // 카테고리
      { path: 'category/*', element: <CategoryPage />, roles: ['EXPERT', 'GUEST', 'USER'] },

      /* 마이페이지 ─ Expert */
      {
        path: ROUTES.MYPAGE.EXPERT,
        element: <ExpertMypage />,
        roles: ['EXPERT'],
        children: [
          { index: true, element: <ExpertDashboard />, roles: ['EXPERT'] },
          {
            path: ROUTES.MYPAGE.EXPERT_TABS.PROFILE,
            element: <ExpertProfile />,
            roles: ['EXPERT'],
          },
          {
            path: ROUTES.MYPAGE.EXPERT_TABS.REVIEWS,
            element: <ExpertReviews />,
            roles: ['EXPERT'],
          },
          {
            path: ROUTES.MYPAGE.EXPERT_TABS.CREDENTIALS,
            element: <ExpertCredentials />,
            roles: ['EXPERT'],
          },
        ],
      },

      /* 마이페이지 ─ User */
      {
        path: ROUTES.MYPAGE.USER,
        element: <UserMypage />,
        roles: ['USER'],
        children: [
          { index: true, element: <UserDashboard />, roles: ['USER'] },
          { path: ROUTES.MYPAGE.USER_TABS.REQUESTS, element: <UserRequests />, roles: ['USER'] },
          { path: ROUTES.MYPAGE.USER_TABS.REVIEWS, element: <UserReviews />, roles: ['USER'] },
          { path: ROUTES.MYPAGE.USER_TABS.SETTINGS, element: <UserSettings />, roles: ['USER'] },
        ],
      },

      /* 전문가 상세 (퍼블릭 추정) */
      {
        path: ROUTES.EXPERT_DETAIL.ROOT,
        element: <ExpertDetail />,
        children: [
          { index: true, element: <ExpertDetailInfo /> },
          { path: ROUTES.EXPERT_DETAIL.TABS.REVIEWS, element: <ExpertDetailReviews /> },
        ],
      },

      // 매칭 현황
      {
        path: ROUTES.MATCHING_STATUS.ROOT, // '/matching'
        element: <MatchingStatusPage />, // Tabs 포함
        roles: ['USER', 'EXPERT'],
        children: [
          { index: true, element: <Navigate to="requests" replace /> },
          {
            path: ROUTES.MATCHING_STATUS.REQUESTS.ROOT,
            element: <RequestsListPage />,
            roles: ['USER', 'EXPERT'],
          },
          {
            path: ROUTES.MATCHING_STATUS.PROPOSALS.ROOT,
            element: <ProposalsListPage />,
            roles: ['USER', 'EXPERT'],
          },
        ],
      },

      // 요청서
      {
        path: ROUTES.MATCHING_STATUS.REQUESTS.NEW,
        element: <RequestFormPage />,
        roles: ['USER', 'EXPERT'],
      },
      { path: ROUTES.MATCHING_STATUS.REQUESTS.DETAIL, element: <RequestDetailPage /> },
      {
        path: ROUTES.MATCHING_STATUS.REQUESTS.PROPOSALS,
        element: <ProposalsForRequest />,
        roles: ['USER', 'EXPERT'],
      },

      // 제안서
      {
        path: ROUTES.MATCHING_STATUS.PROPOSALS.NEW,
        element: <ProposalFormPage />,
        roles: ['USER', 'EXPERT'],
      },
      { path: ROUTES.MATCHING_STATUS.PROPOSALS.DETAIL, element: <ProposalDetailPage /> },

      // 계약
      {
        path: ROUTES.CONTRACTS.ROOT,
        roles: ['USER', 'EXPERT'],
        children: [
          { path: ROUTES.CONTRACTS.NEW, element: <ContractFormPage />, roles: ['USER', 'EXPERT'] },
          {
            path: ROUTES.CONTRACTS.DETAIL,
            element: <ContractDetailPage />,
            roles: ['USER', 'EXPERT'],
          },
        ],
      },

      // 정산
      { path: ROUTES.EXPERT_SETTLEMENT, element: <Settlement />, roles: ['EXPERT'] },
    ],
  },

  /* 채팅 (레이아웃 외부, 로그인 필요) */
  { path: ROUTES.CHAT.ROOT, element: <Chat />, roles: ['USER', 'EXPERT'] },
];
