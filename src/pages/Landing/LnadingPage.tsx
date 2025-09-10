import { useEffect, useState } from 'react';

import Logo from '@/assets/images/logo-white.svg';
import mackBookImg from '@/assets/images/macbook.svg';
import MoneyImg from '@/assets/images/money-landing.svg';
import ThumbImg from '@/assets/images/thumb-landing.svg';
import Button from '@/components/Button';
import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import SportsTypeSelector from '@/components/SportsTypeSelector';

const LandingPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 원하는 형식으로 변환: YYYY/MM/DD HH:MM:SS
  const formatDateTime = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd} ${hh}:${min}:${ss}`;
  };

  return (
    <div className="flowing-water-bg">
      {/* 물 흐름 레이어들 */}
      <div className="water-wave"></div>
      <div className="water-wave"></div>
      <div className="water-wave"></div>

      {/* 물결 효과 */}
      <div className="water-ripple"></div>
      <div className="water-ripple"></div>
      <div className="water-ripple"></div>

      {/* 거품 효과 */}
      <div className="water-bubble"></div>
      <div className="water-bubble"></div>
      <div className="water-bubble"></div>
      <div className="water-bubble"></div>

      {/* 흐르는 입자들 */}
      <div className="water-particles">
        <div className="water-particle"></div>
        <div className="water-particle"></div>
        <div className="water-particle"></div>
        <div className="water-particle"></div>
        <div className="water-particle"></div>
      </div>

      {/* 여기에 랜딩페이지 컨텐츠 */}
      <main className="relative z-10">
        <section className="relative z-10 flex h-dvh flex-col items-center pt-[60px]">
          <img src={Logo} alt="logo" className="h-[100px] w-[100px]" />
          <h1 className="mt-[40px] flex flex-col items-center justify-center text-[40px] font-bold text-white">
            원하는 가격에, 원하는 방식대로
            <span className="text-[44px] font-extrabold text-white">
              당신만을 위한, 자연스럽게 끌리는 PT
            </span>
          </h1>
          <h2 className="mt-[30px] text-[18px] text-white">
            PT수강을 원하는 사용자와 각 운동 전문가 & 트레이너를 <br />
            효과적으로 연결하는 스포츠 PT 매칭 플랫폼 grabPT
          </h2>
          <Button
            className="mt-[20px] cursor-pointer border border-white"
            text="text-[12px] text-white"
          >
            바로가기
          </Button>
          <div className="relative h-[300px] w-full">
            <div className="continuous-rolling absolute bottom-[10%] left-0 flex h-[80px] w-[130%] items-center overflow-hidden bg-amber-300 whitespace-nowrap">
              <div className="continuous-text animate-continuousRoll inline-block">
                grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT •
                grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT •
                grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT •
                grabPT • grabPT • grabPT • grabPT •{' '}
              </div>
            </div>
            <div className="continuous-rolling2 absolute bottom-[20%] left-0 flex h-[80px] w-[130%] items-center overflow-hidden bg-amber-300 whitespace-nowrap">
              <div className="continuous-text animate-continuousRoll inline-block">
                grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT •
                grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT •
                grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT • grabPT •
                grabPT • grabPT • grabPT • grabPT •{' '}
              </div>
            </div>
            <img
              src={mackBookImg}
              alt="mackBook"
              className="absolute bottom-[-200px] left-1/2 w-[700px] -translate-x-1/2" />
          </div>
        </section>
        <section className="mt-[60px] flex h-full w-full flex-col items-center justify-center bg-white">
          <h2 className="mt-[60px] text-center text-[40px] font-bold text-black">
            운동이 필요한 순간 <br />딱 맞는 전문가를 그랩 피티에서
          </h2>
          <div className="flex items-center gap-[20px] font-[500] text-black">
            <span>#다양한 운동종목</span>
            <span>#지역별 매칭</span>
            <span>#합리적 가격</span>
            <span>#효율적 매칭</span>
          </div>
          <h3 className="mt-[100px] text-[24px] font-extrabold">10가지 운동 종목</h3>
          <p className="mb-[60px] text-black">원하는 운동 종목의 PT 정보를 확인할 수 있습니다.</p>
          <div>
            <SportsTypeSelector value={null} onChange={() => {}} />
          </div>
          <h3 className="mt-[100px] text-[24px] font-extrabold">실시간 매칭 현황</h3>
          <p className="mb-[60px] text-black">
            다양한 종목의 실시간 매칭 현황 정보를 통해 투명한 가격 정보를 확인하세요.
          </p>
          <div className="mb-[100px] flex flex-col gap-[30px]">
            <div className="animate-fadeIn flex h-[180px] w-[580px] items-center justify-center gap-[20px] rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white shadow-lg">
              <img src={MoneyImg} alt="투명한가격" />
              <div>
                <h4 className="text-[30px] font-extrabold">투명한 가격 비교와 경쟁</h4>
                <p>
                  현재 트레이너의 PT 가격과 정보를 확인하여, <br />
                  보다 합리적인 가격으로!
                </p>
              </div>
            </div>
            <div className="animate-fadeIn flex h-[180px] w-[580px] items-center justify-center gap-[20px] rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white shadow-lg">
              <img src={ThumbImg} alt="공정한경쟁" />
              <div>
                <h4 className="text-[24px] font-extrabold">실시간으로 볼 수 있는 매칭 현황</h4>
                <p>
                  현재 PT 매칭 현황을 확인을 통해, <br />
                  투명한 경쟁 시스템 유지
                </p>
              </div>
            </div>
          </div>
          <div className="mb-[60px] flex flex-col gap-[30px]">
            <div className="animate-fadeIn relative mx-auto flex w-full max-w-[600px] flex-col items-center justify-center rounded-lg">
              <div className="flex items-center gap-2 rounded-md bg-black/20 px-2 py-1 font-mono text-[14px] shadow-inner">
                <span>{formatDateTime(currentTime)}</span>
              </div>
              {/* 메인 타이틀 */}
              <h2 className="mt-2 text-center text-[20px] font-bold drop-shadow-lg sm:text-[22px] md:text-[24px]">
                전국 헬스 매칭 현황
              </h2>
            </div>
            <RealtimeMatchingStatus categoryType="health" buttonShow={false} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
