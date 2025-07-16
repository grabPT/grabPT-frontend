//나중에 삭제 예정

import { useState } from 'react';

import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
import xBtn from '@/features/Signup/assets/xBtn.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';
import { type Location, type Province, regions } from '@/features/Signup/types/Location';

interface LocationStepProps {
  onNext: () => void;
}

const LocationStep = ({ onNext }: LocationStepProps) => {
  // 선택된 시/도
  const [selectedProvince, setSelectedProvince] = useState<Province>();
  // 선택된 지역 목록
  const [selectedLocation, setSelectedLocation] = useState<Location[]>([]);
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
              <span className="text-[1.25rem] font-semibold">거주지역을 설정해 주세요</span>
            </div>
            <div className="text-[0.75rem] font-semibold text-[#D7D7D7]">
              <span>중복 선택 가능(최대 3개)</span>
            </div>
          </div>
          {/* 선택한 지역 보여주기 */}
          <div className="flex h-[3.4rem] flex-col items-start justify-center">
            <div className="mx-12 flex gap-8 pt-7">
              {selectedLocation.map((locations) => (
                <div className="relative">
                  <div
                    className="font-inter flex h-8 w-32 items-center justify-center rounded-[3.125rem] bg-[#003EFB] text-[0.75rem] font-semibold text-white"
                    key={`${locations.province}-${locations.city}`}
                  >
                    {locations.province} {locations.city}
                  </div>
                  <div
                    className="absolute top-0 right-0 h-3 w-3"
                    onClick={() =>
                      setSelectedLocation((prev) =>
                        prev.filter(
                          (loc) =>
                            !(loc.province === locations.province && loc.city === locations.city),
                        ),
                      )
                    }
                  >
                    <img
                      alt="x버튼"
                      src={xBtn}
                      className="h-3 w-3 overflow-hidden rounded-full bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-3 flex h-[23rem] w-[28.5rem] justify-center overflow-hidden rounded-[0.625rem] border border-[#D7D7D7] text-[0.75rem]">
            {/* 왼쪽: 시/도 */}
            <div className="w-[6.25rem] overflow-y-auto bg-gray-100 font-semibold text-[#BFBFBF]">
              {(Object.keys(regions) as Province[]).map((province) => (
                <div
                  key={province}
                  onClick={() => setSelectedProvince(province)}
                  className={`flex h-[3.125rem] cursor-pointer items-center justify-center hover:bg-gray-200 active:bg-gray-300 ${
                    selectedProvince === province ? 'bg-white font-bold text-black' : ''
                  }`}
                >
                  {province}
                </div>
              ))}
            </div>

            {/* 오른쪽: 시/군/구 */}
            <div className="w-[22.5rem] overflow-y-auto bg-white">
              {selectedProvince &&
                regions[selectedProvince].map((city, index) => (
                  <div
                    key={city}
                    className={`flex h-[3.125rem] cursor-pointer items-center px-11 text-[0.75rem] font-semibold ${index !== regions[selectedProvince].length - 1 ? 'border-b border-gray-100' : ''} text-[#BFBFBF] hover:bg-gray-200 hover:text-black active:bg-gray-300`}
                    //  중복 선택 불가 + 최대 개수 3개
                    onClick={() => {
                      if (selectedProvince) {
                        const newLocation = { province: selectedProvince, city };

                        const isDuplicate = selectedLocation.some(
                          (loc) =>
                            loc.province === newLocation.province && loc.city === newLocation.city,
                        );

                        if (isDuplicate || selectedLocation.length >= 3) return;

                        setSelectedLocation((prev) => [...prev, newLocation]);
                      }
                    }}
                  >
                    {city}
                  </div>
                ))}
            </div>
          </div>
          {/* 다음 버튼 */}
          <div className="absolute bottom-12 left-1/2 w-[25.5625rem] -translate-x-1/2 transform">
            <SignupBtn
              onClick={() => {
                if (selectedLocation.length === 0) {
                  alert('위치를 1곳 이상 선택해야 합니다');
                  return;
                }
                onNext();
              }}
            >
              다음
            </SignupBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
