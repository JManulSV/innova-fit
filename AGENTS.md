# Innova-Fit Workspace Notes

- Workspace layout:
  - `backend/` is a Laravel 12 API with Sanctum, Vite, and PHP tests.
  - `frontend/` is a Next.js 16 app with the App Router, React 19, Tailwind v4, shadcn/ui, TanStack Query, Zustand, and React Hook Form + Zod.
  - `mobile/` is an Expo 54 app with expo-router, NativeWind, and zustand. **Mobile development is currently paused — do not work on or modify this package unless explicitly asked.**
  - `docker/development/` only wires `backend/` and `frontend/`; mobile is not part of that compose setup.

- Use the package-local `AGENTS.md` files when you work inside `frontend/` or `mobile/`.

- Commands that matter:
  - Frontend: `npm run dev`, `npm run build`, `npm run lint`.
  - Backend: `composer run dev`, `composer run test`, `composer run setup`.
  - Mobile is paused; commands are listed only for reference: `npm run start`, `npm run android`, `npm run ios`, `npm run web`, `npm run lint`.

- Backend specifics:
  - `composer run dev` starts Laravel, queue listening, logs, and Vite together.
  - `composer run test` clears config then runs `php artisan test`.
  - `composer run setup` installs PHP and JS deps, creates `.env`, generates the app key, migrates, and builds assets.
  - Tests run against in-memory SQLite via `backend/phpunit.xml`.
  - The committed `backend/.env` points at Postgres on host `postgres`, database `innova_fit`.

- Frontend specifics:
  - `frontend/next.config.ts` allows dev origin `192.168.3.240`.
  - `frontend/src/lib/laravel-api.ts` uses `NEXT_PUBLIC_API_URL`; `frontend/.env` currently points at `http://192.168.3.240:8000/api`.
  - Tailwind is v4 and comes from `@import "tailwindcss"`; there is no separate `tailwind.config` here.
  - UI primitives are vendored under `frontend/src/components/ui/`.

- Mobile specifics:
  - NativeWind is wired through `mobile/babel.config.js` and `mobile/metro.config.js`.
  - `mobile/tailwind.config.js` must keep its content globs in sync with where class names live.
  - Auth state is persisted in `mobile/src/store/authStore.ts`.

- Docker/dev setup:
  - `docker/development/docker-compose.yml` expects an external network named `innova-network`.
  - Backend and frontend containers install dependencies on startup; keep that in mind when diagnosing slow boots.

- When changing code, prefer the smallest verified edit and follow the repo's existing style in the touched package.
