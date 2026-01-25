import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Banner from '@/components/Banner';
import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import { SPORTS } from '@/constants/sports';
import RequestSlider from '@/features/home/components/UserRequestSlider';
import UserSearchSection from '@/features/home/components/UserSearchSection';
import { useGetMyRequestsList } from '@/hooks/useGetMyRequestsList';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useRoleStore } from '@/store/useRoleStore';
import type { SportsSlugType } from '@/types/SportsType';
import { getRandomSportSlug } from '@/utils/getRandomSportSlug';
import { mapMyRequestToSliderItem } from '@/utils/mapToRequestSliderItem';

/**
 * 사용자 메인 페이지
 */
const UserMainPage = () => {
  const { isLoggedIn, role } = useRoleStore();
  const { data: requests } = useGetMyRequestsList({ page: 1, size: 40 }, isLoggedIn);

  // 비로그인 또는 GUEST일 경우 useGetUserInfo 호출하지 않음
  const { data: userData } = useGetUserInfo(isLoggedIn && role === 'USER');
  const userLocation = `${userData?.address?.[0]?.city ?? ''} ${userData?.address?.[0]?.district ?? ''} ${userData?.address?.[0]?.street ?? ''}`;

  const mappedRequests = requests?.content?.map(mapMyRequestToSliderItem) ?? [];

  const matched = SPORTS.find((s) => s.slug === userData?.categoryName);

  const categoryType: SportsSlugType =
    role === 'GUEST'
      ? getRandomSportSlug()
      : role === 'USER'
        ? (matched?.slug ?? 'boxing')
        : 'boxing'; // fallback

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 검색 섹션, 히어로 샷 */}
      <UserSearchSection />

      {/* 나의 요청서 */}
      {isLoggedIn && (
        <div className="my-20">
          <RequestSlider
            title={'나의 요청서'}
            requests={mappedRequests}
            location={userLocation}
            name={userData?.userNickname}
          />
        </div>
      )}

      {/* 실시간 매칭 현황 */}
      <div className="my-20">
        <RealtimeMatchingStatus categoryType={categoryType} />
      </div>

      {/* 배너 */}
      <div className="mx-auto mb-22 max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <Banner />
      </div>
    </div>
  );
};

export default UserMainPage;
