import { useEffect, useMemo, useRef, useState } from 'react';

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
  usePostContractExpertInfo,
  usePostContractUserInfo,
} from '@/features/Contract/hooks/usePostContractInfo';
import { usePostContractPdf } from '@/features/Contract/hooks/usePostContractPdf';
import {
  usePostProSignatureFile,
  usePostUserSignatureFile,
} from '@/features/Contract/hooks/usePostSignatureFile';
import type { proInfoType, userInfoType } from '@/features/Contract/types/postContractType';
import { useRoleStore } from '@/store/useRoleStore';
import { dataURLtoFile } from '@/utils/dataURLtoFile';

function extractUserBodyFromForm(form: HTMLFormElement | null): userInfoType | null {
  if (!form) return null;
  const fd = new FormData(form);
  const name = String(fd.get('name') ?? '').trim();
  const birthRaw = String(fd.get('birth') ?? '').trim();
  const phoneNumber = String(fd.get('phoneNumber') ?? '').trim();
  const address = String(fd.get('address') ?? '').trim();
  const genderRaw = String(fd.get('gender') ?? '')
    .trim()
    .toUpperCase();

  const gender: 'MALE' | 'FEMALE' | null =
    genderRaw === 'MALE' || genderRaw === 'FEMALE' ? (genderRaw as any) : null;

  const birth: string | null = birthRaw.length ? birthRaw : null;

  return { name, birth, phoneNumber, gender, address };
}

function extractProBodyFromForm(form: HTMLFormElement | null): proInfoType | null {
  if (!form) return null;
  const fd = new FormData(form);
  const name = String(fd.get('name') ?? '').trim();
  const birthRaw = String(fd.get('birth') ?? '').trim();
  const phoneNumber = String(fd.get('phoneNumber') ?? '').trim();
  const address = String(fd.get('address') ?? '').trim();
  const genderRaw = String(fd.get('gender') ?? '')
    .trim()
    .toUpperCase();
  const startDate = String(fd.get('startDate') ?? '').trim();
  const contractDate = String(fd.get('contractDate') ?? '').trim();

  const gender: 'MALE' | 'FEMALE' | null =
    genderRaw === 'MALE' || genderRaw === 'FEMALE' ? (genderRaw as any) : null;

  const birth: string | null = birthRaw.length ? birthRaw : null;

  return { name, birth, phoneNumber, gender, address, startDate, contractDate };
}

// 계약서 작성페이지입니다.
const ContractFormPage = () => {
  const { id } = useParams();
  const contractId = Number(id);

  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [disabledAgree, setIsDisabledAgree] = useState<boolean>(false); // ⬅️ 변경 대상: 렌더 중 setState 금지, effect로만 동기화

  // 서명(base64) — 미리보기 용
  const [memberSign, setMemberSign] = useState<string | null>(null);
  const [expertSign, setExpertSign] = useState<string | null>(null);

  // 업로드 결과 URL (#1 결과 보관)
  const [memberSignUrl, setMemberSignUrl] = useState<string | null>(null);
  const [expertSignUrl, setExpertSignUrl] = useState<string | null>(null);

  const role = useRoleStore((s) => s.role);
  const isExpert = role === 'EXPERT';
  const handleAgree = () => setIsAgree((prev) => !prev);

  const userFormRef = useRef<HTMLFormElement>(null);
  const proFormRef = useRef<HTMLFormElement>(null);

  const { data } = useGetContractInfo(contractId);

  // 시작일/유효기간 상태 (전문가만 편집)
  const [startDate, setStartDate] = useState<string>('');
  const [contractDate, setContractDate] = useState<string>('');

  // 서버 데이터 들어오면 초기화
  useEffect(() => {
    if (data?.startDate) setStartDate(data.startDate);
    if (data?.contractDate) setContractDate(data.contractDate);
  }, [data?.startDate, data?.contractDate]);

  // ✅ 기본값 구성
  const userDefaults = useMemo<userInfoType | undefined>(() => {
    const u = data?.userInfo;
    if (!u) return undefined;
    return {
      name: u.name ?? '',
      birth: u.birth ?? null,
      phoneNumber: u.phoneNumber ?? '',
      gender: u.gender ?? null,
      address: u.address ?? '',
    };
  }, [data]);

  const proDefaults = useMemo<userInfoType | undefined>(() => {
    const p = data?.proInfo;
    if (!p) return undefined;
    return {
      name: p.name ?? '',
      birth: p.birth ?? null,
      phoneNumber: p.phoneNumber ?? '',
      gender: p.gender ?? null,
      address: p.address ?? '',
    };
  }, [data]);

  const userInitialSignUrl = data?.userInfo?.signUrl || null;
  const expertInitialSignUrl = data?.proInfo?.signUrl || null;

  // ✅ 모든 필드 + 서명이 채워졌는지 판별
  const isFilledUser = (defs?: userInfoType | undefined, sign?: string | null) =>
    !!defs &&
    !!defs.name &&
    !!defs.birth &&
    !!defs.phoneNumber &&
    !!defs.gender &&
    !!defs.address &&
    !!sign;

  // 전문가 완료: 기본 정보 + 날짜 2개 + 서명
  const isFilledPro = (
    defs?: userInfoType | undefined,
    sign?: string | null,
    dates?: { startDate?: string; contractDate?: string },
  ) =>
    !!defs &&
    !!defs.name &&
    !!defs.birth &&
    !!defs.phoneNumber &&
    !!defs.gender &&
    !!defs.address &&
    !!dates?.startDate &&
    !!dates?.contractDate &&
    !!sign;

  // 서명은 서버초기/로컬 업로드 둘 다 고려
  const userSignAny = userInitialSignUrl ?? memberSignUrl;
  const expertSignAny = expertInitialSignUrl ?? expertSignUrl;

  // 날짜도 서버초기/로컬 입력 둘 다 고려
  const startAny = startDate || data?.startDate || '';
  const contractAny = contractDate || data?.contractDate || '';

  const userComplete = isFilledUser(userDefaults, userSignAny);
  const proComplete = isFilledPro(proDefaults, expertSignAny, {
    startDate: startAny,
    contractDate: contractAny,
  });

  // ✅ 편집 가능 여부
  const canEditUser = !isExpert && !userComplete;
  const canEditPro = isExpert && !proComplete;

  // 업로드 훅
  const { mutate: uploadUserInfo, isPending: uploadingUserInfo } = usePostContractUserInfo();
  const { mutate: uploadProInfo, isPending: uploadingProInfo } = usePostContractExpertInfo();
  const { mutate: uploadUserSign, isPending: uploadingUser } = usePostUserSignatureFile();
  const { mutate: uploadProSign, isPending: uploadingPro } = usePostProSignatureFile();
  const { mutate: createPdf } = usePostContractPdf();
  const uploading = uploadingUser || uploadingPro || uploadingUserInfo || uploadingProInfo;

  // ─────────────────────────────────────────────────────────────
  // 버튼/레이아웃 상태 결정 (기존 로직 유지)
  let showCancel = true;
  let primaryDisabled = uploading;
  let primaryLabel = uploading ? '업로드 중…' : '작성 완료';
  let primaryFullWidth = false;

  if (!isExpert) {
    // USER 화면 규칙
    if (userComplete && !proComplete) {
      // 사용자 완료, 전문가 미완료 → 잠금 + 버튼 비활성 + w-full
      showCancel = false;
      primaryDisabled = true;
      primaryFullWidth = true;
      // ⛔ setState 금지 (무한렌더 방지)
    } else if (userComplete && proComplete) {
      // 양측 완료 → 잠금 + 결제 버튼 활성 + w-full
      showCancel = false;
      primaryDisabled = false;
      primaryLabel = '계약서 제출 및 결제';
      primaryFullWidth = true;
      // ⛔ setState 금지 (무한렌더 방지)
    }
  } else {
    // EXPERT 화면 규칙
    if (proComplete) {
      // 전문가 완료 → 잠금 + 버튼 비활성 + w-full
      showCancel = false;
      primaryDisabled = true;
      primaryFullWidth = true;
      // ⛔ setState 금지 (무한렌더 방지)
    }
  }

  // ─────────────────────────────────────────────────────────────
  // ✅ disabledAgree 파생값 계산 + effect로 동기화
  // - 사용자(user) 측: userComplete이면 동의 강제(완료/대기 모두)
  // - 전문가(expert) 측: proComplete이면 동의 강제
  const forceAgree = (!isExpert && userComplete) || (isExpert && proComplete);

  useEffect(() => {
    // disabledAgree는 effect에서만 갱신하여 렌더 중 setState를 피함
    setIsDisabledAgree(forceAgree);

    // 동의 체크도 같은 타이밍에 true로 고정(필요 시)
    if (forceAgree) setIsAgree(true);
    // forceAgree가 false가 될 때 isAgree를 강제로 false로 되돌리진 않음(기존 동작 보존)
  }, [forceAgree]);
  // ─────────────────────────────────────────────────────────────

  const handleSubmit = () => {
    if (!isAgree) {
      console.warn('개인정보 수집·이용에 동의가 필요합니다.');
      return;
    }
    if (primaryDisabled) return;

    if (!isExpert) {
      if (canEditUser) {
        // 1) info 먼저
        const body = extractUserBodyFromForm(userFormRef.current);
        if (!body || !body.name || !body.phoneNumber || !body.gender || !body.address) {
          console.warn('회원 정보가 완전하지 않습니다.');
          return;
        }
        uploadUserInfo(
          { contractId, body },
          {
            onSuccess: () => {
              // 2) sign 업로드
              if (!memberSign) {
                console.warn('회원 서명을 입력하세요.');
                return;
              }
              const file = dataURLtoFile(memberSign, `member-sign-${Date.now()}.png`);
              uploadUserSign(
                { contractId, file },
                {
                  onSuccess: ({ result }) => setMemberSignUrl(result.imageUrl),
                },
              );
            },
          },
        );
      } else {
        // userComplete && proComplete → 결제/제출
        // TODO: 결제/제출 트리거
      }
    } else {
      if (canEditPro) {
        // 1) info 먼저 (전문가: 날짜 포함)
        const body = extractProBodyFromForm(proFormRef.current);
        if (
          !body ||
          !body.name ||
          !body.phoneNumber ||
          !body.gender ||
          !body.address ||
          !body.startDate ||
          !body.contractDate
        ) {
          console.warn('전문가 정보가 완전하지 않습니다.');
          return;
        }
        uploadProInfo(
          { contractId, body },
          {
            onSuccess: () => {
              // 2) sign 업로드
              if (!expertSign) {
                console.warn('전문가 서명을 입력하세요.');
                return;
              }
              const file = dataURLtoFile(expertSign, `expert-sign-${Date.now()}.png`);
              uploadProSign(
                { contractId, file },
                {
                  onSuccess: ({ result }) => setExpertSignUrl(result.imageUrl),
                },
              );
            },
          },
        );
      }
    }
  };

  const handleCreatePdf = () => {
    createPdf(contractId);
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
                <form ref={userFormRef}>
                  <UserInformationForm isCanEdit={canEditUser} defaultValues={userDefaults} />
                </form>
              </InformationCard>

              <InformationCard title={'전문 정보'} borderColor={'red'}>
                {/* ⬇️ 전문가 폼 내부에 hidden input으로 날짜를 주입해 FormData에 포함 */}
                <form ref={proFormRef}>
                  <UserInformationForm isCanEdit={canEditPro} defaultValues={proDefaults} />
                  <input type="hidden" name="startDate" value={startAny} />
                  <input type="hidden" name="contractDate" value={contractAny} />
                </form>
              </InformationCard>
            </div>

            <div className="mt-6">
              <InformationCard title={'서비스 이용 정보'} borderColor={'blue'}>
                <ServiceInformationForm
                  data={data}
                  isExpert={isExpert}
                  startDate={startDate}
                  contractDate={contractDate}
                  onChangeStartDate={setStartDate}
                  onChangeContractDate={setContractDate}
                />
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
            defaultChecked={disabledAgree}
            disabled={disabledAgree}
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
                isCanEdit={canEditUser}
                initialImageUrl={userInitialSignUrl ?? undefined}
              />
              <SignatureBox
                title="전문가"
                value={expertSign}
                onChange={setExpertSign}
                isCanEdit={canEditPro}
                initialImageUrl={expertInitialSignUrl ?? undefined}
              />
            </div>
          </div>

          <p className="text-center text-sm font-bold">
            {format(new Date(), 'yyyy년 M월 d일', { locale: ko })}
          </p>

          <div className={`grid w-full ${showCancel ? 'grid-cols-2 gap-3' : ''}`}>
            {showCancel && (
              <Button width="w-full" disabled={uploading}>
                취소
              </Button>
            )}
            <Button
              width="w-full"
              onClick={userComplete && proComplete && !isExpert ? handleCreatePdf : handleSubmit}
              disabled={primaryDisabled}
              className={primaryFullWidth ? 'col-span-2' : undefined}
            >
              {primaryLabel}
            </Button>
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
