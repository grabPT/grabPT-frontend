import { create } from 'zustand';

import type {
  SignupNicknameStepDto,
  SignupProInfoStepDto,
  SignupUserAgreementDto,
  SignupUserInfoStepDto,
  SocialLoginInfo,
} from '@/features/Signup/types/Auth';
import type { SportsTypeStepDto } from '@/types/SportsTypeStepDto';

interface SignupState {
  userInfo: SignupUserInfoStepDto;
  proInfo: SignupProInfoStepDto;
  sportsTypeInfo: SportsTypeStepDto;
  nicknameInfo: SignupNicknameStepDto;
  socialLoginInfo: SocialLoginInfo;
  role: number;
  agreementInfo: SignupUserAgreementDto;
  profileImageInfo: File | null;

  setUserInfo: (info: Partial<SignupUserInfoStepDto>) => void;
  setProInfo: (info: Partial<SignupProInfoStepDto>) => void;
  setSportsTypeInfo: (info: Partial<SportsTypeStepDto>) => void;
  setNicknameInfo: (info: Partial<SignupNicknameStepDto>) => void;
  setProfileImageInfo: (file: File | null) => void;
  setSocialLoginInfo: (info: SocialLoginInfo) => void;
  setRole: (info: number) => void;
  setAgreementInfo: (info: Partial<SignupUserAgreementDto>) => void;
  reset: () => void;
}

export const useSignupStore = create<
  SignupState & {
    getUserSignupDto: () => any;
    getProSignupDto: () => any;
    getProfileImageInfo: () => File | null;
  }
>((set, get) => ({
  userInfo: {
    email: '',
    phoneNum: '',
    address: { city: '', district: '', street: '', streetCode: '', zipcode: '', specAddress: '' },
  },
  proInfo: { center: '', career: null, gender: 1, age: null },
  sportsTypeInfo: { categoryId: 0 },
  nicknameInfo: { nickname: '' },
  profileImageInfo: null,
  socialLoginInfo: { username: '', oauthId: '', oauthProvider: '', email: null },
  role: 0,
  agreementInfo: { agreedTermsId: [], agreeMarketing: false },

  setUserInfo: (info) => set((state) => ({ userInfo: { ...state.userInfo, ...info } })),
  setProInfo: (info) => set((state) => ({ proInfo: { ...state.proInfo, ...info } })),
  setSportsTypeInfo: (info) =>
    set((state) => ({ sportsTypeInfo: { ...state.sportsTypeInfo, ...info } })),
  setNicknameInfo: (info) => set((state) => ({ nicknameInfo: { ...state.nicknameInfo, ...info } })),
  setProfileImageInfo: (info) => set(() => ({ profileImageInfo: info })),
  setSocialLoginInfo: (info) =>
    set((state) => ({ socialLoginInfo: { ...state.socialLoginInfo, ...info } })),
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
      nicknameInfo: { nickname: '' },
      profileImageInfo: null,
      socialLoginInfo: {
        username: '',
        oauthId: '',
        oauthProvider: '',
        email: null,
      },
      role: 0,
      agreementInfo: { agreedTermsId: [], agreeMarketing: false },
    }),
  getUserSignupDto: () => {
    const state = get();
    return {
      username: state.socialLoginInfo.username,
      oauthId: state.socialLoginInfo.oauthId,
      oauthProvider: state.socialLoginInfo.oauthProvider,
      role: state.role,
      categoryId: state.sportsTypeInfo.categoryId,
      email: state.userInfo.email,
      phoneNum: state.userInfo.phoneNum,
      address: state.userInfo.address,
      nickname: state.nicknameInfo.nickname,
      agreedTermsIds: state.agreementInfo.agreedTermsId,
      agreeMarketing: state.agreementInfo.agreeMarketing,
    };
  },
  getProfileImageInfo: () => {
    const state = get();
    return state.profileImageInfo;
  },
  getProSignupDto: () => {
    const state = get();
    return {
      username: state.socialLoginInfo.username,
      oauthId: state.socialLoginInfo.oauthId,
      oauthProvider: state.socialLoginInfo.oauthProvider,
      role: state.role,
      categoryId: state.sportsTypeInfo.categoryId,
      email: state.userInfo.email,
      phoneNum: state.userInfo.phoneNum,
      address: state.userInfo.address,
      nickname: state.nicknameInfo.nickname,
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
