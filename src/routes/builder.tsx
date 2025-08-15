// routes/builder.tsx
import type { RouteObject } from 'react-router-dom';

import { Guard } from '@/routes/guard';

import type { AppRoute } from '../types/Role';

/**
 * 규칙:
 * - roles/guestOnly가 있으면 해당 노드를 "가드 부모"로 승격:
 *   parent.element = <Guard .../>, parent.children = [원본 노드]
 * - index 라우트는 path/children 없이 { index: true, element } 형태여야 함
 * - non-index 라우트는 { path, element, children? } 형태여야 함
 */
export function buildRoutes(routes: AppRoute[]): RouteObject[] {
  return routes.map((r): RouteObject => {
    const hasGuard = !!(r.roles || r.guestOnly);

    // 1) 먼저 원본 RouteObject를 index/non-index에 따라 올바른 형태로 만든다
    let original: RouteObject;
    if (r.index) {
      // IndexRouteObject: path/children을 설정하면 타입 에러이므로 넣지 않는다
      original = {
        index: true,
        element: r.element,
      };
    } else {
      original = {
        path: r.path,
        element: r.element,
        children: r.children ? buildRoutes(r.children) : undefined,
      };
    }

    // 2) 가드가 없으면 그대로 반환
    if (!hasGuard) return original;

    // 3) 가드 부모로 감싸서 반환
    const parent: RouteObject = {
      element: <Guard allow={r.roles} guestOnly={r.guestOnly} />,
      children: [original],
    };
    return parent;
  });
}
