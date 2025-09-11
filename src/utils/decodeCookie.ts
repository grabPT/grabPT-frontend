import { decodeBase64Utf8 } from '@/utils/decodeBaseUtf8';

export function decodeCookie(name: string) {
  const getCookieValue = (name: string) => {
    const match = document.cookie.split('; ').find((row) => row.startsWith(name + '='));
    return match ? match.split('=')[1] : '';
  };

  return decodeBase64Utf8(getCookieValue(name));
}
