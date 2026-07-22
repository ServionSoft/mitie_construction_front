# Project Memory

Diary for agents and developers. Update this file at the end of every development session.

## Completed

- P1 deepen: auto-post journals on expense create / sale create / installment pay (`EXP-*`, `SALE-*`, `PMT-*`); transactional with ops rows
- P1 deepen: JWT + RolesGuard on accounting POST/PATCH (`Admin`, `Owner / Director`, `Accountant`); `JWT_SECRET` env with local fallback
- Encoded commercial priorities P1–P5 into docs (Tasks source of truth; Phases 9–11; PRD/Rules/Memory/scope/README pointers)
- Docs relocated to `docs/`; added Decisions, Database, API, Tasks + index
- README corrected for NestJS + PostgreSQL; local `.env` + dotenv in Nest `main.ts`
- Nest watch/`dist` stability (`deleteOutDir: false`); TypeScript `include`/`exclude` for `src` vs `test`
- ESLint ignore for `dist/**`
- Postgres mock seed: `backend/db/seed-mock-projects.pg.sql` (4 `[MOCK]` projects + stages + budgets)
- Land Registry module + `LandPage` + Land Purchase expense category
- Material Request trail: create → submit → approve/reject → convert to PO; PO/item FKs
- Goods receipt API writes stock ledger in one call
- Accounting: JE Post; Trial Balance (posted); General Ledger; Balance Sheet
- Bank reconciliation: bank accounts, statement lines, periods + Accounting UI tabs

## In Progress

- Local verification of auto-post JEs and accounting write 401/403 by role

**Current focus:** P2 deepen next (multi-level MR approvals) per [Tasks.md](Tasks.md).

## Pending

Commercial order ([Tasks.md](Tasks.md)):

1. **P2 deepen** — Multi-level MR approvals / notifications
2. **P3** — BOQ (Bill of Quantities)
3. **P4** — Equipment & machinery (registry, fuel, maintenance)
4. **P5** — Document management (drawings, contracts, NOCs, approvals, photos + blob upload)

Parallel (do not block P3+):

- Harden RBAC / JWT guards on remaining mutating endpoints (beyond accounting)
- Production migration strategy (gate `synchronize`)

## Last update

22 July 2026

## Session ritual

When a development session ends, update this file:

1. Move finished work into **Completed** (short bullets).
2. Set **In Progress** to the single current task (and file path if useful).
3. Refresh **Pending** to match [Tasks.md](Tasks.md) commercial P1–P5 (drop done items; add new blockers).
4. Tick matching boxes in [Tasks.md](Tasks.md) and [Phases.md](Phases.md).
5. If entities or Nest controllers changed, update [Database.md](Database.md) and/or [API.md](API.md).
6. Set **Last update** to today’s date.
