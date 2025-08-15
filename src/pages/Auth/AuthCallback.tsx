import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import LoadingMuscle from '@/components/LoadingMuscle';
import { useRoleStore } from '@/store/useRoleStore';
import { decodeCookie } from '@/utils/decodeCookie';

export const AuthCallback = () => {
  const nav = useNavigate();
  const { setRole, setAccessToken } = useRoleStore();

  useEffect(() => {
    const accessTokenRaw = decodeCookie('accessToken');
    const roleRaw = decodeCookie('role');

    if (roleRaw === 'EXPERT') {
      setRole('EXPERT');
      console.log(accessTokenRaw);
      setAccessToken(accessTokenRaw);
      nav('/expert', { replace: true });
    } else if (roleRaw === 'USER') {
      setRole('USER');
      setAccessToken(accessTokenRaw);
      nav('/', { replace: true });
    } else {
      setRole('GUEST');
      setAccessToken(accessTokenRaw);
      nav('/', { replace: true });
    }
  }, [nav, setAccessToken, setRole]);

  return <LoadingMuscle />;
};
