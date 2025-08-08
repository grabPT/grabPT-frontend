import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export function createStompClient() {
  const client = new Client({
    // Spring에서 registerStompEndpoints("/ws-connect") 했다고 가정
    webSocketFactory: () => new SockJS('/ws-connect'),

    // 끊기면 3초 뒤 자동 재연결
    reconnectDelay: 3000,

    // 하트비트 (서버 설정과 맞추기)
    // heartbeatIncoming: 10000,
    // heartbeatOutgoing: 10000,

    // 디버깅 필요 시
    // debug: (msg) => {
    //   // console.log('[STOMP]', msg);
    // },

    // 인증이 필요하면 여기 headers에 토큰 실어도 됨(서버가 허용해야 함)
    // connectHeaders: { Authorization: `Bearer ${token}` },
  });

  return client;
}
