import { useMutation, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getAllAlarmList, getUnreadAlarmList, patchReadAlarm } from '@/layout/apis/alarm';
import type { getAllAlarmListRequestDto, postAlarmReadResponseDto } from '@/layout/types/alarmType';

export const useGetAllAlarmList = (params: getAllAlarmListRequestDto) => {
  return useQuery({
    queryKey: QUERY_KEYS.ALARM.allList(params),
    queryFn: () => getAllAlarmList(),
    retry: 2, //2번까지 재시도
  });
};

export const useGetUnreadAlarmList = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ALARM.unreadList,
    queryFn: () => getUnreadAlarmList(),
    retry: 2, //2번까지 재시도
  });
};

export const usePatchReadAlarm = (alarmId: number) => {
  return useMutation<postAlarmReadResponseDto, Error, number>({
    mutationFn: () => patchReadAlarm(alarmId),
    onError: (error) => {
      console.error('읽음처리 mutate실패', error);
    },
  });
};
