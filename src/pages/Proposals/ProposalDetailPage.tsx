import Profile from '@/assets/images/HeaderProfile.png';
import Image from '@/assets/images/동영상 등 대체 도형.png';
import Button from '@/components/Button';

// 제안서 상세페이지입니다

const ProposalDetailPage = () => {
  return (
    <section className="my-10 flex flex-col items-center">
      <div className="flex flex-col items-center gap-2">
        <img src={Profile} alt="트레이너 프로필" className="h-45 rounded-full object-cover" />
        <span className="mt-5 text-4xl font-bold text-[#21272A]">박수민</span>
        <span className="text-button text-sm font-semibold">
          용암동헬스장 브라이언박 트레이닝 센터
        </span>
      </div>

      <div className="mt-12 flex w-full justify-end gap-4">
        <Button width="w-[155px]">프로필 방문</Button>
        <Button width="w-[274px]">채팅 상담</Button>
      </div>

      <div className="mt-12 flex flex-col gap-12 text-2xl font-extrabold">
        <div>
          <span className="text-button">제안 가격</span>

          {/* 요청서상세페이지에서 가져옴. 컴포넌트로 뺄 수 있음. 근데 -50000 가격차이를 absolute로 처리해서 애매한데 바꿀 수 있음 */}
          <div className="relative mt-5 flex w-fit items-center">
            <input
              type="number"
              value={10}
              aria-label="제안 PT 횟수"
              readOnly
              className="mr-1.5 h-12 w-[85px] rounded-xl border-2 border-[#BABABA] pl-3.5 text-center text-2xl text-[#9F9F9F]"
            />
            <span className="mr-5">회</span>
            <input
              type="number"
              value={480000}
              aria-label="제안 PT 가격"
              readOnly
              className="mr-1.5 h-12 w-[260px] rounded-xl border-2 border-[#BABABA] px-8 text-end text-2xl text-[#9F9F9F]"
            />
            <span className="mr-5">원</span>

            <p className="absolute top-full right-0 mt-1 mr-5 text-sm font-extrabold text-[#FF0000]">
              -50000원
            </p>
          </div>
        </div>

        <div>
          <span>
            제안 <span className="text-button">상세 설명</span>
          </span>
          <p className="mt-2 text-xl font-medium">제안 상세 설명~</p>
        </div>

        <div>
          <span>
            상세 <span className="text-button">위치</span>
          </span>
          <p className="mt-2 text-xl font-medium">위치는 여깁니다!</p>
        </div>

        <div>
          <span className="text-button">사진</span>
          <div className="mt-5 grid w-full grid-cols-5 gap-5">
            {[...Array(6)].map((_, idx) => (
              <img
                key={idx}
                src={Image}
                alt="사진"
                className="aspect-square rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      </div>

      <Button width="w-96" className="mt-18">
        매칭 수락
      </Button>
    </section>
  );
};

export default ProposalDetailPage;
