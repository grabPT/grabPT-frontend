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

/**
 * 사용자 메인 페이지
 * 나의 요청서 슬라이더 주석처리한 상태
 */
const UserMainPage = () => {
  // 역할 가져옴
  const role = useRoleStore((state) => state.role);

  // 로그인상태, 역할 가져와서 나의 요청서 목록 가져오기 주석처리상태
  // const { isLoggedIn, role } = useRoleStore();
  // const { data: requests } = useGetMyRequestsList({ page: 1, size: 40 }, isLoggedIn);

  // 랜덤 선택 함수 => 실시간 매칭 현황에 사용
  // todo: 유틸로 분리
  function getRandomSportSlug(): SportsSlugType {
    const randomIndex = Math.floor(Math.random() * SPORTS.length);
    return SPORTS[randomIndex].slug;
  }

  // 이건 뭐죠 => const location = `${userData?.address?.[0]?.city ?? ''} ${userData?.address?.[0]?.district ?? ''} ${userData?.address?.[0]?.street ?? ''}`;

  // 지금문제점 => 로그아웃 시 로컬스토리지 비우기 안됨 => 비로그인상태에서도 useGetUserInfo() 호출되고 200뜸 ㅋㅋ 옘병
  // 로그아웃 시 로컬스토리지 비우고(useLogout.ts에서) 로그아웃상태에서 useGetUserInfo() 호출하지 않도록 수정(useGetUserInfo.ts에서)
  const { data: userData } = useGetUserInfo();
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
      {/* todo: 복구할 것 */}
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
