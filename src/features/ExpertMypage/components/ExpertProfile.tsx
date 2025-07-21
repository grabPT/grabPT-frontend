import MockImage from '@/assets/images/동영상 등 대체 도형.png';
import CommentBox from '@/components/CommentBox';
import ImageSlide from '@/components/ImageSlide';
import ProfileCard from '@/components/ProfileCard';
import { TitleLine } from '@/components/TitleLine';
import MypageSection from '@/features/Mypage/components/MypageSection';

//스타일 통일 될 경우 TileLine 컴포넌트로 통일

const ExpertProfile = () => {
  const images = Array.from({ length: 7 }, () => MockImage);
  return (
    <div>
      <div>
        {/* 프로필 컴포넌트 */}
        <div className="mt-[70px] flex justify-center px-[77px]">
          <ProfileCard />
        </div>
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
      <TitleLine title='소개 사진'/>
      <ImageSlide title="소개 사진" images={images} />

      <MypageSection title="프로그램 가격" />

      <MypageSection title="위치 등록" />
    </div>
  );
};

export default ExpertProfile;
