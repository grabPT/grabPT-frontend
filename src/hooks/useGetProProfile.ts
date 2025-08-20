import { useQuery } from '@tanstack/react-query';

import { getProProfile, getProProfileWithUserId } from '@/apis/getProProfile';
import { useRoleStore } from '@/store/useRoleStore';
import type { ProProfileType } from '@/types/ProPrifleType';

//전문가가 자기 프로필 조회
export const useProProfileQuery = () => {
  const { role } = useRoleStore();
  return useQuery<ProProfileType>({
    queryKey: ['pro-profile'],
    queryFn: async () => {
      const data = await getProProfile();
      return data.result;
    },
    enabled: role === 'EXPERT',
    staleTime: 1000 * 60 * 5,
  });
};

//일반 사용자가 전문가 프로필 조회
export const useGetProProfileWithUserId = (userId: number) => {
  return useQuery<ProProfileType>({
    queryKey: ['pro-profile', userId],
    queryFn: async () => {
      const data = await getProProfileWithUserId(userId);
      return data.result;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
