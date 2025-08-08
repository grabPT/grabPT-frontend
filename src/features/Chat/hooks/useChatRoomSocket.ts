import { useEffect, useMemo, useRef } from 'react';

import type { StompSubscription } from '@stomp/stompjs';

import { useStompStore } from '@/store/useStompStore';

type Handlers = {
  /** 새 메시지 수신 */
  onMessage?: (payload: unknown) => void;
  /** 읽음 상태 수신 */
  onReadStatus?: (payload: unknown) => void;
  /** 타이핑 표시 수신 (쓰면) */
  onTyping?: (payload: unknown) => void;
};

type Options = {
  enableMessage?: boolean; // default: true
  enableReadStatus?: boolean; // default: false
  enableTyping?: boolean; // default: false
};

export function useChatRoomSocket(
  roomId?: number | null,
  handlers: Handlers = {},
  opts: Options = {},
) {
  const connected = useStompStore((s) => s.connected);
  const subscribe = useStompStore((s) => s.subscribe);
  const unsubscribe = useStompStore((s) => s.unsubscribe);
  const publish = useStompStore((s) => s.publish);

  const { onMessage, onReadStatus, onTyping } = handlers;

  const { enableMessage = true, enableReadStatus = false, enableTyping = false } = opts;

  // 현재 활성 구독을 모두 보관
  const subsRef = useRef<StompSubscription[]>([]);

  // 채널 경로 메모
  const endpoints = useMemo(() => {
    if (!roomId) return [];
    const base = `/subscribe/chat/${roomId}`;
    const list: Array<{ path: string; handler?: (p: unknown) => void; enabled: boolean }> = [
      { path: `${base}`, handler: onMessage, enabled: enableMessage },
      { path: `${base}/read-status`, handler: onReadStatus, enabled: enableReadStatus },
      { path: `${base}/typing`, handler: onTyping, enabled: enableTyping },
    ];
    return list.filter((x) => x.enabled && !!x.handler);
  }, [roomId, enableMessage, enableReadStatus, enableTyping, onMessage, onReadStatus, onTyping]);

  // 구독/해제 관리
  useEffect(() => {
    // 방 없음 or 미연결이면 skip
    if (!roomId || !connected) return;

    // 안전하게 기존 구독 해제
    subsRef.current.forEach((s) => unsubscribe(s));
    subsRef.current = [];

    // 새로 구독
    endpoints.forEach(({ path, handler }) => {
      const sub = subscribe(path, (payload) => handler?.(payload));
      if (sub) subsRef.current.push(sub);
    });

    // 클린업: 의존성 바뀌면 모두 해제
    return () => {
      subsRef.current.forEach((s) => unsubscribe(s));
      subsRef.current = [];
    };
  }, [roomId, connected, subscribe, unsubscribe, endpoints]);

  // 이 방으로 메시지 publish (편의 함수)
  const sendMessage = (body: unknown, headers?: Record<string, string>) => {
    if (!roomId) return;
    publish(`/publish/chat/${roomId}`, body, headers);
  };

  return { connected, sendMessage };
}
