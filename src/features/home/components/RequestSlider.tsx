import { useEffect, useMemo, useRef } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import HeaderProfile from '@/assets/images/HeaderProfile.png';
import type { RequestsListResultType } from '@/features/Requests/types/getRequestsListType';
import { NextArrow, PrevArrow } from '@/features/home/components/CustomArrow';
import RequestCardInMain from '@/features/home/components/RequestCard';
import { useRoleStore } from '@/store/useRoleStore';

interface RequestSliderProps {
  title: string;
  requests: RequestsListResultType['content'];
  name?: string;
  location?: string;
}

function RequestSlider({ title, requests, location, name }: RequestSliderProps) {
  const { role } = useRoleStore();

  const sliderRef = useRef<Slider>(null);

  // 반응형 설정은 공식문서 패턴 그대로, 불필요한 상태 의존 제거
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4, // 기본 데스크톱
      slidesToScroll: 1,
      initialSlide: 0,
      // 화살표는 항상 같은 컴포넌트를 넘긴다 (컴포넌트 내부에서 currentSlide로 disable 처리)
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1536, // <= 1536
          settings: { slidesToShow: 3, slidesToScroll: 1 },
        },
        {
          breakpoint: 1280, // <= 1280
          settings: { slidesToShow: 2, slidesToScroll: 1 },
        },
        {
          breakpoint: 1024, // <= 1024
          settings: { slidesToShow: 2, slidesToScroll: 1, dots: false },
        },
        {
          breakpoint: 720, // <= 720 (모바일)
          settings: { slidesToShow: 1, slidesToScroll: 1, dots: false },
        },
      ],
    }),
    [],
  );

  // ✅ 초기/반응형 전환 시 0번으로 강제 이동해 트랙 재계산 유도
  useEffect(() => {
    // microtask/next frame 이후 보장
    const t = setTimeout(() => sliderRef.current?.slickGoTo(0, true), 0);
    return () => clearTimeout(t);
  }, [settings]);

  // 뷰포인트 키로 강제 리마운트 (최초/브레이크포인트 전환시 안전)
  const bpKey =
    typeof window === 'undefined'
      ? 'desktop'
      : window.innerWidth <= 720
        ? 'bp-1'
        : window.innerWidth <= 1024
          ? 'bp-2'
          : window.innerWidth <= 1280
            ? 'bp-3'
            : window.innerWidth <= 1536
              ? 'bp-4'
              : 'bp-5';

  return (
    <section className="flex max-w-[1480px] flex-col gap-9 sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
      <h2 className="font-pretendard ml-[10px] text-[30px] leading-[100%] font-extrabold tracking-[0%] sm:text-[24px] lg:text-[30px]">
        {title}
      </h2>

      <div className="relative mx-auto mb-[4px] max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        {/* key로 리마운트 + ref로 강제 초기화 */}
        <Slider key={bpKey} ref={sliderRef} {...settings}>
          {requests.slice(0, 12).map((r, i) => (
            // ⚠️ 슬라이드 루트엔 padding 금지 → 한 겹 감싸서 여백 적용
            <div key={i} className="h-[230px]">
              <div className="px-4">
                <RequestCardInMain
                  id={r.requestId}
                  name={role === 'USER' ? name : role === 'EXPERT' ? r.nickname : ''}
                  location={location ?? ''}
                  profileImg={
                    role === 'USER'
                      ? r?.imageURL
                      : role === 'EXPERT'
                        ? r?.userProfileImageUrl
                        : HeaderProfile
                  }
                  tags={{
                    availableTimes: r.availableTimes,
                    daysPerWeek: r.availableDays.length,
                    categoryName: r.categoryName,
                  }}
                  text={r.content}
                  isMatched={r.matchStatus === 'MATCHED'}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default RequestSlider;
