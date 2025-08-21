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

// 동적 import 에러 처리 함수
const createLazyComponent = (importFn: () => Promise<{ default: React.ComponentType<any> }>) => {
  return lazy(() =>
    importFn().catch((error) => {
      console.error('Dynamic import failed:', error);
      // 에러 발생시 fallback 컴포넌트 반환
      return {
        default: () => (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="text-center">
              <p className="mb-4 text-lg font-semibold text-gray-700">
                페이지를 불러올 수 없습니다
              </p>
              <button
                onClick={() => window.location.reload()}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                새로고침
              </button>
            </div>
          </div>
        ),
      };
    }),
  );
};

// 공통 fallback wrapper
const withFallback = (node: React.ReactElement) => (
  <Suspense fallback={<LoadingMuscle />}>{node}</Suspense>
);

// ✅ lazy 로드 컴포넌트들 (에러 처리 추가)
const CategoryPage = createLazyComponent(() => import('@/pages/Category/CategoryPage'));

// 마이페이지
const ExpertMypage = createLazyComponent(() => import('@/pages/MyPage/ExpertMypage'));
const ExpertDashboard = createLazyComponent(
  () => import('@/features/ExpertMypage/components/ExpertDashboard'),
);
const ExpertProfile = createLazyComponent(
  () => import('@/features/ExpertMypage/components/ExpertProfile'),
);
const ExpertReviews = createLazyComponent(
  () => import('@/features/ExpertMypage/components/ExpertReviews'),
);
const ExpertCredentials = createLazyComponent(
  () => import('@/features/ExpertMypage/components/ExpertCredentials'),
);

const UserMypage = createLazyComponent(() => import('@/pages/MyPage/UserMypage'));
const UserDashboard = createLazyComponent(
  () => import('@/features/UserMypage/components/UserDashboard'),
);
const UserRequests = createLazyComponent(
  () => import('@/features/UserMypage/components/UserRequests'),
);
const UserReviews = createLazyComponent(
  () => import('@/features/UserMypage/components/UserReviews'),
);
const UserSettings = createLazyComponent(
  () => import('@/features/UserMypage/components/UserSettings'),
);

// 매칭/요청/제안
const MatchingStatusPage = createLazyComponent(
  () => import('@/pages/MatchingStatus/MatchingStatusPage'),
);
const RequestsListPage = createLazyComponent(() => import('@/pages/Requests/RequestsListPage'));
const ProposalsListPage = createLazyComponent(() => import('@/pages/Proposals/ProposalsListPage'));
const RequestFormPage = createLazyComponent(() => import('@/pages/Requests/RequestFormPage'));
const RequestDetailPage = createLazyComponent(() => import('@/pages/Requests/RequestDetailPage'));
const ProposalsForRequest = createLazyComponent(
  () => import('@/pages/Requests/ProposalsForRequest'),
);
const ProposalFormPage = createLazyComponent(() => import('@/pages/Proposals/ProposalFormPage'));
const ProposalDetailPage = createLazyComponent(
  () => import('@/pages/Proposals/ProposalDetailPage'),
);

// 계약/정산
const ContractFormPage = createLazyComponent(() => import('@/pages/Contracts/ContractFormPage'));
const ContractDetailPage = createLazyComponent(
  () => import('@/pages/Contracts/ContractDetailPage'),
);
const ExpertSettlementPage = createLazyComponent(
  () => import('@/pages/Settlement/ExpertSettlementPage'),
);
const UserSettlementPage = createLazyComponent(
  () => import('@/pages/Settlement/UserSettlementPage'),
);

// 채팅
const Chat = createLazyComponent(() => import('@/pages/Chat/Chat'));

/**
 * 권한 메모
 * - guestOnly: 로그인 상태면 진입 차단 (예: 로그인/회원가입 페이지)
 * - roles: 로그인 필수 + 해당 역할만 접근
 */
export const routesManifest: AppRoute[] = [
  /* 온보딩 (게스트 전용) */
  {
    path: ROUTES.AUTH.LOGIN,
    element: <Login />,
    roles: ['GUEST'],
    errorElement: <ErrorComponent />,
  },
  {
    path: ROUTES.AUTH.SIGNUP,
    element: <Signup />,
    roles: ['GUEST'],
    errorElement: <ErrorComponent />,
  },
  { path: ROUTES.AUTH.CALLBACK, element: <AuthCallback />, errorElement: <ErrorComponent /> },

  /* 레이아웃 래퍼 */
  {
    path: ROUTES.HOME.ROOT,
    element: <Layout />,
    errorElement: <ErrorComponent />,
    roles: ['EXPERT', 'GUEST', 'USER'],
    children: [
      // 홈 (초기 번들)
      {
        index: true,
        element: <UserMainPage />,
        roles: ['USER', 'GUEST'],
        errorElement: <ErrorComponent />,
      },
      {
        path: ROUTES.HOME.EXPERT,
        element: <ExpertMainPage />,
        roles: ['EXPERT'],
        errorElement: <ErrorComponent />,
      },

      // 카테고리 (lazy)
      {
        path: 'category/*',
        element: withFallback(<CategoryPage />),
        roles: ['EXPERT', 'GUEST', 'USER'],
        errorElement: <ErrorComponent />, // 개별 에러 처리 추가
      },

      /* 마이페이지 ─ Expert */
      {
        path: ROUTES.MYPAGE.EXPERT,
        element: withFallback(<ExpertMypage />),
        roles: ['EXPERT'],
        errorElement: <ErrorComponent />,
        children: [
          {
            index: true,
            element: withFallback(<ExpertDashboard />),
            roles: ['EXPERT'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MYPAGE.EXPERT_TABS.PROFILE,
            element: withFallback(<ExpertProfile />),
            roles: ['EXPERT'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MYPAGE.EXPERT_TABS.REVIEWS,
            element: withFallback(<ExpertReviews />),
            roles: ['EXPERT'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MYPAGE.EXPERT_TABS.CREDENTIALS,
            element: withFallback(<ExpertCredentials />),
            roles: ['EXPERT'],
            errorElement: <ErrorComponent />,
          },
        ],
      },

      /* 마이페이지 ─ User */
      {
        path: ROUTES.MYPAGE.USER,
        element: withFallback(<UserMypage />),
        roles: ['USER'],
        errorElement: <ErrorComponent />,
        children: [
          {
            index: true,
            element: withFallback(<UserDashboard />),
            roles: ['USER'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MYPAGE.USER_TABS.REQUESTS,
            element: withFallback(<UserRequests />),
            roles: ['USER'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MYPAGE.USER_TABS.REVIEWS,
            element: withFallback(<UserReviews />),
            roles: ['USER'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MYPAGE.USER_TABS.SETTINGS,
            element: withFallback(<UserSettings />),
            roles: ['USER'],
            errorElement: <ErrorComponent />,
          },
        ],
      },

      /* 전문가 상세 (정적 import) */
      {
        path: ROUTES.EXPERT_DETAIL.ROOT,
        element: <ExpertDetail />,
        errorElement: <ErrorComponent />,
        children: [
          { index: true, element: <ExpertDetailInfo /> },
          {
            path: ROUTES.EXPERT_DETAIL.TABS.REVIEWS,
            element: <ExpertDetailReviews />,
            errorElement: <ErrorComponent />,
          },
        ],
      },

      // 매칭 현황 (lazy)
      {
        path: ROUTES.MATCHING_STATUS.ROOT,
        element: withFallback(<MatchingStatusPage />),
        roles: ['USER', 'EXPERT'],
        errorElement: <ErrorComponent />,
        children: [
          { index: true, element: <Navigate to="requests" replace /> },
          {
            path: ROUTES.MATCHING_STATUS.REQUESTS.ROOT,
            element: withFallback(<RequestsListPage />),
            roles: ['USER', 'EXPERT'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MATCHING_STATUS.PROPOSALS.ROOT,
            element: withFallback(<ProposalsListPage />),
            roles: ['USER', 'EXPERT'],
            errorElement: <ErrorComponent />,
          },
        ],
      },

      // 요청서 (lazy)
      {
        path: ROUTES.MATCHING_STATUS.REQUESTS.NEW,
        element: withFallback(<RequestFormPage />),
        roles: ['USER', 'EXPERT'],
        errorElement: <ErrorComponent />,
      },
      {
        path: ROUTES.MATCHING_STATUS.REQUESTS.DETAIL,
        element: withFallback(<RequestDetailPage />),
        errorElement: <ErrorComponent />,
      },
      {
        path: ROUTES.MATCHING_STATUS.REQUESTS.PROPOSALS,
        element: withFallback(<ProposalsForRequest />),
        roles: ['USER'],
        errorElement: <ErrorComponent />,
      },

      // 제안서 (lazy)
      {
        path: ROUTES.MATCHING_STATUS.PROPOSALS.NEW,
        element: withFallback(<ProposalFormPage />),
        roles: ['USER', 'EXPERT'],
        errorElement: <ErrorComponent />,
      },
      {
        path: ROUTES.MATCHING_STATUS.PROPOSALS.DETAIL,
        element: withFallback(<ProposalDetailPage />),
        errorElement: <ErrorComponent />,
      },

      // 계약 (lazy)
      {
        path: ROUTES.CONTRACTS.ROOT,
        roles: ['USER', 'EXPERT'],
        errorElement: <ErrorComponent />,
        children: [
          {
            path: ROUTES.CONTRACTS.NEW,
            element: withFallback(<ContractFormPage />),
            roles: ['USER', 'EXPERT'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.CONTRACTS.DETAIL,
            element: withFallback(<ContractDetailPage />),
            roles: ['USER', 'EXPERT'],
            errorElement: <ErrorComponent />,
          },
        ],
      },

      // 정산 (lazy)
      {
        path: ROUTES.EXPERT_SETTLEMENT,
        element: withFallback(<ExpertSettlementPage />),
        roles: ['EXPERT'],
        errorElement: <ErrorComponent />,
      },
      {
        path: ROUTES.USER_SETTLEMENT,
        element: withFallback(<UserSettlementPage />),
        roles: ['USER'],
        errorElement: <ErrorComponent />,
      },
    ],
  },

  /* 채팅 (lazy, 레이아웃 외부) */
  {
    path: ROUTES.CHAT.ROOT,
    element: withFallback(<Chat />),
    roles: ['USER', 'EXPERT'],
    errorElement: <ErrorComponent />,
  },
];
