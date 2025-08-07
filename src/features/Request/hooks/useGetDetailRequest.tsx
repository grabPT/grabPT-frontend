import { useQuery } from '@tanstack/react-query';

import { getDetailRequest } from '@/features/Request/apis/request';

export const useGetDetailRequest = (id: number) =>
  useQuery({
    queryKey: ['requestId', id],
    queryFn: () => getDetailRequest(id),
    enabled: !!id,
    select: (res) => res.result,
  });
