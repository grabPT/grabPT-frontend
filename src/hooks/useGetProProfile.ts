import { useQuery } from '@tanstack/react-query';

import { getProProfile, getProProfileWithUserId } from '@/apis/getProProfile';
import type { getProProfileResponseDto } from '@/types/ProPrifleType';

//전문가가 자기 프로필 조회
export const useProProfileQuery = () => {
  return useQuery<getProProfileResponseDto>({
    queryKey: ['pro-profile'], // userId 제거
    queryFn: getProProfile, // 바로 함수 참조 가능
  });
};

//일반 사용자가 전문가 프로필 조회
export const useGetProProfileWithUserId = (userId: number) => {
  return useQuery<getProProfileResponseDto>({
    queryKey: ['pro-profile', userId],
    queryFn: () => getProProfileWithUserId(userId),
  });
};
