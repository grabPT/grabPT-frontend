import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

// parameter: roomId, cursor?
export const postReadWhenEnter = async (roomId: number): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.post(`/chatRoom/${roomId}/readWhenEnter`, roomId);
    console.log(`읽기완료: ${data}`);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
