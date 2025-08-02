import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import ROUTES from '@/constants/routes';
import MatchingStatusCard from '@/features/Category/components/MatchingStatusCard';
import { dummyMatchings } from '@/features/Category/data/dummy';
import { useUserRoleStore } from '@/store/useUserRoleStore';

const RealtimeMatchingStatus = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isExpert } = useUserRoleStore();
  const [cardCount, setCardCount] = useState(8);
  const handleRequestWriteClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate(ROUTES.AUTH.LOGIN);
    } else if (isExpert) {
      alert('전문가 계정은 요청서를 작성할 수 없습니다.');
    } else navigate(ROUTES.REQUESTS.NEW);
  };

  // 화면 폭에 따라 카드 개수 조정
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1536) setCardCount(8);
      else if (w >= 1280) setCardCount(6);
      else setCardCount(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section className="flex max-w-[1480px] flex-col gap-9 px-4 sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
      <h2 className="font-[Pretendard Variable] leading-[40px] font-extrabold text-black not-italic sm:text-[24px] xl:text-[30px]">
        실시간 매칭 현황
      </h2>

      <div className="mt-9 grid grid-cols-1 gap-x-[20px] gap-y-[16px] md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
  );
};

export default RealtimeMatchingStatus;
