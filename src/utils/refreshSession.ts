import { postReissue } from '@/features/Signup/apis/auth';

//  서버가 httpOnly 쿠키를 갱신하는 리프레시 호출 (성공/실패만 신경)
export async function refreshSession(): Promise<void> {
  console.log('reissue Call~~');
  await postReissue(); // 내부에서 실패 시 throw 되어야 함
}
