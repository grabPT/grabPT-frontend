import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { urlFor } from '@/constants/routes';
import UserRequestHeader from '@/features/Requests/components/UserRequestHeader';
import type { RequestsListItemType } from '@/features/Requests/types/getRequestsListType';
import { cn } from '@/libs/cn';

/*
전문가 요청현황 조회 시
리스트로 보이는 요청현황의
상태 카드 컴포넌트입니다.
이 컴포넌트는 요청현황의 상태를 카드 형태로 보줍니다.
*/
interface RequestsStatusCardProps {
  request: RequestsListItemType;
}

const RequestsStatusCard = ({ request }: RequestsStatusCardProps) => {
  const navigate = useNavigate();
  const isMatched = request.status === 'MATCHED';
  const navigateToRequestDetail = (requestionId: number) =>
    navigate(urlFor.requestDetail(requestionId));
  console.log('요청서아이디', request.requestId);

  return (
    <div
      onClick={() => navigateToRequestDetail(request.requestId)}
      className="flex h-[75px] w-[700px] cursor-pointer flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl transition-shadow duration-200 hover:shadow-lg"
    >
      <UserRequestHeader
        nickName={request.username}
        profileImg={request.userProfileImageUrl}
        location={request.userStreet}
      />
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">{request.sessionCount}회</span>
        <span className="text-gray-400">|</span>
        <span className="text-sm text-gray-700">{request.price.toLocaleString()}원</span>
        <div
          className={`ml-2 h-3 w-3 rounded-full ${isMatched ? 'bg-green-500' : 'bg-orange-400'}`}
        ></div>
        <span className="text-sm text-gray-500">{isMatched ? '매칭 완료' : '매칭 중'}</span>
      </div>
    </div>
  );
};

interface RequestsStatusCardSkeletonProps {
  className?: string;
}

const RequestsStatusCardSkeleton: React.FC<RequestsStatusCardSkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex h-[75px] w-[700px] flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow',
        className,
      )}
    >
      {/* 왼쪽: 프로필 + 텍스트 */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" /> {/* 프로필 이미지 */}
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-24 rounded" /> {/* 닉네임 */}
          <Skeleton className="h-3 w-32 rounded" /> {/* 위치 */}
        </div>
      </div>

      {/* 오른쪽: 세션/가격/상태 */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-10 rounded" /> {/* 회차 */}
        <Skeleton className="h-4 w-16 rounded" /> {/* 가격 */}
        <Skeleton className="h-3 w-12 rounded" /> {/* 상태 */}
      </div>
    </div>
  );
};

RequestsStatusCardSkeleton.displayName = 'RequestsStatusCard.Skeleton';

RequestsStatusCard.Skeleton = RequestsStatusCardSkeleton;

export default RequestsStatusCard;
