import type { getMyRequestsListRequestDto } from '@/features/Mypage/types/getMyRequestsListRequestDto';
import type { getChatRoomListRequestDto } from '@/features/Chat/types/getChatRoomListType';
import type { getMessagesRequestDto } from '@/features/Chat/types/getMessagesType';
import type { getProposalsListRequestDto } from '@/features/Proposals/types/getProposalsListType';
import type { getProposalsForRequestRequestDto } from '@/features/ProposalsForRequest/types/getProposalsForRequestType';
import type { getRequestsListRequestDto } from '@/features/Requests/types/getRequestsListType';

export const QUERY_KEYS = {
  realtimeMatching: (category: string) => ['realtimeMatching', category] as const,
  requestsList: (params: getRequestsListRequestDto) => [
    'reqeustsList',
    params.sortBy,
    params.page,
    params.size,
  ],
  myRequestsList:(params: getMyRequestsListRequestDto) => [
    'MyReqeustsList',
    params.page,
    params.size,
  ],
  proposalsForRequest: (params: getProposalsForRequestRequestDto) => [
    'proposalsForRequest',
    params.requestionId,
    params.page,
  ],
  proposalsList: (params: getProposalsListRequestDto) => ['proposalsList', params.page],
  CHAT: {
    list: (parmas: getChatRoomListRequestDto) => ['chatList', parmas.keyword],
    messages: (params: getMessagesRequestDto) => ['messages', params.roomId, params.cursor],
  },
  // …다른 키들
};
