import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';
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
  phoneNum: string;
}

const UserInfoStep = ({ onNext }: UserInfoStepProps) => {
  //store에서 업데이트할 목록 불러오기
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
      email: userInfo.email,
      address: `${userInfo.address.city} ${userInfo.address.district}`,
      specAddress: userInfo.address.specAddress,
      phoneNum: userInfo.phoneNum,
      verifyNum: '',
    },
  });

  console.log(errors);
  //폼 제출 로직(폼 확인 및 store에 값 업데이트)
  const onSubmit = (data: UserInfoFormValues) => {
    if (!VerifyNumberCheckResult) {
      alert('전화번호 인증을 완료해주세요.');
      return;
    }

    setUserInfo({
      ...userInfo,
      email: data.email,
      phoneNum: data.phoneNum,
      address: {
        ...userInfo.address,
        specAddress: data.specAddress,
      },
    });
    console.log(userInfo);
    onNext();
  };
  const phoneNum = watch('phoneNum');
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

  //폼 검사 에러 메시지 출력
  const getUserErrorMessage = () => {
    if (errors.email && touchedFields.email) return errors.email.message;
    if (errors.address && touchedFields.address) return errors.address.message;
    if (errors.specAddress && touchedFields.specAddress) return errors.specAddress.message;
    if (errors.phoneNum && touchedFields.phoneNum) return errors.phoneNum.message;
    if (errors.verifyNum && touchedFields.verifyNum) return errors.verifyNum.message;
  };

  //전화번호 인증
  const { mutate: sendSms } = useSmsSend();
  //수정 해야함
  const handlePhoneNumVerification = () => {
    if (!phoneNum) {
      alert('전화번호를 입력해주세요.');
      return;
    }
    // 여기서 서버에 인증번호 요청 API 호출
    sendSms(
      { phoneNum },
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
      { phoneNum, inputCode: verifyNum },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            setVerifyNumberCheckResult(true);
          } else {
            setVerifyNumberCheckResult(false);
            setShakeKey(`shake-${Date.now()}`);
          }
        },
        onError: (err) => {
          console.error('인증 실패:', err);
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 로고 */}
      <div className="mt-6 flex justify-center">
        <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
      </div>
      <div className="mt-14 flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-2xl">
        <div className="relative flex h-full w-full flex-col items-center">
          <div className="mx-[4.375rem] mt-16 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">이메일</span>

              <input
                type="text"
                {...register('email')}
                placeholder="이메일"
                //이메일 같은 경우 카카오는 입력받아서 나머지는 받아온 이메일을 띄워줘야함 oauthprovider로 구분
                className="rounded-[0.625rem] border border-[#BDBDBD] py-[0.8rem] pl-4 text-[#616161]"
              />
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
                    className="w-[18.25rem] py-[0.8rem] pl-4 text-[#616161]"
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
                    {...register('phoneNum')}
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
                    VerifyNumberCheckResult === true
                      ? 'border-green-500'
                      : VerifyNumberCheckResult === false
                        ? 'animate-[var(--animate-shake)] border-red-500'
                        : 'border-[#BDBDBD]'
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
                {VerifyNumberCheckResult === true && (
                  <p className="mt-1 text-sm text-green-600">인증되었습니다</p>
                )}
                {VerifyNumberCheckResult === false && (
                  <p className="mt-1 text-sm text-red-600">인증번호가 일치하지 않습니다</p>
                )}
              </div>
            </div>
          </div>
          {getUserErrorMessage() && (
            <div className="my-4 h-[20px] text-center text-red-500">{getUserErrorMessage()}</div>
          )}
          <div className="absolute bottom-12 left-1/2 w-[25.5625rem] -translate-x-1/2 transform">
            <SignupBtn type="button" onClick={handleSubmit(onSubmit)}>
              다음
            </SignupBtn>
          </div>
        </div>
        {postModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div
              id="daum-postcode"
              className="relative flex h-[600px] w-[600px] items-center justify-center rounded-[0.625rem] bg-white shadow-lg"
            />
            <button
              onClick={() => setPostModalOpen(false)}
              className="absolute top-[16rem] right-[19.5rem] h-6 w-6 cursor-pointer rounded-full text-gray-500 hover:bg-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoStep;
