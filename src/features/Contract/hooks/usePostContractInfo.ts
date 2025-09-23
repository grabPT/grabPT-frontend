// usePostContractInfo.ts
import { useMutation } from '@tanstack/react-query';

import {
  postContractProInfo,
  postContractUserInfo,
} from '@/features/Contract/apis/postContractInfo';
import type {
  postContractInfoResponseDto,
  postContractProInfoRequestDto,
  postContractUserInfoRequestDto,
} from '@/features/Contract/types/postContractType';

export const usePostContractUserInfo = () =>
  useMutation<postContractInfoResponseDto, Error, postContractUserInfoRequestDto>({
    mutationFn: (params) => postContractUserInfo(params),
    onSuccess: (data) => {
      console.log('계약서 작성 userInfo 전송 성공', data);
    },
    onError: (error) => {
      console.log('계약서 작성 userInfo 전송 실패', error);
    },
  });

export const usePostContractProInfo = () =>
  useMutation<postContractInfoResponseDto, Error, postContractProInfoRequestDto>({
    mutationFn: (params) => postContractProInfo(params),
    onSuccess: (data) => {
      console.log('계약서 작성 proInfo 전송 성공', data);
    },
    onError: (error) => {
      console.log('계약서 작성 proInfo 전송 실패', error);
    },
  });
