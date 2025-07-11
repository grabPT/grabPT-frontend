interface MatchingStatusCardProps {
  imageUrl: string;
  name: string;
  address: string;
  count: number;
  price: number;
  matched: boolean;
}

const MatchingStatusCard = ({
  imageUrl,
  name,
  address,
  count,
  price,
  matched,
}: MatchingStatusCardProps) => {
  return (
    <div className="flex h-[48px] w-[334px] items-center">
      {/* 왼쪽 프로필 사진 */}
      <img src={imageUrl} alt="프로필" className="h-[48px] w-[48px] rounded-full object-cover" />

      {/* 가운데 텍스트 영역 */}
      <div className="ml-[6px] flex flex-col justify-center">
        <p className="font-inter text-[16px] leading-[22.4px] font-semibold not-italic">{name}</p>
        <p className="font-inter text-[12px] leading-[16.8px] font-medium text-[#7A7A7A] not-italic">
          {address}
        </p>
      </div>

      {/* 오른쪽: 횟수 | 가격 ● */}
      <div className="flex items-center">
        {/* 횟수 + 구분선 + 가격 */}
        <p className="font-pretendard ml-[8px] text-[11px] leading-[15.4px] font-medium">
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
