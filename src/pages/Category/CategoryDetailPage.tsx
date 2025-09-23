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

const CategoryDetailPage = () => {
  const [location, setLocation] = useState<string>();
  const { slug } = useParams<{ slug: string }>();
  const sport = SPORTS.find((s) => s.slug === slug);
  const { address, loading, error } = useGeolocation();
  const { data: userData } = useGetUserInfo();
  const { data: prosList } = useGetCategoryPros(slug, location);
  const proCards = useMemo<ProCardItem[]>(
    () =>
      (prosList ?? []).map((e) => ({
        id: e.userId,
        imageUrl: e.profileImageUrl,
        name: e.userName,
        center: e.proCenterName,
        rating: e.rating,
        pricePerSession: e.suggestSessionCount,
      })),
    [prosList],
  );

  const loc = userData?.userLocation[0].street;

  useEffect(() => {
    if (loc) setLocation(loc);
    else if (address) setLocation(address);
  }, [loc, address]);

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

      <section className="sm:mt-[4px] xl:mt-[17px]">
        <ProCardScroll pros={proCards} />
      </section>

      <div className="mt-[156px] mb-[200px]">
        <RealtimeMatchingStatus categoryType={sport.slug} />
      </div>
    </div>
  );
};

export default CategoryDetailPage;
