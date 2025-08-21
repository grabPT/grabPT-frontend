import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import ErrorComponent from '@/components/ErrorComponent';
import LoadingMuscle from '@/components/LoadingMuscle';
import MatchingStatusCard from '@/components/MatchingStatusCard';
import ROUTES from '@/constants/routes';
import { getLabelFromSlug } from '@/constants/sports';
import { useGetRealtimeMatching } from '@/hooks/useGetRealtimeMatching';
import { useRoleStore } from '@/store/useRoleStore';
import type {} from '@/types/RealtimeMatchingType';
import type { SportsSlugType } from '@/types/SportsType';

interface RealtimeMatchingStatusProps {
  categoryType: SportsSlugType;
}

// 실시간 매칭 현황 컴포넌트입니다
// category를 넘겨받으면 컴포넌트에서 요청을 날립니다
const RealtimeMatchingStatus = ({ categoryType }: RealtimeMatchingStatusProps) => {
  const { data: matchingList, error, isPending } = useGetRealtimeMatching(categoryType);
  const navigate = useNavigate();
  const { isLoggedIn, role } = useRoleStore();
  const [cardCount, setCardCount] = useState(8);
  const handleRequestWriteClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate(ROUTES.AUTH.LOGIN);
    } else if (role === 'EXPERT') {
      alert('전문가 계정은 요청서를 작성할 수 없습니다.');
    } else navigate(ROUTES.MATCHING_STATUS.REQUESTS.NEW);
  };
  const categoryLabel = getLabelFromSlug(categoryType);
  // 화면 폭에 따라 카드 개수 조정
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1820) setCardCount(8);
      else if (w >= 1440) setCardCount(6);
      else setCardCount(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  //ui 처리
  if (isPending) return <LoadingMuscle />;
  if (error) return <ErrorComponent />;

  return (
    <section className="3xl:w-[1480px] flex flex-col gap-9 px-4 sm:w-[720px] md:w-[920px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1280px]">
      <h2 className="font-[Pretendard Variable] leading-[40px] font-extrabold text-black not-italic sm:text-[24px] xl:text-[30px]">
        <span className="text-button">{categoryLabel}</span> 실시간 매칭 현황
      </h2>

      <div className="3xl:grid-cols-4 mt-6 grid grid-cols-1 gap-x-8 gap-y-8 xl:grid-cols-3">
        {matchingList
          ?.slice(0, cardCount)
          .map((match, idx) => <MatchingStatusCard key={idx} match={match} />)}
      </div>

      {/* 오른쪽 아래 정렬 */}
      {!(role === 'EXPERT') && (
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
      )}
    </section>
  );
};

export default RealtimeMatchingStatus;
