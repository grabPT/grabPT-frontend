import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Banner from '@/components/Banner';
import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import { SPORTS } from '@/constants/sports';
import UserSearchSection from '@/features/home/components/UserSearchSection';
import RequestSlider from '@/features/home/components/UserRequestSlider';
import { useGetMyRequestsList } from '@/hooks/useGetMyRequestsList';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useRoleStore } from '@/store/useRoleStore';
import type { RequestsListItemProps } from '@/features/Requests/types/getRequestsListType';
import type { SportsSlugType } from '@/types/SportsType';

/**
 * 사용자 메인 페이지
 * 나의 요청서 슬라이더 주석처리한 상태
 */
const UserMainPage = () => {
  // 역할 가져옴
  // const role = useRoleStore((state) => state.role);

  // 로그인상태, 역할 가져와서 나의 요청서 목록 가져오기 주석처리상태
  const { isLoggedIn, role } = useRoleStore();
   const { data: requests } = useGetMyRequestsList({ page: 1, size: 40 }, isLoggedIn);

  // 랜덤 선택 함수 => 실시간 매칭 현황에 사용
  // todo: 유틸로 분리
  function getRandomSportSlug(): SportsSlugType {
    const randomIndex = Math.floor(Math.random() * SPORTS.length);
    return SPORTS[randomIndex].slug;
  }

  // 이건 뭐죠 => 
  // const location = `${userData?.address?.[0]?.city ?? ''} ${userData?.address?.[0]?.district ?? ''} ${userData?.address?.[0]?.street ?? ''}`;

  // GUEST일 경우 useGetUserInfo 호출하지 않음
  const { data: userData } = useGetUserInfo(role === 'USER');
  const userLocation = `${userData?.address?.[0]?.city ?? ''} ${userData?.address?.[0]?.district ?? ''} ${userData?.address?.[0]?.street ?? ''}`;

  // MyRequestListItemType → RequestsListItemProps 매핑
  const mappedRequests: RequestsListItemProps[] =
    requests?.content?.map((r) => ({
      requestId: r.requestionId,
      availableDays: r.availableDays,
      availableTimes: r.availableTimes,
      categoryName: r.categoryName,
      content: r.content,
      status: r.matchingStatus,
      imageURL: r.profileImageURL,
      proProfileId: r.proId ?? undefined,
      proNickname: r.proNickname ?? undefined,
      canWriteReview: r.isWriteReview,
    })) as RequestsListItemProps[] ?? [];
  const matched = SPORTS.find((s) => s.slug === userData?.categoryName);
  // role 최신화는 잘 되서 랜덤으로 불러오긴 하는데,,,
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
            name={userData?.userNickName}
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
