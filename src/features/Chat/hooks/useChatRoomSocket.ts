import { useEffect, useMemo, useRef } from 'react';

import type { StompSubscription } from '@stomp/stompjs';

import { useStompStore } from '@/store/useStompStore';

// 핸들러 타입
type Handlers<T> = {
  // 채팅방 구독
  onMessage?: (payload: T) => void;
  // 읽음상태 구독
  onReadStatus?: (payload: T) => void;
};

// 옵션 타입
type Options = {
  enableMessage?: boolean;
  enableReadStatus?: boolean;
};

// 전송 메시지 DTO
export type sendMessageRequestDto = {
  roomId: number;
  senderId: number;
  content: string;
  messageType: 'TEXT' | 'IMGAE' | 'FILE';
};

// 웹소켓 이벤트 래퍼
export function useChatRoomSocket<T = unknown>(
  roomId?: number | null,
  handlers: Handlers<T> = {},
  opts: Options = {},
) {
  // useStompStore에서 connected상태, 메서드 3개 가져옴 (구독,구독해제,전송)
  const connected = useStompStore((s) => s.connected);
  const subscribe = useStompStore((s) => s.subscribe);
  const unsubscribe = useStompStore((s) => s.unsubscribe);
  const publish = useStompStore((s) => s.publish);

  // 옵션. 각 상태를 구독할지 말지 검증로직을 추가할 수 있다. 지금은 검증 필요 없어서 하드코딩임
  const { enableMessage = true, enableReadStatus = true } = opts;

  // 핸들러를 ref처리. 왜했음?
  // 핸들러가 useEffect deps에 포함되어있기때문에 핸들러가 바뀔 때마다 useEffect재실행될 수 있음
  const handlersRef = useRef<Handlers<T>>({});
  handlersRef.current = handlers;

  // 구독상태 ref
  const subsRef = useRef<StompSubscription[]>([]);

  // 구독하는 경로들을 filter로 enabled처리로 걸러낸다. 근데 지금은 다 true임
  const paths = useMemo(() => {
    if (!roomId) return [] as string[];
    const base = `/subscribe/chat/${roomId}`;
    const list: Array<{ path: string; enabled: boolean }> = [
      { path: `${base}`, enabled: enableMessage },
      { path: `${base}/read-status`, enabled: enableReadStatus },
    ];
    return list.filter((x) => x.enabled).map((x) => x.path);
  }, [roomId, enableMessage, enableReadStatus]);

  // roomId가 바뀌면 기존구독을 모두 해제하는 useEffect
  useEffect(() => {
    // 룸아이디 없거나 연결안되어있으면 리턴
    if (!roomId || !connected) return;

    // 기존 구독을 모두 해제 (이전 구독 해제)
    subsRef.current.forEach((s) => unsubscribe(s));
    subsRef.current = [];

    // pahts를 순회하면서 새로운 경로 구독!!
    paths.forEach((path) => {
      // payload는 서버에서 날려준 응답을 말하는 것!!
      const sub = subscribe(path, (payload) => {
        const h = handlersRef.current;
        // path가 read-status로 끝나면 onReadStatus로 넘어온 함수에 payload(응답)을 담아서 실행
        if (path.endsWith('/read-status')) h.onReadStatus?.(payload as T);
        // path가 read-status로 안 끝나면 onMessage로 넘어온 함수에 payload(응답)을 담아서 실행
        else h.onMessage?.(payload as T);
      });
      if (sub) subsRef.current.push(sub);
    });

    // 클린업 함수 (언마운트) (다음 재실행 또는 언마운트 전에 이번 구독 해제)
    return () => {
      subsRef.current.forEach((s) => unsubscribe(s));
      subsRef.current = [];
    };
  }, [roomId, connected, subscribe, unsubscribe, paths]);

  //메시지 보내는 함수 제공
  const sendMessage = (body: sendMessageRequestDto, headers?: Record<string, string>) => {
    if (!roomId) return;
    publish(`/publish/chat/${roomId}`, body, headers);
  };

  return { connected, sendMessage };
}
