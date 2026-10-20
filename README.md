# Pi World

Bun 모노레포 기반의 **Elysia 백엔드 서버**와 **PixiJS v8 + TypeScript 프론트엔드 클라이언트** 프로젝트입니다.

## Workspace Architecture

```text
pi-world/
├── apps/
│   ├── server/             # Elysia 백엔드 API & WebSocket 서버 (Bun)
│   └── web/                # PixiJS + TypeScript 클라이언트 (Vite)
├── packages/               # 공용 패키지 디렉토리
├── package.json            # 루트 모노레포 설정 및 통합 스크립트
└── tsconfig.json           # 루트 공용 TypeScript 설정
```

## Getting Started

### 1. 의존성 설치
```bash
bun install
```

### 2. 개발 모드 (Dev)
서버와 클라이언트를 동시에 병렬로 실행합니다:
```bash
bun run dev
```
- **Web Client**: `http://localhost:5173` (Vite HMR)
- **Elysia Server**: `http://localhost:3000` (Bun Watch)
- Vite 프록시가 설정되어 있어 클라이언트에서 `/api` 및 `/ws` 요청이 백엔드로 자동 전달됩니다.

개별 실행:
```bash
bun run dev:server    # Elysia 서버만 실행
bun run dev:web       # PixiJS 클라이언트만 실행
```

### 3. 빌드 (Build)
웹 클라이언트(Vite 번들)와 서버(Bun 번들)를 모두 빌드합니다:
```bash
bun run build
```

개별 빌드:
```bash
bun run build:web
bun run build:server
```

### 4. 프로덕션 실행 (Start)
프로덕션 서버를 실행합니다. Elysia가 빌드된 웹 클라이언트(`apps/web/dist`)와 백엔드 API를 `http://localhost:3000`에서 통합 서빙합니다:
```bash
bun run start
```

개별 실행:
```bash
bun run start:server
bun run start:web
```

### 5. 코드 점검 & 타입 검사
```bash
bun run typecheck     # TypeScript 타입 검사 (tsc --noEmit)
bun run check         # Biome 린터 및 포맷 검사
bun run check:fix     # Biome 자동 수정
```
