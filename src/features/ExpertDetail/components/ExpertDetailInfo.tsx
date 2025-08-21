import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import type { certificationResponse } from '@/apis/getProCertifications';
import { postCreateChatRoom } from '@/apis/postCreateChatRoom';
import Profile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';
import { CirtificationCard } from '@/components/CirtificationCard';
import ProfileImageSlide, { type SlideImage } from '@/components/ProfileImageSlide';
import ProfilePrice from '@/components/ProfilePrice';
import { TitleLine } from '@/components/TitleLine';
import ROUTES from '@/constants/routes';
import { useGetProProfileWithUserId } from '@/hooks/useGetProProfile';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import type { PtPrice } from '@/types/ProProfleType';

export const ExpertDetailInfo = () => {
  const [photos, setPhotos] = useState<SlideImage[]>([]);
  const [certifications, setCertifications] = useState<certificationResponse[]>([]);
  const [pricePerOne, setPricePerOne] = useState<number | null>(null);
  const [prices, setPrices] = useState<PtPrice[]>([]);
  const navigate = useNavigate();

  const { id } = useParams();
  const proId = Number(id);
  const { data: userInfo } = useGetUserInfo();
  const userId = userInfo?.userId;

  // const { data: credentialList } = useGetCredentialList();
  // console.log(credentialList);

  const { data: profileData } = useGetProProfileWithUserId(proId);

  useEffect(() => {
    if (profileData?.photos) {
      setPhotos(profileData.photos);
    }
    if (profileData?.certifications) {
      setCertifications(profileData.certifications);
    }
    if (profileData?.pricePerSession) {
      setPricePerOne(profileData.pricePerSession);
    }
    if (profileData?.ptPrices) {
      setPrices(profileData.ptPrices);
    }
  }, [profileData]);

  const 채팅상담 = async () => {
    if (userId == undefined || profileData?.proId === undefined) {
      console.log('안됨');
      return;
    }
    try {
      await postCreateChatRoom({ userId, proId: profileData.proId });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(ROUTES.CHAT.ROOT, {
        state: { proId: profileData.proId },
      });
    } catch (err) {
      console.error('채팅방 생성 실패:', err);
    }
  };

  return (
    <div className="flex w-[800px] flex-col items-center justify-center">
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4">
        {/* <img src={ExpertDetailBgImg} alt="전문가 프로필 뱌경화면" className="w-full" /> */}
        <img
          src={profileData?.profileImageUrl || Profile}
          alt="전문가 프로필 사진"
          className="h-[11.25rem] w-[11.25rem] rounded-full"
        />
        <div className="flex flex-col items-center justify-center">
          <span className="font-roboto text-[2rem] font-semibold">{profileData?.name}</span>
          <span className="font-inter text-[0.875rem] font-semibold text-[#003EFB]">
            {profileData?.center}
          </span>
        </div>
        <div className="mt-4 flex items-end justify-end">
          <Button
            width="w-[17.5rem]"
            height="h-[2.625rem]"
            text="text-white text-[15px] font-semibold"
            onClick={채팅상담}
          >
            채팅 상담
          </Button>
        </div>
      </div>
      <div className="mt-[4.06rem] flex w-full flex-col items-center justify-center gap-18">
        <div className="flex w-full flex-col">
          <span className="text-2xl font-extrabold">전문가 소개</span>
          <div className="mt-6 h-0.5 w-full bg-[#BBBB]" />
          <div className="mt-6 h-[27.0625rem] w-full rounded-[0.625rem] p-4">
            {profileData?.introduction ? (
              profileData?.introduction
            ) : (
              <div className="flex items-center justify-center">등록된 소개글이 없습니다.</div>
            )}
          </div>
        </div>
        <div className="flex w-[800px] flex-col">
          <TitleLine title="사진" />
          <div className="my-6 h-0.5 w-full bg-[#BBBB]" />
          {photos ? (
            <ProfileImageSlide
              images={photos} // 편집 모드든 보기 모드든 photos state만 쓴다
              onChange={setPhotos}
            />
          ) : (
            <div>이미지가 없습니다.</div>
          )}
        </div>
        <div className="flex w-full flex-col">
          <TitleLine title="자격 사항" />
          <div className="my-6 h-0.5 w-full bg-[#BBBB]" />
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-5">
            {/* {credentialList?.certifications.map((credential, index) => (
              <Credential
                key={`${credential.certificationType}-${index}`}
                type={credential.certificationType}
                content={credential.description}
              />
            ))} */}
            {certifications.length > 0 ? (
              certifications.map((certification, index) => (
                <div key={index} className="mb-4">
                  <CirtificationCard
                    CirtificationCode={certification.certificationType}
                    CirtificationDescription={certification.description}
                    imageUrl={certification.imageUrl}
                  />
                </div>
              ))
            ) : (
              <div>자격 사항이 없습니다.</div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col">
          <TitleLine title="PT 가격" />
          <div className="my-6 h-0.5 w-full bg-[#BBBB]" />
          {/* <div className="h-[27.0625rem] w-full rounded-[0.625rem] border border-[#CCC] bg-[#F5F5F5] p-4">
            PT 가격
          </div> */}
          <div className="flex flex-col gap-3">
            <ProfilePrice count={1} price={pricePerOne} />
            {prices.map((price, idx) => (
              <ProfilePrice key={idx} count={price.sessionCount} price={price.price} />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col">
          <TitleLine title="위치" />
          <div className="my-6 h-0.5 w-full bg-[#BBBB]" />
          {/* <div className="h-[27.0625rem] w-full rounded-[0.625rem] border border-[#CCC] bg-[#F5F5F5] p-4">
            위치 정보
          </div> */}
          <div className="flex flex-col gap-4">
            <div className="flex h-[40px] items-center gap-4">
              <div className="text-[20px] font-semibold">센터명</div>
              <div className="text-[#013EFB]">{profileData?.center}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[20px] font-semibold">위치 설명</div>
              <div className="h-[300px]">{profileData?.centerDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
