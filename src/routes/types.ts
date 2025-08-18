import type { ReactNode } from 'react';

// routes/types.ts
export type Role = 'GUEST' | 'USER' | 'EXPERT';

export interface AppRoute {
  path?: string;
  index?: boolean;
  element?: ReactNode;
  errorElement?: ReactNode;
  roles?: Role[];
  guestOnly?: boolean;
  children?: AppRoute[]; // 중첩 라우트
}
