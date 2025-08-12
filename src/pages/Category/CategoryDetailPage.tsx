// CategoryDetailPage.tsx
import { useEffect, useMemo, useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import { SPORTS } from '@/constants/sports';
import ExpertCardScroll from '@/features/Category/components/ExpertCardScroll';
import useGeolocation from '@/hooks/useGeolocation';
import { useGetCategoryExperts } from '@/hooks/useGetCategoryExperts';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import type { ExpertCardItem } from '@/types/ExpertCardItemType';

const CategoryDetailPage = () => {
  const [location, setLocation] = useState<string>();
  const { slug } = useParams<{ slug: string }>();
  const sport = SPORTS.find((s) => s.slug === slug);
  const { address, loading, error } = useGeolocation();
  const token = localStorage.getItem('accessToken') ?? undefined;
  const { data: userData } = useGetUserInfo(token);
  const { data: expertsList } = useGetCategoryExperts(slug, location);
  const expertCards = useMemo<ExpertCardItem[]>(
    () =>
      (expertsList ?? []).map((e) => ({
        id: e.id,
        imageUrl: e.profileImageUrl,
        name: e.name,
        center: e.centerName,
        rating: e.rating,
        pricePerSession: e.pricePerSession,
      })),
    [expertsList],
  );

  const loc = userData?.address[0].city;

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
        <ExpertCardScroll experts={expertCards} />
      </section>

      <div className="mt-[156px] mb-[200px]">
        <RealtimeMatchingStatus categoryType={sport.slug} />
      </div>
    </div>
  );
};

export default CategoryDetailPage;
