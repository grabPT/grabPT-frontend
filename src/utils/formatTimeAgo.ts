import { formatDistanceToNow, isValid, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatTimeAgo(input: string | Date) {
  const date = input instanceof Date ? input : parseISO(input);
  if (!isValid(date)) return '';

  const diffSec = (Date.now() - date.getTime()) / 1000;

  // 30초 미만은 "방금 전"
  if (diffSec < 30) return '방금 전';

  return formatDistanceToNow(date, {
    addSuffix: true, // "~ 전" 접미사
    includeSeconds: diffSec < 60, // 1분 미만일 땐 초 단위도 표시
    locale: ko,
  });
}
