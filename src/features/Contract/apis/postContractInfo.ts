import { END_POINT } from '@/constants/endPoints';
import type {
  postContractInfoResponseDto,
  postContractProInfoRequestDto,
  postContractUserInfoRequestDto,
} from '@/features/Contract/types/postContractType';
import { privateInstance } from '@/libs/axios';

export const postContractUserInfo = async (
  params: postContractUserInfoRequestDto,
): Promise<postContractInfoResponseDto> => {
  try {
    const { data } = await privateInstance.post(
      END_POINT.CONTRACTS.userWrite(params.contractId),
      params.body,
    );
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};

export const postContractProInfo = async (
  params: postContractProInfoRequestDto,
): Promise<postContractInfoResponseDto> => {
  try {
    const { data } = await privateInstance.post(
      END_POINT.CONTRACTS.proWrite(params.contractId),
      params.body,
    );
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
