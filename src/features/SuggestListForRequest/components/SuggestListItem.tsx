import { useNavigate } from 'react-router-dom';

import ProfileImage from '@/components/ProfileImage';
import StarRating from '@/components/StarRating';
import { urlFor } from '@/constants/routes';
import type { suggestListForRequestItemType } from '@/features/SuggestListForRequest/types/getSuggestListForRequestType';

interface SuggestListItemProps {
  suggest: suggestListForRequestItemType;
}

const SuggestListItem = ({ suggest }: SuggestListItemProps) => {
  const navigate = useNavigate();
  const navigateToSuggest = (suggestId: number) => navigate(urlFor.suggestDetail(suggestId));

  return (
    <div
      onClick={() => navigateToSuggest(suggest.suggestionId)}
      className="flex h-36 w-4xl cursor-pointer items-center justify-between rounded-2xl bg-[#E6ECFF] px-5 shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
    >
      <div className="flex gap-3.5">
        <div className="h-24 w-24 rounded-full">
          <ProfileImage src={suggest.profileImageUrl} alt="제안 트레이너 프로필" />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-button text-2xl font-bold">{suggest.userNickname} 전문가님의 제안</p>
          <p className="text-base font-bold">{suggest.centerName}</p>
          <StarRating rating={suggest.averageRating} size={14} fontSize={10} />
          <p className="text-xs font-semibold">{suggest.location}</p>
        </div>
      </div>

      <div className="mr-6 text-right text-2xl font-bold">
        <p>
          <span className="text-button">{suggest.sessionCount}</span> 회
        </p>
        <p>
          <span className="text-button">{suggest.suggestedPrice.toLocaleString()}</span> 원
        </p>
      </div>
    </div>
  );
};

export default SuggestListItem;
