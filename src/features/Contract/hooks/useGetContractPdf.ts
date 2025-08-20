import { useQuery } from '@tanstack/react-query';

import { getContractPdf } from '@/features/Contract/apis/getContractPdf';
import type {
  getContractPdfRequestDto,
  getContractPdfResponseDto,
} from '@/features/Contract/types/getContractPdfType';

export const useGetContractPdf = (params: getContractPdfRequestDto) => {
  return useQuery<getContractPdfResponseDto, Error, string>({
    queryKey: ['contractPdf', params],
    queryFn: () => getContractPdf(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 300_000, // 5분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
};
