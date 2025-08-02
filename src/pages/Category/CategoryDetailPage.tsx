import { useParams } from 'react-router-dom';

import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import ExpertCardScroll from '@/features/Category/components/ExpertCardScroll';
import { dummyExperts } from '@/features/Category/data/dummy';

const CategoryDetailPage = () => {
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
      <div className="mt-[156px] mb-[200px]">
        {/* 얘도 나중에 데이터 props로 넘겨줘야 함 */}
        <RealtimeMatchingStatus />
      </div>
    </div>
  );
};

export default CategoryDetailPage;
