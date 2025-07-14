# grabPT

## 📁 디렉터리 구조 규칙

```text
src/
├── apis/               # 전역 axios 요청 함수 (공통 API)
├── assets/             # 이미지, 폰트 등 정적 자산
├── components/         # 전역 재사용 UI 컴포넌트
├── constants/          # 상수 (queryKeys, enums, endpoints 등)
├── features/           # 기능(도메인) 단위 폴더
│   └── {feature}/
│       ├── api/        # 해당 도메인 내부 API 함수
│       ├── components/ # 해당 도메인 전용 컴포넌트
│       ├── hooks/      # 해당 도메인 전용 커스텀 훅
│       ├── store/      # 해당 도메인 전용 상태관리
│       ├── schemas/    # zod 스키마 등 유효성 검증
│       ├── types/      # 해당 도메인 전용 타입
│       └── index.ts    # 엔트리 포인트
├── hooks/              # 전역 커스텀 훅
├── libs/               # axios 인스턴스 등 외부 라이브러리 래핑
├── pages/              # 라우트 진입점 컴포넌트
├── schemas/            # 전역 유효성 검사 스키마
├── store/              # 전역 상태 (auth 등)
├── types/              # 전역 타입 (공통)
└── utils/              # 순수 함수 유틸
```

---

## 📝 커밋 컨벤션

### ✅ 형식

```text
<type>(scope?): <description>
```

### ✅ 커밋 타입 목록

| type     | 설명                           | 예시                               |
| -------- | ------------------------------ | ---------------------------------- |
| feat     | 새로운 기능 추가               | feat(login): 이메일 로그인 구현    |
| fix      | 버그 수정                      | fix(login): 에러 메시지 수정       |
| docs     | 문서 관련 변경                 | docs(readme): 환경설정 문서 추가   |
| style    | 코드 스타일 수정 (로직 변화 X) | style: 세미콜론 제거               |
| refactor | 리팩터링 (기능 변경 없음)      | refactor(modal): 조건문 간결화     |
| perf     | 성능 개선                      | perf(list): 렌더링 최적화          |
| test     | 테스트 코드 추가·수정          | test(auth): useLogin 테스트 추가   |
| build    | 빌드 설정 변경                 | build: Vite 플러그인 설정 수정     |
| ci       | CI 설정 변경                   | ci: GitHub Actions 워크플로우 수정 |
| chore    | 기타 작업                      | chore: 패키지 업데이트             |
| revert   | 이전 커밋 되돌리기             | revert: useLogin 커밋 롤백         |

### ✅ 예시

```bash
git commit -m 'feat(login): 이메일 로그인 추가'
git commit -m 'fix(header): 로고 클릭 시 이동 오류 수정'
git commit -m 'docs(readme): 환경설정 문서 추가'
git commit -m 'style: 불필요한 세미콜론 제거'
git commit -m 'refactor(modal): 중복 로직 제거'
git commit -m 'test(auth): useLogin 테스트 추가'
git commit -m 'build: Vite 플러그인 설정 추가'
git commit -m 'ci: 배포 자동화 스크립트 수정'
git commit -m 'chore: 불필요한 console.log 제거'
git commit -m 'revert: useDebounce 커밋 되돌림'
```

---

## 🌿 브랜치 네이밍 컨벤션

```text
type/작업-또는-도메인명
```

| 타입     | 설명      | 예시                      |
| -------- | --------- | ------------------------- |
| feature  | 신규 기능 | feature/회원가입-ui       |
| fix      | 버그 수정 | fix/로그인-버튼-중복클릭  |
| refactor | 리팩터링  | refactor/lpApi-에러핸들링 |
| chore    | 설정·환경 | chore/eslint-rule-추가    |
| docs     | 문서      | docs/readme-초기설정      |

> ⚠️ 모든 브랜치는 `main`에서 파생합니다.

---

## 🚀 PR 컨벤션

### ✅ 제목 형식

```text
<type>(scope?): <description>
```

### ✅ 예시

- `feat(login): 이메일 로그인 기능 구현`
- `fix(header): 로고 클릭 시 라우팅 오류 수정`
- `refactor(modal): 로직 중복 제거`
- `chore(deps): axios 버전 업데이트`

### ✅ 기타 규칙

- `main` 브랜치에서 브랜치를 파생 후 작업
- PR 브랜치명은 브랜치 컨벤션 준수
- `main` 브랜치로 직접 커밋 금지
- 리뷰 승인 후 머지

---

## 🖥️ React 컴포넌트 작성 규칙

1. **컴포넌트 선언**: `const 컴포넌트명 = () => { ... }` 형태로 정의하고, 파일 하단에서 `export default 컴포넌트명;`으로 기본 내보내기를 합니다.
2. **Props 인터페이스 네이밍**: 컴포넌트 Props는 `interface 컴포넌트명Props { ... }` 로 선언합니다.
3. **약어 사용 금지**: `Btn`, `Img`와 같은 축약어 사용을 지양하고, `Button`, `Image`처럼 전체 단어를 사용합니다.
4. **파일 당 하나의 기본 컴포넌트**: 한 파일에는 하나의 컴포넌트를 기본(export default)으로 두어 가독성을 높입니다.
5. **타입은 features 폴더에**: 타입은 `export type = {}`로 선언하고 `features/types`에 저장합니다.
6. **페이지는 pages 폴더에**: 페이지 컴포넌트 `페이지명.tsx`로 선언하고 `src/pages`에 저장합니다.
