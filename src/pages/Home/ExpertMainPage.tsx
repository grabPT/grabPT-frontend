import Banner from '@/components/Banner';
import ProfileCard from '@/components/ProfileCard';
import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import { SPORTS } from '@/constants/sports';
import { useGetMatchingRequestsList } from '@/features/Requests/hooks/useGetMyRequestsList';
import RequestSlider from '@/features/home/components/RequestSlider';
import { useProProfileQuery } from '@/hooks/useGetProProfile';
import type { SportsSlugType } from '@/types/SportsType';

const ExpertMainPage = () => {
  const { data: profileData, isLoading, isError } = useProProfileQuery();

  const matched = SPORTS.find((s) => s.slug === profileData?.categoryName);
  const categoryType: SportsSlugType = matched?.slug ?? 'health';
  console.log('matched', matched);
  console.log('categoryType', categoryType);
  const { data: requests } = useGetMatchingRequestsList({ sortBy: 'latest', page: 1, size: 40 });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !profileData) return <div>에러 발생</div>;
  requests?.content.forEach((item) => console.log(item.address));
  return (
    <section className="mt-[70px] mb-[140px] flex flex-col items-center">
      <h1 className="text-[40px] font-bold">
        안녕하세요! {profileData?.userName} <span className="text-button">전문가</span>님!
      </h1>

      <div className="mt-[66px]">
        <ProfileCard profileData={profileData} />
      </div>
      <div className="mt-[145px]">
        <RequestSlider title={'받은 요청서'} requests={requests?.content ?? []} />
      </div>
      <div className="my-[200px]">
        <RealtimeMatchingStatus categoryType={categoryType} />
      </div>
      <div className="mt-[182px]">
        <Banner />
      </div>
    </section>
  );
};

export default ExpertMainPage;
