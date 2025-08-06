import type { AgeGroup, Day, EGender, Gender, Purpose, TimeSlot } from '@/types/ReqeustsType';
import type { SportsTypeStepDto } from '@/types/SportsTypeStepDto';

export type RequestRequestDto = SportsTypeStepDto & RequestPriceStepDto & RequestDetailStepDto;

export type RequestDetailStepDto = {
  purpose: Purpose[];
  etcPurposeContent?: string; //사용자가 목적에 '기타'를 선택할 경우 input 값을 포함시켜 전송해야함
  ageGroup: AgeGroup | null;
  userGender: Gender | ''; //ui에서 gender 형식으로 받고 요청 보낼 떄 EGender로 변환해서 전송
  availableDays: Day[];
  availableTimes: TimeSlot[];
  trainerGender: Gender | '';
  startPreference: string;
  content: string;
};
export type RequestPriceStepDto = {
  price: number;
  sessionCount: number;
  location: string;
};
export type RequestResponseDto = {
  requestionId:number;
};

export interface RequestDetailResponse {
  requestionId: number;
  purpose: string[];
  ageGroup: string;
  userGender: EGender | '';
  price: number;
  sessionCount: number;
  location: string;
  startPreference: string; // YYYY-MM-DD
  availableDays: string[];
  availableTimes: string[];
  trainerGender: EGender | '';
  // etcPurposeContent?: string;
  // content: string;
  nickname: string;
  profileImage: string;
}
