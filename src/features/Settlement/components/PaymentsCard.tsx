import HeaderProfile from '@/assets/images/HeaderProfile.png';

interface IPaymentCard {
  earnedAmount: number;
  memberName: string;
  paymentAmount: number;
  paymentDate: string;
  ptCount: number;
}
export const PaymentsCard = ({
  earnedAmount,
  memberName,
  paymentAmount,
  paymentDate,
  ptCount,
}: IPaymentCard) => {
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
        <span>{paymentDate}</span>
      </div>
    </div>
  );
};
