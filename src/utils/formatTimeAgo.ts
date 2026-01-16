import { formatDistanceToNow, isValid, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatTimeAgo(input: string | Date | null | undefined) {
  if (input == null) return ''; // null/undefined 방어

  const date =
    input instanceof Date
      ? input
      : typeof input === 'string' && input.trim()
        ? safeParseISO(input)
        : null;

  if (!date || !isValid(date)) return '';

  const diffSec = (Date.now() - date.getTime()) / 1000;

  if (diffSec < 60) return '방금 전';

  return formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: diffSec < 60,
    locale: ko,
  });
}

function safeParseISO(v: string): Date | null {
  try {
    const d = parseISO(v);
    return isValid(d) ? d : null;
  } catch {
    return null;
  }
}
