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

  subscribe: (dest, cb) => {
    const { client } = get();
    if (!client || !client.connected) return null;
    return client.subscribe(dest, (msg) => {
      console.log('[WS IN]', dest, msg.body);
      try {
        const parsed = JSON.parse(msg.body);
        cb(parsed, msg);
      } catch {
        cb(msg.body, msg);
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
