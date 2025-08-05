import type { RequestRequestDto } from '@/features/Request/types/Request';
import { axiosInstance } from '@/features/Signup/apis/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postRequest = async (body: RequestRequestDto): Promise<CommonResponseDto<string>> => {
  const { data } = await axiosInstance.post('/requestion', body);
  return data;
};
