# Technical Design Document (TDD)

## Hotel Trends

**Version:** 1.1
**Date:** March 2026
**Status:** Draft
**Methodology:** Agile (Scrum)

---

## 1. Document Purpose

This Technical Design Document (TDD) defines the technical architecture, stack decisions, infrastructure, and implementation standards for the **Hotel Trends** platform. It serves as the engineering reference document for all developers, architects, and stakeholders throughout Phase 0 through Phase 3 delivery.

This document should be read alongside the **Product Design Document (PDD) v1.0**.

---

## 2. Tech Stack Overview

| Layer                     | Tool / Service            | Role                                                  |
| ------------------------- | ------------------------- | ----------------------------------------------------- |
| **Monorepo Management**   | pnpm + Turborepo          | Workspace orchestration and build pipeline            |
| **Frontend**              | React + Vite + TypeScript | Dashboard UI, department views, scenario planning     |
| **Styling**               | Tailwind CSS + Shadcn UI  | Component styling and design system                   |
| **API Layer**             | tRPC                      | Type-safe end-to-end API between frontend and backend |
| **Data Fetching**         | TanStack Query            | Server state management, caching, background sync     |
| **Validation**            | Zod                       | Shared schema validation across frontend and          |
| handler                   |
| **Database**              | Firebase Firestore        | Real-time NoSQL data store for operational data       |
| **Auth**                  | Firebase Authentication   | Role-based user authentication (RBAC)                 |
| **File / Object Storage** | Firebase Storage + GCS    | Asset storage and raw data file                       |
| mobile                    |
| **CI/CD**                 | GitHub Actions + WIF      | Automated testing, build, and deployment pipelines    |
| **Hosting**               | Firebase Hosting          | Static frontend hosting with CDN                      |
| **Secrets**               | Google Secret Manager     | Secure management of API keys and alerting            |
| **Testing**               | Vitest                    | Unit and integration testing across packages          |

---

## 3. Monorepo Structure

The project is built on the **Hytel Way monorepo template**, extended with Firebase and GCP-specific packages.

```
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                   # Lint, typecheck, build, test on PR
│   │   ├── deploy-dev.yml           # Auto-deploy to Firebase dev on push to `dev`
│   │   ├── deploy-stage.yml         # Auto-deploy to Firebase stage on push to `stage`
│   │   ├── deploy-main.yml          # Manual deploy to Firebase production
│   │   ├── release.yml              # Changesets versioning on main
│   │   └── dependency-review.yml    # Vulnerable dependency checks on PR
│   ├── CODEOWNERS
│   └── ISSUE_TEMPLATE/
│
├── apps/
│   ├── web/                         # React + Vite frontend dashboard
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── pages/               # Route-level components (per dashboard view)
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   ├── lib/
│   │   │   │   ├── trpc.ts          # tRPC client setup
│   │   │   │   └── queryClient.ts   # TanStack Query client
│   │   │   └── providers/           # Auth, tRPC, Query context providers
│   │   └── public/
│   │
│   └── functions/                   # Firebase Functions (tRPC backend)
│       └── src/
│           ├── trpc/
│           │   ├── routers/         # Feature-specific routers
│           │   └── index.ts         # Root tRPC router
│           ├── services/            # Business logic services
│           │   ├── vertexai.ts      # Vertex AI client wrapper
│           │   ├── firestore.ts     # Firestore helper layer
│           └── index.ts             # Firebase Function entrypoint
│
├── packages/
│   ├── ui/                          # Shared React components (Shadcn-based)
│   │   ├── components/
│   │   │   └── ui/                  # Button, Card, Badge, etc.
│   │   └── lib/utils.ts
│   │
│   ├── shared/                      # Zod schemas and shared TypeScript types
│   │   └── src/
│   │       ├── schemas/
│   │       └── types/
│   │           └── index.ts
│   │
│   ├── firebase-config/             # Shared Firebase app initialisation
│   │   └── src/
│   │       ├── client.ts            # Firebase client SDK (web)
│   │       └── admin.ts             # Firebase Admin SDK (functions)
│   │
│   ├── eslint-config/
│   └── typescript-config/
│
├── docs/
│   ├── ci-cd/
│   └── architecture/
│       ├── data-flow.md
│       └── ai-models.md
│
├── scripts/
│   ├── setup-wif.sh                 # GCP Workload Identity Federation setup
│   └── seed-firestore.ts            # Dev data seeding script
│
├── firebase.json                    # Firebase hosting + functions config
├── .firebaserc                      # Firebase project aliases (dev/stage/prod)
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

### 4.0 Data Flow — From Hotel System to Dashboard

```
Hotel IT System (PMS / POS / CRM)
        │
        │  REST API / CSV export
        ▼
Google Cloud Dataflow (ETL Pipeline)
        │
        │  Cleaned & normalised records
        ▼
Google Cloud Storage (Raw Data Lake)
        │
        │  Pub/Sub event trigger
        ▼
Firebase Function (Data Processor)
        │
        ├──▶  Firestore (operational dashboard data)
        └──▶  Vertex AI (batch training / inference jobs)
                  │
                  ▼
        Firebase Function (tRPC API)
                  │
                  ▼
        React Dashboard (TanStack Query cache)
```

---

## 5. Firebase Architecture

### 5.1 Firestore Data Model (Top-Level Collections)

```
/hotels/{hotelId}
  /snapshots/{date}           # Daily Hotel Health Score and KPI snapshot
  /alerts/{alertId}           # Automated alert records
  /revenue/{date}             # RevPAR, ADR, occupancy, booking mix
  /operations/{date}          # Labour, energy, maintenance data
  /guests/{guestId}           # Guest CRM profiles
  /sentiment/{reviewId}       # Aggregated sentiment records
  /marketing/{date}           # Channel ROI, ad performance
  /forecasts/{modelRun}       # Vertex AI output — demand forecasts
  /recommendations/{id}       # AI-generated recommendations

/users/{userId}
  /preferences                # Dashboard preferences, notification settings
```

### 5.2 Firebase Environments

| Alias   | Firebase Project     | Purpose                                 |
| ------- | -------------------- | --------------------------------------- |
| `dev`   | `hotel-trends-dev`   | Development and integration testing     |
| `stage` | `hotel-trends-stage` | Staging, UAT with pilot hotel           |
| `prod`  | `hotel-trends-prod`  | Live production — Melbourne pilot hotel |

---

## 6. CI/CD Pipeline

### 6.1 Branch Strategy

| Branch  | Environment              | Trigger                  |
| ------- | ------------------------ | ------------------------ |
| `dev`   | Firebase `dev` project   | Auto-deploy on push      |
| `stage` | Firebase `stage` project | Auto-deploy on push      |
| `main`  | Firebase `prod` project  | Manual with confirmation |

### 6.2 GitHub Actions Workflows

| Workflow                | Trigger         | Steps                                             |
| ----------------------- | --------------- | ------------------------------------------------- |
| `ci.yml`                | PR + push       | pnpm install → lint → typecheck → build → test    |
| `deploy-dev.yml`        | Push to `dev`   | CI → Firebase deploy (hosting + functions) to dev |
| `deploy-stage.yml`      | Push to `stage` | CI → Firebase deploy to stage                     |
| `deploy-main.yml`       | Manual          | CI → Firebase deploy to prod with approval gate   |
| `release.yml`           | Push to `main`  | Changeset version bump + tag                      |
| `dependency-review.yml` | PR              | Audit for vulnerable dependencies                 |

### 6.3 Firebase Deployment Commands

```bash
# Deploy all (hosting + functions)
firebase deploy --project dev

# Deploy only frontend
firebase deploy --only hosting --project dev

# Deploy only functions
firebase deploy --only functions --project dev
```

---

## 7. Development Scripts

| Command              | Description                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| `pnpm dev`           | Start Vite dev server (web) + Firebase emulators (functions, firestore, auth) |
| `pnpm build`         | Build all packages for production                                             |
| `pnpm test`          | Run Vitest across all packages                                                |
| `pnpm test:coverage` | Run tests with coverage report                                                |
| `pnpm lint`          | ESLint across all packages                                                    |
| `pnpm lint:fix`      | Auto-fix lint issues                                                          |
| `pnpm format`        | Prettier format all files                                                     |
| `pnpm typecheck`     | TypeScript type checking across all packages                                  |
| `pnpm precheck`      | Full pre-PR check: lint + typecheck + build + test                            |
| `pnpm emulators`     | Start Firebase Local Emulator Suite                                           |
| `pnpm seed`          | Seed Firestore emulator with mock hotel data                                  |
| `pnpm changeset`     | Create a changeset for semantic versioning                                    |
| `pnpm sync:lint`     | Check dependency version consistency (Syncpack)                               |
| `pnpm sync:fix`      | Auto-fix dependency version mismatches                                        |

---

## 8. Local Development Setup

### Prerequisites

| Tool         | Minimum Version |
| ------------ | --------------- |
| Node.js      | 20.x            |
| pnpm         | 8.x             |
| Turborepo    | 2.x             |
| TypeScript   | 5.x             |
| Vitest       | 2.x             |
| Firebase CLI | 13.x            |
| gcloud CLI   | Latest          |

### Local Setup Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd hotel-health-trends

# 2. Install dependencies
pnpm install

# 3. Set up Firebase project aliases
firebase use dev

# 4. Start Firebase emulators
pnpm emulators

# 5. Seed local Firestore with mock data
pnpm seed

# 6. Start the development server (new terminal)
pnpm dev
# Opens at http://localhost:5173
```

---

## 9. Version Requirements Summary

| Tool         | Minimum Version |
| ------------ | --------------- |
| Node.js      | 20.x            |
| pnpm         | 8.x             |
| Turborepo    | 2.x             |
| TypeScript   | 5.x             |
| Vitest       | 2.x             |
| ESLint       | 8.x             |
| Prettier     | 3.x             |
| Firebase CLI | 13.x            |
| gcloud CLI   | Latest          |

---

## 10. Open Technical Questions

1. Which PMS is the pilot hotel running? (Opera, Protel, Mews — determines Dataflow pipeline design)
2. Does the hotel expose PMS data via REST API or file export only?
3. Confirm GCP project IDs and billing accounts for dev / stage / prod
4. Which external review aggregator will be used to feed the sentiment Pub/Sub topic?
5. Is the Firebase Blaze (pay-as-you-go) plan confirmed for all three environments?
6. What is the expected concurrent user count at launch? (Informs Firestore read/write quota planning)

---

## 11. Useful References

| Resource                     | URL                                                            |
| ---------------------------- | -------------------------------------------------------------- |
| Turborepo Docs               | https://turbo.build/repo/docs                                  |
| Firebase Docs                | https://firebase.google.com/docs                               |
| Vertex AI Docs               | https://cloud.google.com/vertex-ai/docs                        |
| Cloud Dataflow               | https://cloud.google.com/dataflow/docs                         |
| tRPC Docs                    | https://trpc.io                                                |
| TanStack Query               | https://tanstack.com/query                                     |
| Shadcn UI                    | https://ui.shadcn.com                                          |
| Tailwind CSS                 | https://tailwindcss.com                                        |
| Zod                          | https://zod.dev                                                |
| Changesets                   | https://github.com/changesets/changesets                       |
| Workload Identity Federation | https://cloud.google.com/iam/docs/workload-identity-federation |
