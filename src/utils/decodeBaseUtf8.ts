// 현재 토큰에 이 유틸 사용하면 else의 catch로 그대로 리턴중임
// 이거 쓸 일 없으면 지워도 될 듯?
export const decodeBase64Utf8 = (base64String: string | null) => {
  if (!base64String || '') {
    console.log('디코드할 값이 없습니다.');
    return '';
  } else {
    try {
      // 서버에서 넘겨주는 access_Token이 Base64Url인데 atob는 Base64전용이라네요 좀 다른 가봄
      // 1. 왜 atob에서 에러가 났을까?
      // atob() 함수는 아주 오래된 친구라 **"표준 Base64"**만 해석할 수 있습니다. 그런데 서버가 보내준 JWT는 **"Base64Url"**이라는 사투리를 씁니다.
      // 표준 Base64 (atob가 좋아하는 것): +, /, = (패딩)
      // Base64Url (JWT가 쓰는 것): + 대신 -, / 대신 _, = 없음
      // 결정적 이유: 그리고 JWT는 중간에 **점(.)**이 들어있죠? (Header.Payload.Signature)
      // atob는 점(.)을 보는 순간 "으악 이게 뭐야!" 하고 에러(InvalidCharacterError)를 뱉습니다.
      // 공부하시라고... 보고나면 지워주세요 ㅎㅎ
      const binary = atob(base64String);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch {
      // Not valid Base64 (e.g., raw JWT). Return the original string.
      return base64String;
    }
  }
};
