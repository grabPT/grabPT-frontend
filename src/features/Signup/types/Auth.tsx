import type { SportsTypeStepDto } from '@/types/SportsTypeStepDto';

export type BaseSignupRequestDto = SignupUserInfoStepDto &
  SportsTypeStepDto &
  SignupNicknameStepDto &
  SignupUserAgreementDto & {
    username: string;
    oauthId: string;
    oauthProvider: string;
    role: number;
  };
export type SocialLoginInfo = {
  email?: string | null;
  username: string;
  oauthId: string;
  oauthProvider: 'kakao' | 'naver' | 'google' | '';
};
export type SignupUserAgreementDto = {
  agreedTermsId: number[];
  agreeMarketing: boolean;
};
export type SignupUserInfoStepDto = {
  email: string;
  phoneNum: string;
  address: AddressRequest;
};
export type SignupProInfoStepDto = {
  center: string;
  career: null | number;
  gender: number;
  age: null | number;
};

export type SignupNicknameStepDto = {
  nickname: string;
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
  streetCode: string;
  zipcode: string;
  specAddress: string;
};

export type ReissueRequestDto = {
  refreshToken: string;
};

export type SmsVerifyRequestDto = SmsSendRequestDto & {
  inputCode: string;
};
export type SmsSendRequestDto = {
  phoneNum: string;
};

export type LogoutDto = {
  refreshToken: string;
};
