import type { getChatRoomListRequestDto } from '@/features/Chat/types/getChatRoomListType';
import type { getMessagesRequestDto } from '@/features/Chat/types/getMessagesType';
import type { getMyInfoListRequestDto } from '@/features/Mypage/types/getMyRequestsListRequestDto';
import type { getProReviewsRequestByUserId } from '@/features/ProDetail/types/getReviewsByUserId';
import type { getProReviewsRequest } from '@/features/ProMypage/types/getProReviews';
import type { getRequestsListRequestDto } from '@/features/Requests/types/getRequestsListType';
import type { getSuggestListRequestDto } from '@/features/SuggestList/types/getSuggestListType';
import type { getSuggestListForRequestRequestDto } from '@/features/SuggestListForRequest/types/getSuggestListForRequestType';

export const QUERY_KEYS = {
  realtimeMatching: (category: string) => ['realtimeMatching', category] as const,
  requestsList: (params: getRequestsListRequestDto) => [
    'reqeustsList',
    params.sortBy,
    params.page,
    params.size,
  ],
  proReviewsByUserId: (params: getProReviewsRequestByUserId) => [
    'ProReviewsByUserId',
    params.page,
    params.size,
  ],
  myRequestsList: (params: getMyInfoListRequestDto) => ['MyReqeustsList', params.page, params.size],
  myReviewsList: (params: getMyInfoListRequestDto) => ['MyReviewsList', params.page, params.size],
  suggestsForRequest: (params: getSuggestListForRequestRequestDto) => [
    'suggestsForRequest',
    params.requestionId,
    params.page,
  ],
  proReviews: (params: getProReviewsRequest) => ['ProReviews', params.page, params.size],
  certificationList: () => ['certification'],
  suggestList: (params: getSuggestListRequestDto) => ['suggestList', params.page],
  CHAT: {
    allList: ['chatList'] as const,
    list: (parmas: getChatRoomListRequestDto) => ['chatList', parmas.keyword],
    messages: (params: getMessagesRequestDto) => ['messages', params.roomId, params.cursor],
  },
  alarm: ['alarm'],
  unreadCount: ['unreadCount'],
  matcingRequestsList: (params: getRequestsListRequestDto) => [
    'matchingreqeustsList',
    params.sortBy,
    params.page,
    params.size,
  ],
  settlementList: (params: number) => ['settlementList', params],
  // …다른 키들
};
