import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';
import type { DeleteAccount } from '@/types/deleteAccount';

export const deleteAccount = async (body: DeleteAccount): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.delete<CommonResponseDto<string>>('/mypage', {
      data: body,
    });
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
