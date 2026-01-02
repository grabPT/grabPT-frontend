import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getUnreadCount } from '@/apis/getUnreadCount';
import LoadingMuscle from '@/components/LoadingMuscle';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROLES } from '@/constants/roles';
import ROUTES from '@/constants/routes';
import { getAlarmList } from '@/layout/apis/alarm';
import { useAlarmStore } from '@/store/useAlarmStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useUnreadStore } from '@/store/useUnreadStore';
import { decodeBase64Utf8 } from '@/utils/decodeBaseUtf8';
import { decodeCookie } from '@/utils/decodeCookie';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setRole, setUserId } = useRoleStore();
  const setAlarmCount = useAlarmStore((state) => state.setAlarmCount);
  const setUnReadCount = useUnreadStore((state) => state.setUnReadCount);
  alert('여긴왔음');
  useEffect(() => {
    const processAuthAndFetch = async () => {
      // 1. 개발환경 분류해서 유저 분류
      const params = new URLSearchParams(window.location.search);
      const stage = import.meta.env.VITE_STAGE;
      alert(stage);
      let roleRaw: string | null = null;
      let userIdRaw: number | null = null;
      // grabpt-dev.vercel.app/authcallback?access_token=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKemRXSWlPaUpzWldWMFlXVnpkV3RoUUdkdFlXbHNMbU52YlNJc0luSnZiR1VpT2lKVlUwVlNJaXdpYVdGMElqb3hOelU0TXpjNE9EWTVMQ0psZUhBaU9qRTNOVGd6T1RNeU5qbDkuUjdnQ3pNeGszUTAxcmN6djJNNFhRSENZanpRMDQ2b2FvMldvSjFTWDBZTQ==&refresh_token=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKemRXSWlPaUpzWldWMFlXVnpkV3RoUUdkdFlXbHNMbU52YlNJc0ltbGhkQ0k2TVRjMU9ETTNPRGcyT1N3aVpYaHdJam94TnpVNE9UZ3pOalk1ZlEuc0xLbnEzdVJJYnJQU3o3NngzV0pXTnM3V3VKeWJPaG10VGtBbTI2T280Zw==&role=VVNFUg==&user_id=OA==
      //로컬 서버, 개발 서버는 파라미터로 받고 실제 배포 서버는 쿠키로 받음
      if (stage == 'development' || stage == 'staging') {
        roleRaw = params.get('role');
        console.log(`롤러:${roleRaw}`);
        userIdRaw = Number(params.get('user_id'));
        console.log(`유저아이디:${userIdRaw}`);
        const accessTokenRaw = decodeBase64Utf8(params.get('access_token'));
        const refreshTokenRaw = decodeBase64Utf8(params.get('refresh_token'));
        localStorage.setItem('accessToken', accessTokenRaw || '');
        localStorage.setItem('refreshToken', refreshTokenRaw || '');
      } else {
        roleRaw = decodeCookie('ROLE');
        userIdRaw = Number(decodeCookie('USER_ID'));
      }

      const role = roleRaw === ROLES.PRO || roleRaw === ROLES.USER ? roleRaw : ROLES.GUEST;
      console.log(role);
      console.log(userIdRaw);
      setRole(role);
      setUserId(userIdRaw);

      // 2. fetchQuery를 사용하여 데이터를 가져옵니다.
      try {
        const [alarmResponse, unreadResponse] = await Promise.all([
          // fetchQuery는 queryKey와 queryFn을 인자로 받습니다.
          queryClient.fetchQuery({
            queryKey: QUERY_KEYS.alarm,
            queryFn: getAlarmList,
          }),
          queryClient.fetchQuery({
            queryKey: QUERY_KEYS.unreadCount,
            queryFn: getUnreadCount,
          }),
        ]);

        setAlarmCount(alarmResponse.result.length);
        setUnReadCount(unreadResponse.result);
      } catch (error) {
        // fetchQuery는 실패 시 Promise를 reject하므로 try...catch로 에러를 잡을 수 있습니다.
        console.error('초기 데이터 로딩 실패:', error);
        setAlarmCount(0);
        setUnReadCount(0);
      }

      // 3. 리다이렉트
      if (role === ROLES.PRO) {
        navigate(ROUTES.HOME.PRO);
      } else {
        navigate(ROUTES.HOME.ROOT);
      }
    };

    processAuthAndFetch();
  }, [navigate, setRole, setUserId, setAlarmCount, setUnReadCount, queryClient]);

  return <LoadingMuscle />;
};
