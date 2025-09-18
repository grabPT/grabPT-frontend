import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getUnreadCount } from '@/apis/getUnreadCount';
import LoadingMuscle from '@/components/LoadingMuscle';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROLES } from '@/constants/roles';
import ROUTES from '@/constants/routes';
import { useGetUnreadCount } from '@/hooks/useGetUnreadCount';
import { getAlarmList } from '@/layout/apis/alarm';
import { useGetAlarmList } from '@/layout/hooks/useAlarm';
import { useAlarmStore } from '@/store/useAlarmStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useUnreadStore } from '@/store/useUnreadStore';
import { decodeCookie } from '@/utils/decodeCookie';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setRole, setUserId } = useRoleStore();
  const setAlarmCount = useAlarmStore((state) => state.setAlarmCount);
  const setUnReadCount = useUnreadStore((state) => state.setUnReadCount);

  // 2. 훅을 컴포넌트 최상단에서 호출합니다.
  // enabled: false 옵션으로, 컴포넌트가 렌더링될 때 자동으로 API가 호출되는 것을 막습니다.
  const { refetch: refetchAlarmList } = useGetAlarmList();
  const { refetch: refetchUnreadCount } = useGetUnreadCount();

  useEffect(() => {
    const processAuthAndFetch = async () => {
      const params = new URLSearchParams(window.location.search);
      const isDev = import.meta.env.DEV;
      let roleRaw: string | null = null;
      let userIdRaw: number | null = null;

      if (isDev) {
        roleRaw = params.get('role');
        userIdRaw = Number(params.get('user_id'));
        const accessTokenRaw = params.get('access_token');
        localStorage.setItem('accessToken', accessTokenRaw || '');
      } else {
        roleRaw = decodeCookie('ROLE');
        userIdRaw = Number(decodeCookie('USER_ID'));
      }

      const role = roleRaw === ROLES.EXPERT || roleRaw === ROLES.USER ? roleRaw : ROLES.GUEST;
      setRole(role);
      setUserId(userIdRaw);

      // 3. fetchQuery를 사용하여 데이터를 가져옵니다.
      try {
        const [alarmResponse, unreadResponse] = await Promise.all([
          // fetchQuery는 queryKey와 queryFn을 인자로 받습니다.
          // useGetAlarmList 훅을 수정할 필요 없이, 해당 훅이 사용하는 queryKey와 queryFn을 그대로 사용합니다.
          queryClient.fetchQuery({
            queryKey: QUERY_KEYS.alarm,
            queryFn: getAlarmList,
          }),
          queryClient.fetchQuery({
            queryKey: QUERY_KEYS.unreadCount,
            queryFn: getUnreadCount,
          }),
        ]);

        // fetchQuery는 API 응답 전체를 반환하므로, 직접 데이터를 추출합니다.
        setAlarmCount(alarmResponse.result.length);
        setUnReadCount(unreadResponse.result);
      } catch (error) {
        // fetchQuery는 실패 시 Promise를 reject하므로 try...catch로 에러를 잡을 수 있습니다.
        console.error('초기 데이터 로딩 실패:', error);
        setAlarmCount(0);
        setUnReadCount(0);
      }

      // 5. 홈으로 이동
      if (role === ROLES.EXPERT) {
        navigate(ROUTES.HOME.EXPERT);
      } else {
        navigate(ROUTES.HOME.ROOT);
      }
    };

    processAuthAndFetch();
  }, [
    navigate,
    setRole,
    setUserId,
    refetchAlarmList,
    refetchUnreadCount,
    setAlarmCount,
    setUnReadCount,
    queryClient,
  ]);

  return <LoadingMuscle />;
};
