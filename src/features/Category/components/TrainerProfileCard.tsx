import StarRating from '@/components/StarRating';

interface TrainerProfileCardProps {
  imageUrl: string;
  name: string;
  center: string;
  rating: number;
  pricePerSession: number;
}

export default function TrainerProfileCard({
  imageUrl,
  name,
  center,
  rating,
  pricePerSession,
}: TrainerProfileCardProps) {
  return (
    <div className="h-[370px] w-[280px] overflow-hidden rounded-2xl bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
      {/* 상단 이미지 영역 */}
      <img src={imageUrl} alt={`${name} 프로필`} className="h-[270px] w-full object-cover" />

      {/* 하단 텍스트 박스 */}
      <div className="flex flex-col gap-[10px] rounded-br-[10px] rounded-bl-[10px] px-[10px] pt-[13px] pb-[13px]">
        <div className="flex flex-col">
          <div className="flex items-start justify-between">
            <h3 className="font-[Pretendard Variable] mb-[5px] text-[16px] leading-[17.6px] font-semibold text-[#21272A]">
              {name}
            </h3>
            <p className="mr-[5px] text-[16px] font-semibold whitespace-nowrap text-black">
              1회 | {pricePerSession.toLocaleString()}원
            </p>
          </div>

          <p className="font-[Pretendard Variable] h-[22px] w-[108px] text-[8px] leading-[11.2px] font-semibold whitespace-pre-line text-[#003EFB]">
            {center}
          </p>
        </div>

        {/* 별점 + 점수 */}
        <div className="flex items-center gap-[2px]">
          <StarRating rating={rating} size={20} />
          <p className="font-[Pretendard Variable] text-[6px] leading-[8.4px] font-semibold text-black not-italic">
            ({rating.toFixed(1)})
          </p>
        </div>
      </div>
    </div>
  );
}
