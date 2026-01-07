// CategoryDetailPage.tsx
import { useEffect, useMemo, useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import { SPORTS } from '@/constants/sports';
import ProCardScroll from '@/features/Category/components/ProCardScroll';
import useGeolocation from '@/hooks/useGeolocation';
import { useGetCategoryPros } from '@/hooks/useGetCategoryPros';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import type { ProCardItem } from '@/types/ProCardItemType';

/**
 * 카테고리 상세 페이지
 * todo: 스켈레톤 작업 필요
 */
const CategoryDetailPage = () => {
  const [location, setLocation] = useState<string>('');

  // 파라미터에서 스포츠를 가져오고 SPORTS상수랑 매칭
  const { slug } = useParams<{ slug: string }>();
  const sport = SPORTS.find((s) => s.slug === slug);

  // 위치 정보가져오기 => 유저정보가 있다면 받아오면 안됩니다 !!
  // todo: 조건부실행 (로그인상태라면 받아오면 안됨)
  const { address, loading, error } = useGeolocation();

  // 유저정보
  const { data: userData } = useGetUserInfo();

  // userData에서 주소가 있으면 가져오고 없으면 geolocation으로 가져온 주소를 setLocation
  // 없으면 걍 안하는 듯 그러면 useGetCategoryPros 훅에서 enabled처리
  const loc = userData?.address[0].street;
  useEffect(() => {
    if (loc) setLocation(loc);
    else if (address) setLocation(address);
  }, [loc, address]);

  // 프로카드 리스트 - useEffect로 설정한 location을 담아서
  const { data: prosList } = useGetCategoryPros(slug, location);

  // 프로카드 리스트 => 메모했넹
  const proCards = useMemo<ProCardItem[]>(
    () =>
      (prosList ?? []).map((e) => ({
        id: e.userId,
        imageUrl: e.profileImageUrl,
        name: e.userName,
        center: e.centerName,
        rating: e.rating,
        pricePerSession: e.sessionCount,
      })),
    [prosList],
  );

  // 후...
  if (!sport) return <Navigate to="/category" replace />;

  return (
    <div className="mx-auto flex w-auto flex-col justify-center pt-[100px] 2xl:w-[1480px]">
      <div className="flex items-start gap-[10px]">
        <p className="leading-[100%] font-extrabold sm:text-[24px] xl:text-[30px]">{sport.label}</p>
        <div className="mt-[19.5px] ml-[10px] h-[17px] w-[152px]">
          <p className="leading-[100%] font-semibold sm:text-[12px] xl:text-[17px]">
            {loading ? '위치 불러오는 중...' : error ? error : (location ?? '위치를 불러오지 못함')}
          </p>
        </div>
      </div>

      {/* 프로카드 슬라이더 */}
      <section className="sm:mt-[4px] xl:mt-[17px]">
        <ProCardScroll pros={proCards} />
      </section>

      {/* 실시간 매칭현황 */}
      <div className="mt-[156px] mb-[200px]">
        <RealtimeMatchingStatus categoryType={sport.slug} />
      </div>
    </div>
  );
};

export default CategoryDetailPage;
