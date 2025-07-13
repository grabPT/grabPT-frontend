import { useParams } from 'react-router-dom';

import Button from '@/components/Button';

import MatchingStatusCard from '../components/MatchingStatusCard';
import TrainerCardScroll from '../components/TrainerCardScroll';
import { dummyMatchings, dummyTrainers } from '../data/dummy';

export default function CategoryDetailPage() {
  const { slug } = useParams(); // ex) tennis

  return (
    <div className="flex flex-col pt-[155px]">
      {/* 상단 제목 */}

      <div className="flex items-start gap-[10px]">
        {/* 운동명 */}
        <p className="font-[Pretendard Variable] text-[40px] leading-[100%] font-extrabold text-black">
          {slug}
        </p>

        {/* 주소 (예시 주소 나중에 연동해야됨) */}
        <div className="mt-[19.5px] ml-[10px] h-[17px] w-[152px]">
          <p className="font-[Pretendard Variable] text-[17px] leading-[100%] font-semibold text-black">
            서울시 강서구 화곡3동
          </p>
        </div>
      </div>

      <section>
        <div className="mt-[17px]">
          <TrainerCardScroll trainers={dummyTrainers} />
        </div>
      </section>

      {/* 실시간 매칭 현황 */}
      <section className="mt-[156px] mb-[200px] h-374px">
        <h2 className="font-[Pretendard Variable] text-[40px] leading-[40px] font-extrabold text-black not-italic">
          실시간 매칭 현황
        </h2>

        <div className="mt-[94px] grid grid-cols-3 gap-x-[20px] gap-y-[16px]">
          {dummyMatchings.slice(0, 6).map((match, idx) => (
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
