import HeaderProfile from '@/assets/images/HeaderProfile.png';

interface IPaymentCard {
  earnedAmount: number;
  memberName: string;
  paymentAmount: number;
  paymentDate: string; // 문자열로 들어옴
  ptCount: number;
}

export const PaymentsCard = ({
  earnedAmount,
  memberName,
  paymentAmount,
  paymentDate,
  ptCount,
}: IPaymentCard) => {
  // 문자열을 BigInt → 밀리초(ms) 변환
  const parseDate = (raw: string) => {
    try {
      const ns = BigInt(raw); // 문자열 → BigInt
      const ms = Number(ns / BigInt(1_000_000)); // ns → ms
      const date = new Date(ms);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0'); // 24시간제
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <div className="flex h-[3.75rem] w-[55rem] items-center rounded-[0.625rem] text-[0.8rem] font-semibold shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
      <div className="flex flex-1 items-center gap-3">
        <img src={HeaderProfile} alt="프로필 이미지" className="ml-3 h-5 w-5" />
        <span>{memberName}</span>
      </div>
      <div className="flex-1 text-center">
        <span>{ptCount}</span>
      </div>
      <div className="flex-1 text-center">
        <span>{earnedAmount}원</span>
      </div>
      <div className="flex-1 text-center">
        <span>{paymentAmount}원</span>
      </div>
      <div className="flex-1 text-center">
        <span>{parseDate(paymentDate)}</span>
      </div>
    </div>
  );
};
