import { useNavigate } from 'react-router-dom';

import { urlFor } from '@/constants/routes';

interface UserPaymentsCardProps {
  data: {
    contractId: number;
    userName: string;
    ptCount: number;
    paymentAmount: number;
    paymentDate: number[]; // [year, month, day, hour, minute, second, nanos]
  };
}

const formatPaymentDate = (arr: number[]) => {
  const [year, month, day, hour, minute, second] = arr;
  const date = new Date(year, month - 1, day, hour, minute, second);

  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const HH = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
};
export const UserPaymentsCard = ({ data }: UserPaymentsCardProps) => {
  const navigate = useNavigate();
  const navigateToContractDetail = () => {
    navigate(urlFor.contractDetail(data.contractId));
  };
  return (
    <div
      className="flex h-[3.75rem] w-[55rem] cursor-pointer items-center rounded-[0.625rem] text-[0.8rem] font-semibold shadow-[4px_4px_10px_rgba(0,0,0,0.25)]"
      onClick={navigateToContractDetail}
    >
      <div className="flex-1 text-center">
        <span>{data.userName}</span>
      </div>
      <div className="flex-1 text-center">
        <span>{data.ptCount}</span>
      </div>
      <div className="flex-1 text-center">
        <span>{data.paymentAmount}원</span>
      </div>
      <div className="flex-1 text-center">
        <span>{formatPaymentDate(data.paymentDate)}</span>
      </div>
    </div>
  );
};
