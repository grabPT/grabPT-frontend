import { create } from 'zustand';

import type {
  SignupNicknameStepDto,
  SignupProInfoStepDto,
  SignupUserAgreementDto,
  SignupUserInfoStepDto,
} from '@/features/Signup/types/Auth';
import type { SportsTypeStepDto } from '@/types/SportsTypeStepDto';

interface SignupState {
  userInfo: SignupUserInfoStepDto;
  proInfo: SignupProInfoStepDto;
  sportsTypeInfo: SportsTypeStepDto;
  nicknameInfo: SignupNicknameStepDto;
  username: string;
  oauthId: string;
  oauthProvider: string;
  role: number;
  agreementInfo: SignupUserAgreementDto;
  profileImageInfo: File | null;

  setUserInfo: (info: Partial<SignupUserInfoStepDto>) => void;
  setProInfo: (info: Partial<SignupProInfoStepDto>) => void;
  setSportsTypeInfo: (info: Partial<SportsTypeStepDto>) => void;
  setNicknameInfo: (info: Partial<SignupNicknameStepDto>) => void;
  setProfileImageInfo: (file: File | null) => void;
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
    getProfileImageInfo: () => File | null;
  }
>((set, get) => ({
  userInfo: {
    email: '',
    phoneNumber: '',
    address: { city: '', district: '', street: '', streetCode: '', zipcode: '', specAddress: '' },
  },
  proInfo: { centerName: '', career: null, gender: 1, age: null },
  sportsTypeInfo: { categoryId: 0 },
  nicknameInfo: { userNickname: '' },
  profileImageInfo: null,
  username: '',
  oauthId: '',
  oauthProvider: '',
  role: 0,
  agreementInfo: { agreedTermsIds: [], isAgreeMarketing: false },

  setUserInfo: (info) => set((state) => ({ userInfo: { ...state.userInfo, ...info } })),
  setProInfo: (info) => set((state) => ({ proInfo: { ...state.proInfo, ...info } })),
  setSportsTypeInfo: (info) =>
    set((state) => ({ sportsTypeInfo: { ...state.sportsTypeInfo, ...info } })),
  setNicknameInfo: (info) => set((state) => ({ nicknameInfo: { ...state.nicknameInfo, ...info } })),
  setProfileImageInfo: (info) => set(() => ({ profileImageInfo: info })),
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
        phoneNumber: '',
        address: {
          city: '',
          district: '',
          street: '',
          streetCode: '',
          zipcode: '',
          specAddress: '',
        },
      },
      proInfo: { centerName: '', career: null, gender: 1, age: null },
      sportsTypeInfo: { categoryId: 0 },
      nicknameInfo: { userNickname: '' },
      profileImageInfo: null,
      username: '',
      oauthId: '',
      oauthProvider: '',
      role: 0,
      agreementInfo: { agreedTermsIds: [], isAgreeMarketing: false },
    }),
  getUserSignupDto: () => {
    const state = get();
    return {
      userName: state.username,
      oauthId: state.oauthId,
      oauthProvider: state.oauthProvider,
      role: state.role,
      categoryId: state.sportsTypeInfo.categoryId,
      email: state.userInfo.email,
      phoneNumber: state.userInfo.phoneNumber,
      address: state.userInfo.address,
      userNickname: state.nicknameInfo.userNickname,
      agreedTermsIds: state.agreementInfo.agreedTermsIds,
      isAgreeMarketing: state.agreementInfo.isAgreeMarketing,
    };
  },
  getProfileImageInfo: () => {
    const state = get();
    return state.profileImageInfo;
  },
  getProSignupDto: () => {
    const state = get();
    return {
      userName: state.username,
      oauthId: state.oauthId,
      oauthProvider: state.oauthProvider,
      role: state.role,
      categoryId: state.sportsTypeInfo.categoryId,
      email: state.userInfo.email,
      phoneNumber: state.userInfo.phoneNumber,
      address: state.userInfo.address,
      userNickname: state.nicknameInfo.userNickname,
      agreedTermsIds: state.agreementInfo.agreedTermsIds,
      isAgreeMarketing: state.agreementInfo.isAgreeMarketing,
      // 전문가 추가 정보
      age: state.proInfo.age,
      gender: state.proInfo.gender,
      centerName: state.proInfo.centerName,
      career: state.proInfo.career,
    };
  },
}));
