import { create } from 'zustand';

import type {
  SignupNicknameStepDto,
  SignupProInfoStepDto,
  SignupSportsTypeStepDto,
  SignupUserAgreementDto,
  SignupUserInfoStepDto,
} from '@/features/Signup/types/Auth';

interface SignupState {
  userInfo: SignupUserInfoStepDto;
  proInfo: SignupProInfoStepDto;
  sportsTypeInfo: SignupSportsTypeStepDto;
  nicknameInfo: SignupNicknameStepDto;
  username: string;
  oauthId: string;
  oauthProvider: string;
  role: number;
  agreementInfo: SignupUserAgreementDto;

  setUserInfo: (info: Partial<SignupUserInfoStepDto>) => void;
  setProInfo: (info: Partial<SignupProInfoStepDto>) => void;
  setSportsTypeInfo: (info: Partial<SignupSportsTypeStepDto>) => void;
  setNicknameInfo: (info: Partial<SignupNicknameStepDto>) => void;
  setUserName: (info: string) => void;
  setOauthId: (info: string) => void;
  setOauthProvider: (info: string) => void;
  setRole: (info: number) => void;
  setAgreementInfo: (info: Partial<SignupUserAgreementDto>) => void;
  reset: () => void;
}

export const useSignupStore = create<
  SignupState & {
    getUserSignupDto: () => any;
    getProSignupDto: () => any;
  }
>((set, get) => ({
  userInfo: {
    email: 'kkim02@gmail.com',
    phoneNum: '',
    address: { city: '', district: '', street: '', streetCode: '', zipcode: '', specAddress: '' },
  },
  proInfo: { center: '', career: null, gender: 1, age: null },
  sportsTypeInfo: { categoryId: 0 },
  nicknameInfo: { nickname: '', profileImageUrl: '' },
  username: '김갱주',
  oauthId: 'abcd1234',
  oauthProvider: 'kakao',
  role: 0,
  agreementInfo: { agreedTermsId: [], agreeMarketing: false },

  setUserInfo: (info) => set((state) => ({ userInfo: { ...state.userInfo, ...info } })),
  setProInfo: (info) => set((state) => ({ proInfo: { ...state.proInfo, ...info } })),
  setSportsTypeInfo: (info) =>
    set((state) => ({ sportsTypeInfo: { ...state.sportsTypeInfo, ...info } })),
  setNicknameInfo: (info) => set((state) => ({ nicknameInfo: { ...state.nicknameInfo, ...info } })),
  setUserName: (info) => set(() => ({ username: info })),
  setOauthId: (info) => set(() => ({ oauthId: info })),
  setOauthProvider: (info) => set(() => ({ oauthProvider: info })),
  setRole: (info) => set(() => ({ role: info })),
  setAgreementInfo: (info) =>
    set((state) => ({ agreementInfo: { ...state.agreementInfo, ...info } })),
  reset: () =>
    set({
      userInfo: {
        email: '',
        phoneNum: '',
        address: {
          city: '',
          district: '',
          street: '',
          streetCode: '',
          zipcode: '',
          specAddress: '',
        },
      },
      proInfo: { center: '', career: null, gender: 1, age: null },
      sportsTypeInfo: { categoryId: 0 },
      nicknameInfo: { nickname: '', profileImageUrl: '' },
      username: '',
      oauthId: '',
      oauthProvider: '',
      role: 0,
      agreementInfo: { agreedTermsId: [], agreeMarketing: false },
    }),
  getUserSignupDto: () => {
    const state = get();
    return {
      username: state.username,
      oauthId: state.oauthId,
      oauthProvider: state.oauthProvider,
      role: state.role,
      categoryId: state.sportsTypeInfo.categoryId,
      email: state.userInfo.email,
      phoneNum: state.userInfo.phoneNum,
      address: state.userInfo.address,
      nickname: state.nicknameInfo.nickname,
      profileImageUrl: state.nicknameInfo.profileImageUrl,
      agreedTermsIds: state.agreementInfo.agreedTermsId,
      agreeMarketing: state.agreementInfo.agreeMarketing,
    };
  },
  getProSignupDto: () => {
    const state = get();
    return {
      username: state.username,
      oauthId: state.oauthId,
      oauthProvider: state.oauthProvider,
      role: state.role,
      categoryId: state.sportsTypeInfo.categoryId,
      email: state.userInfo.email,
      phoneNum: state.userInfo.phoneNum,
      address: state.userInfo.address,
      nickname: state.nicknameInfo.nickname,
      profileImageUrl: state.nicknameInfo.profileImageUrl,
      agreedTermsIds: state.agreementInfo.agreedTermsId,
      agreeMarketing: state.agreementInfo.agreeMarketing,
      // 전문가 추가 정보
      age: state.proInfo.age,
      gender: state.proInfo.gender,
      center: state.proInfo.center,
      career: state.proInfo.career,
    };
  },
}));
