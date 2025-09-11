export const decodeBase64Utf8 = (base64String: string | null) => {
  if (!base64String || '') {
    console.log('디코드할 값이 없습니다.');
    return '';
  } else {
    try {
      const binary = atob(base64String);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch {
      // Not valid Base64 (e.g., raw JWT). Return the original string.
      return base64String;
    }
  }
};
