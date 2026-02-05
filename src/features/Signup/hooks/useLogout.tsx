import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import { postLogout } from '@/features/Signup/apis/auth';
import type { LogoutDto } from '@/features/Signup/types/Auth';
import type { CommonResponseDto } from '@/types/commonResponseDto';
import { performClientLogout } from '@/utils/clientLogout';

/**
 * 로그아웃 훅
 * 얘 ㅅㅂ 왜 여깄음 ㅋㅋㅋ
 * 얘 어따 넣어야함? 그냥 새로 만들어야 하나
 */
export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation<CommonResponseDto<string>, Error, LogoutDto>({
    mutationFn: postLogout,
    onSettled: () => {
      // 클라이언트 정리 유틸 호출
      performClientLogout();

      //microTask를 통해 role을 먼저 바꾸고 navigate 진행 -> 여기서 role storage만 guest 상태로 재생성
      if (typeof queueMicrotask === 'function') {
        queueMicrotask(() =>
          navigate(ROUTES.HOME.ROOT, {
            replace: true,
            state: { toastMessage: '로그아웃되었습니다.' },
          }),
        );
      } else {
        setTimeout(
          () =>
            navigate(ROUTES.HOME.ROOT, {
              replace: true,
              state: { toastMessage: '로그아웃되었습니다.' },
            }),
          0,
        );
      }
    },
    onError: (error) => {
      console.error('로그아웃 요청 실패:', error);
    },
  });
};
