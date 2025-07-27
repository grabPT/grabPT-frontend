import UserRequestHeader from '@/features/Requests/UserRequestHeader';

interface MatchingStatusCardProps {
  imageUrl: string;
  name: string;
  address: string;
  count: number;
  price: number;
  matched: boolean;
}

const MatchingStatusCard = ({ name, address, count, price, matched }: MatchingStatusCardProps) => {
  return (
    <div className="flex h-[48px] w-[380px] items-center">
      <UserRequestHeader nickName={name} location={address} />
      {/* 오른쪽: 횟수 | 가격 ● */}
      <div className="flex items-center">
        {/* 횟수 + 구분선 + 가격 */}
        <p className="font-pretendard w-[94px] text-[11px] leading-[15.4px] font-medium">
          {count}회&nbsp;|&nbsp;{price.toLocaleString()}원
        </p>
        {/* 상태 점 */}
        <div
          className="ml-[7px] h-[13px] w-[13px] rounded-full"
          style={{ backgroundColor: matched ? '#4CAF50' : '#FF8A00' }}
        />
      </div>
      {/* 상태 텍스트 */}
      <p className="font-pretendard ml-[6px] text-[12px] leading-[16.8px] font-medium text-[#000]">
        {matched ? '매칭 성공' : '대기중'}
      </p>
    </div>
  );
};

export default MatchingStatusCard;
