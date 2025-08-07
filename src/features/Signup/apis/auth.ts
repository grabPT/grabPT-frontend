import { axiosInstance } from '@/features/Signup/apis/axios';
import type {
  LogoutDto,
  ProSignupRequestDto,
  SmsSendRequestDto,
  SmsVerifyRequestDto,
  UserSignupRequestDto,
} from '@/features/Signup/types/Auth';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postUserSignup = async (
  body: UserSignupRequestDto,
): Promise<CommonResponseDto<string>> => {
  const { data } = await axiosInstance.post('/auth/user-signup', body);
  return data;
};

export const postProSignup = async (
  body: ProSignupRequestDto,
): Promise<CommonResponseDto<string>> => {
  const { data } = await axiosInstance.post('/auth/pro-signup', body);
  return data;
};

export const postSmsVerify = async (
  body: SmsVerifyRequestDto,
): Promise<CommonResponseDto<string>> => {
  const { data } = await axiosInstance.post('/sms/verify-sms', body);
  return data;
};
export const postSmsSend = async (body: SmsSendRequestDto): Promise<CommonResponseDto<string>> => {
  const { data } = await axiosInstance.post('/sms/send', body);
  return data;
};
export const getCheckNickname = async (nickname: string): Promise<CommonResponseDto<string>> => {
  const { data } = await axiosInstance.get('/auth/check-nickname', {
    params: { nickname },
  });
  return data;
};
export const postLogout = async (body: LogoutDto): Promise<CommonResponseDto<string>> => {
  const { data } = await axiosInstance.post('/auth/logout', body);
  return data;
};
