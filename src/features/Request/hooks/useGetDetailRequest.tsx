import { getDetailRequest } from "@/features/Request/apis/request";
import { useQuery } from "@tanstack/react-query";

export const useRequestDetail = (id: number) =>
  useQuery({
    queryKey: ['requestId', id],
    queryFn: () => getDetailRequest(id),
    enabled: !!id,
    select: (res) => res.result,
  });