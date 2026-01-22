import type { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { create } from 'zustand';

import { createStompClient } from '@/libs/webSocketClient';

// 재연결 관련 설정
const MAX_RECONNECT_ATTEMPTS = 5; // 최대 5번 재연결 시도
const INITIAL_RECONNECT_DELAY = 1000; // 초기 딜레이 1초

type StompState = {
  client: Client | null;
  connected: boolean;
  reconnectAttempts: number;

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
  reconnectAttempts: 0, // 초기 시도 횟수는 0

  init: () => {
    const { client } = get();
    if (client?.active) return; // 이미 활성화되어 있으면 무시

    const newClient = createStompClient();

    if (!newClient) return;

    // 연결 성공 시 콜백
    newClient.onConnect = () => {
      console.log('[STOMP] 연결 성공');
      set({ connected: true, reconnectAttempts: 0 }); // 연결 성공 시 시도 횟수 초기화
    };

    // 웹소켓 연결 종료 시 콜백 (재연결 로직 핵심)
    newClient.onWebSocketClose = () => {
      console.log('[STOMP] 연결 종료');
      set({ connected: false });

      const { reconnectAttempts } = get();

      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        // Exponential Backoff 적용 : 서버부담 간소화를 위해 재연결시마다 딜레이 증가
        const delay = INITIAL_RECONNECT_DELAY * Math.pow(2, reconnectAttempts);
        console.log(
          `[STOMP] ${delay / 1000}초 후 재연결 시도... (${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS})`,
        );

        setTimeout(() => {
          newClient.activate();
        }, delay);

        set({ reconnectAttempts: reconnectAttempts + 1 });
      } else {
        console.error('[STOMP] 최대 재연결 횟수를 초과했습니다.');
      }
    };

    // STOMP 프로토콜 에러 시 콜백
    newClient.onStompError = (frame) => {
      console.error('STOMP ERROR:', frame.headers['message'], frame.body);
    };

    set({ client: newClient });
    newClient.activate();
  },

  teardown: () => {
    const { client } = get();
    if (!client) return;
    client.deactivate();
    set({ client: null, connected: false, reconnectAttempts: 0 }); // 정리할 때도 초기화
  },

  subscribe: (path, callBackFn) => {
    const { client } = get();
    if (!client || !client.connected) return null;
    return client.subscribe(path, (message) => {
      console.log('[WS IN]', `경로: ${path}`, message.body);
      try {
        const parsed = JSON.parse(message.body);
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
