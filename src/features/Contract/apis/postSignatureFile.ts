import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type PostSignatureFileRequestDto = {
  file: File;
  contractId: number;
};

export type PostSignatureFileResponseDto = CommonResponseDto<{
  imageUrl: string;
}>;

/** 회원 서명 업로드 */
export async function postUserSignatureFile({
  file,
  contractId,
}: PostSignatureFileRequestDto): Promise<PostSignatureFileResponseDto> {
  const form = new FormData();
  form.append('file', file, file.name);

  const { data } = await privateInstance.post(`/contract/${contractId}/uploadUserSign`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return data as PostSignatureFileResponseDto;
}

/** 전문가 서명 업로드 */
export async function postProSignatureFile({
  file,
  contractId,
}: PostSignatureFileRequestDto): Promise<PostSignatureFileResponseDto> {
  const form = new FormData();
  form.append('file', file, file.name);

  const { data } = await privateInstance.post(`/contract/${contractId}/uploadProSign`, form, {
    // headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return data as PostSignatureFileResponseDto;
}
