import { useNavigate } from 'react-router-dom';

import StarRating from '@/components/StarRating';
import { urlFor } from '@/constants/routes';
import type { proposalsForRequestItemType } from '@/features/ProposalsForRequest/types/getProposalsForRequestType';
import { onErrorImage } from '@/utils/onErrorImage';

interface ProposalsListItemProps {
  proposal: proposalsForRequestItemType;
}

const ProposalsListItem = ({ proposal }: ProposalsListItemProps) => {
  const navigate = useNavigate();
  const navigateToProposal = (proposalId: number) => navigate(urlFor.proposalDetail(proposalId));

  return (
    <div
      onClick={() => navigateToProposal(proposal.suggestionId)}
      className="flex h-36 w-4xl cursor-pointer items-center justify-between rounded-2xl bg-[#E6ECFF] px-5 shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
    >
      <div className="flex gap-3.5">
        <img
          src={proposal.profileImageUrl}
          onError={(e) => onErrorImage(e)}
          alt="제안 트레이너 프로필"
          className="h-24 w-24 rounded-full"
        />

        <div className="flex flex-col justify-between">
          <p className="text-button text-2xl font-bold">{proposal.nickname} 전문가님의 제안</p>
          <p className="text-base font-bold">{proposal.center}</p>
          <StarRating rating={proposal.averageRate} size={14} fontSize={10} />
          <p className="text-xs font-semibold">{proposal.address}</p>
        </div>
      </div>

      <div className="mr-6 text-right text-2xl font-bold">
        <p>
          <span className="text-button">{proposal.sessionCount}</span> 회
        </p>
        <p>
          <span className="text-button">{proposal.price.toLocaleString()}</span> 원
        </p>
      </div>
    </div>
  );
};

export default ProposalsListItem;
