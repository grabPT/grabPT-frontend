import { useNavigate } from 'react-router-dom';

import Profile from '@/assets/images/HeaderProfile.png';
import MockImage from '@/assets/images/동영상 등 대체 도형.png';
import Button from '@/components/Button';
import ImageSlide from '@/components/ImageSlide';
import { TitleLine } from '@/components/TitleLine';
import ROUTES from '@/constants/routes';
import ExpertDetailBgImg from '@/features/ExpertDetail/assets/ExpertDetailBgImg.svg';
import { Credential } from '@/features/ExpertDetail/components/Credential';
import { CredentialType, type credentialListItem } from '@/features/ExpertDetail/type/credential';

export const ExpertDetailInfo = () => {
  const nav = useNavigate();
  const handleChatButton = () => {
    nav(ROUTES.CHAT.ROOT);
  };
  const credentialList: credentialListItem[] = [
    {
      type: CredentialType.CERTIFICATE,
      content: '생활스포츠지도사 2급 (보디빌딩)',
    },
    {
      type: CredentialType.AWARD,
      content: '보디빌딩 대회 준우승',
    },
    {
      type: CredentialType.EDUCATION,
      content: '생활스포츠지도사 2급 (보디빌딩)',
    },
    {
      type: CredentialType.EXPERIENCE,
      content: '보디빌딩 대회 준우승',
    },
  ];
  const images = Array.from({ length: 7 }, () => MockImage);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mt-10 w-full">
        <img src={ExpertDetailBgImg} alt="전문가 프로필 뱌경화면" className="w-full" />
        <img
          src={Profile}
          alt="전문가 프로필 사진"
          className="absolute left-1/2 h-[11.25rem] w-[11.25rem] translate-x-[-50%] translate-y-[-50%]"
        />
        <div className="mt-[6.875rem] flex flex-col items-center justify-center">
          <span className="font-roboto text-[2rem] font-semibold">박수민</span>
          <span className="font-inter text-[0.875rem] font-semibold text-[#003EFB]">
            응암동헬스장 브라이언박 트레이닝 센터
          </span>
        </div>
        <div className="mt-10 flex items-end justify-end">
          <Button
            children="채팅 상담"
            width="w-[17.5rem]"
            height="h-[2.625rem]"
            text="text-white text-[15px] font-semibold"
            onClick={handleChatButton}
          />
        </div>
      </div>
      <div className="mt-[4.06rem] flex w-full flex-col items-center justify-center gap-18">
        <div className="flex w-full flex-col items-center justify-center">
          <span className="text-2xl font-extrabold">전문가 소개</span>
          <div className="mt-[2.62rem] h-0.5 w-full bg-[#BBBB]" />
          <div className="mt-[6.7rem] h-[27.0625rem] w-full rounded-[0.625rem] border border-[#CCC] bg-[#F5F5F5] p-4">
            자기소개 자기소개 ~~
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <TitleLine title="소개 사진" />
          <ImageSlide title="소개 사진" images={images} />
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <TitleLine title="자격 사항" />
          <div className="flex w-full flex-col items-center justify-center gap-5">
            {credentialList.map((credential) => (
              <Credential type={credential.type} content={credential.content} />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <TitleLine title="PT 프로그램" />
          <div className="h-[27.0625rem] w-full rounded-[0.625rem] border border-[#CCC] bg-[#F5F5F5] p-4">
            PT 프로그램 설명
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <TitleLine title="위치" />
          <div className="h-[27.0625rem] w-full rounded-[0.625rem] border border-[#CCC] bg-[#F5F5F5] p-4">
            위치 정보
          </div>
        </div>
      </div>
    </div>
  );
};
