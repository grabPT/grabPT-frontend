import clsx from 'clsx';

import UserRequestHeader from '@/features/Requests/UserRequestHeader';
import type { RealtimeMatchingType } from '@/types/RealtimeMatchingType';

interface MatchingStatusCardProps {
  match: RealtimeMatchingType;
}

const MatchingStatusCard = ({ match }: MatchingStatusCardProps) => {
  const isMatched = (match.matchStatus = '매칭 완료');

  return (
    <div className="flex h-[48px] w-[380px] items-center">
      <UserRequestHeader nickName={match.nickname} location={match.region} />
      {/* 오른쪽: 횟수 | 가격 ● */}
      <div className="flex items-center">
        {/* 횟수 + 구분선 + 가격 */}
        <p className="font-pretendard w-[94px] text-right text-[11px] leading-[15.4px] font-medium">
          {match.sessionCount}회&nbsp;|&nbsp;{match.totalPrice.toLocaleString()}원
        </p>
      </div>
      {/* 상태 점 */}
      <div
        className={clsx(
          'ml-[7px] h-[13px] w-[13px] rounded-full',
          isMatched ? 'bg-[#4CAF50]' : 'bg-[#FF8A00]',
        )}
      />
      {/* 상태 텍스트 */}
      <p className="font-pretendard ml-[6px] text-[12px] leading-[16.8px] font-medium text-[#000]">
        {isMatched ? '매칭 성공' : '대기중'}
      </p>
    </div>
  );
};

export default MatchingStatusCard;
