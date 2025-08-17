import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import LoadingMuscle from '@/components/LoadingMuscle';
import { useRoleStore } from '@/store/useRoleStore';
import { decodeCookie } from '@/utils/decodeCookie';

export const AuthCallback = () => {
  const nav = useNavigate();
  const { setRole, setUserId } = useRoleStore();

  useEffect(() => {
    const roleRaw = decodeCookie('role');
    const userIdRaw = Number(decodeCookie('userId'));
    setUserId(userIdRaw);
    if (roleRaw === 'EXPERT') {
      setRole('EXPERT');
      nav('/expert', { replace: true });
    } else if (roleRaw === 'USER') {
      setRole('USER');
      nav('/', { replace: true });
    } else {
      setRole('GUEST');
      nav('/', { replace: true });
    }
  }, [nav, setRole, setUserId]);

  return <LoadingMuscle />;
};
