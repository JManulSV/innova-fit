# Innova-Fit Frontend (Next.js 16)

This is **Next.js 16** with the App Router, React 19, Tailwind CSS v4, and shadcn/ui v4. Do not assume older Next.js conventions. Check `node_modules/next/dist/docs/` if you are unsure about an API.

## Commands

- `npm run dev` — start dev server on `http://localhost:3000`.
- `npm run build` — production build.
- `npm run start` — run a previously built production bundle.
- `npm run lint` — runs `eslint` via `eslint-config-next` (core-web-vitals + typescript flat configs).

There are no `format`, `typecheck`, or `test` scripts configured in `package.json`.

## Architecture

- Entry point: `src/app/layout.tsx` wraps the app with `QueryProvider`, `ThemeProvider`, and `SessionProvider`.
- App routes live under `src/app/` (coach routes in `(coach)`, client routes in `(client)`, design-system demo page in `/design-system`, login in `/login`).
- Feature code is organized under `src/features/<domain>/` (auth, coach/clients, coach/exercises, coach/templates, client/*).
- Global state is in `src/stores/`. Auth state is non-persisted in-memory Zustand: `src/stores/auth-store.ts`.
- API client that points to Laravel uses `NEXT_PUBLIC_API_URL`: `src/lib/laravel-api.ts`.

## Backend coupling

- `NEXT_PUBLIC_API_URL` is defined in `frontend/.env` and currently points to `http://192.168.3.240:8000/api`.
- `next.config.ts` sets `allowedDevOrigins: ['192.168.3.240']` so the dev server can be accessed from that local network origin.
- Sanctum bearer tokens are sent by TanStack Query hooks in `src/features/auth/` and hydrated into the auth store by `src/providers/session-providers.tsx`.

## Styling / UI conventions

- Tailwind CSS v4 is configured via `@import "tailwindcss"` in `src/app/globals.css`. There is **no** `tailwind.config.ts/js`.
- Theme tokens (light/dark) are declared as CSS variables in `src/app/globals.css` and mapped inside `@theme inline`.
- shadcn/ui components are vendored under `src/components/ui/`. They are class-variance-authority primitives adapted for this project's theme tokens (see `components.json`).
- Use `lucide-react` for icons, Inter/Space Grotesk/JetBrains Mono via `next/font/google`.
- Alias imports use `@/*` → `src/*`.

## Common gotchas

- Session-gated routes rely on `SessionProvider` querying `/me`; the store starts with `isCheckingAuth: true`.
- There is no Prettier or test runner wired up yet; rely on `npm run lint` for static checks.
- When adding a shadcn-style primitive, place it in `src/components/ui/` and keep the project's CSS variable naming (`--color-*`, `--radius-*`).
- This package is not in a monorepo tool; dependencies are local to `frontend/`.

## Layout Components

Layout primitives are part of the design system.

Before creating new spacing, width, or typography utilities:
- Check existing layout components.
- Prefer extending Container, Page, or Stack.
- Avoid random Tailwind values across pages.
- Keep visual consistency between routes.

## Design System Documentation

Every reusable UI primitive must include documentation explaining:
- Its purpose.
- When to use it.
- When not to use it.
- Examples of correct usage.

Before creating a new layout component, verify if an existing primitive can solve the problem.