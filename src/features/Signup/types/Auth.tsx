export type BaseSignupRequestDto = SignupUserInfoStepDto &  SignupSportsTypeStepDto & SignupNicknameStepDto & {
  username: string;
  password: string;
  oauthId: string;
  oauthProvider: string;
  gender: number;
  role: number;
};
export type SignupUserInfoStepDto = {
  email: string;
  phoneNum: string;
  address: AddressRequest;
};
export type SignupProInfoStepDto ={
    activityAreas: string;
  center: string[];
  career: string;
  description: string;
}
export type SignupSportsTypeStepDto={
  categories: number[];
}
export type SignupNicknameStepDto={
     nickname: string;
  profileImageUrl: string;
}
export type UserSignupRequestDto = BaseSignupRequestDto;
export type ProSignupRequestDto = BaseSignupRequestDto & SignupProInfoStepDto

export type AddressRequest = {
  city: string;
  district: string;
  street: string;
  zipcode: string;
};

export type ReissueRequestDto = {
  refreshToken: string;
};

export type SignupResponseDto = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
};
