import { useEffect, useMemo, useRef, useState } from 'react';

import imageCompression from 'browser-image-compression';
import { useForm } from 'react-hook-form';

import type { UserInfo } from '@/apis/getUserInfo';
import Button from '@/components/Button';
import { usePatchMyPage } from '@/features/Mypage/hooks/usePatchMypage';
import { useCheckNickname } from '@/features/Signup/hooks/useCheckNickname';

interface DashboardProps {
  userInfo?: UserInfo;
}

type FormValues = {
  nickname: string;
};

interface InputAddressType {
  city: string;
  district: string;
  street: string; // 법정동/읍/면(=bname)
  streetCode: string; // 도로명 상세(파싱)
  zipcode: string;
  specAddress?: string; // 상세주소 TODO: api 수정 필요
}

declare global {
  interface Window {
    daum?: any;
  }
}

const Dashboard = ({ userInfo }: DashboardProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [addressDirty, setAddressDirty] = useState(false);
  const [nicknameVerified, setNicknameVerified] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [inputAddress, setInputAddress] = useState<InputAddressType>();
  const [profileImageFile, setProfileImageFile] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1024 };
      try {
        const compressedFile = await imageCompression(file, options);
        setProfileImageFile(compressedFile);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // PATCH /mypage 훅
  const { mutate: patchMyPageMutate, isPending: isSaving } = usePatchMyPage(() => {
    setIsEdit(false);
    setProfileImageFile(undefined);
    setAddressDirty(false);
  });

  // 기존 유저 주소(보기모드 및 기본값)
  const originalAddress = userInfo?.address?.[0];
  const addressTextFromUser = useMemo(
    () =>
      `${originalAddress?.city ?? ''} ${originalAddress?.district ?? ''} ${originalAddress?.street ?? ''} ${originalAddress?.specAddress ?? ''}`.trim(),
    [originalAddress],
  );

  // 편집 모드에서 보여줄 메인 주소
  const displayMainAddress = useMemo(() => {
    if (inputAddress) {
      const { city, district, street, streetCode } = inputAddress;
      return `${city ?? ''} ${district ?? ''} ${street ?? ''} ${streetCode ?? ''}`.trim();
    }
    return addressTextFromUser;
  }, [inputAddress, addressTextFromUser]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    getValues,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { nickname: userInfo?.nickname ?? '' },
  });

  const watchedNickname = watch('nickname');

  // 닉네임 변경 시 검증 상태
  useEffect(() => {
    if (!isEdit) return;
    if ((watchedNickname?.trim() ?? '') === (userInfo?.nickname ?? '')) {
      setNicknameVerified(true);
      clearErrors('nickname');
    } else {
      setNicknameVerified(false);
    }
  }, [watchedNickname, isEdit, userInfo?.nickname, clearErrors]);

  const { mutate: checkNickname, isPending: isChecking, reset: resetCheck } = useCheckNickname();

  const handleCheckNickname = () => {
    resetCheck();
    const nickname = getValues('nickname')?.trim() ?? '';
    if (!nickname) {
      setError('nickname', { type: 'required', message: '닉네임을 입력해주세요.' });
      setNicknameVerified(false);
      return;
    }
    if (nickname === (userInfo?.nickname ?? '')) {
      setNicknameVerified(true);
      clearErrors('nickname');
      return;
    }
    checkNickname(nickname, {
      onSuccess: (data) => {
        if (data.result === false) {
          setNicknameVerified(true);
          clearErrors('nickname');
        } else {
          setNicknameVerified(false);
          setError('nickname', {
            type: 'validate',
            message: '이미 사용 중인 닉네임입니다.',
          });
        }
      },
      onError: () => {
        setNicknameVerified(false);
        setError('nickname', {
          type: 'validate',
          message: '닉네임 중복 확인 중 오류가 발생했습니다.',
        });
      },
    });
  };
  const imageDirty = !!profileImageFile;

  const onSubmit = (values: FormValues) => {
    if (values.nickname.trim() !== (userInfo?.nickname ?? '') && !nicknameVerified) {
      setError('nickname', { type: 'validate', message: '닉네임 중복 확인을 완료해주세요.' });
      return;
    }

    patchMyPageMutate({
      nickname: values.nickname.trim(),
      address: {
        city: inputAddress?.city ?? originalAddress?.city ?? '',
        district: inputAddress?.district ?? originalAddress?.district ?? '',
        street: inputAddress?.street ?? originalAddress?.street ?? '',
        zipcode: inputAddress?.zipcode ?? originalAddress?.zipcode ?? '',
      },
      profileImageFile: profileImageFile || undefined, // 선택 시만 포함
    });
  };

  const handleEnterEdit = () => {
    setIsEdit(true);
    reset({ nickname: userInfo?.nickname ?? '' });
    setAddressDirty(false);
    setNicknameVerified(true);
    clearErrors('nickname');
  };

  const handleCancel = () => {
    setIsEdit(false);
    reset({ nickname: userInfo?.nickname ?? '' });
    setAddressDirty(false);
    setNicknameVerified(true);
    clearErrors('nickname');
    setInputAddress(undefined);
    setProfileImageFile(undefined);
  };

  const nicknameChanged = (watchedNickname?.trim() ?? '') !== (userInfo?.nickname ?? '');
  const canSubmit =
    (isDirty || addressDirty || imageDirty) &&
    !isSubmitting &&
    (!nicknameChanged || nicknameVerified);
  // 카카오 우편번호 로더
  const ensureDaumLoaded = () =>
    new Promise<void>((resolve) => {
      if (window.daum?.Postcode) return resolve();
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src*="t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]',
      );
      if (existing) {
        existing.onload = () => resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });

  // 모달 열릴 때 카카오 우편번호 임베드
  useEffect(() => {
    if (!postModalOpen) return;
    let cancelled = false;

    const mountPostcode = async () => {
      await ensureDaumLoaded();
      if (cancelled) return;

      const container = document.getElementById('daum-postcode') as HTMLElement | null;
      if (!container || !window.daum?.Postcode) return;

      container.innerHTML = '';
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          const streetCode = (data.roadAddress || '').replace(/^.+?\s+.+?\s+/, '');
          const city = data.sido;
          const district = data.sigungu;
          const street = data.bname;
          const zipcode = data.zonecode;

          setInputAddress({
            city,
            district,
            street,
            streetCode,
            zipcode,
            specAddress: '',
          });
          setAddressDirty(true);
          setPostModalOpen(false);
        },
        onclose: () => setPostModalOpen(false),
      }).embed(container);
    };

    mountPostcode();
    return () => {
      cancelled = true;
    };
  }, [postModalOpen]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex w-[812px] justify-center">
          {/* 프로필 + 이미지 등록 */}
          <div className="ml-[16px] flex flex-col items-center gap-[30px]">
            <img
              src={
                profileImageFile
                  ? URL.createObjectURL(profileImageFile)
                  : userInfo?.profileImageUrl || '/default-profile.png'
              }
              alt="프로필"
              className="h-[180px] w-[180px] rounded-full object-cover"
            />

            {isEdit && (
              <>
                <input
                  aria-label="프로필 숨은 인풋"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button
                  type="button"
                  width="w-[176px]"
                  height="h-[42px]"
                  text="text-[15px] font-semibold text-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  이미지 등록
                </Button>
              </>
            )}
          </div>

          {/* 기본 정보 */}
          <div className="mt-[19px] ml-[45px]">
            <ul className="flex w-[400px] flex-col gap-[20px]">
              <li className="flex items-center justify-between gap-[20px]">
                <span className="w-15 text-right text-[15px] font-semibold">이름</span>
                <div className="h-[24px] w-[493px] rounded-[10px]">{userInfo?.name}</div>
              </li>

              <li className="flex items-center justify-between gap-[20px]">
                <span className="w-15 text-right text-[15px] font-semibold">이메일</span>
                <div className="h-[24px] w-[493px] rounded-[10px]">{userInfo?.email}</div>
              </li>

              {/* 닉네임 */}
              <li className="flex items-center gap-[20px]">
                <span className="w-10 text-right text-[15px] font-semibold">닉네임</span>
                {isEdit ? (
                  <div className="relative">
                    <input
                      {...register('nickname')}
                      aria-label="닉네임"
                      type="text"
                      className="h-[44px] w-[300px] rounded-[10px] border border-[#BABABA] p-2"
                      placeholder="닉네임을 입력하세요"
                    />
                    <button
                      type="button"
                      onClick={handleCheckNickname}
                      disabled={isChecking}
                      className="absolute top-1/2 right-4 flex h-7 w-[4.375rem] -translate-y-1/2 items-center justify-center rounded-[3.125rem] bg-[color:var(--color-button)] text-[0.625rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)] disabled:opacity-60"
                    >
                      {isChecking ? '확인 중' : '중복 확인'}
                    </button>
                    <p className="absolute top-10 left-2 mt-2 text-[12px]" aria-live="polite">
                      {errors.nickname?.message ? (
                        <span className="text-red-500">{errors.nickname.message}</span>
                      ) : nicknameChanged ? (
                        nicknameVerified ? (
                          <span className="text-green-600">사용 가능한 닉네임입니다.</span>
                        ) : (
                          <span className="text-gray-500">중복 확인이 필요합니다.</span>
                        )
                      ) : (
                        <span className="text-gray-500">현재 닉네임과 동일합니다.</span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="h-[24px] w-[300px] rounded-[10px]">{userInfo?.nickname}</div>
                )}
              </li>

              {/* 주소 */}
              {!isEdit && (
                <li className="flex items-center gap-[20px]">
                  <span className="w-10 text-right text-[15px] font-semibold">주소</span>
                  <input
                    aria-label="주소"
                    type="text"
                    className="h-[34px] w-[300px] rounded-[10px] border border-[#BABABA] p-2"
                    placeholder={addressTextFromUser || '주소 정보가 없습니다.'}
                    readOnly
                  />
                </li>
              )}

              {isEdit && (
                <li className="mt-[20px] flex items-center gap-[20px]">
                  <div className="relative">
                    <div className="flex items-center gap-[20px]">
                      <span className="w-10 text-right text-[15px] font-semibold">주소</span>
                      <div className="relative flex h-[3.125rem] w-[300px] items-center justify-between rounded-[0.625rem] border border-[#BDBDBD]">
                        <input
                          type="text"
                          readOnly
                          placeholder="주소"
                          value={displayMainAddress}
                          className="w-[300px] py-[0.8rem] pl-4 text-[#616161]"
                        />
                        <button
                          type="button"
                          onClick={() => setPostModalOpen(true)}
                          className="absolute top-1/2 right-4 flex h-7 w-[4.375rem] -translate-y-1/2 items-center justify-center rounded-[3.125rem] bg-[color:var(--color-button)] text-[0.625rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)]"
                        >
                          주소 검색
                        </button>
                      </div>
                    </div>

                    {/* 상세 주소 */}
                    <div className="absolute top-16 left-[60px] flex h-[3.125rem] w-[290px] items-center justify-between">
                      <input
                        type="text"
                        placeholder="상세 주소"
                        value={inputAddress?.specAddress ?? originalAddress?.specAddress ?? ''}
                        onChange={(e) => {
                          setInputAddress((prev) => ({
                            city: prev?.city ?? originalAddress?.city ?? '',
                            district: prev?.district ?? originalAddress?.district ?? '',
                            street: prev?.street ?? originalAddress?.street ?? '',
                            streetCode: prev?.streetCode ?? originalAddress?.streetCode ?? '',
                            zipcode: prev?.zipcode ?? originalAddress?.zipcode ?? '',
                            specAddress: e.target.value,
                          }));
                          setAddressDirty(true);
                        }}
                        className="w-[200px] rounded-[0.625rem] border border-[#BDBDBD] py-[0.8rem] pl-4 text-[#616161]"
                      />
                      <div className="ml-[20px] w-auto">{inputAddress?.street}</div>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mt-[100px] flex w-full items-center justify-center gap-4">
          {!isEdit ? (
            <Button
              label="수정하기"
              width="w-[180px]"
              height="h-[42px]"
              text="text-[15px] font-semibold text-white"
              type="button"
              onClick={handleEnterEdit}
            >
              수정하기
            </Button>
          ) : (
            <>
              <Button
                label="취소"
                width="w-[140px]"
                height="h-[42px]"
                text="text-[15px] font-semibold text-white"
                type="button"
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button
                label="저장하기"
                width="w-[180px]"
                height="h-[42px]"
                text="text-[15px] font-semibold text-white"
                type="submit"
                disabled={!canSubmit || isSaving}
              >
                {isSaving ? '저장 중…' : '저장하기'}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* 카카오 주소 검색 모달 */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div
            id="daum-postcode"
            className="relative flex h-[600px] w-[600px] items-center justify-center rounded-[0.625rem] bg-white shadow-lg"
          />
          <button
            onClick={() => setPostModalOpen(false)}
            className="absolute top-[16rem] right-[19.5rem] h-6 w-6 cursor-pointer rounded-full text-gray-500 hover:bg-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </form>
  );
};

export default Dashboard;
