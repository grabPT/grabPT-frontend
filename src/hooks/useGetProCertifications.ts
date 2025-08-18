import { useQuery } from '@tanstack/react-query';

import {
  type getProCertificationResponseDto,
  getProCertifications,
} from '@/apis/getProCertifications';

export const useGetProCertifications = () => {
  return useQuery<getProCertificationResponseDto>({
    queryKey: ['pro-certifications'],
    queryFn: getProCertifications,
    refetchOnWindowFocus: false, // 창이 포커스될 때마다 새로 고침하지 않음
  });
};
