// CategoryDetailPage.tsx
import { Navigate, useParams } from 'react-router-dom';

import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import { SPORTS } from '@/constants/sports';
import ExpertCardScroll from '@/features/Category/components/ExpertCardScroll';
import { dummyExperts } from '@/features/Category/data/dummy';

// ⭐️ slug-label 매핑용

const CategoryDetailPage = () => {
  const { slug } = useParams<{ slug: string }>(); // ① slug 파라미터
  const sport = SPORTS.find((s) => s.slug === slug); // ② 매핑

  // 잘못된 slug면 목록으로 리다이렉트
  if (!sport) return <Navigate to="/category" replace />;

  return (
    <div className="mx-auto flex w-auto flex-col justify-center pt-[155px] 2xl:w-[1480px]">
      {/* 상단 제목 */}
      <div className="flex items-start gap-[10px]">
        <p className="leading-[100%] font-extrabold sm:text-[24px] xl:text-[30px]">
          {sport.label} {/* ③ label 노출 */}
        </p>
        <div className="mt-[19.5px] ml-[10px] h-[17px] w-[152px]">
          <p className="leading-[100%] font-semibold sm:text-[12px] xl:text-[17px]">
            서울시 강서구 화곡3동
          </p>
        </div>
      </div>

      <section className="sm:mt-[4px] xl:mt-[17px]">
        <ExpertCardScroll experts={dummyExperts} />
      </section>

      {/* 실시간 매칭 현황 */}
      <div className="mt-[156px] mb-[200px]">
        <RealtimeMatchingStatus categoryType={sport.slug} /> {/* ④ API용 slug */}
      </div>
    </div>
  );
};

export default CategoryDetailPage;
