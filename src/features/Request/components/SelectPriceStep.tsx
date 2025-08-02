import { useMemo, useState } from 'react';

const numberWithComma = (n: number) => n.toLocaleString('ko-KR');

const SelectPriceStep = () => {
  /** 입력 상태 */
  const [count, setCount] = useState(20); // 횟수
  const [unitPrice, setUnitPrice] = useState(20_000); // 1회 가격(원)

  /** 총액 계산 */
  const total = useMemo(() => count * unitPrice, [count, unitPrice]);
  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="absolute bottom-[110%] left-0 flex items-start gap-[10px]">
        {/* 운동명, 후에 api연동 시 data넘기기 적용하고 거기서 받아오는 걸로 */}
        <p className="font-[Pretendard Variable] text-[36px] leading-[100%] font-extrabold text-black">
          복싱
        </p>

        {/* 주소 (예시 주소 나중에 연동해야됨) */}
        <div className="mt-[19.5px] ml-[10px] h-[17px] w-[152px]">
          <p className="font-[Pretendard Variable] text-[17px] leading-[100%] font-semibold text-black">
            서울시 강서구 화곡3동
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
              value={count}
              // NaN 방지
              onChange={(e) => {
                const value = Number(e.target.value);
                setCount(Number.isNaN(value) ? 0 : value);
              }}
              className="h-12 w-full rounded-lg border border-gray-300 pr-12 pl-15.5 text-center text-lg outline-none focus:border-blue-500"
            />
            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-500">
              회
            </span>
          </div>
        </div>

        {/* 1당 가격  */}
        <div className="w-80 space-y-2">
          <label className="block text-sm font-semibold">1당 가격</label>
          <div className="relative">
            <input
              type="number"
              aria-label="횟수당 가격"
              min={0}
              step={1000}
              value={unitPrice}
              // NaN 방지
              onChange={(e) => {
                const value = Number(e.target.value);
                setUnitPrice(Number.isNaN(value) ? 0 : value);
              }}
              className="box-border h-12 w-full rounded-lg border border-gray-300 pr-12 pl-15.5 text-center text-lg outline-none focus:border-blue-500"
            />
            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-500">
              원
            </span>
          </div>
        </div>

        {/* 안내 문구 ------------------------------------------- */}
        <p className="text-xs">
          <span className="font-semibold text-blue-600">강서구 화곡 3동</span> 의 평균
          <span className="font-semibold text-red-600"> 복싱</span>PT가격은&nbsp; 회당&nbsp;
          <span className="font-semibold text-red-600">50,000원</span> 입니다.
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
