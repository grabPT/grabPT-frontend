import { END_POINT } from '@/constants/endPoints';
import type {
  BaseSignupRequestDto,
  EmailCheckResponseDto,
  LogoutDto,
  SignupProInfoStepDto,
  SmsSendRequestDto,
  SmsVerifyRequestDto,
} from '@/features/Signup/types/Auth';
import { multipartInstance, publicInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postUserSignup = async (
  data: BaseSignupRequestDto,
  profileImage: File | null,
): Promise<CommonResponseDto<string>> => {
  const form = new FormData();
  // data.json 파일명 명시
  form.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }), 'data.json');

  if (profileImage) {
    form.append('profileImage', profileImage);
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
  // data.json 파일명 명시
  form.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }), 'data.json');

  if (profileImage) {
    form.append('profileImage', profileImage);
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

// todo: 로컬/개발에서 리프레시토큰 헤더에 담기
export const postReissue = async (): Promise<
  CommonResponseDto<{ accessToken: string; refreshToken: string }>
> => {
  const stage = import.meta.env.VITE_STAGE;

  const headers: Record<string, string> = {};

  if (stage === 'development' || stage === 'staging') {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      // 서버에서 헤더 토큰추가로직 반영 아직 안 된 듯
      // todo: 서버랑 헤더 키 값 맞춰야 함 Bearer 원래 안 붙일텐데 붙이는지도 함 보삼
      headers['Authorization'] = `Bearer ${refreshToken}`;
    }
  }

  const config: any = {
    withCredentials: true,
    headers,
  };

  const { data } = await publicInstance.post(END_POINT.AUTH.REISSUE, {}, config);
  return data;
};

export const getEmailCheck = async (
  email: string,
): Promise<CommonResponseDto<EmailCheckResponseDto>> => {
  const { data } = await publicInstance.get(END_POINT.AUTH.EMAIL_CHECK, {
    params: { email },
  });
  return data;
};
