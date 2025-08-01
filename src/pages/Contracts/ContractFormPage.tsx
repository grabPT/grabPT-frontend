import { useState } from 'react';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

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

// 계약서 작성페이지입니다.
const ContractFormPage = () => {
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [memberSign, setMemberSign] = useState<string | null>(null);
  const [expertSign, setExpertSign] = useState<string | null>(null);
  const handleAgree = () => {
    setIsAgree((prev) => !prev);
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
                <UserInformationForm />
              </InformationCard>
              <InformationCard title={'전문 정보'} borderColor={'red'}>
                <UserInformationForm />
              </InformationCard>
            </div>
            <div className="mt-6">
              <InformationCard title={'서비스 이용 정보'} borderColor={'blue'}>
                <ServiceInformationForm />
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
              <SignatureBox title="회원" value={memberSign} onChange={setMemberSign} />
              <SignatureBox title="전문가" value={expertSign} onChange={setExpertSign} />
            </div>
          </div>

          <p className="text-center text-sm font-bold">
            {format(new Date(), 'yyyy년 M월 d일', { locale: ko })}
          </p>

          <div>
            <div className="grid w-full grid-cols-2 gap-3">
              <Button width="w-full">취소</Button>
              <Button width="w-full">작성 완료</Button>
            </div>
          </div>
        </div>
      </section>
      <p className="text-xl font-semibold">
        *회원과 전문가 모두 작성완료 상태가 되어야 제출 및 결제가 가능합니다.
      </p>
    </section>
  );
};

export default ContractFormPage;
