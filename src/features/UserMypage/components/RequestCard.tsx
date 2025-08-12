import Profile from '@/assets/images/HeaderProfile.png';
import XIcon from '@/assets/images/x.png';
import Box from '@/components/Box';
import Hashtag from '@/features/home/components/Hashtag';
import { TIME_SLOT_LABELS } from '@/types/ReqeustsType';
import type { Tags } from '@/types/Tags';

interface RequestCardProps {
  name: string;
  tags: Tags;
  content: string;
  location: string;
  profileImg?: string;
}

const RequestCard = ({ name, tags, content, location, profileImg }: RequestCardProps) => {
  const daysPerWeek = `주 ${tags.daysPerWeek}회`;

  const tagsResult = [
    ...tags.cagtegoryName.split(' '),
    ...tags.availableTimes.map((time) => TIME_SLOT_LABELS[time]),
    daysPerWeek,
  ];

  return (
    <Box>
      <div className="relative flex h-full w-full flex-col p-[10px] pt-[15px]">
        {/* 닫기 (기능 없음) */}
        <img src={XIcon} alt="close" className="absolute top-2 right-2 h-4 w-4" />

        {/* 상단 정보 */}
        <div className="flex items-start gap-[11px]">
          {/* 아바타 */}
          <div>
            <img
              src={profileImg ?? Profile}
              alt="profile"
              className="h-[50px] w-[50px] rounded-full"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[16px] leading-[140%] font-semibold">{name}</span>
            <span className="text-[12px] leading-[140%] font-semibold text-[#7A7A7A]">
              {location}
            </span>
          </div>
        </div>

        <div className="mt-[22px] flex flex-1 flex-col justify-between gap-4">
          <div className="flex gap-1.5">
            {tagsResult.map((tag, idx) => (
              <Hashtag key={idx} tag={tag} />
            ))}
          </div>
          {/* 리뷰 내용 */}
          <div className="flex-1 rounded-md border border-[#B8B8B8] bg-white p-2 text-[10px] leading-[140%] font-medium text-[#525252]">
            {content}
          </div>
        </div>
      </div>
    </Box>
  );
};
export default RequestCard;
