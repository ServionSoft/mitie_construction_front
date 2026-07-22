# Construction ERP System

Enterprise Resource Planning (ERP) for construction-to-sale property businesses. Covers land purchase through construction, supplier payments, cashflow, property sales, and profit calculation in one platform.

## Overview

Lifecycle flow:

Land Purchase → Construction Stages → Supplier & Labour Payments → Cashflow → Property Sales → Profit Calculation

**Key benefits:**

- Real-time project progress tracking
- Cost control across stages and categories
- Supplier and labour management
- Cashflow monitoring
- Property and sales inventory
- Automated profit calculation

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React + TypeScript + Vite + Tailwind CSS |
| **Backend (active API)** | NestJS + TypeORM + JWT |
| **Database** | PostgreSQL |
| **Deployment** | Render (`render.yaml`) |

> Note: `backend/src` still contains an older Express + MySQL sketch, and `backend/db/*.sql` is MySQL-oriented. The running API used locally and on Render is **NestJS** under `backend/server` with **PostgreSQL**.

---

## Project Structure

```text
mitie_construction_front/
├── frontend/                 # React + Vite app
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts        # Proxies /api → http://localhost:4000
│   └── tailwind.config.js
├── backend/
│   ├── server/               # NestJS API (active)
│   │   ├── src/              # Modules: auth, users, projects, inventory, etc.
│   │   ├── package.json
│   │   └── nest-cli.json
│   ├── src/                  # Legacy Express entry (optional)
│   ├── db/                   # Reference SQL / seed scripts
│   └── package.json          # Proxies npm scripts to backend/server
├── development-plan.md
├── scope.md
├── render.yaml
└── README.md
```

---

## Core Modules

### 1. User Management

- 9 roles: Admin, Owner/Director, Project Manager, Site Engineer, Procurement Officer, Accountant, Sales Manager, Store Keeper, Supervisor
- Role-based access control (RBAC)
- User create/edit and activate/deactivate

### 2. Project Management

- Project status: Planning, Active, On Hold, Completed, Sold
- Stage-wise budget and cost tracking
- Location, plot size, and timeline

### 3. Construction Stages

Example stages: Land Purchase, Design, Excavation, Foundation, Structure, Masonry, Plumbing, Electrical, Plaster, Flooring, Paint, Fixtures, External Works, Inspection, Ready for Sale

Per-stage: budget vs actual, labour/material/equipment/overhead, dates, completion %

### 4. Material & Inventory Management — Phase 6 complete

- Material catalog (units + categories)
- Stock ledger: RECEIPT, ISSUE, TRANSFER_IN/OUT, ADJUSTMENT, RETURN
- Stock balance validation and low-stock alerts
- Utilization reports by project and stage

### 5. Procurement & Supplier Management

- Suppliers, purchase orders, material receipts
- Invoicing and payment tracking

### 6. Labour & Contractor Management

- Contractors, attendance, wage calculation, advances
- Labour cost by project and stage

### 7. Expense Management

- Categories (transport, fuel, equipment rent, utilities, etc.)
- Project/stage allocation

### 8. Fund Management

- Owner, investor, loan, and partner capital tracking

### 9. Property & Sales Management

- Units: Available, Reserved, Sold
- Customers, bookings, installments

### 10. Cashflow & Finance

- Cash vs bank transactions and schedules
- P&L, cashflow, and related reports

### 11. Reporting & Analytics — Phase 5 complete

Eight report types: Project Profitability, Budget vs Actual, P&L, Cash Flow, Supplier Payables, Customer Receivables & Aging, Labour Cost, Expense Breakdown

### 12. Dashboard

Active projects, stage completion, budget vs actual, payables/receivables, cash balance, KPIs

---

## System Rules

**Every cost entry should include:** project, construction stage, category, vendor or labour, payment type, date.

**Every payment updates:** cash balance, payables, stage cost, project cost.

**Every sale updates:** revenue, customer receivables, project profit.

---

## Getting Started

### Prerequisites

- Node.js 20+ (recommended; NestJS 11 / Vite 7)
- PostgreSQL 14+
- npm

### Environment

Create a `.env` in `backend/server/` (or set env vars in your shell / Render):

```env
PORT=4000
# Prefer DATABASE_URL in production (Render)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/construction_erp

# Or local discrete vars (used when DATABASE_URL is unset):
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=construction_erp
```

TypeORM is configured with `synchronize: true` in development/deploy config, so schema is created/updated from entities on startup. Do not rely on `npm run migrate` — that script is not defined.

### Backend setup

```bash
cd backend
npm install
npm run dev
```

`npm run dev` starts NestJS in watch mode (`backend/server`). API defaults to **http://localhost:4000**.

Optional health check: `GET http://localhost:4000/api/health` (or the health route exposed by the Nest health module).

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Vite serves the UI at **http://localhost:5173** and proxies `/api` to `http://localhost:4000`.

### Scripts

| Location | Script | Purpose |
|----------|--------|---------|
| `frontend/` | `npm run dev` | Vite dev server |
| `frontend/` | `npm run build` | Production build |
| `frontend/` | `npm run preview` | Preview production build |
| `frontend/` | `npm run lint` | ESLint |
| `backend/` | `npm run dev` | NestJS watch mode |
| `backend/` | `npm run build` | Install + build NestJS |
| `backend/` | `npm start` | Production start (`start:prod`) |

---

## Development Phases

- **Phase 6** — Material & Inventory Management: complete
- **Phase 5** — Advanced features & reporting: complete
- **Phase 4** — Accounting & base modules: in progress / next
- **Phase 3** — Advanced analytics, forecasting & mobile polish: planned

See `development-plan.md` for checklist detail.

---

## Profit Calculation

```text
Profit = Revenue from Sale
       - Land Cost
       - Construction Cost
       - Labour Cost
       - Supplier Payments
       - Overhead Costs
       - Financing Costs
       - Material Costs
```

---

## Deployment

Configured for Render via `render.yaml`:

```yaml
services:
  - type: web
    name: construction-erp-api
    runtime: node
    rootDir: backend/server
    buildCommand: npm install && npm run build
    startCommand: npm run start:prod
```

Set `DATABASE_URL` (and any JWT/secrets your environment requires) in the Render dashboard. Bind uses `PORT` from the platform.

---

## Additional Documentation

- `scope.md` — scope and feature specifications
- `development-plan.md` — roadmap and progress

---

## Contributing

1. Create a feature branch from `main`
2. Make changes and test locally (frontend + API)
3. Open a pull request with a clear description

## License

Proprietary — developed by Jawadsoft.

## Support

For issues or feature requests, contact the development team or open a repository issue.

---

Last updated: July 2026  
Current milestone: Phase 6 (Material & Inventory Management) — complete
