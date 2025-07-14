import MockImage from '@/assets/images/동영상 등 대체 도형.png';
import CommentBox from '@/components/CommentBox';
import ImageSlide from '@/components/ImageSlide';
import ReviewSlide from '@/components/ReviewSlide';
import MypageSection from '@/features/Mypage/components/MypageSection';
import ProfileCard from '@/layout/components/ProfileCard';

const TrainerMypage = () => {
  const images = Array.from({ length: 7 }, () => MockImage);

  const review = {
    name: '날다람주날닮았쥐',
    location: '서울시 강서구 화곡동',
    rating: 3.5,
    content:
      '너무너무 친절하시고, 운동하면서 부족한 부분을 너무 잘 지적해주셨습니다!! 저는 20회 추가 PT 신청했습니다!!~~~~~~~~~~~~~~~~~~~~~~~~~',
  };

  const reviews = Array.from({ length: 50 }, () => review);

  return (
    <section className="mb-28">
      {/* 환영 텍스트 */}
      <h1 className="font-inter mt-[78px] text-center text-[48px] leading-[100%] font-semibold">
        안녕하세요!&nbsp;박수민&nbsp;
        <span className="text-[color:var(--color-purple-normal)]">전문가</span>님!
      </h1>

      {/* 프로필 컴포넌트 */}
      <div className="mt-[70px] flex justify-center px-[77px]">
        <ProfileCard />
      </div>

      <section className="mt-[95px] flex flex-col gap-[50px]">
        <div>
          {/* 헤더 */}
          <header className="text-center text-[33px] font-extrabold">전문가 소개</header>
          <hr className="mt-[33px] border-t-2 border-[#B8B8B8]" />

          {/* 인풋 두 개 */}
          <div className="mt-[45px] flex flex-col gap-3">
            {/* 한 줄 소개 */}
            <input
              maxLength={200}
              placeholder="· 전문가로서의 목표, 수업 방향성, 신념, 가치관 등 전문가님을 소개하고 표현할 수 있는 이야기를 적어주세요!"
              className="h-[50px] w-full resize-none rounded-lg border border-[#CCCCCC] bg-[#F5F5F5] p-4 text-sm leading-relaxed placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
            />
            {/* 상세 소개 */}
            <CommentBox placeholder="• 내용을 입력해주세요." />
          </div>
        </div>

        {/* 소개 사진 슬라이드 */}
        <ImageSlide title="소개 사진" images={images} />

        <MypageSection title="프로그램 가격" />
        <MypageSection title="자격 사항 등록" />
        <MypageSection title="위치 등록" />

        {/* 리뷰슬라이드 */}
        {/* 위아래그림자가 가려지는 버그 있음 */}
        <ReviewSlide title={'최근 후기'} reviews={reviews} />
      </section>
    </section>
  );
};

export default TrainerMypage;
