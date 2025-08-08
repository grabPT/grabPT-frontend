// useChatRoomSocket.ts
import { useEffect, useMemo, useRef } from 'react';

import type { StompSubscription } from '@stomp/stompjs';

import { useStompStore } from '@/store/useStompStore';

type Handlers<T> = {
  onMessage?: (payload: T) => void;
  onReadStatus?: (payload: T) => void;
  onTyping?: (payload: T) => void;
};

type Options = {
  enableMessage?: boolean;
  enableReadStatus?: boolean;
  enableTyping?: boolean;
};

export type sendMessageRequestDto = {
  roomId: number;
  senderId: number;
  content: string;
  messageType: 'TEXT';
};

export function useChatRoomSocket<T = unknown>(
  roomId?: number | null,
  handlers: Handlers<T> = {},
  opts: Options = {},
) {
  const connected = useStompStore((s) => s.connected);
  const subscribe = useStompStore((s) => s.subscribe);
  const unsubscribe = useStompStore((s) => s.unsubscribe);
  const publish = useStompStore((s) => s.publish);

  const { enableMessage = true, enableReadStatus = false, enableTyping = false } = opts;

  const handlersRef = useRef<Handlers<T>>({});
  handlersRef.current = handlers;

  const subsRef = useRef<StompSubscription[]>([]);

  const paths = useMemo(() => {
    if (!roomId) return [] as string[];
    const base = `/subscribe/chat/${roomId}`;
    const list: Array<{ path: string; enabled: boolean }> = [
      { path: `${base}`, enabled: enableMessage },
      { path: `${base}/read-status`, enabled: enableReadStatus },
      { path: `${base}/typing`, enabled: enableTyping },
    ];
    return list.filter((x) => x.enabled).map((x) => x.path);
  }, [roomId, enableMessage, enableReadStatus, enableTyping]);

  useEffect(() => {
    if (!roomId || !connected) return;

    subsRef.current.forEach((s) => unsubscribe(s));
    subsRef.current = [];

    paths.forEach((path) => {
      const sub = subscribe(path, (payload) => {
        const h = handlersRef.current;
        if (path.endsWith('/read-status')) h.onReadStatus?.(payload as T);
        else if (path.endsWith('/typing')) h.onTyping?.(payload as T);
        else h.onMessage?.(payload as T);
      });
      if (sub) subsRef.current.push(sub);
    });

    return () => {
      subsRef.current.forEach((s) => unsubscribe(s));
      subsRef.current = [];
    };
  }, [roomId, connected, subscribe, unsubscribe, paths]);

  const sendMessage = (body: sendMessageRequestDto, headers?: Record<string, string>) => {
    if (!roomId) return;
    publish(`/publish/chat/${roomId}`, body, headers);
  };

  return { connected, sendMessage };
}
