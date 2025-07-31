// 더미 데이터. 나중에 api 생기면 없앨 것
import type { RequestCardProps } from '@/features/home/types/request';

const mockRequests: RequestCardProps[] = [
  {
    nickname: '날다람주날닮았쥐',
    region: '서울시 강서구 화곡동',
    tags: ['복싱', '아침, 점심, 저녁', '주 2회'],
    memo: '기초 체력 향상이 필요합니다. PT는 아침 시간대 선호합니다.',
  },
  {
    nickname: '운동하는코끼리',
    region: '서울시 성동구 성수동',
    tags: ['헬스', '오전', '주 3회'],
    memo: '체지방 감소 목표. 오전 운동 위주로 하고 싶습니다.',
  },
  {
    nickname: '근육돼지',
    region: '서울시 마포구 합정동',
    tags: ['웨이트', '오후', '주 5회'],
    memo: '근육량 증가와 자세 교정 위주로 진행 원합니다.',
  },
  {
    nickname: '날쌘돌이',
    region: '서울시 강남구 역삼동',
    tags: ['복싱', '저녁', '주 4회'],
    memo: '대회 준비 중이라 스파링 위주 트레이닝 필요합니다.',
  },
  {
    nickname: '철인삼촌',
    region: '서울시 마포구 서교동',
    tags: ['웨이트', '아침', '주 3회'],
    memo: '근력 향상을 목표로 하고 있습니다. 코어 위주 운동 선호합니다.',
  },
  {
    nickname: '요가마스터K',
    region: '서울시 용산구 이태원동',
    tags: ['요가', '오전', '주 5회'],
    memo: '유연성과 집중력 향상이 목표입니다. 개인 지도가 있으면 좋겠어요.',
  },
  {
    nickname: '스매싱왕자',
    region: '서울시 송파구 잠실동',
    tags: ['테니스', '저녁', '주 2회'],
    memo: '포핸드 교정 받고 싶습니다. 실전 연습 위주로 요청드려요.',
  },
  {
    nickname: '핏블로거민지',
    region: '서울시 성동구 성수동',
    tags: ['필라테스', '점심', '주 3회'],
    memo: '자세 교정이 필요하고 재활 운동도 병행하고 싶어요.',
  },
  {
    nickname: '러너짱',
    region: '서울시 은평구 불광동',
    tags: ['런닝', '아침', '매일'],
    memo: '하프마라톤 대비 중입니다. 지구력 훈련 부탁드립니다.',
  },
  {
    nickname: '헬창누나',
    region: '서울시 동작구 흑석동',
    tags: ['웨이트', '저녁', '주 6회'],
    memo: '하체 위주 루틴에 집중하고 싶습니다.',
  },
  {
    nickname: '파워댄서민호',
    region: '서울시 강서구 마곡동',
    tags: ['댄스', '저녁', '주 3회'],
    memo: '힙합과 줌바를 배우고 싶습니다. 에너지 넘치는 트레이닝 선호합니다.',
  },
];

export default mockRequests;
