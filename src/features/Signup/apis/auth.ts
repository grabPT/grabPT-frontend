import { axiosInstance } from '@/features/Signup/apis/axios';
import type {
  LogoutDto,
  SmsSendRequestDto,
  SmsVerifyRequestDto,
BaseSignupRequestDto,
SignupProInfoStepDto
} from '@/features/Signup/types/Auth';
import { multipartInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';
//머지 후 skipAuth 추가할것 
export const postUserSignup = async (
  data: BaseSignupRequestDto,
  profileImage: File | null,
): Promise<CommonResponseDto<string>> => {
  const form = new FormData();
  form.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' })); //data 주입

  if (profileImage) {
      form.append('profileImage', profileImage);
  }
  //콘솔 출력(나중에 지우거나 주석 처리)
  for (const [key, value] of form.entries()) {
    console.log('FormData:', key, value);
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

    blob.text().then(console.log);
  }

  const { data: responseData } = await multipartInstance.post('/auth/user-signup', form);
  return responseData;
};



export const postProSignup = async (
  data: BaseSignupRequestDto & SignupProInfoStepDto,
  profileImage: File | null,
): Promise<CommonResponseDto<string>> => {
  const form = new FormData();
  form.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' })); //data 주입

  if (profileImage) {
      form.append('profileImage', profileImage);
  }
  //콘솔 출력(나중에 지우거나 주석 처리)
  for (const [key, value] of form.entries()) {
    console.log('FormData:', key, value);
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

    blob.text().then(console.log);
  }
    const { data: responseData } = await multipartInstance.post('/auth/pro-signup', form);
  return responseData;
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
