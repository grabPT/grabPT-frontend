import type { RequestsListItemType } from '@/features/Requests/types/getRequestsListType';
import type { RequestSliderItemType } from '@/features/home/types/request';
import type { MyRequestListItemType } from '@/types/getMyRequestListResponse';

// USER용 슬라이더 매핑
export const mapMyRequestToSliderItem = (r: MyRequestListItemType): RequestSliderItemType => ({
  requestId: r.requestionId,
  availableDays: r.availableDays,
  availableTimes: r.availableTimes,
  categoryName: r.categoryName,
  content: r.content,
  status: r.matchingStatus,
  imageURL: r.profileImageURL,
  proProfileId: r.proId ?? undefined,
  proNickname: r.proNickname ?? undefined,
  canWriteReview: r.isWriteReview,
});

// PRO용 슬라이더 매핑
export const mapProRequestToSliderItem = (r: RequestsListItemType): RequestSliderItemType => ({
  requestId: r.requestionId,
  availableDays: r.availableDays,
  availableTimes: r.availableTimes,
  categoryName: r.categoryName,
  content: r.content,
  status: r.matchingStatus,
  nickname: r.userNickname,
  userProfileImageUrl: r.profileImageUrl,
});
