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
  form.append('file', file, file.name);

  try {
    const { data } = await privateInstance.post(END_POINT.CHAT.upload(roomId), form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });

    return data as postFileResponseDto;
  } catch (error) {
    throw error as Error;
  }
};
