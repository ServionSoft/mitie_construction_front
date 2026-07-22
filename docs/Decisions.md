# Technical Decisions

Locked choices for **this** repository. Agents and contributors must follow these; do not “fix” the stack to match other templates.

## Locked decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Database | **PostgreSQL** | Production Render path; TypeORM postgres driver; local discrete `DB_*` vars or `DATABASE_URL` |
| ORM | **TypeORM** (Nest) | Already integrated; entities + `synchronize`; schema lives in `backend/server/src/**/entities` |
| Backend | **NestJS** in `backend/server` | Modular API; controllers under `/api/...` |
| Frontend | **React + Vite + Tailwind** in `frontend/` | Existing SPA; Vite proxies `/api` → `localhost:4000` |
| Auth | **JWT** (Passport) | `POST /api/auth/login` issues Bearer token; client stores in `localStorage` |
| Deploy | **Render** web service | Root `render.yaml`; `rootDir: backend/server` |

## Repo layout (do not reshape)

```text
mitie_construction_front/
├── frontend/          # React + Vite SPA (active UI)
├── backend/server/    # NestJS API (active backend)
├── backend/src/       # Legacy Express sketch — not the active API
├── backend/db/        # SQL seeds / reference (prefer *.pg.sql for Postgres)
└── docs/              # Project documentation
```

Leave historical root docs [`scope.md`](../scope.md) and [`development-plan.md`](../development-plan.md) at repo root.

## Rejected alternatives

| Alternative | Status | Reason |
|-------------|--------|--------|
| Next.js App Router (API routes / RSC rewrite) | **Rejected** | UI is a Vite SPA; API is Nest — do not migrate to Next |
| Prisma (`prisma/` schema + migrations as primary) | **Rejected** | Schema is TypeORM entities; do not introduce Prisma as source of truth |
| MySQL as primary DB for Nest | **Rejected** | Active path is PostgreSQL (Render + local) |
| Express under `backend/src` as active API | **Rejected** | Keep for reference only; all new endpoints go in Nest |
| Generic “tasks” table for project work | **Rejected** | Work breakdown is `project_stages` (+ budgets/progress) |

## Schema application note

Today TypeORM runs with `synchronize: true` (entities create/alter tables on startup). Production hardening should gate or replace synchronize with explicit migrations — tracked in [Phases.md](Phases.md) / [Tasks.md](Tasks.md). Until then, **do not** assume Prisma migrate or hand-edited MySQL dumps are the live schema.

## Related docs

- [Architecture.md](Architecture.md) — folders, flows, ER overview  
- [Database.md](Database.md) — entity/table reference  
- [API.md](API.md) — Nest endpoint inventory  
- [Rules.md](Rules.md) — coding standards  
