import { useNavigate } from 'react-router-dom';

import LoadingMuscle from '@/components/LoadingMuscle';
import { useRoleStore } from '@/store/useRoleStore';
import { decodeCookie } from '@/utils/decodeCookie';

export const AuthCallback = () => {
  const nav = useNavigate();
  const { setRole } = useRoleStore();
  const roleRaw = decodeCookie('role');
  if (roleRaw === 'EXPERT') {
    setRole('EXPERT');
    nav('/expert');
  } else if (roleRaw === 'USER') {
    setRole('USER');
    nav('/');
  } else setRole('GUEST');
  return <LoadingMuscle />;
};
