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
  location: string;
};
//조회 시에 필요한 response 타입
export type RequestResponseDto = {
  requestRequestionId: number;
};

//수정 창에 필요한 타입
export type RequestDetailPageResponseDto = {
  requestRequestionId: number;
  requestCategoryId: number;
  requestPurpose: Purpose[];
  requestAgeGroup: AgeGroup;
  requestUserGender: Gender;
  requestPrice: number;
  requestSessionCount: number;
  requestLocation: string;
  requestStartPreference: string;
  requestAvailableDays: Day[];
  requestAvailableTimes: TimeSlot[];
  requestTrainerGender: Gender;
  requestContent: string; // 상세 설명
  requestEtcPurposeContent: string; // 기타 목적
  requestUserNickName: string;
  photos: string;
};
