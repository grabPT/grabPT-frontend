// src/components/AuthGate.tsx
import { useEffect } from 'react';

import LoadingMuscle from '@/components/LoadingMuscle';
import { useRoleStore } from '@/store/useRoleStore';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const status = useRoleStore((s) => s.status);
  const bootstrap = useRoleStore((s) => s.bootstrap);

  useEffect(() => {
    if (status === 'Loading') {
      (async () => {
        try {
          await bootstrap(); // /me 호출 → store 세팅 (쿠키는 서버가 심어줌)
          console.log("나타나라 제발",status);
        } catch (e) {
          // 실패 시 내부에서 Anon 세팅했다고 가정
          console.error('bootstrap failed', e);
        }
      })();
    }
  }, [status, bootstrap]);

  if (status === 'Loading') {
    return <LoadingMuscle />;
  }
  return <>{children}</>;
}
