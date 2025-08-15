import { useQuery } from '@tanstack/react-query';

import { getProProfile } from '@/apis/getProProfile';
import type { getProProfileResponseDto } from '@/types/ProPrifleType';

export const useProProfileQuery = () => {
  return useQuery<getProProfileResponseDto>({
    queryKey: ['pro-profile'], // userId 제거
    queryFn: getProProfile, // 바로 함수 참조 가능
  });
};
