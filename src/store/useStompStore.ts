// src/store/useStompStore.ts
import type { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { create } from 'zustand';

import { createStompClient } from '@/libs/webSocketClient';

type StompState = {
  client: Client | null;
  connected: boolean;

  // lifecycle
  init: () => void;
  teardown: () => void;

  // pub/sub
  subscribe: (dest: string, cb: (body: any, raw: IMessage) => void) => StompSubscription | null;
  unsubscribe: (sub: StompSubscription | null) => void;
  publish: (dest: string, body: unknown, headers?: Record<string, string>) => void;
};

export const useStompStore = create<StompState>((set, get) => ({
  client: null,
  connected: false,

  //   연결시작
  init: () => {
    const { client } = get();
    if (client?.active) return; // 이미 활성화되어 있으면 무시

    const c = createStompClient();
    c.onConnect = () => set({ connected: true });
    c.onWebSocketClose = () => set({ connected: false });
    c.onStompError = (frame) => {
      // 서버 브로커 에러
      console.error('STOMP ERROR:', frame.headers['message'], frame.body);
    };

    set({ client: c });
    c.activate();
  },

  teardown: () => {
    const { client } = get();
    if (!client) return;
    client.deactivate();
    set({ client: null, connected: false });
  },

  subscribe: (path, callBackFn) => {
    const { client } = get();
    if (!client || !client.connected) return null;
    return client.subscribe(path, (message) => {
      console.log('[WS IN]', `경로: ${path}`, message.body);
      try {
        const parsed = JSON.parse(message.body);
        // parses는 내 콜백함수의 인자로, message는 스톰프의 IMessag임(원본프레임)
        callBackFn(parsed, message);
      } catch {
        callBackFn(message.body, message);
      }
    });
  },

  unsubscribe: (sub) => sub?.unsubscribe(),

  publish: (dest, body, headers) => {
    const { client } = get();
    if (!client || !client.connected) return;
    client.publish({
      destination: dest,
      body: JSON.stringify(body),
      headers,
    });
  },
}));
