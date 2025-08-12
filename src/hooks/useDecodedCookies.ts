export function useDecodedCookie(name: string) {
  const getCookieValue = (name: string) => {
    const match = document.cookie.split('; ').find((row) => row.startsWith(name + '='));
    return match ? match.split('=')[1] : '';
  };

  const decodeBase64Utf8 = (base64String: string) => {
    if (!base64String) return '';
    const binary = atob(base64String);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  };

  return decodeBase64Utf8(getCookieValue(name));
}
