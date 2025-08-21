import { useMemo } from 'react';

import { SPORTS } from '@/constants/sports';
import { useGetAvgPrice } from '@/hooks/useGetPriceResponse';
import { useRequestStore } from '@/store/useRequestStore';

const numberWithComma = (n: number) => n.toLocaleString('ko-KR');

const SelectPriceStep = () => {
  /** 입력 상태 */
  const { priceInfo, setPriceInfo, sportsTypeInfo } = useRequestStore();
  const { price, sessionCount } = priceInfo;

  const [city, district, street] = priceInfo.location.split(' ');
  //스토어에 저장된 종목 categorId를 기반으로 해당 종목 이름 가져오기
  const sport = SPORTS.find((s) => s.id === sportsTypeInfo.categoryId);

  const { data: avgPrice } = useGetAvgPrice(
    sport?.label ?? '', // undefined면 빈 문자열
    city,
    district,
    street,
  );

  /** 총액 계산 */
  const total = useMemo(() => price * sessionCount, [price, sessionCount]);
  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="absolute bottom-[110%] left-0 flex items-start gap-[10px]">
        <p className="font-[Pretendard Variable] text-[36px] leading-[100%] font-extrabold text-black">
          {sport?.label}
        </p>

        {/* 주소 (예시 주소 나중에 연동해야됨) -> 주소는 response로 받아올 건지/로그인 시 쿠키나 스토리지에 보관해둘건지 정해야할듯 */}
        <div className="mt-[19.5px] ml-[10px] h-[17px] w-[152px]">
          <p className="font-[Pretendard Variable] text-[17px] leading-[100%] font-semibold text-black">
            {priceInfo.location}
          </p>
        </div>
      </div>

      <h1 className="text-5xl font-extrabold">
        희망하는 PT <span className="text-button">횟수</span> 와{' '}
        <span className="text-button">가격</span>을 입력해주세요
      </h1>

      <section className="mt-[80px] mb-[20px] flex flex-col items-center gap-8">
        {/* 횟수  */}
        <div className="w-80 space-y-2">
          <label className="block text-center text-sm font-semibold">횟수</label>
          <div className="relative">
            <input
              type="number"
              aria-label="PT 횟수"
              min={1}
              value={sessionCount === 0 ? '' : sessionCount}
              // NaN 방지
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === '') {
                  setPriceInfo({ ...priceInfo, sessionCount: 0 });
                  return;
                }
                const value = Number(raw.replace(/^0+/, ''));
                setPriceInfo({
                  ...priceInfo,
                  sessionCount: value,
                });
              }}
              className="h-12 w-full rounded-lg border border-gray-300 pr-12 pl-15 text-center text-lg outline-none focus:border-blue-500"
            />
            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-500">
              회
            </span>
          </div>
        </div>

        {/* 1당 가격  */}
        <div className="w-80 space-y-2">
          <label className="block text-sm font-semibold">1회당 가격</label>
          <div className="relative">
            <input
              type="number"
              aria-label="횟수당 가격"
              min={0}
              step={1000}
              value={price === 0 ? '' : price}
              // NaN 방지
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === '') {
                  setPriceInfo({ ...priceInfo, price: 0 });
                  return;
                }
                const value = Number(raw.replace(/^0+/, ''));
                setPriceInfo({
                  ...priceInfo,
                  price: value,
                });
              }}
              className="box-border h-12 w-full rounded-lg border border-gray-300 pr-12 pl-15 text-center text-lg outline-none focus:border-blue-500"
            />
            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-500">
              원
            </span>
          </div>
        </div>

        {/* 안내 문구 ------------------------------------------- */}
        <p className="text-xs">
          <span className="font-semibold text-blue-600">{priceInfo.location}</span> 의 평균
          <span className="font-semibold text-red-600"> {sport?.label}</span>PT가격은&nbsp;
          회당&nbsp;
          <span className="font-semibold text-red-600">
            {Number(avgPrice?.result.avgUnitPrice).toLocaleString()}원
          </span>{' '}
          입니다.
        </p>

        {/* 총액 ----------------------------------------------- */}
        <div className="mt-2 text-[22px] font-bold">
          총&nbsp;
          <span className="text-blue-600 underline decoration-blue-600 decoration-2 underline-offset-4">
            {numberWithComma(total)}
          </span>
          &nbsp;원 입니다.
        </div>
      </section>
    </div>
  );
};

export default SelectPriceStep;
