import type { getChatRoomListRequestDto } from '@/features/Chat/types/getChatRoomListType';
import type { getMessagesRequestDto } from '@/features/Chat/types/getMessagesType';
import type { getMyInfoListRequestDto } from '@/features/Mypage/types/getMyRequestsListRequestDto';
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
  myRequestsList: (params: getMyInfoListRequestDto) => ['MyReqeustsList', params.page, params.size],
  myReviewsList: (params: getMyInfoListRequestDto) => ['MyReviewsList', params.page, params.size],
  proposalsForRequest: (params: getProposalsForRequestRequestDto) => [
    'proposalsForRequest',
    params.requestionId,
    params.page,
  ],
  credentialList: () => ['credentialList'],
  proposalsList: (params: getProposalsListRequestDto) => ['proposalsList', params.page],
  CHAT: {
    list: (parmas: getChatRoomListRequestDto) => ['chatList', parmas.keyword],
    messages: (params: getMessagesRequestDto) => ['messages', params.roomId, params.cursor],
  },
  alarm: ['alarm'],
  matcingRequestsList: (params: getRequestsListRequestDto) => [
    'matchingreqeustsList',
    params.sortBy,
    params.page,
    params.size,
  ],
  settlementList: (params: number) => ['settlementList', params],
  // …다른 키들
};
