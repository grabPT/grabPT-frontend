# copilot-instructions for grabPT

목적: 이 파일은 AI 코딩 에이전트가 이 저장소에서 바로 생산적일 수 있도록, 프로젝트 구조·패턴·중요 파일과 개발 워크플로우를 요약합니다.

- **빠른 시작**:
  - 의존성 설치: `pnpm install` (프로젝트에 `pnpm-lock.yaml` 있음)
  - 개발 서버: `pnpm dev` (Vite)
  - 빌드: `pnpm build` (내부: `tsc -b && vite build`)
  - 린트: `pnpm lint`

- **아키텍처 핵심**:
  - Vite + React + TypeScript 프론트엔드. 진입점: `src/main.tsx` (React Query Provider 포함).
  - 데이터 패칭: `@tanstack/react-query` 사용 (전역 `QueryClient`). React Query Devtools가 포함되어 있어 런타임에서 쿼리 상태를 확인하세요.
  - HTTP 레이어: 전역 axios 인스턴스는 `src/libs/axios.ts`에 집중( `publicInstance`, `privateInstance`, `multipartInstance` ). 인터셉터에서 토큰 리프레시 흐름과 큐 처리를 구현합니다 — 인증 관련 로직은 특히 이 파일을 먼저 확인하세요.
  - API 함수: 전역 API 호출은 `src/apis/*`에 위치. 도메인별 API는 `features/{feature}/api`에도 존재합니다.
  - 도메인 구조: `src/features/{feature}/` 안에 `api/`, `components/`, `hooks/`, `store/`, `schemas/`, `types/` 가 통일된 패턴입니다 (참조: README.md의 디렉터리 규칙).

- **인증·토큰 정책(중요)**:
  - `privateInstance`는 기본적으로 `withCredentials: true`이나 개발/스테이징 환경에서는 `withCredentials`를 `false`로 덮어씁니다.
  - 리프레시 흐름은 `src/libs/axios.ts`의 `attachAuthInterceptors`와 `refreshSession`(utils)에 의존합니다. 에러 401 처리, 큐 대기 및 재시도 패턴을 이해해야 안전한 수정이 가능합니다.
  - Axios 요청 구성에 `skipAuth?: boolean`와 `_retry?: boolean` 확장이 사용됩니다.

- **실시간 통신**:
  - 의존성에 `@stomp/stompjs`와 `sockjs-client`가 있어 STOMP/SockJS 기반 실시간 기능이 구현되어 있습니다. 관련 로직은 `src/features/*/` 또는 `src/apis/getRealtimeMatching.ts` 같은 파일을 찾아보세요.

- **컨벤션 & 코드 스타일**:
  - 컴포넌트: 파일당 하나의 기본(default) 컴포넌트, `const Name = () => {}` 형식, Props 타입은 `interface NameProps`.
  - 커밋/브랜치/PR 규칙은 루트의 `README.md`에 상세히 정의되어 있습니다(커밋 메시지 형식, 브랜치 네이밍 등).

- **디버깅 팁 (프로젝트 특화)**:
  - 네트워크/인증 문제는 먼저 `src/libs/axios.ts`의 콘솔 로그(많이 남김)를 확인하세요 — 인터셉터에 디버깅 로그가 활성화되어 있습니다.
  - React Query 관련 문제는 `src/main.tsx`에 포함된 `ReactQueryDevtools`로 쿼리 상태를 살펴보세요.
  - 환경 변수: API URL과 스테이지 플래그는 `import.meta.env.VITE_SERVER_API_URL` 및 `VITE_STAGE`를 사용합니다.

- **코드 변경 시 주의점**:
  - 인증/토큰/인터셉터 변경은 전체 앱의 API 통신에 영향을 줍니다. 작은 수정도 리프레시 큐 동작을 깨뜨릴 수 있으니 단위 검증(개발 서버에서 여러 요청 동시 수행)을 권장합니다.
  - `features` 내부의 도메인 경계는 엄격하므로 공통 로직은 `src/apis` 또는 `src/libs`로 추출하세요.

- **참조 예시 파일(빠른 링크)**:
  - 진입/쿼리: [src/main.tsx](src/main.tsx)
  - axios/인증: [src/libs/axios.ts](src/libs/axios.ts)
  - 프로젝트 가이드: [README.md](README.md)

질문: 이 문서에서 더 상세히 다루고 싶은 파일이나 패턴이 있나요? 원하시면 특정 파일(예: 특정 `feature` 폴더)을 우선 반영해 확장하겠습니다.
