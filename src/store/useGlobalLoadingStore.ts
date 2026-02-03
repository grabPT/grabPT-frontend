import { create } from 'zustand';

interface GlobalLoadingState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const useGlobalLoadingStore = create<GlobalLoadingState>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));
