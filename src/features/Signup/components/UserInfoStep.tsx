import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';

import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';
import { useCheckEmail } from '@/features/Signup/hooks/useCheckEmail';
import useSmsSend from '@/features/Signup/hooks/useSmsSend';
import useSmsVerify from '@/features/Signup/hooks/useSmsVerify';
import { userInfoSchema } from '@/features/Signup/schema/signupSchema';
import { useSignupStore } from '@/store/useSignupStore';

interface UserInfoStepProps {
  onNext: () => void;
}
interface UserInfoFormValues {
  email: string;
  address: string;
  specAddress: string;
  phoneNumber: string;
}

const UserInfoStep = ({ onNext }: UserInfoStepProps) => {
  //store에서 업데이트할 목록 불러오기
  // oauthProvider 빌드에러
  // const { userInfo, setUserInfo, oauthProvider } = useSignupStore();
  const { userInfo, setUserInfo } = useSignupStore();

  //유효성 검사
  const {
    register,
    trigger,
    watch,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      email: userInfo.email || '',
      address: `${userInfo.address.city} ${userInfo.address.district}`,
      specAddress: userInfo.address.specAddress,
      phoneNumber: userInfo.phoneNumber,
      verifyNum: '',
    },
  });

  console.log(errors);
  //폼 제출 로직(폼 확인 및 store에 값 업데이트)
  const onSubmit = (data: UserInfoFormValues) => {
    if (EmailDuplicate !== false) {
      alert('이메일 중복 확인을 해주세요.');
      return;
    }
    if (!VerifyNumberCheckResult) {
      alert('전화번호 인증을 완료해주세요.');
      return;
    }
    setUserInfo({
      ...userInfo,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: {
        ...userInfo.address,
        specAddress: data.specAddress,
      },
    });
    console.log('이메일이 담겨있나용:', userInfo);
    onNext();
  };
  const email = watch('email');
  const phoneNumber = watch('phoneNumber');
  const verifyNum = watch('verifyNum');
  //주소 api 모달 띄우기
  const [postModalOpen, setPostModalOpen] = useState(false);
  //주소 api 호출
  useEffect(() => {
    if (postModalOpen && (window as any).daum && (window as any).daum.Postcode) {
      const container = document.getElementById('daum-postcode') as HTMLElement;
      if (container) {
        container.innerHTML = ''; // 이전 내용 제거
        new (window as any).daum.Postcode({
          oncomplete: function (data: any) {
            const streetCode = data.roadAddress.replace(/^.+?\s+.+?\s+/, '');
            const city = data.sido;
            const district = data.sigungu;
            const street = data.bname;
            const zipcode = data.zonecode;
            setUserInfo({
              ...userInfo,
              address: {
                ...userInfo.address,
                city,
                district,
                street,
                streetCode,
                zipcode,
              },
            });
            setValue('address', `${city} ${district}`, {
              shouldDirty: false,
              shouldTouch: false,
              shouldValidate: false,
            });
            trigger('address');
            setPostModalOpen(false);
          },
          onclose: function () {
            setPostModalOpen(false);
          },
        }).embed(container);
      }
    }
  }, [postModalOpen, setUserInfo, userInfo, setValue, trigger]);
  //주소 api 사용
  const handleAddressSearch = () => {
    if (!(window as any).daum || !(window as any).daum.Postcode) {
      alert('주소 검색 API가 아직 로드되지 않았습니다.');
      return;
    }
    setPostModalOpen(true);
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  // email 동기화: 카카오는 사용자가 입력한 값을 RHF가 관리하고, 비-카카오는 스토어 값을 폼에 유지
  // 이새끼떄매 입력이 안 되네
  // useEffect(() => {
  //   if (oauthProvider !== 'kakao') {
  //     if (email !== userInfo.email) {
  //       setValue('email', userInfo.email || '', {
  //         shouldDirty: false,
  //         shouldTouch: false,
  //         shouldValidate: false,
  //       });
  //     }
  //   }
  // }, [oauthProvider, email, userInfo.email, setValue]);

  //폼 검사 에러 메시지 출력
  const getUserErrorMessage = () => {
    if (errors.email && touchedFields.email) return errors.email.message;
    if (errors.address && touchedFields.address) return errors.address.message;
    if (errors.specAddress && touchedFields.specAddress) return errors.specAddress.message;
    if (errors.phoneNumber && touchedFields.phoneNumber) return errors.phoneNumber.message;
    if (errors.verifyNum && touchedFields.verifyNum) return errors.verifyNum.message;
  };

  //전화번호 인증
  const { mutate: sendSms } = useSmsSend();
  //수정 해야함
  const handlePhoneNumVerification = async () => {
    if (!phoneNumber) {
      alert('전화번호를 입력해주세요.');
      return;
    }
    const isPhoneValid = await trigger('phoneNumber');
    if (!isPhoneValid) {
      alert('올바른 전화번호 형식을 입력해주세요. (010-XXXX-XXXX)');
      return;
    }
    // 여기서 서버에 인증번호 요청 API 호출
    sendSms(
      { phoneNumber },
      {
        onSuccess: (res) => {
          console.log(res);
          alert('인증번호가 전송되었습니다.');
        },
        onError: () => alert('인증번호 요청 실패'),
      },
    );
  };

  //잘못 입력 시 칸 흔들림 모션
  const [shakeKey, setShakeKey] = useState('initial');
  //인증번호 확인
  const { mutate: verifySms } = useSmsVerify();
  const [VerifyNumberCheckResult, setVerifyNumberCheckResult] = useState<boolean | null>(null);
  //인증번호 확인 로직
  const handleVerifyNumberCheck = () => {
    verifySms(
      { phoneNumber, inputCode: verifyNum },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            setVerifyNumberCheckResult(true);
          }
          //   else {
          //     setVerifyNumberCheckResult(false);
          //     setShakeKey(`shake-${Date.now()}`);
          //   }
        },
        onError: (err) => {
          setVerifyNumberCheckResult(false);
          setShakeKey(`shake-${Date.now()}`);
          console.error('인증 실패:', err);
        },
      },
    );
  };
  const { mutate: checkEmail } = useCheckEmail();
  const [EmailDuplicate, setEmailDuplicate] = useState<boolean | null>(null);
  //이메일 중복 확인
  const handleEmailCheck = () => {
    checkEmail(email, {
      onSuccess: (res) => {
        if (!res.isDuplicated) {
          setEmailDuplicate(false);
        } else {
          setEmailDuplicate(true);
          alert(`해당 이메일이 다음으로 이미 가입되었습니다: ${res.oauthProvider}`);
          window.location.href = '/login';
        }
      },
      onError: (err) => {
        setEmailDuplicate(true);
        console.log('이메일 중복 확인 실패:', err);
      },
    });
  };

  return (
    <div className="flex scale-60 flex-col items-center justify-center xl:scale-70 2xl:scale-80">
      {/* 로고 */}
      <div className="mt-6 flex justify-center">
        <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
      </div>
      <div className="mt-14 flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-2xl">
        <div className="relative flex h-full w-full flex-col items-center">
          <div className="mx-[4.375rem] mt-12 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">이메일</span>
              <div className="relative flex h-[3.125rem] w-[25.625rem] items-center justify-between rounded-[0.625rem] border border-[#BDBDBD]">
                <input
                  //type="email"로 수정
                  type="email"
                  {...register('email')}
                  placeholder="이메일"
                  //이메일 같은 경우 카카오는 입력받아서 나머지는 받아온 이메일을 띄워줘야함 oauthprovider로 구분
                  className="w-full rounded-[0.625rem] py-[0.8rem] pl-4 text-[#616161]"
                  // 일단 주석처리.
                  // readOnly={oauthProvider !== 'kakao'}
                />
                <button
                  className="absolute top-1/2 right-4 flex h-7 w-[4.375rem] -translate-y-1/2 items-center justify-center rounded-[3.125rem] bg-[color:var(--color-button)] text-[0.625rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)]"
                  onClick={handleEmailCheck}
                >
                  중복확인
                </button>
              </div>

              <p
                className={`pt-1 text-sm ${
                  EmailDuplicate === null
                    ? 'text-transparent'
                    : !EmailDuplicate
                      ? 'text-green-600'
                      : 'text-red-600'
                }`}
              >
                {EmailDuplicate === null
                  ? 'placeholder'
                  : !EmailDuplicate
                    ? '이메일 사용 가능'
                    : '이미 사용 중'}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">주소</span>
              <div className="flex flex-col gap-2.5">
                <div className="relative flex h-[3.125rem] w-[25.625rem] items-center justify-between rounded-[0.625rem] border border-[#BDBDBD]">
                  <input
                    type="text"
                    readOnly
                    placeholder="주소"
                    value={`${userInfo.address.city} ${userInfo.address.district}`}
                    className="w-full rounded-[0.625rem] py-[0.8rem] pl-4 text-[#616161]"
                  />
                  <button
                    className="absolute top-1/2 right-4 flex h-7 w-[4.375rem] -translate-y-1/2 items-center justify-center rounded-[3.125rem] bg-[color:var(--color-button)] text-[0.625rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)]"
                    onClick={handleAddressSearch}
                  >
                    주소 검색
                  </button>
                </div>

                <div className="flex h-[3.125rem] w-[25.625rem] items-center justify-between">
                  <input
                    type="text"
                    placeholder="상세 주소"
                    className="w-[17rem] rounded-[0.625rem] border border-[#BDBDBD] py-[0.8rem] pl-4 text-[#616161]"
                    {...register('specAddress')}
                  />
                  <input
                    aria-label="동"
                    className="flex h-full w-32 items-center justify-center rounded-[0.625rem] border border-[#BDBDBD] pl-4 text-[15px] text-[#616161]"
                    value={userInfo.address.street || '동'}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-13 font-semibold">
                <span>국가</span>
                <span>전화번호</span>
              </div>
              <div className="relative flex items-center rounded-[0.625rem] border border-[#BDBDBD]">
                <div className="inline-flex border-r border-[#BDBDBD] px-3 py-[0.8rem]">
                  <label htmlFor="country-code"></label>
                  <select
                    aria-label="지역선택"
                    id="country-code"
                    name="countryCode"
                    className="text-[#616161]"
                  >
                    <option value="+82">+82</option>
                    <option value="+1">+1</option>
                    <option value="+81">+81</option>
                    <option value="+86">+86</option>
                  </select>
                </div>
                <div className="">
                  <input
                    type="tel"
                    placeholder="3334586492"
                    {...register('phoneNumber')}
                    className="ml-[1.25rem] text-black"
                  />
                  <button
                    className="absolute top-1/2 right-4 flex h-7 w-[4.375rem] -translate-y-1/2 items-center justify-center rounded-[3.125rem] bg-[color:var(--color-button)] text-[0.625rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)]"
                    onClick={handlePhoneNumVerification}
                  >
                    인증요청
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">인증번호</span>
              <div className="relative flex items-center justify-between">
                <input
                  key={shakeKey}
                  {...register('verifyNum')}
                  placeholder="XXXXXX"
                  className={`w-full rounded-[0.625rem] border py-[0.8rem] pl-4 text-[#616161] ${
                    VerifyNumberCheckResult === null
                      ? 'border-[#BDBDBD]'
                      : VerifyNumberCheckResult
                        ? 'border-green-500'
                        : 'animate-[var(--animate-shake)] border-red-500'
                    // : 'border-[#BDBDBD]'
                  }`}
                />
                <button
                  className="absolute top-1/2 right-4 flex h-7 w-[4.375rem] -translate-y-1/2 items-center justify-center rounded-[3.125rem] bg-[color:var(--color-button)] text-[0.625rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)]"
                  onClick={handleVerifyNumberCheck}
                >
                  인증확인
                </button>
              </div>
              <div className="mt-1 flex flex-col gap-2">
                {VerifyNumberCheckResult !== null &&
                  (VerifyNumberCheckResult ? (
                    <p className="mt-1 text-sm text-green-600">인증되었습니다</p>
                  ) : (
                    <p className="mt-1 text-sm text-red-600">인증번호가 일치하지 않습니다</p>
                  ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-12 left-1/2 w-[25.5625rem] -translate-x-1/2 transform">
            {getUserErrorMessage() && (
              <div className="mb-4 h-[20px] text-center text-red-500">{getUserErrorMessage()}</div>
            )}
            <SignupBtn type="button" onClick={handleSubmit(onSubmit)}>
              다음
            </SignupBtn>
          </div>
        </div>
        {postModalOpen &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
              onClick={() => setPostModalOpen(false)}
              role="dialog"
              aria-modal="true"
            >
              <div className="relative p-8" onClick={(e) => e.stopPropagation()}>
                <div
                  id="daum-postcode"
                  className="flex h-[600px] w-[600px] items-center justify-center rounded-[0.625rem] bg-white shadow-lg"
                />
              </div>
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
};

export default UserInfoStep;
