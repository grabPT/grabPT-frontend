import type {
  RequestDetailPageResponse,
  RequestRequestDto,
  RequestResponseDto,
} from '@/features/Request/types/Request';
import { privateInstance, publicInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postRequest = async (
  body: RequestRequestDto,
): Promise<CommonResponseDto<RequestResponseDto>> => {
  const { data } = await privateInstance.post('/api/requestion', body);
  console.log('내가 보낸 데이터', data);
  return data;
};

export const getDetailRequest = async (
  requestionId: number,
): Promise<CommonResponseDto<RequestDetailPageResponse>> => {
  const { data } = await publicInstance.get(`/api/requestion/${requestionId}`);
  console.log('받은 데이터', data);
  return data;
};
