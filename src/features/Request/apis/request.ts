import type {
  RequestDetailPageResponse,
  RequestRequestDto,
  RequestResponseDto,
} from '@/features/Request/types/Request';
import { privateInstance } from '@/libs/axios';
import type { CanEditResponse } from '@/types/CanEditRespinse';
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
  const { data } = await privateInstance.get(`/api/requestion/${requestionId}`);
  console.log('받은 데이터', data);
  return data;
};

export const getCanEditRequest = async (
  requestionId: number,
): Promise<CommonResponseDto<CanEditResponse>> => {
  const { data } = await privateInstance.get(`/api/requestion/${requestionId}/requestion-can-edit`);
  console.log('수정 가능 여부', data);
  return data;
};

export const patchRequest = async (
  requestionId: number,
  body: RequestRequestDto,
): Promise<CommonResponseDto<RequestResponseDto>> => {
  const { data } = await privateInstance.patch(`/api/requestion/${requestionId}`, body);
  console.log('내가 수정한 데이터', data);
  return data;
};
