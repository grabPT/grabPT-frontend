
import type { RequestRequestDto } from '@/features/Request/types/Request';
import { axiosInstance } from '@/features/Signup/apis/axios';
import type { BasicResponseDto } from '@/types/Common';

export const postRequest = async (body: RequestRequestDto): Promise<BasicResponseDto> => {
  const { data } = await axiosInstance.post('/requestion', body);
  return data;
};
