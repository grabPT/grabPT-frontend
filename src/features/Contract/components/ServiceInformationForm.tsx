import type { getContractInfoResultType } from '@/features/Contract/types/getContractInfoType';

interface ServiceInformationFormProps {
  data: getContractInfoResultType | undefined;
  isExpert: boolean;
  startDate: string; // YYYY-MM-DD
  contractDate: string; // YYYY-MM-DD
  onChangeStartDate: (v: string) => void;
  onChangeContractDate: (v: string) => void;
}

const ServiceInformationForm = ({
  data,
  isExpert,
  startDate,
  contractDate,
  onChangeStartDate,
  onChangeContractDate,
}: ServiceInformationFormProps) => {
  const totalPrice = (data?.price || 0) * (data?.totalSession || 0);

  return (
    <div className="grid grid-cols-[auto_1fr_auto_1fr] gap-x-4 gap-y-4 text-sm">
      {/* 총 회차 */}
      <label className="self-center">총 회차</label>
      <input
        type="text"
        placeholder={`${data?.totalSession ?? ''}회`}
        disabled
        className="h-10 w-full rounded-md border border-gray-300 bg-gray-200 px-3 text-gray-700"
      />

      {/* 회당 금액 */}
      <label className="self-center">회당 금액</label>
      <input
        type="text"
        placeholder={`${data?.price ?? ''}원`}
        disabled
        className="h-10 w-full rounded-md border border-gray-300 bg-gray-200 px-3 text-gray-700"
      />

      {/* 총 금액 */}
      <label className="self-center">총 금액</label>
      <input
        type="text"
        placeholder={`${totalPrice}원`}
        disabled
        className="h-10 w-full rounded-md border border-gray-300 bg-gray-200 px-3 text-gray-700"
      />

      {/* 시작일 */}
      <label className="self-center">시작일</label>
      <input
        aria-label="시작일"
        type="date"
        name="visible-startDate"
        value={startDate}
        onChange={(e) => onChangeStartDate(e.target.value)}
        disabled={!isExpert}
        className="focus:border-button h-10 w-full rounded-md border border-gray-300 bg-white px-3 outline-none disabled:bg-gray-200"
      />

      {/* 이용 장소 */}
      <label className="self-center">이용 장소</label>
      <input
        aria-label="이용 장소"
        type="text"
        placeholder={`${data?.ptAddress ?? ''}`}
        disabled
        className="h-10 w-full rounded-md border border-gray-300 bg-gray-200 px-3 text-gray-700"
      />

      {/* 유효기간 */}
      <label className="self-center">유효기간</label>
      <input
        aria-label="유효기간"
        type="date"
        name="visible-contractDate"
        value={contractDate}
        onChange={(e) => onChangeContractDate(e.target.value)}
        disabled={!isExpert}
        className="focus:border-button h-10 w-full rounded-md border border-gray-300 bg-white px-3 outline-none disabled:bg-gray-200"
      />
    </div>
  );
};

export default ServiceInformationForm;
