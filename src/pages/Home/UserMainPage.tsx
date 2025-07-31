import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Banner from '@/components/Banner';
import Button from '@/components/Button';
import MatchingStatusCard from '@/features/Category/components/MatchingStatusCard';
import { dummyMatchings } from '@/features/Category/data/dummy';
import { NextArrow, PrevArrow } from '@/features/home/components/CustomArrow';
import RequestCardInMain from '@/features/home/components/RequestCard';
import UserSearchSection from '@/features/home/components/UserSearchSection';
import mockRequests from '@/features/home/data/dummy';

const UserMainPage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardCount, setCardCount] = useState(8);
  const navigate = useNavigate();

  const handleRequestWriteClick = () => {
    navigate('/requests/new');
  };

  // 브레이크포인트에 따라 카드 개수 조절
  useEffect(() => {
    const updateCardCount = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        // 2xl 이상
        setCardCount(8);
      } else if (width >= 1280) {
        // xl 이상
        setCardCount(6);
      } else {
        // 그 외
        setCardCount(4);
      }
    };

    updateCardCount();
    window.addEventListener('resize', updateCardCount);
    return () => window.removeEventListener('resize', updateCardCount);
  }, []);
  const settings = {
    className: 'center',
    infinite: false,
    centerPadding: '60px',
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: true,
    dots: true,
    beforeChange: (_oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
    afterChange: (index: number) => {
      console.log(`Slider Changed to: ${index + 1}`);
    },
    nextArrow: <NextArrow />,
    prevArrow: currentSlide === 0 ? <></> : <PrevArrow />,
    responsive: [
      {
        breakpoint: 1536, // < 1440px
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1280, // < 1080px
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 1024, // < 720px
        settings: { slidesToShow: 2, dots: false },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <UserSearchSection />

      <section
        className="mt-[109px] flex max-w-[1480px] flex-col gap-9 px-4 sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]"
        ref={sectionRef}
      >
        <h2 className="font-pretendard ml-[10px] text-[30px] leading-[100%] font-extrabold tracking-[0%] sm:text-[24px] lg:text-[30px]">
          나의 요청서
        </h2>

        <div className="mx-auto mb-[4px] max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
          <Slider {...settings}>
            {mockRequests.map((item, idx) => (
              <div key={idx} className="h-[230px] px-[24px]">
                <RequestCardInMain
                  name={item.nickname}
                  location={item.region}
                  tags={item.tags}
                  text={item.memo}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section className="mt-[109px] mb-[200px] flex max-w-[1480px] flex-col gap-9 px-4 sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <h2 className="font-[Pretendard Variable] leading-[40px] font-extrabold text-black not-italic sm:text-[24px] xl:text-[30px]">
          실시간 매칭 현황
        </h2>

        <div className="mt-[94px] grid grid-cols-1 gap-x-[20px] gap-y-[16px] md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {dummyMatchings.slice(0, cardCount).map((match, idx) => (
            <MatchingStatusCard key={idx} {...match} />
          ))}
        </div>

        {/* 오른쪽 아래 정렬 */}
        <div className="flex justify-end">
          <Button
            label="요청서 작성"
            width="w-[189px]"
            height="h-[42px]"
            text="text-[15px] font-semibold text-white"
            onClick={handleRequestWriteClick}
            className="cursor-pointer"
          >
            요청서 작성
          </Button>
        </div>
      </section>
      <div className="mx-auto mb-[200px] max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <Banner />
      </div>
    </div>
  );
};

export default UserMainPage;
