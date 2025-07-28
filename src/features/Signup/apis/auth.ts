import { axiosInstance } from '@/features/Signup/apis/axios';
import type {
  BasicResponseDto,
  ProSignupRequestDto,
  SmsSendRequestDto,
  SmsVerifyRequestDto,
  UserSignupRequestDto,
} from '@/features/Signup/types/Auth';

export const postUserSignup = async (body: UserSignupRequestDto): Promise<BasicResponseDto> => {
  const { data } = await axiosInstance.post('/auth/user-signup', body);
  return data;
};

export const postProSignup = async (body: ProSignupRequestDto): Promise<BasicResponseDto> => {
  const { data } = await axiosInstance.post('/auth/pro-signup', body);
  return data;
};

export const postSmsVerify = async (body: SmsVerifyRequestDto): Promise<BasicResponseDto> => {
  const { data } = await axiosInstance.post('/sms/verify-sms', body);
  return data;
};
export const postSmsSend = async (body: SmsSendRequestDto): Promise<BasicResponseDto> => {
  const { data } = await axiosInstance.post('/sms/send', body);
  return data;
};
export const getCheckNickname = async (nickname: string): Promise<BasicResponseDto> => {
  const { data } = await axiosInstance.get('/auth/check-nickname', {
    params: { nickname },
  });
  return data;
};