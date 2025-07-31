export type BaseSignupRequestDto = SignupUserInfoStepDto &
  SignupSportsTypeStepDto &
  SignupNicknameStepDto &
  SignupUserAgreementDto & {
    username: string;
    oauthId: string;
    oauthProvider: string;
    role: number;
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
export type SignupSportsTypeStepDto = {
  categoryId: number;
};
export type SignupNicknameStepDto = {
  nickname: string;
  profileImageUrl: string;
};
export type UserSignupRequestDto = BaseSignupRequestDto;
export type ProSignupRequestDto = BaseSignupRequestDto & SignupProInfoStepDto;

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

export type BasicResponseDto = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
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
