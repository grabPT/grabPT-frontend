import { Suspense, lazy } from 'react';

import { Navigate } from 'react-router-dom';

import ErrorComponent from '@/components/ErrorComponent';
import LoadingMuscle from '@/components/LoadingMuscle';
import ROUTES from '@/constants/routes';
import { ProDetailInfo } from '@/features/ProDetail/components/ProDetailInfo';
import ProDetailReviews from '@/features/ProDetail/components/ProDetailReviews';
import Layout from '@/layout/Layout';
// ✅ 초기 번들에 포함 (정적 import)
import AuthCallback from '@/pages/Auth/AuthCallback';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import { ProDetail } from '@/pages/ExpertDetail/ProDetail';
import ProMainPage from '@/pages/Home/ProMainPage';
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

// 404페이지
const NotFound = createLazyComponent(() => import('@/pages/NotFound'));

// ✅ lazy 로드 컴포넌트들 (에러 처리 추가)
const CategoryPage = createLazyComponent(() => import('@/pages/Category/CategoryPage'));

// 마이페이지
const ProMypage = createLazyComponent(() => import('@/pages/MyPage/ProMypage'));
const ProDashboard = createLazyComponent(
  () => import('@/features/ProMypage/components/ProDashboard'),
);
const ProProfile = createLazyComponent(() => import('@/features/ProMypage/components/ProProfile'));
const ProReviews = createLazyComponent(() => import('@/features/ProMypage/components/ProReviews'));
const ProCertifications = createLazyComponent(
  () => import('@/features/ProMypage/components/ProCertifications'),
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
const SuggestListPage = createLazyComponent(() => import('@/pages/Suggests/SuggestListPage'));
const RequestFormPage = createLazyComponent(() => import('@/pages/Requests/RequestFormPage'));
const RequestDetailPage = createLazyComponent(() => import('@/pages/Requests/RequestDetailPage'));
const SuggestsForRequest = createLazyComponent(
  () => import('@/pages/Requests/SuggestListForRequest'),
);
const SuggestFormPage = createLazyComponent(() => import('@/pages/Suggests/SuggestFormPage'));
const SuggestDetailPage = createLazyComponent(() => import('@/pages/Suggests/SuggestDetailPage'));

// 계약/정산
const ContractFormPage = createLazyComponent(() => import('@/pages/Contracts/ContractFormPage'));
const ContractDetailPage = createLazyComponent(
  () => import('@/pages/Contracts/ContractDetailPage'),
);
// const ProSettlementPage = createLazyComponent(() => import('@/pages/Settlement/ProSee'));
const ProSettlementPage = createLazyComponent(() => import('@/pages/Settlement/ProSettlementPage'));
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
    roles: ['PRO', 'GUEST', 'USER'],
    children: [
      // 홈 (초기 번들)
      {
        index: true,
        element: <UserMainPage />,
        roles: ['USER', 'GUEST'],
        errorElement: <ErrorComponent />,
      },
      {
        path: ROUTES.HOME.PRO,
        element: <ProMainPage />,
        roles: ['PRO'],
        errorElement: <ErrorComponent />,
      },

      // 카테고리 (lazy)
      {
        path: 'category/*',
        element: withFallback(<CategoryPage />),
        roles: ['PRO', 'GUEST', 'USER'],
        errorElement: <ErrorComponent />, // 개별 에러 처리 추가
      },

      /* 마이페이지 ─ Pro */
      {
        path: ROUTES.MYPAGE.PRO,
        element: withFallback(<ProMypage />),
        roles: ['PRO'],
        errorElement: <ErrorComponent />,
        children: [
          {
            index: true,
            element: withFallback(<ProDashboard />),
            roles: ['PRO'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MYPAGE.PRO_TABS.PROFILE,
            element: withFallback(<ProProfile />),
            roles: ['PRO'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MYPAGE.PRO_TABS.REVIEW_LIST,
            element: withFallback(<ProReviews />),
            roles: ['PRO'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MYPAGE.PRO_TABS.CERTIFICATIONS,
            element: withFallback(<ProCertifications />),
            roles: ['PRO'],
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
            path: ROUTES.MYPAGE.USER_TABS.REQUEST_LIST,
            element: withFallback(<UserRequests />),
            roles: ['USER'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MYPAGE.USER_TABS.REVIEW_LIST,
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
        path: ROUTES.PRO_DETAIL.ROOT,
        element: <ProDetail />,
        errorElement: <ErrorComponent />,
        children: [
          { index: true, element: <ProDetailInfo /> },
          {
            path: ROUTES.PRO_DETAIL.TABS.REVIEW_LIST,
            element: <ProDetailReviews />,
            errorElement: <ErrorComponent />,
          },
        ],
      },

      // 매칭 현황 (lazy)
      {
        path: ROUTES.MATCHING_STATUS.ROOT,
        element: withFallback(<MatchingStatusPage />),
        roles: ['USER', 'PRO'],
        errorElement: <ErrorComponent />,
        children: [
          { index: true, element: <Navigate to="requests" replace /> },
          {
            path: ROUTES.MATCHING_STATUS.REQUESTS.ROOT,
            element: withFallback(<RequestsListPage />),
            roles: ['USER', 'PRO'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.MATCHING_STATUS.SUGGESTS.ROOT,
            element: withFallback(<SuggestListPage />),
            roles: ['USER', 'PRO'],
            errorElement: <ErrorComponent />,
          },
        ],
      },

      // 요청서 (lazy)
      {
        path: ROUTES.MATCHING_STATUS.REQUESTS.NEW,
        element: withFallback(<RequestFormPage />),
        roles: ['USER', 'PRO'],
        errorElement: <ErrorComponent />,
      },
      {
        path: ROUTES.MATCHING_STATUS.REQUESTS.DETAIL,
        element: withFallback(<RequestDetailPage />),
        errorElement: <ErrorComponent />,
      },
      {
        path: ROUTES.MATCHING_STATUS.REQUESTS.SUGGESTS,
        element: withFallback(<SuggestsForRequest />),
        roles: ['USER'],
        errorElement: <ErrorComponent />,
      },

      // 제안서 (lazy)
      {
        path: ROUTES.MATCHING_STATUS.SUGGESTS.NEW,
        element: withFallback(<SuggestFormPage />),
        roles: ['USER', 'PRO'],
        errorElement: <ErrorComponent />,
      },
      {
        path: ROUTES.MATCHING_STATUS.SUGGESTS.DETAIL,
        element: withFallback(<SuggestDetailPage />),
        errorElement: <ErrorComponent />,
      },

      // 계약 (lazy)
      {
        path: ROUTES.CONTRACTS.ROOT,
        roles: ['USER', 'PRO'],
        errorElement: <ErrorComponent />,
        children: [
          {
            path: ROUTES.CONTRACTS.NEW,
            element: withFallback(<ContractFormPage />),
            roles: ['USER', 'PRO'],
            errorElement: <ErrorComponent />,
          },
          {
            path: ROUTES.CONTRACTS.DETAIL,
            element: withFallback(<ContractDetailPage />),
            roles: ['USER', 'PRO'],
            errorElement: <ErrorComponent />,
          },
        ],
      },

      // 정산 (lazy)
      {
        path: ROUTES.PRO_SETTLEMENT,
        element: withFallback(<ProSettlementPage />),
        roles: ['PRO'],
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
    roles: ['USER', 'PRO'],
    errorElement: <ErrorComponent />,
  },

  // 404
  {
    path: '/404',
    element: withFallback(<NotFound />),
    roles: ['PRO', 'USER', 'GUEST'],
    errorElement: <ErrorComponent />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
    roles: ['PRO', 'USER', 'GUEST'],
    errorElement: <ErrorComponent />,
  },
];
