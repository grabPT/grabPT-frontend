import { useCallback, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

interface ConfirmState {
  isOpen: boolean;
  message: string;
  confirmText: string;
  cancelText: string;
  resolver: ((value: boolean) => void) | null;
}

const initialState: ConfirmState = {
  isOpen: false,
  message: '',
  confirmText: '확인',
  cancelText: '취소',
  resolver: null,
};

let confirmFunction:
  | ((message: string, confirmText: string, cancelText: string) => Promise<boolean>)
  | null = null;

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

const ConfirmModal = () => {
  const [state, setState] = useState<ConfirmState>(initialState);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // 컴포넌트가 마운트되면 confirmFunction을 이 컴포넌트의 setState와 연결
  useEffect(() => {
    confirmFunction = (message, confirmText, cancelText) => {
      return new Promise((resolve) => {
        setState({
          isOpen: true,
          message,
          confirmText,
          cancelText,
          resolver: resolve,
        });
      });
    };
  }, []);

  // 모달 열릴 때 포커스 및 단축키 설정
  useEffect(() => {
    if (state.isOpen) {
      // 1. 열리면 확인 버튼에 포커스
      confirmButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose(false);
        }

        if (e.key === 'Tab') {
          e.preventDefault();
          const current = document.activeElement;
          if (current === confirmButtonRef.current) {
            cancelButtonRef.current?.focus();
          } else {
            confirmButtonRef.current?.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [state.isOpen]);

  const handleClose = useCallback(
    (result: boolean) => {
      if (state.resolver) {
        state.resolver(result); // await 하고 있는 곳에 결과(true/false) 전달
      }
      setState(initialState); // 모달 초기화
    },
    [state.resolver],
  );

  // 모달이 닫혀있으면 렌더링 X
  if (!state.isOpen) return null;

  return createPortal(
    <div className="animate-in fade-in fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-200">
      {/* 배경 클릭 시 취소 처리 */}
      <div className="absolute inset-0" onClick={() => handleClose(false)} />

      <div
        className="animate-in zoom-in-95 relative max-w-sm min-w-[320px] overflow-hidden rounded-2xl bg-white p-6 font-sans shadow-2xl duration-200"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        <h3 className="mb-2 text-lg font-bold">알림</h3>
        <p className="mb-6 text-sm whitespace-pre-wrap">{state.message}</p>

        <div className="flex justify-end gap-3">
          <button
            ref={cancelButtonRef}
            onClick={() => handleClose(false)}
            className="rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            {state.cancelText}
          </button>
          <button
            ref={confirmButtonRef}
            onClick={() => handleClose(true)}
            className="bg-button hover:bg-button-hover active:bg-button-pressed rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {state.confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmModal;
