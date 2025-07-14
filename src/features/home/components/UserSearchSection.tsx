import { useState } from 'react';

import arrowIcon from '@/features/home/assets/icons/NextArrow.svg';
import img1 from '@/features/home/assets/images/Usermain1.png';
import img2 from '@/features/home/assets/images/Usermain2.png';
import img3 from '@/features/home/assets/images/Usermain3.png';

const images = [img1, img2, img3];

const UserSearchSection = () => {
  const [_current, setCurrent] = useState(0); // 사용하지 않는 변수 _처리
  const [keyword, setKeyword] = useState('');

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const handleSearch = () => {
    console.log('검색:', keyword);
  };

  return (
    <section
      className="relative z-50 h-[552px] w-full bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url(${img1})` }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 z-10 bg-transparent" />

      {/* 텍스트 및 검색 UI */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-[120px] text-white">
        <h1 className="w-[747px] text-left text-[60px] leading-[74px] font-extrabold whitespace-pre-line">
          <span className="text-[#ACBEFF]">운동</span>
          <span className="text-white">이 필요한 순간,{'\n'}딱 맞는 전문가를 찾아보세요</span>
        </h1>

        {/* 검색바 + 태그 */}
        <div className="mt-6 flex flex-col items-start gap-4">
          {/* 검색바 */}
          <div className="h-[50px] w-[700px]">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-[#003EFB] to-[#FF00B2] p-[3px]">
              <div className="flex h-full w-full items-center rounded-full bg-white px-[16px] pr-[15px]">
                <input
                  type="text"
                  placeholder="원하는 운동을 찾아보세요"
                  className="font-inter w-full text-[13px] leading-[16px] font-semibold text-black placeholder-[#CCCCCC] outline-none"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
          </div>

          {/* 태그 */}
          <div className="flex gap-3">
            {['헬스', '축구', '농구', '테니스'].map((tag) => (
              <div
                key={tag}
                className="flex h-[30px] items-center justify-center rounded-full border border-[#DADADA] bg-white px-4 text-[14px] font-medium text-[#4B4B4B]"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 아래 화살표 버튼 */}
      <button
        onClick={handleNext}
        className="absolute right-5 bottom-5 z-30 rounded-full bg-white p-2 shadow-md transition hover:scale-105"
      >
        <img src={arrowIcon} alt="다음" className="h-5 w-5" />
      </button>
    </section>
  );
};

export default UserSearchSection;
