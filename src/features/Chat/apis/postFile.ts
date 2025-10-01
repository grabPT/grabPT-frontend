import { END_POINT } from '@/constants/endPoints';
import type { sendMessageRequestDto } from '@/features/Chat/hooks/useChatRoomSocket';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type postFileRequestDto = {
  roomId: number;
  file: File;
};

export type postFileResponseDto = CommonResponseDto<sendMessageRequestDto>;

export const postFile = async ({
  roomId,
  file,
}: postFileRequestDto): Promise<postFileResponseDto> => {
  const form = new FormData();
  form.append('file', file, file.name); // ← @RequestPart("file") 와 이름 일치

  const { data } = await privateInstance.post(END_POINT.CHAT.upload(roomId), form, {
    // axios는 FormData 주면 boundary 포함해 자동으로 Content-Type 설정함.
    // 일부 환경에서 명시하고 싶다면 다음 줄을 켜도 무방:
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true, // 쿠키/세션 쓰는 백엔드라면
    // onUploadProgress: (e) => {
    // 진행률 UI 필요하면 활용 (e.total 이 있을 때만)
    //   const pct = e.total ? Math.round((e.loaded / e.total) * 100) : 0;
    // },
  });

  return data as postFileResponseDto;
};
