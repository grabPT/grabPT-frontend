import { useMutation } from '@tanstack/react-query';

import {
  type PostSignatureFileRequestDto,
  type PostSignatureFileResponseDto,
  postProSignatureFile,
  postUserSignatureFile,
} from '@/features/Contract/apis/postSignatureFile';

/** 회원 서명 업로드 훅 */
export const usePostUserSignatureFile = () =>
  useMutation<PostSignatureFileResponseDto, Error, PostSignatureFileRequestDto>({
    mutationFn: (vars) => postUserSignatureFile(vars),
    onSuccess: (data) => console.log('회원 서명 업로드 성공:', data),
    // onError: (err) => console.log('회원 서명 업로드 실패:', err.response?.data),
    onError: (err) => console.log('회원 서명 업로드 실패:', err),
  });

/** 전문가 서명 업로드 훅 */
export const usePostProSignatureFile = () =>
  useMutation<PostSignatureFileResponseDto, Error, PostSignatureFileRequestDto>({
    mutationFn: (vars) => postProSignatureFile(vars),
    onSuccess: (data) => console.log('전문가 서명 업로드 성공:', data),
    onError: (err) => console.log('전문가 서명 업로드 실패:', err),
  });
