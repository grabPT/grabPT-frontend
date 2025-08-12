import { useQuery } from '@tanstack/react-query';

import { getSocialLoginInfo } from '@/features/Signup/apis/auth';
import type { SocialLoginInfo } from '@/features/Signup/types/Auth';
import type { CommonResponseDto } from '@/types/commonResponseDto';

//푸후 수정

export const useGetSocialInfo = () => {
  return useQuery<CommonResponseDto<SocialLoginInfo>, Error, SocialLoginInfo>({
    queryKey: ['socialInfo'],
    queryFn: getSocialLoginInfo,
    select: (res) => res.result,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 20,
    retry: 1,
    placeholderData: (prev) => prev,
  });
};
