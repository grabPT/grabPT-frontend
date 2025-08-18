import type {
  postContractInfoRequestDto,
  postContractInfoResponseDto,
} from '@/features/Contract/types/postContractType';
import { privateInstance } from '@/libs/axios';

export const postContractUserInfo = async (
  params: postContractInfoRequestDto,
): Promise<postContractInfoResponseDto> => {
  try {
    const { data } = await privateInstance.post(`/contract/${params.contractId}/user`, params.body);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};

export const postContractExpertInfo = async (
  params: postContractInfoRequestDto,
): Promise<postContractInfoResponseDto> => {
  try {
    const { data } = await privateInstance.post(`/contract/${params.contractId}/pro`, params.body);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
