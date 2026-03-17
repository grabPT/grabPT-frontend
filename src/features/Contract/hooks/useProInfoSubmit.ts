import { ZodError } from 'zod';

import { usePostContractProInfo } from '@/features/Contract/hooks/usePostContractInfo';
import { usePostProSignatureFile } from '@/features/Contract/hooks/usePostSignatureFile';
import { contractProInfoSchema } from '@/features/Contract/schema/contractSchema';
import { extractProBodyFromForm } from '@/features/Contract/utils/contractForm';
import { dataURLtoFile } from '@/utils/dataURLtoFile';
import { toFieldErrorMap } from '@/utils/toFieldErrorMap';

type UseProInfoSubmitParams = {
  contractId: number;
  proSign: string | null;
  setProErrors: (errors: Record<string, string>) => void;
  onSuccess?: (imageUrl: string) => void;
};

export const useProInfoSubmit = ({
  contractId,
  proSign,
  setProErrors,
  onSuccess,
}: UseProInfoSubmitParams) => {
  const { mutateAsync: uploadProInfo, isPending: uploadingProInfo } = usePostContractProInfo();
  const { mutateAsync: uploadProSign, isPending: uploadingProSign } = usePostProSignatureFile();

  const submit = async (form: HTMLFormElement | null) => {
    const body = extractProBodyFromForm(form);
    if (!body) {
      alert('전문가 정보를 입력해주세요.');
      return false;
    }

    console.log('[useProInfoSubmit] contract dates before upload', {
      startDate: body.startDate,
      expireDate: body.expireDate,
    });

    try {
      contractProInfoSchema.parse({
        name: body.name || '',
        birth: body.birth || '',
        phoneNumber: body.phoneNumber || '',
        location: body.location || '',
        gender: body.gender || undefined,
        startDate: body.startDate || '',
        expireDate: body.expireDate || '',
      });
      setProErrors({});
    } catch (error) {
      if (error instanceof ZodError) {
        setProErrors(toFieldErrorMap(error));
      }
      alert('입력 정보를 확인해주세요.');
      return false;
    }

    try {
      await uploadProInfo({ contractId, body });
    } catch {
      alert('전문가 정보 업로드에 실패했습니다.');
      return false;
    }

    if (!proSign) {
      alert('전문가 서명을 입력하세요.');
      return false;
    }

    try {
      const file = dataURLtoFile(proSign, `pro-sign-${Date.now()}.png`);
      const { result } = await uploadProSign({ contractId, file });
      onSuccess?.(result.imageUrl);
      return true;
    } catch {
      alert('전문가 서명 업로드에 실패했습니다.');
      return false;
    }
  };

  return {
    submit,
    isPending: uploadingProInfo || uploadingProSign,
  };
};
