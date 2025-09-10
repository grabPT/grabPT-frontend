import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getUnreadCount } from '@/apis/getUnreadCount';
import LoadingMuscle from '@/components/LoadingMuscle';
import { getAlarmList } from '@/layout/apis/alarm';
import { useAlarmStore } from '@/store/useAlarmStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useUnreadStore } from '@/store/useUnreadStore';
import { decodeCookie } from '@/utils/decodeCookie';

export const AuthCallback = () => {
  const nav = useNavigate();
  const { setRole, setUserId } = useRoleStore();

  useEffect(() => {
    (async () => {
      const roleRaw = decodeCookie('ROLE');
      const userIdRaw = Number(decodeCookie('USER_ID'));
      console.log('지금 제대로 되는중임?');
      console.log(roleRaw);
      console.log(userIdRaw);
      console.log('여기까지는 오나?');
      setUserId(userIdRaw);

      // // 초기 알람 세팅
      // const initialAlarm = await getAlarmList();
      // useAlarmStore.getState().setAlarmCount(initialAlarm.result.length);

      // // 초기 안읽은 메시지 세팅
      // const initial = await getUnreadCount();
      // useUnreadStore.getState().setUnReadCount(initial.result);
      // console.log(`현재unreadCount : ${initial.result}`);

      // 초기 알람 세팅
      try {
        const initialAlarm = await getAlarmList();
        useAlarmStore.getState().setAlarmCount(initialAlarm.result.length);
      } catch (error) {
        console.error('알람 데이터 로딩 실패:', error);
        useAlarmStore.getState().setAlarmCount(0);
      }

      // 초기 안읽은 메시지 세팅
      try {
        const initial = await getUnreadCount();
        useUnreadStore.getState().setUnReadCount(initial.result);
        console.log(`현재unreadCount : ${initial.result}`);
      } catch (error) {
        console.error('읽지 않은 메시지 데이터 로딩 실패:', error);
        useUnreadStore.getState().setUnReadCount(0);
        console.log('현재unreadCount : 0 (기본값)');
      }
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
    })();
  }, [nav, setRole, setUserId]);

  return <LoadingMuscle />;
};
