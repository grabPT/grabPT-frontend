import type { SportsTypeStepDto } from '@/types/SportsTypeStepDto';

export type BaseSignupRequestDto = SignupUserInfoStepDto &
  SportsTypeStepDto &
  SignupNicknameStepDto &
  SignupUserAgreementDto & {
    userName: string;
    oauthId: string;
    oauthProvider: string;
    role: number;
  };
export type SocialLoginResponseDto = {
  oauthEmail: string | null;
  oauthName: string;
  oauthId: string;
  oauthProvider: string;
};
export type SignupUserAgreementDto = {
  agreedTermsIds: number[];
  isAgreeMarketing: boolean;
};
export type SignupUserInfoStepDto = {
  email: string;
  phoneNumber: string;
  address: AddressRequest;
};
export type SignupProInfoStepDto = {
  centerName: string;
  career: null | number;
  gender: number;
  age: null | number;
};

export type SignupNicknameStepDto = {
  userNickname: string;
};
export type UserSignupRequestDto = {
  data: BaseSignupRequestDto;
  profileImage: File | null;
};

export type ProSignupRequestDto = {
  data: BaseSignupRequestDto & SignupProInfoStepDto;
  profileImage: File | null;
};
export type AddressRequest = {
  city: string;
  district: string;
  street: string;
  zipcode: string;
  streetCode: string;
  specAddress: string;
};

export type ReissueRequestDto = {
  refreshToken: string;
};

export type SmsVerifyRequestDto = SmsSendRequestDto & {
  inputCode: string;
};
export type SmsSendRequestDto = {
  phoneNumber: string;
};

export type LogoutDto = {
  refreshToken: string;
};

export type EmailCheckResponseDto = {
  // 수정 : isDuplicated로 우리가 해놓은 거 같은데 response가 duplicate라 일단 이렇게 했습니다
  duplicate: boolean;
  oauthProvider: string | null;
};
