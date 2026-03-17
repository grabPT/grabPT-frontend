import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import type { getContractInfoResultType } from '@/features/Contract/types/getContractInfoType';

type UseContractAccessGuardParams = {
  contract?: getContractInfoResultType;
  isFetched: boolean;
};

export const useContractAccessGuard = ({ contract, isFetched }: UseContractAccessGuardParams) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetched || !contract) return;

    if (contract.paymentStatus === 'OK' || contract.paymentStatus === 'CANCEL') {
      alert('결제가 완료되었거나 만료된 계약서입니다. 계약서 목록 페이지로 이동합니다.');
      navigate(ROUTES.CONTRACTS.ROOT, { replace: true });
    }
  }, [contract, isFetched, navigate]);
};
