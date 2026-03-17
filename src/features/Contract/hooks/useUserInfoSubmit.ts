import { ZodError } from 'zod';

import { usePostContractUserInfo } from '@/features/Contract/hooks/usePostContractInfo';
import { usePostUserSignatureFile } from '@/features/Contract/hooks/usePostSignatureFile';
import { contractUserInfoSchema } from '@/features/Contract/schema/contractSchema';
import { extractUserBodyFromForm } from '@/features/Contract/utils/contractForm';
import { dataURLtoFile } from '@/utils/dataURLtoFile';
import { toFieldErrorMap } from '@/utils/toFieldErrorMap';

type UseUserInfoSubmitParams = {
  contractId: number;
  memberSign: string | null;
  setUserErrors: (errors: Record<string, string>) => void;
  onSuccess?: (imageUrl: string) => void;
};

export const useUserinfoSubmit = ({
  contractId,
  memberSign,
  setUserErrors,
  onSuccess,
}: UseUserInfoSubmitParams) => {
  const { mutateAsync: uploadUserInfo, isPending: uploadingUserInfo } = usePostContractUserInfo();
  const { mutateAsync: uploadUserSign, isPending: uploadingUserSign } = usePostUserSignatureFile();

  const submit = async (form: HTMLFormElement | null) => {
    const body = extractUserBodyFromForm(form);
    if (!body) {
      alert('회원 정보를 입력해주세요.');
      return false;
    }

    try {
      contractUserInfoSchema.parse({
        name: body.name || '',
        birth: body.birth || '',
        phoneNumber: body.phoneNumber || '',
        location: body.location || '',
        gender: body.gender || undefined,
      });
      setUserErrors({});
    } catch (error) {
      if (error instanceof ZodError) {
        setUserErrors(toFieldErrorMap(error));
      }
      alert('입력 정보를 확인해주세요.');
      return false;
    }

    try {
      await uploadUserInfo({ contractId, body });
    } catch {
      alert('회원 정보 업로드에 실패했습니다.');
      return false;
    }

    if (!memberSign) {
      alert('회원 서명을 입력하세요.');
      return false;
    }

    try {
      const file = dataURLtoFile(memberSign, `member-sign-${Date.now()}.png`);
      const { result } = await uploadUserSign({ contractId, file });
      onSuccess?.(result.imageUrl);
      return true;
    } catch {
      alert('회원 서명 업로드에 실패했습니다.');
      return false;
    }
  };

  return {
    submit,
    isPending: uploadingUserInfo || uploadingUserSign,
  };
};
