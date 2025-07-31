import type { RefObject } from 'react';

import { create } from 'zustand';

interface ScrollState {
  containerRef: RefObject<HTMLDivElement | null> | null;
  setContainerRef: (ref: RefObject<HTMLDivElement | null>) => void;
}

const useScrollStore = create<ScrollState>((set) => ({
  containerRef: null,
  setContainerRef: (ref) => set({ containerRef: ref }),
}));

export default useScrollStore;
