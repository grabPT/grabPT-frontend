import { useCallback, useEffect, useState } from 'react';

import type { ProPricePayload, ptPriceUpdateRequestDtoList } from '@/apis/EditProProfile';
import CommentBox from '@/components/CommentBox';
//import ImageSlide from '@/components/ImageSlide';
import ProfileCard from '@/components/ProfileCard';
import ProfileImageSlide, { type SlideImage } from '@/components/ProfileImageSlide';
import ProfilePrice from '@/components/ProfilePrice';
import ProfilePriceInput from '@/components/ProfilePriceInput';
import { TitleLine } from '@/components/TitleLine';
import {
  MyProfileEditButton,
  MyProfileEditCancelButton,
  MyProfileEditSaveButton,
} from '@/components/myProfileEditButton';
import {
  useEditPhotos,
  useEditProCenter,
  useEditProDescription,
  useEditProPrice,
} from '@/hooks/useEditProProfile';
//import MypageSection from '@/features/Mypage/components/MypageSection';
import { useProProfileQuery } from '@/hooks/useGetProProfile';
import type { PtPrice } from '@/types/ProProfleType';

import ExpertProfileSkeleton from './ui/ExpertProfileSkeleton';

//스타일 통일 될 경우 TileLine 컴포넌트로 통일

const ExpertProfile = () => {
  const [isCommentEdit, setIsCommentedit] = useState(false);
  const [isPhotosEdit, setIsPhotosEdit] = useState(false);
  const [isPriceEdit, setIsPriceEdit] = useState(false);
  const [isLocationEdit, setIsLocationEdit] = useState(false);
  const [comment, setComment] = useState('');
  const [originPhotos, setOriginPhotos] = useState<SlideImage[]>([]);
  const [photos, setPhotos] = useState<SlideImage[]>([]);
  const [prices, setPrices] = useState<PtPrice[]>([]);
  const [pricePerOne, setPricePerOne] = useState<number | null>(null);
  const [pricesForPayLoad, setPricesForPayLoad] = useState<ptPriceUpdateRequestDtoList[]>([]);
  const [centerName, setCenterName] = useState<string>('');
  const [centerDescription, setCenterDescription] = useState<string>('');
  const [resetSeed, _setResetSeed] = useState(0);
  const [isPhotosCompressing, setIsPhotosCompressing] = useState(false);

  const { data: profileData, isLoading, isError } = useProProfileQuery();

  useEffect(() => {
    setComment(profileData?.programDescription || '');
    setOriginPhotos(profileData?.photos || []);
    setPhotos(profileData?.photos || []);
    setPrices(profileData?.ptPrices || []);
    setPricePerOne(profileData?.pricePerSession || null);
    setCenterName(profileData?.centerName || '');
    setCenterDescription(profileData?.proCenterDescription || '');

    const initialPrices: ptPriceUpdateRequestDtoList[] = [];

    // 1회 가격 먼저 추가
    if (profileData?.pricePerSession != null) {
      initialPrices.push({
        totalSessions: 1,
        pricePerSession: profileData.pricePerSession,
      });
    }

    // 추가 횟수별 가격들 변환해서 추가
    if (Array.isArray(profileData?.ptPrices)) {
      profileData?.ptPrices.forEach((p) => {
        initialPrices.push({
          totalSessions: p.sessionCount,
          pricePerSession: p.price,
        });
      });
    }

    setPricesForPayLoad(initialPrices);
  }, [profileData]);

  const handleCommentEdit = () => {
    setIsCommentedit((prev) => !prev);
  };
  const handlePhotosEdit = () => {
    // 편집 시작 시 원본 복사
    setPhotos([...originPhotos.map((p) => ({ ...p }))]);
    setIsPhotosEdit(true);
  };
  const handlePriceEdit = () => {
    setIsPriceEdit(true);
    setPricesForPayLoad(
      profileData?.ptPrices?.map((p) => ({
        totalSessions: p.sessionCount,
        pricePerSession: p.price,
      })) ?? [],
    );
  };
  const handlePriceCancel = () => {
    setPricePerOne(profileData?.pricePerSession ?? null);
    setPrices(profileData?.ptPrices ?? []);
    setPricesForPayLoad(
      profileData
        ? [
            { totalSessions: 1, pricePerSession: profileData.pricePerSession ?? 0 },
            ...(profileData.ptPrices?.map((p) => ({
              totalSessions: p.sessionCount,
              pricePerSession: p.price,
            })) ?? []),
          ]
        : [],
    );
    setIsPriceEdit(false);
  };

  const handlePhotosCancel = () => {
    setPhotos([...originPhotos.map((p) => ({ ...p }))]); // 원본 복구
    setIsPhotosEdit(false);
  };

  const handleCenterEdit = () => {
    setIsLocationEdit((prev) => !prev);
  };

  const handleCenterCancel = () => {
    setCenterName(profileData?.centerName ?? '');
    setCenterDescription(profileData?.proCenterDescription ?? '');
    setIsLocationEdit(false);
  };

  const { mutate: mutateComment } = useEditProDescription();

  const handleCommentSave = () => {
    mutateComment(
      { description: comment }, // comment는 입력 state
      {
        onSuccess: () => {
          setIsCommentedit(false); // 편집 모드 종료
        },
      },
    );
  };

  const { mutate: mutatePhoto } = useEditPhotos();
  const handlePhotosSave = () => {
    const newPhotos: File[] = [];
    const existingPhotoUrls: string[] = [];

    photos.forEach((p) => {
      if (p.file instanceof File) {
        newPhotos.push(p.file); // 새로 추가한 파일만
      } else if (p.imageUrl) {
        existingPhotoUrls.push(p.imageUrl); // 남겨둘 기존 URL
      }
    });

    // ✅ 모두 삭제하는 경우도 서버에 반영되어야 하므로 early-return 없앰
    mutatePhoto(
      { existingPhotoUrls, newPhotos },
      {
        onSuccess: () => {
          setOriginPhotos([...photos.map((p) => ({ ...p }))]); // 저장한 상태를 원본으로
          setIsPhotosEdit(false);
        },
      },
    );
  };

  const { mutate: mutatePrice, isPending: isPriceLoading } = useEditProPrice();

  const handlePriceSave = () => {
    if (pricePerOne == null || isNaN(pricePerOne)) {
      alert('1회 가격을 입력해주세요.');
      return;
    }
    if (!pricePerOne || pricePerOne <= 0) {
      alert('1회 가격은 0원보다 커야 합니다.');
      return;
    }

    // 1회 가격 + 추가 가격들을 합쳐서 Request Body 생성
    const payload: ProPricePayload = {
      ptPriceUpdateRequestDtoList: [
        { totalSessions: 1, pricePerSession: pricePerOne },
        ...pricesForPayLoad, // ProfilePriceInput에서 onChange로 관리되는 배열
      ],
    };

    mutatePrice(payload, {
      onSuccess: () => {
        setIsPriceEdit(false);
      },
    });
  };

  const { mutate: mutateCenter } = useEditProCenter();

  const handlePricesChange = useCallback((items: ptPriceUpdateRequestDtoList[]) => {
    setPricesForPayLoad(items);
  }, []);

  const handleCenterSave = () => {
    if (!centerName.trim()) {
      alert('센터명을 입력해주세요.');
      return;
    }

    mutateCenter(
      { center: centerName, centerDescription },
      {
        onSuccess: () => {
          setIsLocationEdit(false);
        },
      },
    );
  };

  if (isLoading) return <ExpertProfileSkeleton />;
  if (isError || !profileData) return <div>에러 발생</div>;
  return (
    <div className="mx-auto mt-16 flex max-w-[600px] flex-col items-center gap-12">
      {/* 프로필 컴포넌트 */}
      <div className="flex justify-center px-[77px]">
        <ProfileCard profileData={profileData} />
      </div>
      {/* 전문가소개 */}
      <div className="w-full">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <header className="text-center text-2xl font-semibold">전문가 소개</header>
          {!isCommentEdit ? (
            <MyProfileEditButton onClick={handleCommentEdit} />
          ) : (
            <div className="flex items-center gap-2">
              <MyProfileEditCancelButton onClick={handleCommentEdit} />
              <MyProfileEditSaveButton onClick={handleCommentSave} />
            </div>
          )}
        </div>
        <hr className="mt-[10px] border-t-2 border-[#B8B8B8]" />
        {/* 보기 모드 */}
        {!isCommentEdit && (
          <p className="mt-[45px] h-[400px] w-full">{profileData?.proCenterDescription}</p>
        )}

        {/* 수정 모드 */}
        {isCommentEdit && (
          <div className="mt-[45px] flex h-[400px] flex-col gap-3">
            {/* 안내 */}
            <div className="h-[50px] w-full resize-none rounded-lg border border-[#CCCCCC] bg-[#F5F5F5] p-4 text-sm text-[12px] leading-relaxed text-gray-400 placeholder:text-gray-400">
              * 전문가로서의 목표, 수업 방향성, 신념, 가치관 등 전문가님을 소개하고 표현할 수 있는
              이야기를 적어주세요!
            </div>
            {/* 상세 소개 입력 */}
            <CommentBox
              placeholder="• 내용을 입력해주세요."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* 소개 사진 슬라이드 */}
      <div className="w-full">
        <div className="flex w-full justify-between">
          <TitleLine title="소개 사진" />
          {!isPhotosEdit ? (
            <MyProfileEditButton onClick={handlePhotosEdit} />
          ) : (
            <div className="flex items-center gap-2">
              <MyProfileEditCancelButton onClick={handlePhotosCancel} />
              <MyProfileEditSaveButton onClick={handlePhotosSave} disabled={isPhotosCompressing} />
            </div>
          )}
        </div>
        <hr className="mt-[10px] border-t-2 border-[#B8B8B8]" />
      </div>
      {/* <ImageSlide title="소개 사진" images={images} /> */}
      {photos ? (
        <ProfileImageSlide
          key={`photos-${resetSeed}-${isPhotosEdit ? 'edit' : 'view'}`}
          images={photos} // 편집 모드든 보기 모드든 photos state만 쓴다
          isEditable={isPhotosEdit}
          onChange={setPhotos}
          onCompressingChange={setIsPhotosCompressing}
        />
      ) : (
        <div>이미지가 없습니다.</div>
      )}

      {/* 프로그램 가격 표 */}
      <div className="w-full">
        <div className="flex w-full justify-between">
          <TitleLine title="프로그램 가격" />
          {!isPriceEdit ? (
            <MyProfileEditButton onClick={handlePriceEdit} />
          ) : (
            <div className="flex items-center gap-2">
              <MyProfileEditCancelButton onClick={handlePriceCancel} />
              <MyProfileEditSaveButton
                onClick={handlePriceSave}
                disabled={!pricePerOne || pricePerOne <= 0 || isPriceLoading}
              />
            </div>
          )}
        </div>

        <hr className="mt-[10px] mb-[45px] border-t-2 border-[#B8B8B8]" />

        {/* 보기 모드 */}
        {!isPriceEdit && (
          <div className="flex flex-col gap-3">
            <ProfilePrice count={1} price={pricePerOne} />
            {prices.map((price, idx) => (
              <ProfilePrice key={idx} count={price.sessionCount} price={price.price} />
            ))}
          </div>
        )}

        {/* 수정 모드 */}
        {isPriceEdit && (
          <div className="flex flex-col gap-3">
            <ProfilePriceInput
              pricePerOne={pricePerOne}
              onChangePricePerOne={setPricePerOne}
              ptPrices={pricesForPayLoad.filter((p) => p.totalSessions !== 1)}
              onChange={handlePricesChange}
            />
          </div>
        )}
      </div>

      {/* <MypageSection title="프로그램 가격" /> */}

      {/* 위치 등록 */}
      <div className="w-full">
        <div className="flex w-full justify-between">
          <TitleLine title="센터" />
          {!isLocationEdit ? (
            <MyProfileEditButton onClick={handleCenterEdit} />
          ) : (
            <div className="flex items-center gap-2">
              <MyProfileEditCancelButton onClick={handleCenterCancel} />
              <MyProfileEditSaveButton onClick={handleCenterSave} />
            </div>
          )}
        </div>
        <hr className="mt-[10px] mb-[45px] border-t-2 border-[#B8B8B8]" />

        {!isLocationEdit ? (
          <div className="flex flex-col gap-4">
            <div className="flex h-[40px] items-center gap-4">
              <div className="text-[20px] font-semibold">센터명</div>
              <div className="text-[#013EFB]">{profileData?.centerName}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[20px] font-semibold">위치 설명</div>
              <div className="h-[300px]">{centerDescription}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label className="text-[20px] font-semibold">센터명</label>
              <input
                aria-label="센터명"
                type="text"
                className="h-[40px] w-[260px] rounded-[10px] border border-[#BABABA] px-2"
                value={centerName}
                onChange={(e) => setCenterName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[20px] font-semibold">위치 설명</div>
              <CommentBox
                placeholder="• 위치 설명을 입력해주세요."
                value={centerDescription}
                onChange={(e) => setCenterDescription(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      {/* <MypageSection title="위치 등록" /> */}
    </div>
  );
};

export default ExpertProfile;
