interface ConfirmState {
  isOpen: boolean;
  message: string;
  confirmText: string;
  cancelText: string;
}

export const initialState: ConfirmState = {
  isOpen: false,
  message: '',
  confirmText: '확인',
  cancelText: '취소',
};

let confirmFunction:
  | ((message: string, confirmText: string, cancelText: string) => Promise<boolean>)
  | null = null;

export const setConfirmFunction = (
  fn: (message: string, confirmText: string, cancelText: string) => Promise<boolean>,
) => {
  confirmFunction = fn;
};

/**
 * 이 함수 갖다 쓰시면 됩니다
 * 사용법 : confirm("메세지", "확인 버튼 텍스트", "취소 버튼 텍스트")
 * import { confirm } from '@/components/ConfirmModal';
 * const result = await confirm('정말 삭제하시겠습니까?', '삭제', '취소');
 * if (result) {
 *   // 할려던 로직
 * }
 * profileDropdwon의 로그아웃 참고 ㄱㄱ
 * async await 필수 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
export const confirm = (
  message: string,
  confirmText: string = '확인',
  cancelText: string = '취소',
): Promise<boolean> => {
  if (!confirmFunction) {
    console.warn('GlobalConfirmModal is not mounted');
    return Promise.resolve(false);
  }
  return confirmFunction(message, confirmText, cancelText);
};

export type { ConfirmState };
