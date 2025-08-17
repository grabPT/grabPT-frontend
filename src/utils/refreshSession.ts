import { postReissue } from '@/features/Signup/apis/auth';

//  서버가 httpOnly 쿠키를 갱신하는 리프레시 호출 (성공/실패만 신경)
export async function refreshSession(): Promise<void> {
  console.log('[reissue] start');
  try {
    const res = await postReissue();
    console.log('[reissue] done:', res?.isSuccess ?? '(no status)', res?.result ?? '(no data)');
  } catch (e: any) {
    console.error('[reissue] failed:', e);
    throw e; // 기존 동작 유지
  }
}
