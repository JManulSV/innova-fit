# Innova-Fit Backend (Laravel 12)

PHP 8.2+ API built with Laravel 12, Sanctum bearer-token auth, and Vite + Tailwind CSS v4 for vendored frontend assets. This package lives next to `frontend/` and `mobile/`, but it has no monorepo tooling; dependencies are local to `backend/`.

## Commands

- `composer run dev` — launches Laravel server, queue worker, pail logs, and Vite via `concurrently`. All four processes are killed together on exit.
- `composer run test` — runs `php artisan config:clear` then `php artisan test`.
- `composer run setup` — fresh-install bootstrap: `composer install`, create `.env` from `.env.example`, generate app key, run migrations, `npm install`, `npm run build`.
- `php artisan migrate` — run migrations.
- `php artisan db:seed` — run seeders; in `local` environment this also runs `DevelopmentSeeder`.
- `php artisan serve --host=0.0.0.0` — useful when running inside Docker.

## Environment

- PHP: ^8.2. Required extensions in the dev Docker image include pdo, pdo_pgsql, pgsql, bcmath, zip, exif, pcntl.
- The committed `backend/.env` targets PostgreSQL on host `postgres`, database `innova_fit`, as used by the Docker setup.
- `backend/.env.example` defaults to SQLite; use it as a starting point for non-Docker local setups.
- Run `php artisan key:generate` if `.env` has no `APP_KEY`.

## Testing

- Tests are under `tests/{Unit,Feature}` and use PHPUnit 11.
- `phpunit.xml` forces an in-memory SQLite database (`DB_CONNECTION=sqlite`, `DB_DATABASE=:memory:`), so tests do not depend on Postgres.
- `composer run test` clears config first to avoid stale cached config in CI.

## Auth & API

- Bearer-token authentication via Laravel Sanctum (`config/sanctum.php`).
- API routes live in `routes/api.php`.
- Public endpoints: `POST /register`, `POST /login`.
- Authenticated routes require a Sanctum token. `GET /me` returns the current user.
- Coach-only endpoints use the custom `role:coach` middleware aliased in `bootstrap/app.php` via `RoleMiddleware`.
- The `User` model uses a self-referential `coach_id` to relate coaches to clients (`user->clients()`, `user->coach()`).

## Domain overview

Core resources exposed through the API:

- `users` with `role` (`coach` | `client`) and optional `coach_id`.
- `exercises` owned by a coach; support soft deletes.
- `workout_day_templates` and their pivot `workout_day_template_exercises`.
- `assigned_workouts` assigned to clients from a template.
- `assigned_workout_exercises` with sets, reps, rest, and weight.
- `workout_exercise_logs` for completed sets/reps/weight.

Migrations are in `database/migrations/`; factories and seeders are in `database/{factories,seeders}/`.

## Frontend assets

- Vite config is in `vite.config.js`.
- Tailwind CSS v4 is imported from `resources/css/app.css` via `@import 'tailwindcss'`.
- Vite is mainly used to build Tailwind CSS; the API is the actual product surface.

## Common gotchas

- `composer run dev` starts four processes; a failure in one may stop the others due to `--kill-others`.
- The Docker setup installs dependencies on every container start; cold starts are slow.
- Queues, sessions, and cache are configured to use the database by default (`QUEUE_CONNECTION=database`, `SESSION_DRIVER=database`, `CACHE_STORE=database`), so migrate before running queues.
- `DatabaseSeeder` only creates a `test@example.com` user in non-local environments; run seeders in `local` to get the richer `DevelopmentSeeder` data.
