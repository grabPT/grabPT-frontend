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
import type { Role } from '@/types/Role';
import { decodeCookie } from '@/utils/decodeCookie';

/**
 * 소셜 로그인 후 콜백 페이지
 * @params : access_token,refresh_token,role,user_id
 */
const AuthCallback = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 유저정보 store불러옴 셋팅 위해서
  const { setRole, setUserId } = useRoleStore();

  // 소켓연결
  const setAlarmCount = useAlarmStore((state) => state.setAlarmCount);
  const setUnReadCount = useUnreadStore((state) => state.setUnReadCount);

  useEffect(() => {
    const processAuthAndFetch = async () => {
      const params = new URLSearchParams(window.location.search);
      const stage = import.meta.env.VITE_STAGE;

      let roleRaw: string | null = null;
      let userIdRaw: number | null = null;

      // 로컬 서버, 개발 서버는 파라미터로 받고 로컬스토리지에 저장
      // 실제 배포 서버는 쿠키로 받아서 set Cookie - 확인 못했음 아직
      if (stage == 'development' || stage == 'staging') {
        const accessTokenRaw = params.get('access_token');
        const refreshTokenRaw = params.get('refresh_token');
        // 토큰 없으면 에러처리
        if (accessTokenRaw == null || refreshTokenRaw == null) {
          alert('로그인 중 에러가 발생했습니다. 다시 시도해주세요.');
          console.error(
            `토큰이 존재하지 않습니다. accessToken: ${accessTokenRaw} refreshToken: ${refreshTokenRaw}`,
          );
          navigate(ROUTES.HOME.ROOT);
          return;
        }
        localStorage.setItem('accessToken', accessTokenRaw || '');
        localStorage.setItem('refreshToken', refreshTokenRaw || '');

        // 로컬,개발서버에선 params에서
        roleRaw = params.get('role');
        userIdRaw = Number(params.get('user_id'));
      } else {
        roleRaw = decodeCookie('role');
        userIdRaw = Number(decodeCookie('userId'));
      }

      // 유저 정보 없으면 에러 처리
      // roleRaw가 빈 문자열이거나 null일 때, userIdRaw가 0이거나 NaN일 때 필터링
      if (!roleRaw || !userIdRaw || isNaN(userIdRaw)) {
        alert('로그인 정보를 불러올 수 없습니다. 다시 시도해주세요.');
        console.error(`유저 정보가 유효하지 않습니다. roleRaw: ${roleRaw} userIdRaw: ${userIdRaw}`);
        navigate(ROUTES.HOME.ROOT);
        return;
      }

      // 스토어 최신화
      setRole(roleRaw as Role);
      setUserId(userIdRaw);

      // 2.fetchQuery를 사용하여 알람, 안읽은수 api 날리고 스토어 최신화
      // 내가 이런 코드를 썼었네..;;
      try {
        const [alarmResponse, unreadResponse] = await Promise.all([
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
        alert('로그인 중 에러가 발생했습니다. 다시 시도해주세요.');
        console.error('초기 데이터 로딩 실패:', error);
        setAlarmCount(0);
        setUnReadCount(0);
      }

      // 3.리다이렉트 => roleRaw가 undefined거나 잘못된 값일 때 ROOT로 리다렉하도록 변경
      if (roleRaw !== ROLES.PRO) {
        navigate(ROUTES.HOME.ROOT);
      } else {
        navigate(ROUTES.HOME.PRO);
      }
    };

    processAuthAndFetch();
  }, [navigate, setRole, setUserId, setAlarmCount, setUnReadCount, queryClient]);
  return <LoadingMuscle />;
};

export default AuthCallback;
