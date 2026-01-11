import Banner from '@/components/Banner';
import ProfileCard from '@/components/ProfileCard';
import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import { SPORTS } from '@/constants/sports';
import { useGetMatchingRequestsList } from '@/features/Requests/hooks/useGetMyRequestsList';
// import RequestSlider from '@/features/home/components/UserRequestSlider';
import { useProProfileQuery } from '@/hooks/useGetProProfile';
import type { SportsSlugType } from '@/types/SportsType';

const ProMainPage = () => {
  // 전문가가 자신의 프로필 조회 훅
  const { data: profileData, isError } = useProProfileQuery();

  // 전문가의 카테고리명을 통해 SPORTS에서 해당 카테고리의 slug를 찾음
  const matched = SPORTS.find((s) => s.slug === profileData?.categoryName);
  const categoryType: SportsSlugType = matched?.slug ?? 'health';
  // 디버깅용 삭제하기
  console.log('matched', matched);
  console.log('categoryType', categoryType);

  // 여기도 있네 이거 => 아 위치가져오는 거구나const location = `${profileData?.address?.[0]?.city ?? ''} ${profileData?.address?.[0]?.district ?? ''} ${profileData?.address?.[0]?.street ?? ''}`;

  // 전문가의 요청서 조회 훅
  const { data: requests } = useGetMatchingRequestsList({ sortBy: 'latest', page: 1, size: 40 });

  // todo: 이쁘게 만들어주세요
  if (isError || !profileData) return <div>에러 발생</div>;

  // 디버깅용 삭제하셈
  requests?.content.forEach((item) => console.log(item.location));

  return (
    <section className="mt-[70px] mb-[140px] flex flex-col items-center">
      {/* 상단 텍스트랑 프로필카드 */}
      <h1 className="text-[40px] font-bold">
        안녕하세요! {profileData?.userName} <span className="text-button">전문가</span>님!
      </h1>
      <div className="mt-[66px]">
        <ProfileCard profileData={profileData} />
      </div>

      {/* 요청서 슬라이더 */}
      <div className="mt-[145px]">
        {/* <RequestSlider
          title={'받은 요청서'}
          requests={requests?.content ?? []}
          location={location}
        /> */}
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
