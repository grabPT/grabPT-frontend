export type ContractProgressStep =
  | 'USER_FILLING'
  | 'USER_WAITING_PRO'
  | 'PRO_FILLING'
  | 'PRO_DONE'
  | 'READY_TO_PAY';

type ContractProgressParams = {
  isPro: boolean;
  userComplete: boolean;
  proComplete: boolean;
};

export const getContractProgressStep = ({
  isPro,
  userComplete,
  proComplete,
}: ContractProgressParams): ContractProgressStep => {
  if (!isPro) {
    if (!userComplete) return 'USER_FILLING';
    if (!proComplete) return 'USER_WAITING_PRO';
    return 'READY_TO_PAY';
  }

  if (!proComplete) return 'PRO_FILLING';
  return 'PRO_DONE';
};

export const CONTRACT_PROGRESS_MESSAGE: Record<ContractProgressStep, string> = {
  USER_FILLING: '회원 정보와 서명을 입력하면 다음 단계로 넘어갑니다.',
  USER_WAITING_PRO: '회원 작성이 완료되었습니다. 전문가가 작성하면 결제를 진행할 수 있습니다.',
  PRO_FILLING: '전문가 정보, 계약 기간, 서명을 입력하면 계약서 작성이 완료됩니다.',
  PRO_DONE: '전문가 작성이 완료되었습니다. 회원 결제 후 계약이 제출됩니다.',
  READY_TO_PAY: '양측 작성이 완료되었습니다. 계약서를 제출하고 결제를 진행하세요.',
};

export const CONTRACT_PROGRESS_PRIMARY_LABEL: Partial<Record<ContractProgressStep, string>> = {
  USER_FILLING: '회원 정보 작성 완료',
  PRO_FILLING: '전문가 정보 작성 완료',
  READY_TO_PAY: '계약서 제출 및 결제',
};
