// 공통 응답 타입
// type GetProDetailResponseDto = CommonResponse<ProDetail[]> 처럼 사용
export interface CommonResponseDto<T = unknown> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
