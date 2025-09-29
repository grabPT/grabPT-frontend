import { END_POINT } from '@/constants/endPoints';
import type { postPaymentCallbackRequestDto } from '@/features/Contract/types/postPaymentCallbackType';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postPaymentCallback = async (
  params: postPaymentCallbackRequestDto,
): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.post(END_POINT.PAYMENT.paymentCallbalck, params);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
