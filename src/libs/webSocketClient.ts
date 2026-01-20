import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export function createStompClient() {
  const accessToken = localStorage.getItem('accessToken');

  const client = new Client({
    webSocketFactory: () => new SockJS(import.meta.env.VITE_SERVER_API_URL + '/ws-connect'),
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
    reconnectDelay: 3000,
    onConnect: () => console.log('[STOMP] connected'),
    onStompError: (frame) =>
      console.log('[STOMP] broker error:', frame.headers['message'], frame.body),
    onWebSocketError: (e) => console.log('[STOMP] ws error:', e),
    onWebSocketClose: (e) => console.log('[STOMP] ws close:', e),
    onDisconnect: () => console.log('[STOMP] disconnected'),
    onUnhandledMessage: (m) => console.log('[STOMP] unhandled message:', m),
    onUnhandledFrame: (f) => console.log('[STOMP] unhandled frame:', f),
  });
  return client;
}
