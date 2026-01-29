import { useCallback, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { type ConfirmState, initialState, setConfirmFunction } from '@/utils/confirmModalUtils';

const ConfirmModal = () => {
  const [state, setState] = useState<ConfirmState>(initialState);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  // 컴포넌트가 마운트되면 confirmFunction을 이 컴포넌트의 setState와 연결
  useEffect(() => {
    setConfirmFunction((message, confirmText, cancelText) => {
      return new Promise((resolve) => {
        resolverRef.current = resolve;
        setState({
          isOpen: true,
          message,
          confirmText,
          cancelText,
        });
      });
    });

    return () => {
      setConfirmFunction(async () => {
        console.warn('GlobalConfirmModal instance unmounted');
        return false;
      });
    };
  }, []);

  const handleClose = useCallback((result: boolean) => {
    if (resolverRef.current) {
      resolverRef.current(result); // await 하고 있는 곳에 결과(true/false) 전달
      resolverRef.current = null;
    }
    setState(initialState); // 모달 초기화
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
  }, [state.isOpen, handleClose]);

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
