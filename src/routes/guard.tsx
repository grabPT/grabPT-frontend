// routes/guards.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import LoadingMuscle from '@/components/LoadingMuscle';
import { useRoleStore } from '@/store/useRoleStore';

import type { Role } from './types';

export function Guard({ allow, guestOnly }: { allow?: Role[]; guestOnly?: boolean }) {
  const { status, role } = useRoleStore();
  const location = useLocation();

  if (status === 'Loading') return <LoadingMuscle />;

  // 게스트만 접근 가능 (로그인 상태면 튕김)
  if (guestOnly) {
    return status === 'Authorized' ? <Navigate to="/" replace /> : <Outlet />;
  }

  // 권한 제한
  if (allow && allow.length > 0) {
    if (status !== 'Authorized') {
      const next = encodeURIComponent(location.pathname + location.search);
      return <Navigate to={`/login?next=${next}`} replace />;
    }
    if (!allow.includes(role!)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
}
