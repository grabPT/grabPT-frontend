import { useNavigate } from 'react-router-dom';

import Banner from '@/components/Banner';
import ProfileCard from '@/components/ProfileCard';
import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import ROUTES from '@/constants/routes';
import { SPORTS } from '@/constants/sports';
import { useGetMatchingRequestsList } from '@/features/Requests/hooks/useGetMyRequestsList';
import RequestSlider from '@/features/home/components/UserRequestSlider';
import { useProProfileQuery } from '@/hooks/useGetProProfile';
import { useRoleStore } from '@/store/useRoleStore';
import type { SportsSlugType } from '@/types/SportsType';
import { mapProRequestToSliderItem } from '@/utils/mapToRequestSliderItem';

const ProMainPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, role } = useRoleStore();

  // 전문가가 자신의 프로필 조회 훅
  const { data: profileData, isError } = useProProfileQuery();

  // 전문가의 카테고리명을 통해 SPORTS에서 해당 카테고리의 slug를 찾음
  const matched = SPORTS.find((s) => s.slug === profileData?.categoryName);
  const categoryType: SportsSlugType = matched?.slug ?? 'health';

  const proLocation = `${profileData?.userLocations?.[0]?.city ?? ''} ${profileData?.userLocations?.[0]?.district ?? ''} ${profileData?.userLocations?.[0]?.street ?? ''}`;

  // 전문가의 요청서 조회 훅 (PRO일 때만 호출)
  const { data: requests } = useGetMatchingRequestsList(
    { sortBy: 'latest', page: 1, size: 40 },
    isLoggedIn && role === 'PRO',
  );

  const mappedRequests = requests?.content?.map(mapProRequestToSliderItem) ?? [];

  // 에러 또는 프로필 데이터가 없을 때
  const hasProfileError = isError || !profileData;
  return (
    <section className="mt-[70px] mb-[140px] flex flex-col items-center">
      {/* 상단 텍스트랑 프로필카드 */}
      <h1 className="text-[40px] font-bold">
        안녕하세요!{' '}
        {hasProfileError ? (
          '전문가'
        ) : (
          <>
            {profileData?.userName} <span className="text-button">전문가</span>
          </>
        )}
        님!
      </h1>
      <div className="mt-[66px]">
        {hasProfileError ? (
          <div className="relative">
            {/* 블러 처리된 프로필 카드 */}
            <div className="pointer-events-none blur-sm">
              <ProfileCard profileData={undefined} />
            </div>
            {/* 오버레이 버튼 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => navigate(ROUTES.MYPAGE.PRO)}
                className="cursor-pointer rounded-xl bg-[#003EFB] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0030c5]"
              >
                프로필 정보를 채워주세요!
              </button>
            </div>
          </div>
        ) : (
          <ProfileCard profileData={profileData} />
        )}
      </div>

      {/* 요청서 슬라이더 */}
      <div className="mt-[145px]">
        <RequestSlider title={'받은 요청서'} requests={mappedRequests} location={proLocation} />
      </div>

      {/* 실시간 매칭 현황 */}
      <div className="my-[200px]">
        <RealtimeMatchingStatus categoryType={categoryType} />
      </div>

      {/* 배너 */}
      <div className="mt-[182px]">
        <Banner />
      </div>
    </section>
  );
};

export default ProMainPage;
