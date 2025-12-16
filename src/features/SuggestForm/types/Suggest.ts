export type SuggestRequestDto = DetailSuggestForm & {
  requestionId: number | null; //store에서 초기값 때문에 우선 nul도 포함
  sentAt: string;
  isMatched: boolean;
};

export type DetailSuggestForm = {
  price: number;
  sessionCount: number;
  message: string;
  location: string;
};

export type SuggestResponseDto = {
  suggestionId: number;
};
