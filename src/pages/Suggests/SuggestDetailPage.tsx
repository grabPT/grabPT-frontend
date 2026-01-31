import { useNavigate, useParams } from 'react-router-dom';

import { postCreateChatRoom } from '@/apis/postCreateChatRoom';
import Button from '@/components/Button';
import ProfileImage from '@/components/ProfileImage';
import ROUTES, { urlFor } from '@/constants/routes';
import { useGetDetailRequest } from '@/features/Request/hooks/useGetDetailRequest';
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
  //매칭 완료 요청서일 경우 버튼 못 누르게
  const { data: requestionDetail } = useGetDetailRequest(suggestion?.requestionId || 0);
  const isMatched = requestionDetail?.isMatched;
  const canClick = !isMatched && userId !== suggestion?.proId;
  //요청, 제안 변동 사항, 총 금액 계산
  const sessionCountDiffer = Math.round(
    (suggestion?.suggestionSessionCount ?? 0) - (suggestion?.requestionSessionCount ?? 0),
  );
  const priceDiffer = Math.round(
    (suggestion?.suggestedPrice ?? 0) - (suggestion?.requestedPrice ?? 0),
  );
  const finalPrice = Math.round(
    (suggestion?.suggestedPrice ?? 0) * (suggestion?.suggestionSessionCount ?? 0),
  );

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
          <span>요청한</span>
          <span className="text-button"> 가격</span>
          <div className="mt-5 space-y-6">
            {/* 횟수와 단가 - 그리드 레이아웃 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <p className="mb-2 text-sm font-semibold text-gray-600">요청 PT 횟수</p>
                <p className="text-3xl font-bold text-blue-600">
                  {suggestion?.requestionSessionCount}회
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <p className="mb-2 text-sm font-semibold text-gray-600">회당 가격</p>
                <p className="text-3xl font-bold text-blue-600">
                  {suggestion?.requestedPrice.toLocaleString()}원
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span>제안 받은</span>
          <span className="text-button"> 가격</span>
          <div className="mt-5 space-y-6">
            {/* 횟수와 단가 - 그리드 레이아웃 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <p className="mb-2 text-sm font-semibold text-gray-600">PT 횟수</p>
                <p className="text-3xl font-bold text-blue-600">
                  {suggestion?.suggestionSessionCount}회
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <p className="mb-2 text-sm font-semibold text-gray-600">회당 가격</p>
                <p className="text-3xl font-bold text-blue-600">
                  {suggestion?.suggestedPrice.toLocaleString()}원
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 할인 및 총액 정보 박스 */}
        <div className="rounded-2xl border-2 border-[#E5E5E5] bg-[#F8F9FA] p-6">
          {/* 요청 금액 */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xl font-semibold text-[#666666]">횟수 변동</span>
            <span className="text-xl text-[#999999]">{sessionCountDiffer.toLocaleString()}회</span>
          </div>

          {/* 제안 금액 */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xl font-semibold text-[#666666]">회당 가격 변동</span>
            <span className="text-xl text-[#999999]">{priceDiffer.toLocaleString()}원</span>
          </div>

          {/* 구분선 */}
          <div className="my-4 border-t-2 border-[#DDDDDD]"></div>

          {/* 총 금액 */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-[#21272A]">최종 결제 금액</span>
            <span className="text-3xl font-extrabold text-[#0066FF]">
              {finalPrice.toLocaleString()}원
            </span>
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
      {isMatched && (
        <div className="mt-8 flex justify-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
            매칭이 완료된 요청서입니다
          </span>
        </div>
      )}
      {canClick && (
        <Button width="w-96" className="mt-18" onClick={매칭수락}>
          매칭 수락
        </Button>
      )}
    </section>
  );
};

export default SuggestDetailPage;
