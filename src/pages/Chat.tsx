import { useState } from 'react';

import { SearchIcon } from 'lucide-react';

import ChatSendIcon from '@/features/Chat/assets/ChatSendIcon.svg';
import ClipIcon from '@/features/Chat/assets/ClipIcon.svg';
import { ChatCard } from '@/features/Chat/components/ChatCard';
import { ChatInfo } from '@/features/Chat/components/ChatInfo';
import type { ChatType } from '@/features/Chat/types/chat';
import Header from '@/layout/components/Header';

export const Chat = () => {
  //나중에 API 에서 받아온 걸로 수정 예정
  const [chatList, _setChatList] = useState<ChatType[]>([
    {
      id: '1',
      location: '서울',
      name: '재우',
      img: '/images/profile1.png',
      time: '3분 전',
      text: '오늘 운동 잘했어?',
    },
    {
      id: '2',
      location: '부산',
      name: '민지',
      img: '/images/profile2.png',
      time: '10분 전',
      text: '저녁 먹었어요?',
    },
    {
      id: '3',
      location: '대구',
      name: '하준',
      img: '/images/profile3.png',
      time: '1시간 전',
      text: '아아 야장 가서 삼쏘하고 싶다아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅣㅏㅏㄴ엉너ㅏㅍ ㅠㄹ아ㅓㅍ ㅠㄹㅇㄹ파ㅓㄹ우 ㅏㅓㄹ우 파ㅓ눞넝푸나어ㅏㅏㅏㅏㅏ',
    },
    {
      id: '1',
      location: '서울',
      name: '재우',
      img: '/images/profile1.png',
      time: '3분 전',
      text: '오늘 운동 잘했어?',
    },
    {
      id: '2',
      location: '부산',
      name: '민지',
      img: '/images/profile2.png',
      time: '10분 전',
      text: '저녁 먹었어요?',
    },
    {
      id: '3',
      location: '대구',
      name: '하준',
      img: '/images/profile3.png',
      time: '1시간 전',
      text: '아아 야장 가서 삼쏘하고 싶다아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅣㅏㅏㄴ엉너ㅏㅍ ㅠㄹ아ㅓㅍ ㅠㄹㅇㄹ파ㅓㄹ우 ㅏㅓㄹ우 파ㅓ눞넝푸나어ㅏㅏㅏㅏㅏ',
    },
    {
      id: '1',
      location: '서울',
      name: '재우',
      img: '/images/profile1.png',
      time: '3분 전',
      text: '오늘 운동 잘했어?',
    },
    {
      id: '2',
      location: '부산',
      name: '민지',
      img: '/images/profile2.png',
      time: '10분 전',
      text: '저녁 먹었어요?',
    },
    {
      id: '3',
      location: '대구',
      name: '하준',
      img: '/images/profile3.png',
      time: '1시간 전',
      text: '아아 야장 가서 삼쏘하고 싶다아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅣㅏㅏㄴ엉너ㅏㅍ ㅠㄹ아ㅓㅍ ㅠㄹㅇㄹ파ㅓㄹ우 ㅏㅓㄹ우 파ㅓ눞넝푸나어ㅏㅏㅏㅏㅏ',
    },
    {
      id: '1',
      location: '서울',
      name: '재우',
      img: '/images/profile1.png',
      time: '3분 전',
      text: '오늘 운동 잘했어?',
    },
    {
      id: '2',
      location: '부산',
      name: '민지',
      img: '/images/profile2.png',
      time: '10분 전',
      text: '저녁 먹었어요?',
    },
    {
      id: '3',
      location: '대구',
      name: '하준',
      img: '/images/profile3.png',
      time: '1시간 전',
      text: '아아 야장 가서 삼쏘하고 싶다아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅣㅏㅏㄴ엉너ㅏㅍ ㅠㄹ아ㅓㅍ ㅠㄹㅇㄹ파ㅓㄹ우 ㅏㅓㄹ우 파ㅓ눞넝푸나어ㅏㅏㅏㅏㅏ',
    },
    {
      id: '1',
      location: '서울',
      name: '재우',
      img: '/images/profile1.png',
      time: '3분 전',
      text: '오늘 운동 잘했어?',
    },
    {
      id: '2',
      location: '부산',
      name: '민지',
      img: '/images/profile2.png',
      time: '10분 전',
      text: '저녁 먹었어요?',
    },
    {
      id: '3',
      location: '대구',
      name: '하준',
      img: '/images/profile3.png',
      time: '1시간 전',
      text: '아아 야장 가서 삼쏘하고 싶다아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅣㅏㅏㄴ엉너ㅏㅍ ㅠㄹ아ㅓㅍ ㅠㄹㅇㄹ파ㅓㄹ우 ㅏㅓㄹ우 파ㅓ눞넝푸나어ㅏㅏㅏㅏㅏ',
    },
    {
      id: '1',
      location: '서울',
      name: '재우',
      img: '/images/profile1.png',
      time: '3분 전',
      text: '오늘 운동 잘했어?',
    },
    {
      id: '2',
      location: '부산',
      name: '민지',
      img: '/images/profile2.png',
      time: '10분 전',
      text: '저녁 먹었어요?',
    },
    {
      id: '3',
      location: '대구',
      name: '하준',
      img: '/images/profile3.png',
      time: '1시간 전',
      text: '아아 야장 가서 삼쏘하고 싶다아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅣㅏㅏㄴ엉너ㅏㅍ ㅠㄹ아ㅓㅍ ㅠㄹㅇㄹ파ㅓㄹ우 ㅏㅓㄹ우 파ㅓ눞넝푸나어ㅏㅏㅏㅏㅏ',
    },
  ]); // useMutation을 사용하여 서버에서 채팅 목록을 가져오는 로직을 추가할 예정
  const [keyword, setKeyword] = useState('');
  const handleSearch = () => {
    console.log('검색:', keyword);
  };

  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);

  // 채팅 선택 핸들러
  const handleChatSelect = (chat: ChatType) => {
    setSelectedChat(chat);
  };
  //시간 표시
  const time = new Date('2025-07-01T12:00:00Z'); // 예시 시간, 실제로는 서버에서 받아온 시간 사용

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />

      <div className="flex h-full flex-1">
        <div className="flex h-full w-[26.125rem] flex-col items-center bg-white border-r-1 border-t-1 border-gray-300">
          <div className="sticky top-[70px] z-10 w-[22rem] bg-white pt-3">
            <div className="h-10 w-full rounded-full bg-gradient-to-r from-[#003EFB] to-[#FF00B2] p-[3px]">
              <div className="flex h-full w-full items-center rounded-full bg-white px-[16px] pr-[15px]">
                <input
                  type="text"
                  placeholder="검색"
                  className="font-inter w-full text-[13px] leading-[16px] font-semibold text-black placeholder-[#CCCCCC] outline-none"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <SearchIcon className="h-5 w-5 text-[#CCCCCC]" />
              </div>
            </div>
          </div>

          <div className="w-full flex-1 overflow-y-auto pt-5">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                className={`${selectedChat == chat && 'bg-white'} flex h-20 w-full cursor-pointer items-center bg-white px-3 hover:bg-gray-300 hover:ease-in-out duration-150`}
                onClick={() => handleChatSelect(chat)}
              >
                <ChatCard
                  name={chat.name}
                  location={chat.location}
                  text={chat.text}
                  img={chat.img}
                  time={time}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-full w-full flex-col bg-white">
          {selectedChat ? (
            <>
              <ChatInfo
                name={selectedChat.name}
                location={selectedChat.location}
                img={selectedChat.img}
              />
              
              <div
                className="sticky bottom-0 z-10 rounded-t-4xl bg-white px-4 py-4"
                style={{ boxShadow: '4px 4px 18px 10px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-[3.75rem] flex-1 items-center rounded-full bg-gradient-to-r from-[#003EFB] to-[#FF00B2] p-[3px]">
                    <div className="flex h-full w-full items-center gap-3 rounded-full bg-white px-4">
                      <input
                        type="text"
                        placeholder="메시지를 입력하세요"
                        className="font-inter w-full h-full text-xl leading-[16px] font-semibold text-black placeholder-[#CCCCCC] outline-none"
                      />
                      <img src={ClipIcon} alt="클립 아이콘" className="h-6 w-6 cursor-pointer" />
                      <img
                        src={ChatSendIcon}
                        alt="전송 아이콘"
                        className="h-6 w-6 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-400">
              대화할 상대를 선택해주세요
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
