import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import Profile from '@/assets/images/HeaderProfile.png';
import Box from '@/components/Box';
import { urlFor } from '@/constants/routes';
import type { proposalsListItemtype } from '@/features/Proposals/types/getProposalsListType';

interface MyProposalsListItemProps {
  proposal: proposalsListItemtype;
}

const MyProposalsListItem = ({ proposal }: MyProposalsListItemProps) => {
  const profileImage = proposal.profileImageUrl || Profile;
  const navigate = useNavigate();
  const isMatched = proposal.status === 'MATCHED';

  return (
    <Box
      height="h-[75px]"
      onClick={() => navigate(urlFor.requestDetail(proposal.requestionId))}
      className="cursor-pointer"
    >
      <div className="flex w-full items-center justify-between pr-4 pl-3">
        <div className="flex gap-2.5">
          <img src={profileImage} alt="제안서를 받은 요청자의 프로필이미지" className="h-12" />

          <div className="text-sm font-medium">
            <p className="text-base font-semibold">{proposal.requestionNickname} 님께 제안</p>
            <span>{proposal.sessionCount}회</span>
            <span> | </span>
            <span className="text-button">{proposal.price}원</span>
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

export default MyProposalsListItem;
