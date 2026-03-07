import ProfileImage from '@/components/ProfileImage';

import type { getContractListItem } from '../types/getContractListType';

const ContractListInfoCard = ({ contract }: { contract: getContractListItem }) => {
  return (
    <div>
      <div className="flex flex-1 items-center justify-center gap-2">
        <ProfileImage src={contract?.profileImageUrl} alt="프로필 이미지" />
        <span className="font-medium">{contract.userNickname}</span>
      </div>

      {/* 계약 상태 */}
      <div className="flex-1 text-center">
        <span className="inline-block rounded-[1rem] px-[0.85rem] py-1 text-[0.8125rem] font-bold">
          {contract.matchingStatus === 'MATCHED'
            ? '완료'
            : contract.matchingStatus === 'MATCHING'
              ? '진행중'
              : '대기'}
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
