import { useQuery } from '@tanstack/react-query';

import { getCanEditRequest } from '@/features/Request/apis/request';

export const useGetCanEditRequest = (id: number) =>
  useQuery({
    queryKey: ['requestCanEdit', id],
    queryFn: () => getCanEditRequest(id),
    enabled: !!id,
    select: (res) => res.result,
  });
