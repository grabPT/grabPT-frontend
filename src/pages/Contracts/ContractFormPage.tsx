import { useEffect, useMemo, useRef, useState } from 'react';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNavigate, useParams } from 'react-router-dom';
import { ZodError } from 'zod';

import AppLogo from '@/assets/images/AppLogo.png';
import Button from '@/components/Button';
import ROUTES from '@/constants/routes';
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
  usePostContractProInfo,
  usePostContractUserInfo,
} from '@/features/Contract/hooks/usePostContractInfo';
import { usePostContractPdf } from '@/features/Contract/hooks/usePostContractPdf';
import { usePostCustomOrder } from '@/features/Contract/hooks/usePostCustomOrder';
import { usePostPaymentCallback } from '@/features/Contract/hooks/usePostPaymentCallback';
import {
  usePostProSignatureFile,
  usePostUserSignatureFile,
} from '@/features/Contract/hooks/usePostSignatureFile';
import {
  contractProInfoSchema,
  contractUserInfoSchema,
} from '@/features/Contract/schema/contractSchema';
import type { proInfoType, userInfoType } from '@/features/Contract/types/postContractType';
import {
  extractProBodyFromForm,
  extractUserBodyFromForm,
} from '@/features/Contract/utils/contractForm';
import { useRoleStore } from '@/store/useRoleStore';
import { dataURLtoFile } from '@/utils/dataURLtoFile';
import { toFieldErrorMap } from '@/utils/toFieldErrorMap';

export {};

declare global {
  interface Window {
    IMP: any; // 필요하다면 정확한 타입으로 교체 가능
  }
}

// 계약서 작성페이지입니다.
const ContractFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const contractId = Number(id);

  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [disabledAgree, setIsDisabledAgree] = useState<boolean>(false);

  // 검증 에러 상태 추가
  const [userErrors, setUserErrors] = useState<Record<string, string>>({});
  const [proErrors, setProErrors] = useState<Record<string, string>>({});

  // 서명(base64) — 미리보기 용
  const [memberSign, setMemberSign] = useState<string | null>(null);
  const [proSign, setProSign] = useState<string | null>(null);

  // 업로드 결과 URL (#1 결과 보관)
  const [memberSignUrl, setMemberSignUrl] = useState<string | null>(null);
  const [proSignUrl, setProSignUrl] = useState<string | null>(null);

  const role = useRoleStore((s) => s.role);
  const isPro = role === 'PRO';
  const handleAgree = () => setIsAgree((prev) => !prev);

  const userFormRef = useRef<HTMLFormElement>(null);
  const proFormRef = useRef<HTMLFormElement>(null);

  const { data: contract } = useGetContractInfo(contractId);

  // 시작일/유효기간 상태 (전문가만 편집)
  const [startDate, setStartDate] = useState<string>('');
  const [contractDate, setContractDate] = useState<string>('');

  // 서버 데이터 들어오면 초기화
  useEffect(() => {
    if (contract?.startDate) setStartDate(contract.startDate);
    if (contract?.expireDate) setContractDate(contract.expireDate);
  }, [contract?.startDate, contract?.expireDate]);

  // ✅ 기본값 구성
  const userDefaults = useMemo<userInfoType | undefined>(() => {
    const u = contract?.userInfo;
    if (!u) return undefined;
    return {
      name: u.name ?? '',
      birth: u.birth ?? null,
      phoneNumber: u.phoneNumber ?? '',
      gender: u.gender ?? null,
      location: u.location ?? '',
    };
  }, [contract]);

  const proDefaults = useMemo<userInfoType | undefined>(() => {
    const p = contract?.proInfo;
    if (!p) return undefined;
    return {
      name: p.name ?? '',
      birth: p.birth ?? null,
      phoneNumber: p.phoneNumber ?? '',
      gender: p.gender ?? null,
      location: p.location ?? '',
    };
  }, [contract]);

  const userInitialSignUrl = contract?.userInfo?.signImageUrl || null;
  const proInitialSignUrl = contract?.proInfo?.signImageUrl || null;

  // ✅ 모든 필드 + 서명이 채워졌는지 판별
  const isFilledUser = (defs?: userInfoType | undefined, sign?: string | null) =>
    !!defs &&
    !!defs.name &&
    !!defs.birth &&
    !!defs.phoneNumber &&
    !!defs.gender &&
    !!defs.location &&
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
    !!defs.location &&
    !!dates?.startDate &&
    !!dates?.contractDate &&
    !!sign;

  // 서명은 서버초기/로컬 업로드 둘 다 고려
  const userSignAny = userInitialSignUrl ?? memberSignUrl;
  const proSignAny = proInitialSignUrl ?? proSignUrl;

  // 날짜도 서버초기/로컬 입력 둘 다 고려
  const startAny = startDate || contract?.startDate || '';
  const contractAny = contractDate || contract?.expireDate || '';

  const userComplete = isFilledUser(userDefaults, userSignAny);
  const proComplete = isFilledPro(proDefaults, proSignAny, {
    startDate: startAny,
    contractDate: contractAny,
  });

  // ✅ 편집 가능 여부
  const canEditUser = !isPro && !userComplete;
  const canEditPro = isPro && !proComplete;

  // 업로드 훅
  const { mutate: uploadUserInfo, isPending: uploadingUserInfo } = usePostContractUserInfo();
  const { mutate: uploadProInfo, isPending: uploadingProInfo } = usePostContractProInfo();
  const { mutate: uploadUserSign, isPending: uploadingUser } = usePostUserSignatureFile();
  const { mutate: uploadProSign, isPending: uploadingPro } = usePostProSignatureFile();
  const { mutate: createPdf } = usePostContractPdf();
  const { mutate: postOrder } = usePostCustomOrder();
  const { mutate: postPayment } = usePostPaymentCallback();
  const uploading = uploadingUser || uploadingPro || uploadingUserInfo || uploadingProInfo;

  // ─────────────────────────────────────────────────────────────
  // 버튼/레이아웃 상태 결정 (기존 로직 유지)
  let showCancel = true;
  let primaryDisabled = uploading;
  let primaryLabel = uploading ? '업로드 중…' : '작성 완료';
  let primaryFullWidth = false;

  if (!isPro) {
    // USER 화면 규칙
    if (userComplete && !proComplete) {
      // 사용자 완료, 전문가 미완료 → 잠금 + 버튼 비활성 + w-full
      showCancel = false;
      primaryDisabled = true;
      primaryFullWidth = true;
    } else if (userComplete && proComplete) {
      // 양측 완료 → 잠금 + 결제 버튼 활성 + w-full
      showCancel = false;
      primaryDisabled = false;
      primaryLabel = '계약서 제출 및 결제';
      primaryFullWidth = true;
    }
  } else {
    // PRO 화면 규칙
    if (proComplete) {
      // 전문가 완료 → 잠금 + 버튼 비활성 + w-full
      showCancel = false;
      primaryDisabled = true;
      primaryFullWidth = true;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // ✅ disabledAgree 파생값 계산 + effect로 동기화
  // - 사용자(user) 측: userComplete이면 동의 강제(완료/대기 모두)
  // - 전문가(pro) 측: proComplete이면 동의 강제
  const forceAgree = (!isPro && userComplete) || (isPro && proComplete);

  useEffect(() => {
    // disabledAgree는 effect에서만 갱신하여 렌더 중 setState를 피함
    setIsDisabledAgree(forceAgree);

    // 동의 체크도 같은 타이밍에 true로 고정(필요 시)
    if (forceAgree) setIsAgree(true);
    // forceAgree가 false가 될 때 isAgree를 강제로 false로 되돌리진 않음(기존 동작 보존)
  }, [forceAgree]);

  useEffect(() => {
    // 포트원 라이브러리 추가
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="https://cdn.iamport.kr/v1/iamport.js"]`,
    );

    if (!script) {
      script = document.createElement('script');
      script.src = 'https://cdn.iamport.kr/v1/iamport.js';
      script.async = true;
      document.body.appendChild(script);
    }
    return () => {
      // 스크립트 요소가 존재하는지 확인 후 제거
      if (script && script.parentNode === document.body) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // ✅ 사용자 정보 검증 함수
  const validateUserInfo = (body: userInfoType): boolean => {
    try {
      contractUserInfoSchema.parse({
        name: body.name || '',
        birth: body.birth || '',
        phoneNumber: body.phoneNumber || '',
        location: body.location || '',
        gender: body.gender || undefined,
      });
      setUserErrors({});
      return true;
    } catch (e) {
      if (e instanceof ZodError) {
        setUserErrors(toFieldErrorMap(e));
      }
      return false;
    }
  };

  // ✅ 전문가 정보 검증 함수
  const validateProInfo = (body: proInfoType): boolean => {
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
      return true;
    } catch (e) {
      if (e instanceof ZodError) {
        setProErrors(toFieldErrorMap(e));
      }
      return false;
    }
  };

  // ─────────────────────────────────────────────────────────────

  const handleSubmit = () => {
    if (!isAgree) {
      alert('개인정보 수집·이용에 동의가 필요합니다.');
      return;
    }
    if (primaryDisabled) return;

    if (!isPro) {
      if (canEditUser) {
        // 1) info 먼저 - Zod 검증 적용
        const body = extractUserBodyFromForm(userFormRef.current);
        if (!body) {
          alert('회원 정보를 입력해주세요.');
          return;
        }

        // Zod 스키마로 검증
        if (!validateUserInfo(body)) {
          alert('입력 정보를 확인해주세요.');
          return;
        }

        uploadUserInfo(
          { contractId, body },
          {
            onSuccess: () => {
              // 2) sign 업로드
              if (!memberSign) {
                alert('회원 서명을 입력하세요.');
                return;
              }
              const file = dataURLtoFile(memberSign, `member-sign-${Date.now()}.png`);
              uploadUserSign(
                { contractId, file },
                {
                  onSuccess: ({ result }) => {
                    setMemberSignUrl(result.imageUrl);
                    location.reload();
                  },
                },
              );
            },
            onError: () => {
              alert('회원 정보 업로드에 실패했습니다.');
            },
          },
        );
      } else {
        // userComplete && proComplete → 결제/제출
        // TODO: 결제/제출 트리거
      }
    } else {
      if (canEditPro) {
        // 1) info 먼저 (전문가: 날짜 포함) - Zod 검증 적용
        const body = extractProBodyFromForm(proFormRef.current);
        if (!body) {
          alert('전문가 정보를 입력해주세요.');
          return;
        }

        // Zod 스키마로 검증
        if (!validateProInfo(body)) {
          alert('입력 정보를 확인해주세요.');
          return;
        }

        uploadProInfo(
          { contractId, body },
          {
            onSuccess: () => {
              // 2) sign 업로드
              if (!proSign) {
                alert('전문가 서명을 입력하세요.');
                return;
              }
              const file = dataURLtoFile(proSign, `pro-sign-${Date.now()}.png`);
              uploadProSign(
                { contractId, file },
                {
                  onSuccess: ({ result }) => {
                    setProSignUrl(result.imageUrl);
                    location.reload();
                  },
                },
              );
            },
            onError: () => {
              alert('전문가 정보 업로드에 실패했습니다.');
            },
          },
        );
      }
    }
  };

  const handleSuccess = async () => {
    if (!contract) return;

    // 2) 결제 사전 생성 (주문 생성) - 서버에서 주문 UID 등 발급
    postOrder(
      {
        price: contract.contractPrice * contract.contractSessionCount,
        item_name: `${contract.userInfo.name}의 ${contract.proInfo.name}의 제안에 대한 결제건입니다.`,
        matching_id: contract.matchingId,
      },
      {
        onSuccess: (response) => {
          const { IMP } = window;
          IMP.init(import.meta.env.VITE_PORTONE_IMP_KEY); // 가맹점 식별코드
          const order = response.result;
          const body = {
            pg: import.meta.env.VITE_PORTONE_PG, // 결제대행사
            pay_method: import.meta.env.VITE_PORTONE_PAY_METHOD, // 결제수단
            merchant_uid: order.order_uid,
            name: order.item_name,
            amount: order.payment_price,
            buyer_email: order.buyer_email,
            buyer_name: order.buyer_name,
            buyer_tel: order.buyer_tel,
            buyer_addr: order.buyer_address,
            buyer_postcode: order.buyer_postcode,
            // 필요시 모바일 리다이렉트: m_redirect_url: 'https://your.sites/complete'
            // 추가 옵션도 여기서 확장 가능
          } as const;
          // 4) 결제 요청
          window.IMP.request_pay(body, async (rsp: any) => {
            if (rsp.success) {
              // rsp.imp_uid, rsp.merchant_uid 등으로 서버 검증
              // const verified = await verifyPayment(rsp.merchant_uid, rsp.imp_uid);
              const verified = true; // 임시
              if (verified) {
                // 1) 계약서 PDF 생성 (동기/비동기 여부에 따라 필요시 await)
                createPdf(contractId);
                postPayment({
                  payment_uid: rsp.imp_uid,
                  order_uid: rsp.merchant_uid,
                });
                alert('결제완료!');
                navigate(ROUTES.USER_SETTLEMENT);
                // 후처리 (알림, 라우팅 등)
              } else {
                console.log('결제 검증 실패');
              }
            } else {
              console.log('결제 실패', rsp.error_msg);
            }
          });
        },
      },
    );
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
                  {/* 검증 에러 표시 */}
                  {Object.entries(userErrors).map(([field, error]) => (
                    <div key={field} className="mt-2 text-xs text-red-500">
                      {error}
                    </div>
                  ))}
                </form>
              </InformationCard>

              <InformationCard title={'전문 정보'} borderColor={'red'}>
                {/* ⬇️ 전문가 폼 내부에 hidden input으로 날짜를 주입해 FormData에 포함 */}
                <form ref={proFormRef}>
                  <UserInformationForm isCanEdit={canEditPro} defaultValues={proDefaults} />
                  <input type="hidden" name="startDate" value={startAny} />
                  <input type="hidden" name="expireDate" value={contractAny} />
                  {/* 검증 에러 표시 */}
                  {Object.entries(proErrors).map(([field, error]) => (
                    <div key={field} className="mt-2 text-xs text-red-500">
                      {error}
                    </div>
                  ))}
                </form>
              </InformationCard>
            </div>

            <div className="mt-6">
              <InformationCard title={'서비스 이용 정보'} borderColor={'blue'}>
                <ServiceInformationForm
                  data={contract}
                  isPro={isPro}
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
                value={proSign}
                onChange={setProSign}
                isCanEdit={canEditPro}
                initialImageUrl={proInitialSignUrl ?? undefined}
              />
            </div>
          </div>

          <p className="text-center text-sm font-bold">
            {format(new Date(), 'yyyy년 M월 d일', { locale: ko })}
          </p>

          <div className={`grid w-full ${showCancel ? 'grid-cols-2 gap-3' : ''}`}>
            {/* TODO: 취소 버튼 로직 어떻게 할 지, 현재 뒤로가기만 되어있는데 이러면 계약서 페이지 접근이 안됨 */}
            {showCancel && (
              <Button width="w-full" disabled={uploading} onClick={() => navigate(-1)}>
                취소
              </Button>
            )}

            <Button
              width="w-full"
              onClick={userComplete && proComplete && !isPro ? handleSuccess : handleSubmit}
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
