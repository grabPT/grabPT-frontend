import { useState } from 'react';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useParams } from 'react-router-dom';

import AppLogo from '@/assets/images/AppLogo.png';
import Button from '@/components/Button';
import {
  Header,
  개인정보처리방침,
  환불및취소규정,
  회원의권리및의무,
} from '@/features/Contract/assets/ContractText';
import InformationCard from '@/features/Contract/components/InformationCard';
import ServiceInformationForm from '@/features/Contract/components/ServiceInformationForm';
import SignatureBox from '@/features/Contract/components/SignatureBox';
import UserInformationForm from '@/features/Contract/components/UserInformationForm';
import { useGetContractInfo } from '@/features/Contract/hooks/useGetContractInfo';
import {
  usePostProSignatureFile,
  usePostUserSignatureFile,
} from '@/features/Contract/hooks/usePostSignatureFile';
import { useRoleStore } from '@/store/useRoleStore';
// 추가: dataURL -> File, 업로드 훅
import { dataURLtoFile } from '@/utils/dataURLtoFile';

// 계약서 작성페이지입니다.
const ContractFormPage = () => {
  const { id } = useParams();
  const contractId = Number(id);

  const [isAgree, setIsAgree] = useState<boolean>(false);

  // 서명(base64) — 미리보기 용
  const [memberSign, setMemberSign] = useState<string | null>(null);
  const [expertSign, setExpertSign] = useState<string | null>(null);

  // 업로드 결과 URL (#1 결과 보관)
  const [memberSignUrl, setMemberSignUrl] = useState<string | null>(null);
  const [expertSignUrl, setExpertSignUrl] = useState<string | null>(null);

  const role = useRoleStore((s) => s.role);
  const isExpert = role === 'EXPERT';
  const handleAgree = () => setIsAgree((prev) => !prev);

  const { data } = useGetContractInfo(contractId);
  console.log(data);

  // 업로드 훅 (user/pro 각각)
  const { mutate: uploadUserSign, isPending: uploadingUser } = usePostUserSignatureFile();
  const { mutate: uploadProSign, isPending: uploadingPro } = usePostProSignatureFile();
  const uploading = uploadingUser || uploadingPro;

  const handleSubmit = () => {
    if (!isAgree) {
      // 필요하면 토스트/알림으로 교체
      console.warn('개인정보 수집·이용 동의를 체크하세요.');
      return;
    }

    // 역할에 따라 해당 서명만 업로드 (#1: imageUrl만 확보)
    if (!isExpert) {
      if (!memberSign) {
        console.warn('회원 서명을 입력하세요.');
        return;
      }
      const file = dataURLtoFile(memberSign, `member-sign-${Date.now()}.png`);
      console.log(file instanceof File, file.type, file.size); // true, "image/png", 크기
      uploadUserSign(
        { contractId, file },
        {
          onSuccess: ({ result }) => {
            setMemberSignUrl(result.imageUrl);
            // TODO(#2): userData에 imageUrl 합쳐 최종 완료 API 호출
          },
        },
      );
    } else {
      if (!expertSign) {
        console.warn('전문가 서명을 입력하세요.');
        return;
      }
      const file = dataURLtoFile(expertSign, `expert-sign-${Date.now()}.png`);
      uploadProSign(
        { contractId, file },
        {
          onSuccess: ({ result }) => {
            setExpertSignUrl(result.imageUrl);
            // TODO(#2): userData에 imageUrl 합쳐 최종 완료 API 호출
          },
        },
      );
    }
  };

  return (
    <section className="mb-8 flex flex-col items-center">
      <section className="my-8 flex w-[1077px] shrink-0 flex-col items-center gap-8 bg-[#EFEFEF] px-2 py-8 text-sm font-light whitespace-pre-line">
        <img src={AppLogo} alt="로고" className="h-[37px]" />
        <h1 className="text-2xl font-extrabold">PT(퍼스널 트레이닝) 계약서</h1>

        <hr className="w-full border-[#929292]" />

        <article className="flex flex-col gap-6">
          <p>{Header}</p>

          <div>
            <div className="grid grid-cols-2 gap-15">
              <InformationCard title={'회원 정보'} borderColor={'blue'}>
                <UserInformationForm isCanEdit={!isExpert} />
              </InformationCard>
              <InformationCard title={'전문 정보'} borderColor={'red'}>
                <UserInformationForm isCanEdit={isExpert} />
              </InformationCard>
            </div>
            <div className="mt-6">
              {/* 이건 불러와서 정보 넣어주기 */}
              <InformationCard title={'서비스 이용 정보'} borderColor={'blue'}>
                <ServiceInformationForm data={data} />
              </InformationCard>
            </div>
          </div>

          <p className="text-button font-bold">환불 및 취소 규정</p>
          <p>{환불및취소규정}</p>
          <p className="text-button font-bold">회원의 권리 및 의무</p>
          <p>{회원의권리및의무}</p>
          <p className="text-button font-bold">개인정보 처리 방침</p>
          <p>{개인정보처리방침}</p>
        </article>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="accent-button size-4"
            checked={isAgree}
            onChange={handleAgree}
            aria-label="고객 요청 수락"
          />
          <p className="text-base font-normal">(필수) 개인정보 수집,이용에 동의합니다</p>
        </div>

        <hr className="w-full border-[#929292]" />

        <div className="flex flex-col gap-4">
          {/* 서명박스 */}
          <div>
            <p className="text-center text-base font-bold">
              상기 계약 내용을 충분히 이해하고 상호 합의하여 계약을 체결합니다.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-10">
              <SignatureBox
                title="회원"
                value={memberSign}
                onChange={setMemberSign}
                isCanEdit={!isExpert}
              />
              <SignatureBox
                title="전문가"
                value={expertSign}
                onChange={setExpertSign}
                isCanEdit={isExpert}
              />
            </div>
          </div>

          <p className="text-center text-sm font-bold">
            {format(new Date(), 'yyyy년 M월 d일', { locale: ko })}
          </p>

          <div>
            <div className="grid w-full grid-cols-2 gap-3">
              <Button width="w-full" disabled={uploading}>
                취소
              </Button>
              <Button width="w-full" onClick={handleSubmit} disabled={uploading}>
                {uploading ? '업로드 중…' : '작성 완료'}
              </Button>
            </div>
          </div>

          {/* 확인용(#1): 업로드 결과 URL 표시 */}
          {memberSignUrl && (
            <p className="mt-2 text-xs text-gray-600">회원 서명 URL: {memberSignUrl}</p>
          )}
          {expertSignUrl && (
            <p className="text-xs text-gray-600">전문가 서명 URL: {expertSignUrl}</p>
          )}
        </div>
      </section>

      <p className="text-xl font-semibold">
        *회원과 전문가 모두 작성완료 상태가 되어야 제출 및 결제가 가능합니다.
      </p>
    </section>
  );
};

export default ContractFormPage;
