import { useNavigate, useParams } from 'react-router-dom';

import { postCreateChatRoom } from '@/apis/postCreateChatRoom';
import Button from '@/components/Button';
import ProfileImage from '@/components/ProfileImage';
import ROUTES, { urlFor } from '@/constants/routes';
import { useGetSuggestDetail } from '@/features/SuggestDetail/hooks/useGetSuggestDetail';
import { usePostMatching } from '@/features/SuggestDetail/hooks/usePostMatching';
import { useRoleStore } from '@/store/useRoleStore';
import { onErrorImage } from '@/utils/onErrorImage';

// 제안서 상세페이지
const SuggestDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const suggestionId = Number(id);
  const { userId } = useRoleStore();

  const { data: suggestion, error, isError, isLoading } = useGetSuggestDetail(suggestionId);

  const navigateToProProfile = () => navigate(urlFor.proDetail(suggestion?.proId));

  const 채팅상담 = () => {
    if (!suggestion) return;
    postCreateChatRoom({ userId: suggestion.userId, proId: suggestion.proId });
    navigate(ROUTES.CHAT.ROOT, {
      state: { proId: suggestion.proId },
    });
  };

  const { mutateAsync: matchAsync } = usePostMatching();

  const 매칭수락 = async () => {
    if (!suggestion) return;
    const res = await matchAsync({
      requestionId: Number(suggestion.requestionId),
      suggestionId: Number(suggestion.suggestionId),
    });

    if (res.isSuccess) {
      navigate(urlFor.contractForm(res.result.contractId));
    } else {
      alert(res.message);
    }
  };

  if (isLoading) {
    return (
      <section className="my-10 flex flex-col items-center">
        <p className="text-lg text-gray-600">불러오는 중...</p>
      </section>
    );
  }

  if (isError && error) {
    const status = (error as any)?.response?.status ?? (error as any)?.status;
    const isNotFoundError =
      status === 400 ||
      error.message?.includes('400') ||
      error.message?.includes('not found') ||
      error.message?.includes('존재하지 않는');

    if (isNotFoundError) {
      alert('존재하지 않는 제안서 입니다.');
      navigate(ROUTES.HOME.ROOT);
      return null;
    }
  }
  console.log(suggestion);
  return (
    <section className="my-10 flex flex-col items-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-[300px] w-[300px] overflow-hidden rounded-full object-cover">
          <ProfileImage src={suggestion?.profileImageUrl} alt="트레이너 프로필" />
        </div>
        <span className="mt-5 text-4xl font-bold text-[#21272A]">{suggestion?.userNickname}</span>
        <span className="text-button text-sm font-semibold">{suggestion?.centerName}</span>
      </div>
      {/* 스토어에서 가져온 회원 id와 제안서 proId가 같을 경우 전문가 -> 버튼 사용 불가 */}
      {userId !== suggestion?.proId && (
        <div className="mt-12 flex w-full justify-end gap-4">
          <Button width="w-[155px]" onClick={navigateToProProfile}>
            프로필 방문
          </Button>
          <Button width="w-[274px]" onClick={채팅상담}>
            채팅 상담
          </Button>
        </div>
      )}
      <div className="mt-12 flex w-full flex-col gap-12 text-2xl font-extrabold">
        <div>
          <span className="text-button">제안 가격</span>
          <div className="relative mt-5 flex w-fit items-center">
            <input
              type="number"
              value={suggestion?.sessionCount}
              aria-label="제안 PT 횟수"
              readOnly
              className="mr-1.5 h-12 w-[85px] rounded-xl border-2 border-[#BABABA] pl-3.5 text-center text-2xl text-[#9F9F9F]"
            />
            <span className="mr-5">회</span>
            <input
              type="number"
              value={suggestion?.suggestedPrice}
              aria-label="제안 PT 가격"
              readOnly
              className="mr-1.5 h-12 w-[260px] rounded-xl border-2 border-[#BABABA] px-8 text-end text-2xl text-[#9F9F9F]"
            />
            <span className="mr-5">원</span>

            {suggestion?.isDiscounted && (
              <p className="absolute top-full right-0 mt-1 mr-5 text-sm font-extrabold text-[#FF0000]">
                - {suggestion.discountAmount}원
              </p>
            )}
          </div>
        </div>

        <div>
          <span>
            제안 <span className="text-button">상세 설명</span>
          </span>
          <p className="mt-2 text-xl font-medium">{suggestion?.message}</p>
        </div>

        <div>
          <span>
            상세 <span className="text-button">위치</span>
          </span>
          <p className="mt-2 text-xl font-medium">{suggestion?.location}</p>
        </div>

        <div className="w-full">
          <span className="text-button">사진</span>
          <div className="mt-5 grid w-full grid-cols-5 gap-5">
            {suggestion?.photos.map((imageUrl, idx) => (
              <img
                key={idx}
                src={imageUrl}
                onError={onErrorImage}
                alt="사진"
                className="aspect-square h-full w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      </div>
      {/* 스토어에서 가져온 회원 id와 제안서 proId가 같을 경우 전문가 -> 버튼 사용 불가 */}
      {userId !== suggestion?.proId && (
        <Button width="w-96" className="mt-18" onClick={매칭수락}>
          매칭 수락
        </Button>
      )}
    </section>
  );
};

export default SuggestDetailPage;
