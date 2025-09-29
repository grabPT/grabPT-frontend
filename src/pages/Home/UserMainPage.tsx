import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Banner from '@/components/Banner';
import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import { SPORTS } from '@/constants/sports';
// import RequestSlider from '@/features/home/components/UserRequestSlider';
import UserSearchSection from '@/features/home/components/UserSearchSection';
// import { useGetMyRequestsList } from '@/hooks/useGetMyRequestsList';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useRoleStore } from '@/store/useRoleStore';
import type { SportsSlugType } from '@/types/SportsType';

const UserMainPage = () => {
  console.log('devleop테스트입니다.');
  console.log('develop 배포 테스트');

  // const { isLoggedIn, role } = useRoleStore();
  const role = useRoleStore((state) => state.role);
  // const { data: requests } = useGetMyRequestsList({ page: 1, size: 40 }, isLoggedIn);
  // 랜덤 선택 함수
  function getRandomSportSlug(): SportsSlugType {
    const randomIndex = Math.floor(Math.random() * SPORTS.length);
    return SPORTS[randomIndex].slug;
  }
  const { data: userData } = useGetUserInfo();
  // const location = `${userData?.address?.[0]?.city ?? ''} ${userData?.address?.[0]?.district ?? ''} ${userData?.address?.[0]?.street ?? ''}`;
  const matched = SPORTS.find((s) => s.slug === userData?.categoryName);
  const categoryType: SportsSlugType =
    role === 'GUEST'
      ? getRandomSportSlug()
      : role === 'USER'
        ? (matched?.slug ?? 'boxing')
        : 'boxing'; // fallback
  return (
    <div className="flex flex-col items-center justify-center">
      <UserSearchSection />

      {/* {isLoggedIn && (
        <div className="my-20">
          <RequestSlider
            title={'나의 요청서'}
            requests={requests?.content ?? []}
            location={location}
            name={userData?.nickname}
          />
        </div>
      )} */}
      <div className="my-20">
        <RealtimeMatchingStatus categoryType={categoryType} />
      </div>

      <div className="mx-auto mb-22 max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <Banner />
      </div>
    </div>
  );
};

export default UserMainPage;
