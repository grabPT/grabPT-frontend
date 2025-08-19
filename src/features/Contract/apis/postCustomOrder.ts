import type {
  postCustomOrderRequestDto,
  postCustomOrderResponseDto,
} from '@/features/Contract/types/postCustomOrderType';
import { privateInstance } from '@/libs/axios';

export const postCustomOrder = async (
  params: postCustomOrderRequestDto,
): Promise<postCustomOrderResponseDto> => {
  try {
    const { data } = await privateInstance.post(`/customOrder`, params);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
