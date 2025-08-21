import type { Dispatch, SetStateAction } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import CommentBox from '@/components/CommentBox';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import Button from '@/components/Button';
import type { DeleteAccount } from '@/types/deleteAccount';

interface IDeleteUserModal {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteUserModal({ setIsModalOpen }: IDeleteUserModal) {
  const deletionSchema = z.object({
    deletionReason: z.string().max(300, { message: '리뷰는 300자 이하여야 합니다.' }),
  });

  const { handleSubmit, watch, setValue } = useForm<DeleteAccount>({
    mode: 'onChange',
    resolver: zodResolver(deletionSchema),
    defaultValues: {
      deletionReason: '',
    },
  });
  const { mutate, isPending } = useDeleteAccount();
  const handleDelete = handleSubmit((data) => {
    mutate(data,{onSuccess: () => {
       window.location.reload();
        setIsModalOpen(false);}});
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
        <div className="border-b border-gray-200 py-6 text-center">
          <h2 className="text-lg font-semibold text-gray-800">회원 탈퇴</h2>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className="mb-4 text-sm text-gray-700">탈퇴하시는 이유를 말씀해주세요.</p>
          </div>

          <div className="mb-6">
            <CommentBox
              placeholder="내용을 입력해주세요.
더 나은 서비스를 위해 노력하겠습니다."
              value={watch('deletionReason')}
              onChange={(e) => setValue('deletionReason', e.target.value, { shouldDirty: true })}
            />
          </div>

          <div className="space-y-2 text-xs leading-relaxed text-gray-600">
            <div className="flex items-start">
              <span className="mt-1.5 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span>
                회원님의 정보 및 서비스 이용 기록은 모두 삭제되며 삭제된 데이터는 복구되지 않습니다.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mt-1.5 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span>전형 중인 매칭 건이 있거나 페널티 조치 중인 경우 탈퇴 신청이 불가합니다.</span>
            </div>
            <div className="flex items-start">
              <span className="mt-1.5 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span>
                탈퇴 후 회원님의 정보는 전자상거래 소비자보호법에 의거한 grabPT 개인정보처리방침에
                따라 관리됩니다.
              </span>
            </div>
            <div className="flex items-start">
              <span className="mt-1.5 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span>작성하신 리뷰는 탈퇴 시 자동 삭제됩니다.</span>
            </div>
            <div className="ml-4 text-gray-500">
              탈퇴 후에는 계정 정보가 삭제되어 본인 확인이 불가하므로, 탈퇴 신청 전에 계시글 삭제를
              요청해 주시기 바랍니다.
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 pt-0">
          <Button
            onClick={() => setIsModalOpen(false)}
          >
            취소
            </Button>
          <Button onClick={handleDelete} disabled={isPending}>확인</Button>
     
        </div>
      </div>
    </div>
  );
}
