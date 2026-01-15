import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getChatRoomList } from '@/features/Chat/apis/getChatRoomList';
import type {
  ChatRoomListItemType,
  getChatRoomListRequestDto,
  getChatRoomListResponseDto,
} from '@/features/Chat/types/getChatRoomListType';

export const useGetChatRoomList = (params: getChatRoomListRequestDto) => {
  return useQuery<getChatRoomListResponseDto, Error, ChatRoomListItemType[]>({
    queryKey: QUERY_KEYS.CHAT.list(params),
    queryFn: () => getChatRoomList(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    retry: 2, //2번까지 재시도
  });
};
