import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getCerificationsList } from '@/features/ProDetail/apis/getCertificationsList';
import type {
  getCredentialListResponseDto,
  getCredentialListResultDTO,
} from '@/features/ProDetail/types/credential';

export const useGetCertificationList = () =>
  useQuery<getCredentialListResponseDto, Error, getCredentialListResultDTO>({
    queryKey: QUERY_KEYS.certificationList(),
    queryFn: () => getCerificationsList(),
    select: (res) => res.result,
    staleTime: 5_000,
    gcTime: 300_000,
    retry: 2,
  });
