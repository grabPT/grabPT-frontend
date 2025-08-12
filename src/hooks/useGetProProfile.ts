import { useQuery } from '@tanstack/react-query';

import { getProProfile } from '@/apis/getProProfile';
import type { getProPrifleResponseDto } from '@/types/ProPrifleType';

export const useProProfileQuery = () => {
  return useQuery<getProPrifleResponseDto>({
    queryKey: ['pro-profile'], // userId 제거
    queryFn: getProProfile, // 바로 함수 참조 가능
  });
};
