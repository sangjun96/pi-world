# @pi-world/web (PixiJS + Vite)

PixiJS v8 및 TypeScript 기반의 2D 렌더링 프론트엔드 클라이언트입니다.

## Development
```bash
bun run dev
```
개발 서버는 `http://localhost:5173`에서 실행되며, `/api` 및 `/ws` 요청은 백엔드 Elysia 서버(`http://localhost:3000`)로 자동 프록시됩니다.

## Build
```bash
bun run build
```
`dist/` 디렉토리에 번들링된 정적 파일이 생성됩니다.
