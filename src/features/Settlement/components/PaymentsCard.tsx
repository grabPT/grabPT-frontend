import HeaderProfile from '@/assets/images/HeaderProfile.png';

interface ProPaymentCardProps {
  data: {
    earnedAmount: number;
    memberName: string;
    paymentAmount: number;
    paymentDate: number[]; // [year, month, day, hour, minute, second, nanos]
    ptCount: number;
    contractId: number;
    imageURL?: string;
  };
}

// ✅ 날짜 포맷 함수 (24시간제, yyyy/MM/dd HH:mm:ss)
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

export const PaymentsCard = ({ data }: ProPaymentCardProps) => {
  return (
    <div className="flex h-[3.75rem] w-[55rem] items-center rounded-[0.625rem] text-[0.8rem] font-semibold shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
      <div className="flex flex-1 items-center gap-3">
        <img src={data.imageURL ?? HeaderProfile} alt="프로필 이미지" className="ml-3 h-5 w-5" />
        <span>{data.memberName}</span>
      </div>
      <div className="flex-1 text-center">
        <span>{data.ptCount}</span>
      </div>
      <div className="flex-1 text-center">
        <span>{data.earnedAmount}원</span>
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
