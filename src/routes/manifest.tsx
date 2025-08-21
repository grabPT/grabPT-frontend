import { Suspense, lazy } from 'react';

import { Navigate } from 'react-router-dom';

import ErrorComponent from '@/components/ErrorComponent';
import LoadingMuscle from '@/components/LoadingMuscle';
import ROUTES from '@/constants/routes';
import { ExpertDetailInfo } from '@/features/ExpertDetail/components/ExpertDetailInfo';
import ExpertDetailReviews from '@/features/ExpertDetail/components/ExpertDetailReviews';
import Layout from '@/layout/Layout';
// ✅ 초기 번들에 포함 (정적 import)
import { AuthCallback } from '@/pages/Auth/AuthCallback';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import { ExpertDetail } from '@/pages/ExpertDetail/ExpertDetail';
import ExpertMainPage from '@/pages/Home/ExpertMainPage';
import UserMainPage from '@/pages/Home/UserMainPage';
import type { AppRoute } from '@/types/Role';

// 공통 fallback wrapper
const withFallback = (node: React.ReactElement) => (
  <Suspense fallback={<LoadingMuscle />}>{node}</Suspense>
);

// ✅ lazy 로드 컴포넌트들
const CategoryPage = lazy(() => import('@/pages/Category/CategoryPage'));

// 마이페이지
const ExpertMypage = lazy(() => import('@/pages/MyPage/ExpertMypage'));
const ExpertDashboard = lazy(() => import('@/features/ExpertMypage/components/ExpertDashboard'));
const ExpertProfile = lazy(() => import('@/features/ExpertMypage/components/ExpertProfile'));
const ExpertReviews = lazy(() => import('@/features/ExpertMypage/components/ExpertReviews'));
const ExpertCredentials = lazy(
  () => import('@/features/ExpertMypage/components/ExpertCredentials'),
);

const UserMypage = lazy(() => import('@/pages/MyPage/UserMypage'));
const UserDashboard = lazy(() => import('@/features/UserMypage/components/UserDashboard'));
const UserRequests = lazy(() => import('@/features/UserMypage/components/UserRequests'));
const UserReviews = lazy(() => import('@/features/UserMypage/components/UserReviews'));
const UserSettings = lazy(() => import('@/features/UserMypage/components/UserSettings'));

// 매칭/요청/제안
const MatchingStatusPage = lazy(() => import('@/pages/MatchingStatus/MatchingStatusPage'));
const RequestsListPage = lazy(() => import('@/pages/Requests/RequestsListPage'));
const ProposalsListPage = lazy(() => import('@/pages/Proposals/ProposalsListPage'));
const RequestFormPage = lazy(() => import('@/pages/Requests/RequestFormPage'));
const RequestDetailPage = lazy(() => import('@/pages/Requests/RequestDetailPage'));
const ProposalsForRequest = lazy(() => import('@/pages/Requests/ProposalsForRequest'));
const ProposalFormPage = lazy(() => import('@/pages/Proposals/ProposalFormPage'));
const ProposalDetailPage = lazy(() => import('@/pages/Proposals/ProposalDetailPage'));

// 계약/정산
const ContractFormPage = lazy(() => import('@/pages/Contracts/ContractFormPage'));
const ContractDetailPage = lazy(() => import('@/pages/Contracts/ContractDetailPage'));
const ExpertSettlementPage = lazy(() => import('@/pages/Settlement/ExpertSettlementPage'));
const UserSettlementPage = lazy(() => import('@/pages/Settlement/UserSettlementPage'));

// 채팅
const Chat = lazy(() => import('@/pages/Chat/Chat'));

/**
 * 권한 메모
 * - guestOnly: 로그인 상태면 진입 차단 (예: 로그인/회원가입 페이지)
 * - roles: 로그인 필수 + 해당 역할만 접근
 */
export const routesManifest: AppRoute[] = [
  /* 온보딩 (게스트 전용) */
  { path: ROUTES.AUTH.LOGIN, element: <Login />, roles: ['GUEST'] },
  { path: ROUTES.AUTH.SIGNUP, element: <Signup />, roles: ['GUEST'] },
  { path: ROUTES.AUTH.CALLBACK, element: <AuthCallback /> },

  /* 레이아웃 래퍼 */
  {
    path: ROUTES.HOME.ROOT,
    element: <Layout />,
    errorElement: <ErrorComponent />,
    roles: ['EXPERT', 'GUEST', 'USER'],
    children: [
      // 홈 (초기 번들)
      { index: true, element: <UserMainPage />, roles: ['USER', 'GUEST'] },
      { path: ROUTES.HOME.EXPERT, element: <ExpertMainPage />, roles: ['EXPERT'] },

      // 카테고리 (lazy)
      {
        path: 'category/*',
        element: withFallback(<CategoryPage />),
        roles: ['EXPERT', 'GUEST', 'USER'],
      },

      /* 마이페이지 ─ Expert */
      {
        path: ROUTES.MYPAGE.EXPERT,
        element: withFallback(<ExpertMypage />),
        roles: ['EXPERT'],
        children: [
          { index: true, element: withFallback(<ExpertDashboard />), roles: ['EXPERT'] },
          {
            path: ROUTES.MYPAGE.EXPERT_TABS.PROFILE,
            element: withFallback(<ExpertProfile />),
            roles: ['EXPERT'],
          },
          {
            path: ROUTES.MYPAGE.EXPERT_TABS.REVIEWS,
            element: withFallback(<ExpertReviews />),
            roles: ['EXPERT'],
          },
          {
            path: ROUTES.MYPAGE.EXPERT_TABS.CREDENTIALS,
            element: withFallback(<ExpertCredentials />),
            roles: ['EXPERT'],
          },
        ],
      },

      /* 마이페이지 ─ User */
      {
        path: ROUTES.MYPAGE.USER,
        element: withFallback(<UserMypage />),
        roles: ['USER'],
        children: [
          { index: true, element: withFallback(<UserDashboard />), roles: ['USER'] },
          {
            path: ROUTES.MYPAGE.USER_TABS.REQUESTS,
            element: withFallback(<UserRequests />),
            roles: ['USER'],
          },
          {
            path: ROUTES.MYPAGE.USER_TABS.REVIEWS,
            element: withFallback(<UserReviews />),
            roles: ['USER'],
          },
          {
            path: ROUTES.MYPAGE.USER_TABS.SETTINGS,
            element: withFallback(<UserSettings />),
            roles: ['USER'],
          },
        ],
      },

      /* 전문가 상세 (lazy) */
      {
        path: ROUTES.EXPERT_DETAIL.ROOT,
        element: <ExpertDetail />,
        children: [
          { index: true, element: <ExpertDetailInfo /> },
          { path: ROUTES.EXPERT_DETAIL.TABS.REVIEWS, element: <ExpertDetailReviews /> },
        ],
      },

      // 매칭 현황 (lazy)
      {
        path: ROUTES.MATCHING_STATUS.ROOT,
        element: withFallback(<MatchingStatusPage />),
        roles: ['USER', 'EXPERT'],
        children: [
          { index: true, element: <Navigate to="requests" replace /> },
          {
            path: ROUTES.MATCHING_STATUS.REQUESTS.ROOT,
            element: withFallback(<RequestsListPage />),
            roles: ['USER', 'EXPERT'],
          },
          {
            path: ROUTES.MATCHING_STATUS.PROPOSALS.ROOT,
            element: withFallback(<ProposalsListPage />),
            roles: ['USER', 'EXPERT'],
          },
        ],
      },

      // 요청서 (lazy)
      {
        path: ROUTES.MATCHING_STATUS.REQUESTS.NEW,
        element: withFallback(<RequestFormPage />),
        roles: ['USER', 'EXPERT'],
      },
      {
        path: ROUTES.MATCHING_STATUS.REQUESTS.DETAIL,
        element: withFallback(<RequestDetailPage />),
      },
      {
        path: ROUTES.MATCHING_STATUS.REQUESTS.PROPOSALS,
        element: withFallback(<ProposalsForRequest />),
        roles: ['USER'],
      },

      // 제안서 (lazy)
      {
        path: ROUTES.MATCHING_STATUS.PROPOSALS.NEW,
        element: withFallback(<ProposalFormPage />),
        roles: ['USER', 'EXPERT'],
      },
      {
        path: ROUTES.MATCHING_STATUS.PROPOSALS.DETAIL,
        element: withFallback(<ProposalDetailPage />),
      },

      // 계약 (lazy)
      {
        path: ROUTES.CONTRACTS.ROOT,
        roles: ['USER', 'EXPERT'],
        children: [
          {
            path: ROUTES.CONTRACTS.NEW,
            element: withFallback(<ContractFormPage />),
            roles: ['USER', 'EXPERT'],
          },
          {
            path: ROUTES.CONTRACTS.DETAIL,
            element: withFallback(<ContractDetailPage />),
            roles: ['USER', 'EXPERT'],
          },
        ],
      },

      // 정산 (lazy)
      {
        path: ROUTES.EXPERT_SETTLEMENT,
        element: withFallback(<ExpertSettlementPage />),
        roles: ['EXPERT'],
      },
      {
        path: ROUTES.USER_SETTLEMENT,
        element: withFallback(<UserSettlementPage />),
        roles: ['USER'],
      },
    ],
  },

  /* 채팅 (lazy, 레이아웃 외부) */
  { path: ROUTES.CHAT.ROOT, element: withFallback(<Chat />), roles: ['USER', 'EXPERT'] },
];
