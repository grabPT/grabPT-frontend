import { useNavigate } from 'react-router-dom';

import ProfileImage from '@/components/ProfileImage';
import { urlFor } from '@/constants/routes';

import type { getContractListItem } from '../types/getContractListType';

const ContractListInfoCard = ({ contract }: { contract: getContractListItem }) => {
  const navigate = useNavigate();
  const navigateUrl =
    contract.paymentStatus === 'OK'
      ? urlFor.contractDetail(contract.contractId)
      : urlFor.contractForm(contract.contractId);
  return (
    <div
      onClick={() => navigate(navigateUrl)}
      className="flex w-[55rem] cursor-pointer items-center rounded-xl bg-[#fff] px-2 py-2 text-[0.875rem] text-[#222] transition-all duration-200 hover:scale-[1.02] hover:shadow-[4px_4px_10px_rgba(0,0,0,0.25)]"
    >
      <div className="flex flex-1 items-center justify-center gap-2">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <ProfileImage src={contract?.profileImageUrl} alt="프로필 이미지" />
        </div>
        <span className="font-medium">{contract.userNickname}</span>
      </div>

      {/* 계약 상태 */}
      <div className="flex-1 text-center">
        <span className="inline-block rounded-[1rem] px-[0.85rem] py-1 text-[0.8125rem] font-bold">
          {contract.paymentStatus === 'OK' ? '완료' : '진행중'}
        </span>
      </div>

      {/* 계약 금액 */}
      <div className="flex-1 text-center font-semibold">
        {(contract.contractPrice * contract.sessionCount).toLocaleString()}원
      </div>

      {/* 계약 기간 */}
      <div className="flex-1 text-center leading-[1.6] text-[#616161]">
        <div>{contract.startDate}</div>
        <div>~ {contract.expireDate}</div>
      </div>

      {/* PT 횟수 */}
      <div className="flex-1 text-center font-semibold">{contract.sessionCount}회</div>
    </div>
  );
};

export default ContractListInfoCard;
