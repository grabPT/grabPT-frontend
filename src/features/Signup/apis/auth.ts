import { END_POINT } from '@/constants/endPoints';
import type {
  BaseSignupRequestDto,
  LogoutDto,
  SignupProInfoStepDto,
  SmsSendRequestDto,
  SmsVerifyRequestDto,
  SocialLoginInfo,
} from '@/features/Signup/types/Auth';
import { multipartInstance, publicInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

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

  const { data: responseData } = await multipartInstance.post(
    END_POINT.AUTH.SIGNUP.userSignup,
    form,
    {
      skipAuth: true,
    },
  );
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
  const { data: responseData } = await multipartInstance.post(
    END_POINT.AUTH.SIGNUP.proSignup,
    form,
    {
      skipAuth: true,
    },
  );
  return responseData;
};

export const getSocialLoginInfo = async (): Promise<CommonResponseDto<SocialLoginInfo>> => {
  const { data } = await publicInstance.get(END_POINT.AUTH.SOCIAL_INFO);
  console.log('소셜 로그인 응답(CommonResponseDto):', data);
  console.log('소셜 로그인 실제 데이터:', data?.data);
  return data;
};
export const postSmsVerify = async (
  body: SmsVerifyRequestDto,
): Promise<CommonResponseDto<string>> => {
  const { data } = await publicInstance.post(END_POINT.AUTH.SMS_VERIFY.verify, body);
  return data;
};
export const postSmsSend = async (body: SmsSendRequestDto): Promise<CommonResponseDto<string>> => {
  const { data } = await publicInstance.post(END_POINT.AUTH.SMS_VERIFY.send, body);
  return data;
};
export const getCheckNickname = async (nickname: string): Promise<CommonResponseDto<boolean>> => {
  const { data } = await publicInstance.get(END_POINT.AUTH.NICKNAME_CHECK, {
    params: { nickname },
  });
  return data;
};
export const postLogout = async (body: LogoutDto): Promise<CommonResponseDto<string>> => {
  const { data } = await publicInstance.post(END_POINT.AUTH.LOGOUT, body);
  return data;
};
