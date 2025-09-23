import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getCredentialsList } from '@/features/ProDetail/apis/getCredentialsList';
import type {
  getCredentialListResponseDto,
  getCredentialListResultDTO,
} from '@/features/ProDetail/types/credential';

export const useGetCredentialList = () =>
  useQuery<getCredentialListResponseDto, Error, getCredentialListResultDTO>({
    queryKey: QUERY_KEYS.credentialList(),
    queryFn: () => getCredentialsList(),
    select: (res) => res.result,
    staleTime: 5_000,
    gcTime: 300_000,
    retry: 2,
  });
