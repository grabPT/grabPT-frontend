// routes/guards.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useRoleStore } from '@/store/useRoleStore';
import type { Role } from '@/types/Role';

export function Guard({ allow }: { allow?: Role[]; guestOnly?: boolean }) {
  const { role } = useRoleStore();
  const location = useLocation();

  // 권한 제한
  if (allow?.length) {
    // 역할이 허용 목록에 없을 때만 리다이렉트 처리
    if (!allow.includes(role!)) {
      // GUEST인데 허용되지 않은 경우 로그인 유도 (다음 경로 유지)
      if (role === 'GUEST') {
        const next = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login?next=${next}`} replace />;
      }
      // 로그인된 다른 역할이지만 권한 불일치
      if (role === 'EXPERT') {
        return <Navigate to="/expert" replace />;
      }
      return <Navigate to="/" replace />;
    }
  }
  return <Outlet />;
}
