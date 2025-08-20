import { useNavigate } from 'react-router-dom';

import { urlFor } from '@/constants/routes';

interface UserPaymentsCardProps {
  data: {
    contractId: number;
    trainerName: string;
    ptCount: number;
    paymentAmount: number;
    paymentDate: string;
  };
}
export const UserPaymentsCard = ({ data }: UserPaymentsCardProps) => {
  const navigate = useNavigate();
  const navigateToContractDetail = () => {
    navigate(urlFor.contractDetail(data.contractId));
  };
  return (
    <div
      className="flex h-[3.75rem] w-[55rem] items-center rounded-[0.625rem] text-[0.8rem] font-semibold shadow-[4px_4px_10px_rgba(0,0,0,0.25)]"
      onClick={navigateToContractDetail}
    >
      <div className="flex flex-1 items-center gap-3">
        <span>{data.trainerName}</span>
      </div>
      <div className="flex-1 text-center">
        <span>{data.ptCount}</span>
      </div>
      <div className="flex-1 text-center">
        <span>{data.paymentAmount}원</span>
      </div>
      <div className="flex-1 text-center">
        <span>{data.paymentDate}</span>
      </div>
    </div>
  );
};
