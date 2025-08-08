import Profile from '@/assets/images/HeaderProfile.png';
import XIcon from '@/assets/images/x.png';
import Box from '@/components/Box';

interface RequestCardProps {
  name: string;
  location: string;
  center: string;
  category: string[];
  content: string;
}

const RequestCard = ({ name, location, center, category, content }: RequestCardProps) => {
  return (
    <Box>
      <div className="relative flex h-full w-full flex-col p-[10px] pt-[15px]">
        {/* 닫기 (기능 없음) */}
        <img src={XIcon} alt="close" className="absolute top-2 right-2 h-4 w-4" />

        {/* 상단 정보 */}
        <div className="flex items-start gap-[11px]">
          {/* 아바타 */}
          <div>
            <img src={Profile} alt="profile" className="h-[47px]" />
          </div>

          <div className="flex flex-col">
            <span className="text-[16px] leading-[140%] font-semibold">{name}</span>
            <span className="text-[10px] leading-[140%] font-semibold text-[#7A7A7A]">
              {location}
            </span>
            <span className="text-[8px] leading-[140%] font-semibold text-[#013EFB]">{center}</span>
          </div>
        </div>

        <div className="mt-[22px] flex flex-1 flex-col justify-between gap-4">
          <div className="flex gap-1.5">
            {category.map((ct) => (
              <span className="rounded-lg bg-[#C2D1FF] p-1 px-2 text-[8px] font-bold" key={name}>
                {ct}
              </span>
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
