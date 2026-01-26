import { decodeBase64Utf8 } from '@/utils/decodeBaseUtf8';

export function decodeCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  const value = match ? match[2] : '';
  return decodeBase64Utf8(value);
}
