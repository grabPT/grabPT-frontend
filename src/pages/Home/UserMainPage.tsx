import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Banner from '@/components/Banner';
import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import { SPORTS } from '@/constants/sports';
import RequestSlider from '@/features/home/components/RequestSlider';
import UserSearchSection from '@/features/home/components/UserSearchSection';
import { useGetMyRequestsList } from '@/hooks/useGetMyRequestsList';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useRoleStore } from '@/store/useRoleStore';
import type { SportsSlugType } from '@/types/SportsType';

const UserMainPage = () => {
  const { isLoggedIn, role } = useRoleStore();
  const { data: requests } = useGetMyRequestsList({ page: 1, size: 40 }, isLoggedIn);
  // 랜덤 선택 함수
  function getRandomSportSlug(): SportsSlugType {
    const randomIndex = Math.floor(Math.random() * SPORTS.length);
    return SPORTS[randomIndex].slug;
  }
  const { data: userData } = useGetUserInfo();
  const location = `${userData?.address?.[0]?.city ?? ''} ${userData?.address?.[0]?.district ?? ''} ${userData?.address?.[0]?.street ?? ''}`;
  const matched = SPORTS.find((s) => s.slug === userData?.categoryName);
  const categoryType: SportsSlugType =
    role === 'GUEST'
      ? getRandomSportSlug()
      : role === 'USER'
        ? (matched?.slug ?? 'health')
        : 'health'; // fallback
  return (
    <div className="flex flex-col items-center justify-center">
      <UserSearchSection />

      {isLoggedIn && (
        <div className="mt-[109px]">
          <RequestSlider
            title={'나의 요청서'}
            requests={requests?.content ?? []}
            location={location}
            name={userData?.nickname}
          />
        </div>
      )}
      {}
      <div className="my-[200px]">
        <RealtimeMatchingStatus categoryType={categoryType} />
      </div>

      <div className="mx-auto mb-[200px] max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <Banner />
      </div>
    </div>
  );
};

export default UserMainPage;
