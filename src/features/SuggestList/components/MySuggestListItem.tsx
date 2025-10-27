import { Skeleton } from '@mui/material';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import Profile from '@/assets/images/HeaderProfile.png';
import Box from '@/components/Box';
import { urlFor } from '@/constants/routes';
import type { suggestListItemtype } from '@/features/SuggestList/types/getSuggestListType';
import { cn } from '@/libs/cn';

interface MySuggestListItemProps {
  suggest: suggestListItemtype;
}

const MySuggestListItem = ({ suggest }: MySuggestListItemProps) => {
  const profileImage = suggest.profileImageUrl || Profile;
  const navigate = useNavigate();
  const isMatched = suggest.matchingStatus === 'MATCHED';

  return (
    <Box
      height="h-[75px]"
      onClick={() => navigate(urlFor.requestDetail(suggest.requestionId))}
      className="cursor-pointer"
      width="w-[700px]"
    >
      <div className="flex w-full items-center justify-between pr-4 pl-3">
        <div className="flex gap-2.5">
          <img
            src={profileImage}
            alt="제안서를 받은 요청자의 프로필이미지"
            className="h-[50px] w-[50px] rounded-full object-cover"
          />

          <div className="text-sm font-medium">
            <p className="text-base font-semibold">{suggest.userNickname} 님께 제안</p>
            <span>{suggest.sessionCount}회</span>
            <span> | </span>
            <span className="text-button">{suggest.suggestedPrice}원</span>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-500">{isMatched ? '매칭 완료' : '대기 중'}</span>
          <div
            className={clsx(
              `ml-2 h-3 w-3 rounded-full`,
              isMatched ? 'bg-[#4CAF50]' : 'bg-[#FF8A00]',
            )}
          />
        </div>
      </div>
    </Box>
  );
};

const MysuggestListItemSkeleton: React.FC = () => {
  return (
    <Box height="h-[75px]" width="w-[700px]">
      <div className="flex w-full items-center justify-between pr-4 pl-3">
        {/* 프로필 이미지 */}
        <div className="flex gap-2.5">
          <Skeleton variant="circular" className={cn('h-[50px] w-[50px]')} />
          <div className="flex flex-col justify-center gap-2">
            <Skeleton className={cn('h-4 w-[150px] rounded-md')} />
            <Skeleton className={cn('h-3 w-[100px] rounded-md')} />
          </div>
        </div>

        {/* 상태 텍스트 + 점 */}
        <div className="flex items-center gap-2">
          <Skeleton className={cn('h-4 w-[60px] rounded-md')} />
          <Skeleton variant="circular" className={cn('h-3 w-3')} />
        </div>
      </div>
    </Box>
  );
};
MysuggestListItemSkeleton.displayName = 'MysuggestListItem.Skeleton';

MySuggestListItem.Skeleton = MysuggestListItemSkeleton;

export default MySuggestListItem;
