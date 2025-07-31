import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Button from '@/components/Button';
import ExpertCardScroll from '@/features/Category/components/ExpertCardScroll';
import MatchingStatusCard from '@/features/Category/components/MatchingStatusCard';
import { dummyExperts, dummyMatchings } from '@/features/Category/data/dummy';

export default function CategoryDetailPage() {
  const [cardCount, setCardCount] = useState(8);

  // 브레이크포인트에 따라 카드 개수 조절
  useEffect(() => {
    const updateCardCount = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        // 2xl 이상
        setCardCount(8);
      } else if (width >= 1280) {
        // xl 이상
        setCardCount(6);
      } else {
        // 그 외
        setCardCount(4);
      }
    };

    updateCardCount();
    window.addEventListener('resize', updateCardCount);
    return () => window.removeEventListener('resize', updateCardCount);
  }, []);
  const { slug } = useParams(); // ex) tennis

  return (
    <div className="mx-auto flex w-auto flex-col justify-center pt-[155px] 2xl:w-[1480px]">
      {/* 상단 제목 */}

      <div className="flex items-start gap-[10px]">
        {/* 운동명 */}
        <p className="font-[Pretendard Variable] leading-[100%] font-extrabold text-black sm:text-[24px] xl:text-[30px]">
          {slug}
        </p>

        {/* 주소 (예시 주소 나중에 연동해야됨) */}
        <div className="mt-[19.5px] ml-[10px] h-[17px] w-[152px]">
          <p className="font-[Pretendard Variable] leading-[100%] font-semibold text-black sm:text-[12px] xl:text-[17px]">
            서울시 강서구 화곡3동
          </p>
        </div>
      </div>

      <section>
        <div className="sm:mt-[4px] xl:mt-[17px]">
          <ExpertCardScroll experts={dummyExperts} />
        </div>
      </section>

      {/* 실시간 매칭 현황 */}
      <section className="h-374px mt-[156px] mb-[200px]">
        <h2 className="font-[Pretendard Variable] leading-[40px] font-extrabold text-black not-italic sm:text-[24px] xl:text-[30px]">
          실시간 매칭 현황
        </h2>

        <div className="mt-[94px] grid grid-cols-1 gap-x-[20px] gap-y-[16px] md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {dummyMatchings.slice(0, cardCount).map((match, idx) => (
            <MatchingStatusCard key={idx} {...match} />
          ))}
        </div>

        {/* 오른쪽 아래 정렬 */}
        <div className="mt-[40px] flex justify-end">
          <Button
            label="요청서 작성"
            width="w-[189px]"
            height="h-[42px]"
            text="text-[15px] font-semibold text-white"
          >
            요청서 작성
          </Button>
        </div>
      </section>
    </div>
  );
}
