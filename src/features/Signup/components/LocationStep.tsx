import { useState } from 'react';

import BackBtn from '@/features/Signup/assets/BackBtn.png';
import Signup_LogoIcon from '@/features/Signup/assets/Signup_LogoIcon.png';
import xBtn from '@/features/Signup/assets/xBtn.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';
import { type Location, type Province, regions } from '@/features/Signup/types/Location';

interface ILocationStep {
  onNext: () => void;
  onPrev: () => void;
}

export const LocationStep = ({ onNext, onPrev }: ILocationStep) => {
  const [selectedProvince, setSelectedProvince] = useState<Province>();
  const [selectedLocation, setSelectedLocation] = useState<Location[]>([]);
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 로고 */}
      <div className="mt-[6.5rem] flex justify-center">
        <img src={Signup_LogoIcon} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
      </div>
      <div className="mt-[2.06rem] flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-lg">
        <div className="relative flex h-full w-full flex-col">
          <div className="mt-[2.56rem] ml-[1.87rem] flex flex-col">
            <div className="relative flex gap-4">
              <button>
                <img src={BackBtn} alt="뒤로가기" onClick={onPrev} />
              </button>
              <span className="absolute -top-1 left-6 text-[1.25rem] font-semibold">
                거주지역을 설정해 주세요
              </span>
            </div>
            <div className="my-[0.56rem] ml-7 text-[0.75rem] font-semibold text-[#D7D7D7]">
              <span>중복 선택 가능(최대 3개)</span>
            </div>
          </div>

          <div className="flex flex-col h-8 items-start justify-center">
            <div className="mx-12 flex gap-8">
              {selectedLocation.map((locations) => (
                <div className="relative">
                  <div
                    className="font-inter flex h-8 w-32 items-center justify-center rounded-[3.125rem] bg-[#003EFB] font-semibold text-white"
                    key={`${locations.province}-${locations.city}`}
                  >
                    {locations.province}시 {locations.city}
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
                    <img src={xBtn} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-12 mt-3 flex h-96 justify-center overflow-hidden rounded-[0.625rem] border">
            {/* 왼쪽: 시/도 */}
            <div className="w-24 overflow-y-auto bg-gray-100 font-semibold text-gray-600">
              {(Object.keys(regions) as Province[]).map((province) => (
                <div
                  key={province}
                  onClick={() => setSelectedProvince(province)}
                  className={`cursor-pointer px-4 py-3 hover:bg-gray-200 ${
                    selectedProvince === province ? 'bg-white font-bold text-black' : ''
                  }`}
                >
                  {province}
                </div>
              ))}
            </div>

            {/* 오른쪽: 시/군/구 */}
            <div className="w-full overflow-y-auto bg-white">
              {selectedProvince &&
                regions[selectedProvince].map((city) => (
                  <div
                    key={city}
                    className="cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-100"
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
          <div className="absolute bottom-12 left-1/2 w-96 -translate-x-1/2 transform">
            <SignupBtn children={'인증하기'} onClick={onNext} />
          </div>
        </div>
      </div>
    </div>
  );
};
