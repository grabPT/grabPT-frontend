import { useUnreadCount } from '@/hooks/useUnreadCount';
import { useUserRoleStore } from '@/store/useUserRoleStore';

// 로그인 유저 id 꺼내오는 곳 (당신 프로젝트 기준)

export default function UnreadCountController() {
  const userId = useUserRoleStore((s) => s.userId); // or s.userId
  useUnreadCount(userId);
  return null; // UI 없음 (헤드리스)
}
