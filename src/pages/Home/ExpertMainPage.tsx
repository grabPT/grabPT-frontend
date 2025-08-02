import Banner from '@/components/Banner';
import ProfileCard from '@/components/ProfileCard';
import RequestSlider from '@/features/home/components/RequestSlider';
import mockRequests from '@/features/home/data/dummy';

const ExpertMainPage = () => {
  const userName = '박수민';

  return (
    <section className="mt-[70px] mb-[140px] flex flex-col items-center">
      <h1 className="text-[40px] font-bold">
        안녕하세요! {userName} <span className="text-button">전문가</span>님!
      </h1>

      <div className="mt-[66px]">
        <ProfileCard />
      </div>
      <div className="mt-[145px]">
        <RequestSlider title={'받은 요청서'} requests={mockRequests} />
      </div>

      <div className="mt-[182px]">
        <Banner />
      </div>
    </section>
  );
};

export default ExpertMainPage;
