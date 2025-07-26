export const AGREEMENT_TYPE = {
  privacy: { key: 'privacy', label: '(필수) 개인정보 수집, 이용에 동의합니다.' },
  terms: { key: 'terms', label: '(필수) 이용약관에 동의합니다.' },
  location: { key: 'location', label: '(필수) 위치기반 서비스 약관에 동의합니다.' },
  age: { key: 'age', label: '(필수) 만 14세 이상입니다.' },
  marketing: { key: 'marketing', label: '(선택) 마케팅 정보 수신에 동의합니다.' },
} as const;

export type AgreementType = (typeof AGREEMENT_TYPE)[keyof typeof AGREEMENT_TYPE];
export type AgreementKey = (typeof AGREEMENT_TYPE)[keyof typeof AGREEMENT_TYPE]['key'];

export type CheckedState = {
  all: boolean;
} & Record<AgreementKey, boolean>;
