import { useState } from 'react';

import ChangeProfile from '@/features/Signup/assets/ChangeProfile.png';
import DefaultProfile from '@/features/Signup/assets/DefaultProfile.svg';
import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';

interface NicknameStepProps {
  onNext: () => void;
}

const NickNameStep = ({ onNext }: NicknameStepProps) => {
  // 프로필 사진 업로드 상태
  const [profileImage, setProfileImage] = useState<File | null>(null);
  // 프로필 사진 미리보기 URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // 닉네임 중복 확인 결과 상태
  const [nicknameCheckResult, setNicknameCheckResult] = useState<'available' | 'duplicate' | null>(
    null,
  );
  // 닉네임 입력 상태
  const [nickname, setNickname] = useState('');
  //이미지 업로드 로직
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  // 닉네임 중복 확인 로직
  const handleCheckNickname = () => {
    if (nickname === 'takenName') {
      setNicknameCheckResult('duplicate');
    } else {
      setNicknameCheckResult('available');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 로고 */}
      <div className="mt-6 flex justify-center">
        <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
      </div>
      <div className="mt-14 flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-2xl">
        <div className="relative flex h-full w-full flex-col">
          <div className="mx-14 mt-[2.38rem] flex flex-col gap-[0.62rem]">
            <div className="flex">
              <span className="text-[1.25rem] font-semibold">
                프로필 사진과 닉네임을 설정해주세요
              </span>
            </div>
          </div>
          {/* 프로필 사진 */}
          <div className="mt-20 flex flex-col items-center justify-center">
            <div
              className="relative cursor-pointer rounded-full bg-white"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <img
                src={previewUrl ?? DefaultProfile}
                alt="프로필"
                className={`h-[11.25rem] w-[11.25rem] rounded-full ${
                  previewUrl ? 'object-cover' : ''
                }`}
              />
              <div className="absolute right-0 bottom-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <img
                  src={ChangeProfile}
                  alt="프로필 변경"
                  className="h-10 w-10 overflow-hidden rounded-full"
                />
              </div>
              <input
                aria-label="프로필사진"
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          {/* 닉네임 설정 */}
          <div className="relative mx-[4.375rem] mt-[5.06rem] flex flex-col gap-2">
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 등록해주세요"
              className={`rounded-[0.625rem] border py-[0.88rem] pl-4 ${
                nicknameCheckResult === 'available'
                  ? 'border-green-500'
                  : nicknameCheckResult === 'duplicate'
                    ? 'border-red-500'
                    : 'border-gray-300'
              }`}
            />

            <button
              className="absolute top-1/2 right-4 flex h-7 w-[4.375rem] -translate-y-1/2 items-center justify-center rounded-[3.125rem] bg-[color:var(--color-button)] text-[0.625rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)]"
              onClick={handleCheckNickname}
            >
              중복 확인
            </button>
          </div>
          <div className="mx-[4.375rem] mt-2 flex flex-col gap-2">
            {nicknameCheckResult === 'available' && (
              <p className="mt-1 text-sm text-green-600">사용 가능한 닉네임입니다</p>
            )}

            {nicknameCheckResult === 'duplicate' && (
              <p className="mt-1 text-sm text-red-600">이미 사용 중인 닉네임입니다</p>
            )}
          </div>
          {/* 다음 버튼 */}
          <div className="absolute bottom-12 left-1/2 w-[25.5625rem] -translate-x-1/2 transform">
            <SignupBtn
              children={'완료'}
              onClick={() => {
                if (nickname.length == 0) {
                  alert('닉네임을 설정해주세요');
                } else {
                  onNext();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NickNameStep;
