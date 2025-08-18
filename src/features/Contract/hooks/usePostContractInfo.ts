// usePostContractInfo.ts
import { useMutation } from '@tanstack/react-query';

import {
  postContractExpertInfo,
  postContractUserInfo,
} from '@/features/Contract/apis/postContractInfo';
import type {
  postContractInfoRequestDto,
  postContractInfoResponseDto,
} from '@/features/Contract/types/postContractType';

export const usePostContractUserInfo = () =>
  useMutation<postContractInfoResponseDto, Error, postContractInfoRequestDto>({
    mutationFn: (params) => postContractUserInfo(params),
    onSuccess: (data) => {
      console.log('계약서 작성 userInfo 전송 성공', data);
    },
    onError: (error) => {
      console.log('계약서 작성 userInfo 전송 실패', error);
    },
  });

export const usePostContractExpertInfo = () =>
  useMutation<postContractInfoResponseDto, Error, postContractInfoRequestDto>({
    mutationFn: (params) => postContractExpertInfo(params),
    onSuccess: (data) => {
      console.log('계약서 작성 proInfo 전송 성공', data);
    },
    onError: (error) => {
      console.log('계약서 작성 proInfo 전송 실패', error);
    },
  });
