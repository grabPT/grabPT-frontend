import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { QUERY_KEYS } from '@/constants/queryKeys';
import ROUTES from '@/constants/routes';

import { deleteContract } from '../apis/deleteContract';

export const useDeleteContract = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (contractId: number) => deleteContract(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONTRACT.all });
      navigate(ROUTES.CONTRACTS.ROOT);
    },
    onError: (error) => {
      console.error('계약서 삭제 실패:', error);
    },
  });
};
