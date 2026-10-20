# @pi-world/server (Elysia + Bun)

Bun 런타임 기반의 고성능 Elysia 백엔드 서버입니다.

## Development
```bash
bun run dev
```
개발 서버는 `http://localhost:3000`에서 실행됩니다.

## Build
```bash
bun run build
```

## Start (Production)
```bash
bun run start
```
`apps/web/dist`가 빌드되어 있는 경우, 프론트엔드 정적 파일과 백엔드 API를 `http://localhost:3000`에서 통합 서빙합니다.
