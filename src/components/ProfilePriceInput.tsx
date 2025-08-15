import { useCallback, useEffect, useState } from 'react';

//import type { PtPrice } from '@/types/ProPrifleType';
import type { ptPriceUpdateRequestDtoList } from '@/apis/EditProProfile';

import Button from './Button';

interface PriceItemProps {
  pricePerOne?: number | null; // 1회 가격 (고정행)
  ptPrices?: ptPriceUpdateRequestDtoList[]; // [{ sessionCount, price }]
  onChangePricePerOne?: (value: number) => void;
  onChange?: (items: ptPriceUpdateRequestDtoList[]) => void; // (선택) 부모에 변경 알림
}

type UiRow = { count: string; price: string };

const ProfilePriceInput = ({
  pricePerOne,
  onChangePricePerOne,
  ptPrices,
  onChange,
}: PriceItemProps) => {
  const [prices, setPrices] = useState<UiRow[]>([]);

  // 🚀 초기 마운트 시 한 번만 props → state 복사
  useEffect(() => {
    if (ptPrices) {
      setPrices(
        ptPrices
          .filter((p) => p.totalSessions !== 1)
          .map((p) => ({
            count: String(p.totalSessions),
            price: String(p.pricePerSession),
          })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 의존성 비움 → 최초 1회만 실행

  // 로컬 prices 변경 시 부모로 전달
  const emitChange = useCallback(
    (next: UiRow[]) => {
      setPrices(next);
      if (!onChange) return;
      const cleaned: ptPriceUpdateRequestDtoList[] = next
        .map((r) => ({
          totalSessions: Number(r.count),
          pricePerSession: Number(r.price),
        }))
        .filter(
          (p) =>
            Number.isFinite(p.totalSessions) &&
            p.totalSessions > 1 &&
            Number.isFinite(p.pricePerSession) &&
            p.pricePerSession >= 0,
        );
      onChange(cleaned);
    },
    [onChange],
  );

  const handleAddPrice = () => {
    emitChange([...prices, { count: '', price: '' }]);
  };

  const handleChange = (index: number, field: 'count' | 'price', value: string) => {
    const numValue = Number(value);
    const next = [...prices];

    if (field === 'count') {
      // 횟수는 최소 2
      next[index][field] = numValue < 2 ? '2' : String(numValue);
    } else if (field === 'price') {
      // 가격은 최소 1
      next[index][field] = numValue <= 0 ? '1' : String(numValue);
    }

    emitChange(next);
  };

  const handleRemovePrice = (index: number) => {
    const next = prices.filter((_, i) => i !== index);
    emitChange(next.length ? next : [{ count: '', price: '' }]);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 1회 가격 */}
      <div className="flex h-[50px] w-[520px] items-center gap-[10px]">
        <div className="flex h-[50px] w-[85px] items-center justify-center rounded-[10px] border border-[#BABABA] px-2">
          1
        </div>
        <span className="text-[18px] font-semibold">회</span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={pricePerOne ?? ''}
          onChange={(e) => onChangePricePerOne?.(Number(e.target.value))}
          className="h-[50px] w-[260px] rounded-[10px] border border-[#BABABA] px-2 text-center"
          placeholder="가격"
        />
        <span className="text-[18px] font-semibold">원</span>
        {pricePerOne == 0 ? (
          <div className="absolute left-[650px] text-[#FF0000]">1원 이상 입력 해주세요.</div>
        ) : null}
      </div>

      {/* 추가 가격 입력 */}
      {prices.map((item, idx) => (
        <div key={idx} className="flex h-[50px] w-[520px] items-center gap-[10px]">
          <input
            type="number"
            inputMode="numeric"
            min={2}
            value={item.count}
            onChange={(e) => handleChange(idx, 'count', e.target.value)}
            className="h-[50px] w-[85px] rounded-[10px] border border-[#BABABA] px-2 text-center"
            placeholder="횟수"
          />
          <span className="text-[18px] font-semibold">회</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={item.price}
            onChange={(e) => handleChange(idx, 'price', e.target.value)}
            className="h-[50px] w-[260px] rounded-[10px] border border-[#BABABA] px-2 text-center"
            placeholder="가격"
          />
          <span className="text-[18px] font-semibold">원</span>
          <Button onClick={() => handleRemovePrice(idx)}>삭제</Button>
        </div>
      ))}

      <Button
        onClick={handleAddPrice}
        className="mt-[20px] h-[50px] w-[400px] rounded-[10px] bg-[#FFB800] text-white"
      >
        가격 추가
      </Button>
    </div>
  );
};

export default ProfilePriceInput;
