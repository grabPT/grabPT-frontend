export type ChatType = {
    id:string;
    location:string,
    name:string;
    img:string;
    time:string;
    text:string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image';
  isRead: boolean;
}


//체팅 더미 데이터 나중에 삭제 예정
export const dummyMessages: Message[] = [
  {
    id: 'msg_1',
    senderId: 'user_1',
    senderName: 'Alice',
    message: '안녕하세요! 오늘 미팅 괜찮으세요?',
    timestamp: '2025-07-14T14:01:00Z',
    type: 'text',
    isRead: false
  },
  {
    id: 'msg_2',
    senderId: 'me',
    senderName: 'Me',
    message: '네 괜찮습니다. 몇 시에 시작할까요?',
    timestamp: '2025-07-14T14:02:30Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_3',
    senderId: 'user_1',
    senderName: 'Alice',
    message: '오전 10시는 어떠세요?',
    timestamp: '2025-07-14T14:03:10Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_4',
    senderId: 'me',
    senderName: 'Me',
    message: '좋습니다. 그때 뵈어요!',
    timestamp: '2025-07-14T14:04:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_5',
    senderId: 'user_1',
    senderName: 'Alice',
    message: '혹시 자료 준비는 다 되셨나요?',
    timestamp: '2025-07-14T14:05:12Z',
    type: 'text',
    isRead: false
  },
  {
    id: 'msg_6',
    senderId: 'me',
    senderName: 'Me',
    message: '네, 오늘 아침에 마무리했습니다!',
    timestamp: '2025-07-14T14:06:30Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_7',
    senderId: 'user_1',
    senderName: 'Alice',
    message: '감사합니다 🙏',
    timestamp: '2025-07-14T14:07:01Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_8',
    senderId: 'me',
    senderName: 'Me',
    message: '그리고 요약본은 메일로도 전달드렸어요!',
    timestamp: '2025-07-14T14:07:42Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_9',
    senderId: 'user_1',
    senderName: 'Alice',
    message: '넵 확인했어요. 혹시 이것도 보실래요?',
    timestamp: '2025-07-14T14:08:15Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_10',
    senderId: 'user_1',
    senderName: 'Alice',
    message: 'https://example.com/sample.pdf',
    timestamp: '2025-07-14T14:08:16Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_11',
    senderId: 'me',
    senderName: 'Me',
    message: '오, 이 자료도 참고할게요.',
    timestamp: '2025-07-14T14:09:10Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_12',
    senderId: 'user_1',
    senderName: 'Alice',
    message: '사진으로도 정리해봤어요.',
    timestamp: '2025-07-14T14:10:22Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_13',
    senderId: 'user_1',
    senderName: 'Alice',
    message: 'https://via.placeholder.com/300x200.png?text=회의+요약',
    timestamp: '2025-07-14T14:10:25Z',
    type: 'image',
    isRead: true
  },
  {
    id: 'msg_14',
    senderId: 'me',
    senderName: 'Me',
    message: '오 이건 보기 좋네요!',
    timestamp: '2025-07-14T14:11:01Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_15',
    senderId: 'me',
    senderName: 'Me',
    message: '저도 하나 보내드릴게요.',
    timestamp: '2025-07-14T14:11:30Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_16',
    senderId: 'me',
    senderName: 'Me',
    message: 'https://via.placeholder.com/200x150.png?text=대시보드+스크린샷',
    timestamp: '2025-07-14T14:11:32Z',
    type: 'image',
    isRead: true
  },
  {
    id: 'msg_17',
    senderId: 'user_1',
    senderName: 'Alice',
    message: '오 이건 진짜 직관적이네요!',
    timestamp: '2025-07-14T14:12:20Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_18',
    senderId: 'me',
    senderName: 'Me',
    message: '감사합니다 😄',
    timestamp: '2025-07-14T14:12:50Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_19',
    senderId: 'user_1',
    senderName: 'Alice',
    message: '곧 미팅 시작이네요. 곧 뵐게요!',
    timestamp: '2025-07-14T14:13:25Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'msg_20',
    senderId: 'me',
    senderName: 'Me',
    message: '넵! 잘 부탁드립니다 🙌',
    timestamp: '2025-07-14T14:13:55Z',
    type: 'text',
    isRead: false
  },
];