import { useMutation, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getAlarmList, patchReadAlarm } from '@/layout/apis/alarm';
import type {
  alarmType,
  getAlarmListResponseDto,
  postAlarmReadResponseDto,
} from '@/layout/types/alarmType';

export const useGetAlarmList = () => {
  return useQuery<getAlarmListResponseDto, Error, alarmType[]>({
    queryKey: QUERY_KEYS.alarm,
    queryFn: () => getAlarmList(),
    enabled: true,
    select: (res) => res.result,
    staleTime: 60_000, // 1분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
};

export const usePatchReadAlarm = (alarmId: number) => {
  return useMutation<postAlarmReadResponseDto, Error, number>({
    mutationFn: () => patchReadAlarm(alarmId),
    onSuccess: (data) => {
      console.log('읽음처리 mutate성공', data);
    },
    onError: (error) => {
      console.log('읽음처리 mutate실패', error);
    },
  });
};
