import Banner from '@/components/Banner';
import ProfileCard from '@/components/ProfileCard';
import RequestSlider from '@/features/home/components/RequestSlider';
import { useGetMyRequestsList } from '@/hooks/useGetMyRequestsList';
import { useProProfileQuery } from '@/hooks/useGetProProfile';

const ExpertMainPage = () => {
  const { data, isLoading, isError } = useProProfileQuery();

  const profileData = data?.result;
  // 임시로 요청서 데이터를 가져오는 훅 사용(전문가 전용이 있으면 교체할 것)
  const { data: requests } = useGetMyRequestsList({ page: 1, size: 40 });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !profileData) return <div>에러 발생</div>;

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

      <div className="mt-[182px]">
        <Banner />
      </div>
    </section>
  );
};

export default ExpertMainPage;
