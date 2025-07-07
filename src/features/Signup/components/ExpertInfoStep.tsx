import { useState } from 'react';

import AddBtn from '@/features/Signup/assets/AddBtn.png';
import SignupEvidence from '@/features/Signup/assets/SignupEvidence.svg';
import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';

interface IExpertInfoStep {
  onNext: () => void;
}

export const ExpertInfoStep = ({ onNext }: IExpertInfoStep) => {
  const [evidenceImage, setEvidenceImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEvidenceImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 로고 */}
      <div className="mt-6 flex justify-center">
        <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
      </div>
      <div className="mt-14 flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-2xl">
        <div className="relative flex h-full w-full flex-col">
          <div className="mx-[4.375rem] mt-16 flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="font-semibold">활동센터</span>
              <input
                placeholder="센터 이름을 입력해주세요"
                className="h-fit w-full rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pl-4"
              />
            </div>
            <div className="flex items-center gap-4">
              {/* 나이 */}
              <div className="flex w-1/2 flex-col">
                <span className="mb-1 font-semibold">나이</span>
                <input
                  placeholder="나이"
                  className="w-full rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pl-4"
                />
              </div>

              {/* 성별 */}
              <div className="flex w-1/2 flex-col">
                <span className="mb-1 font-semibold">성별</span>
                <div className="w-full rounded-[0.625rem] border border-[#BDBDBD] px-2 py-[0.88rem]">
                  <select id="sex" name="sex" className="w-full text-[#707070] outline-none">
                    <option value="남">남</option>
                    <option value="여">여</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">경력</span>
              <div className="flex items-center justify-between rounded-[0.625rem] border border-[#BDBDBD]">
                <input placeholder="경력을 입력해주세요" className="py-[0.88rem] pl-4"></input>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-[1.56rem] flex w-80 flex-col">
            <div className="text-center text-base font-bold">자격 증빙 자료 첨부</div>

            <div className="mt-4 flex h-[6.9375rem] w-[21.1875rem] flex-col items-center rounded-[0.625rem] border border-[#BDBDBD] bg-white">
              <div className="flex items-start justify-center">
                <img src={SignupEvidence} alt="업로드 안내 아이콘" className="mt-1 h-12 w-12" />
              </div>
              <div className="flex w-full items-center gap-4 px-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-[0.3125rem] bg-gray-200">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="자격 증빙 미리보기"
                      className="h-12 w-12 rounded border object-cover"
                    />
                  ) : (
                    <img src={SignupEvidence} alt="증빙 자료 첨부란" className="h-6 w-6" />
                  )}
                </div>

                <div className="font-roboto flex flex-col justify-center leading-tight">
                  {previewUrl ? (
                    <>
                      <span className="text-[0.625rem] text-gray-500">첨부된 이미지</span>
                      <span className="text-[1.125rem] font-bold">
                        {evidenceImage
                          ? evidenceImage.name.length > 20
                            ? `${evidenceImage.name.slice(0, 17)}...`
                            : evidenceImage.name
                          : '파일명 없음'}
                      </span>
                      <span className="text-[0.625rem] text-gray-500">업로드 완료</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[0.625rem] text-gray-500">Description Top</span>
                      <span className="text-[1.125rem] font-bold">Title</span>
                      <span className="text-[0.625rem] text-gray-500">Description Bottom</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-[0.62rem] flex items-center justify-center">
              <label htmlFor="file-upload" className="cursor-pointer">
                <img src={AddBtn} alt="추가 버튼" className="h-auto w-16" />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <div className="absolute bottom-12 left-1/2 w-[25.5625rem] -translate-x-1/2 transform">
            <SignupBtn children={'인증하기'} onClick={onNext} />
          </div>
        </div>
      </div>
    </div>
  );
};
