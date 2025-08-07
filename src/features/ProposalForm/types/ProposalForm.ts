export type SuggestRequestDto = DetailProposalForm & {
  requestionId: number | null; //store에서 초기값 때문에 우선 nul도 포함
  sentAt: string;
  isAgreed: boolean;
};

export type DetailProposalForm = {
  price: number;
  sessionCount: number;
  message: string;
  location: string;
};
