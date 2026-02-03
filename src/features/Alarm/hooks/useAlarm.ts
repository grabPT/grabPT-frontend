import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getAllAlarmList, getUnreadAlarmList, patchReadAlarm } from '@/features/Alarm/apis/alarm';
import type { postAlarmReadResponseDto } from '@/features/Alarm/types/alarmType';

export const useGetAllAlarmList = (size: number) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.ALARM.infinite(size),
    queryFn: ({ pageParam }) => getAllAlarmList({ page: pageParam, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.last) return undefined;
      return lastPage.result.pageable.pageNumber + 1;
    },
    retry: 2,
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
