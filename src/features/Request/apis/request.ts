import type { RequestRequestDto } from '@/features/Request/types/Request';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postRequest = async (body: RequestRequestDto): Promise<CommonResponseDto<string>> => {
  const { data } = await privateInstance.post('/requestion', body);
  return data;
};
