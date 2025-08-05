import type { AgeGroup, Day, Gender, Purpose, TimeSlot } from '@/types/ReqeustsType';
import type { SportsTypeStepDto } from '@/types/SportsTypeStepDto';

export type RequestRequestDto = SportsTypeStepDto & RequestPriceStepDto & RequestDetailStepDto;

export type RequestDetailStepDto = {
  purpose: Purpose[];
  etcPurposeContent?: string; //사용자가 목적에 '기타'를 선택할 경우 input 값을 포함시켜 전송해야함
  ageGroup: AgeGroup | null;
  userGender: Gender | '';
  availableDays: Day[];
  availableTimes: TimeSlot[];
  trainerGender: Gender | '';
  startPreference: string;
  content: string;
};
export type RequestPriceStepDto = {
  price: number;
  sessionCount: number;
};
