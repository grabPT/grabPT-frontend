import { useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { useRoleStore } from '@/store/useRoleStore';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const bootstrap = useRoleStore((s) => s.bootstrap);

  useEffect(() => {
    (async () => {
      try {
        await bootstrap(); // 서버의 HttpOnly 쿠키 기반 /me 호출 → store 갱신
        navigate(sp.get('next') || '/', { replace: true });
      } catch (e) {
        console.error('Auth bootstrap failed', e);
        navigate('/login', { replace: true });
      }
    })();
  }, [bootstrap, navigate, sp]);

  return <div>로그인 처리 중...</div>;
}
