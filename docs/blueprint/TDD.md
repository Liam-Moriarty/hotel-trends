# Technical Design Document (TDD)

## Hotel Trends

**Version:** 1.0
**Date:** March 2026
**Status:** Draft
**Methodology:** Agile (Scrum)

---

## 1. Document Purpose

This Technical Design Document (TDD) defines the technical architecture, stack decisions, infrastructure, and implementation standards for the **Hotel Trends** platform. It serves as the engineering reference document for all developers, architects, and stakeholders throughout Phase 0 through Phase 3 delivery.

This document should be read alongside the **Product Design Document (PDD) v1.0**.

---

## 2. Tech Stack Overview

| Layer                     | Tool / Service                    | Role                                                   |
| ------------------------- | --------------------------------- | ------------------------------------------------------ |
| **Monorepo Management**   | pnpm + Turborepo                  | Workspace orchestration and build pipeline             |
| **Frontend**              | React + Vite + TypeScript         | Dashboard UI, department views, scenario planning      |
| **Styling**               | Tailwind CSS + Shadcn UI          | Component styling and design system                    |
| **API Layer**             | tRPC                              | Type-safe end-to-end API between frontend and backend  |
| **Data Fetching**         | TanStack Query                    | Server state management, caching, background sync      |
| **Validation**            | Zod                               | Shared schema validation across frontend and backend   |
| **Backend Runtime**       | Firebase Functions (Node.js)      | Serverless business logic and tRPC handler             |
| **Database**              | Firebase Firestore                | Real-time NoSQL data store for operational data        |
| **Auth**                  | Firebase Authentication           | Role-based user authentication (RBAC)                  |
| **File / Object Storage** | Firebase Storage + GCS            | Asset storage and raw data file ingestion              |
| **Data Lake**             | Google Cloud Storage (GCS)        | Central store for raw ingested hotel system data       |
| **Data Processing**       | Google Cloud Dataflow             | ETL pipelines from PMS, POS, CRM, Channel Manager      |
| **AI / ML**               | Google Cloud Vertex AI            | Forecasting, NLP, anomaly detection, recommendations   |
| **Messaging / Events**    | Google Cloud Pub/Sub              | Real-time event streaming between integrations and app |
| **Scheduling**            | Google Cloud Scheduler            | Trigger nightly batch jobs and report generation       |
| **Alerting**              | Firebase Cloud Messaging (FCM)    | Push notifications to dashboard and mobile             |
| **CI/CD**                 | GitHub Actions + WIF              | Automated testing, build, and deployment pipelines     |
| **Hosting**               | Firebase Hosting                  | Static frontend hosting with CDN                       |
| **Secrets**               | Google Secret Manager             | Secure management of API keys and credentials          |
| **Monitoring**            | Google Cloud Monitoring + Logging | Infrastructure health, error tracking, alerting        |
| **Testing**               | Vitest                            | Unit and integration testing across packages           |

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
│           │   └── pubsub.ts        # Pub/Sub event publisher
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

## 4. Architecture Overview

### 4.1 Three-Layer Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     EXPERIENCE LAYER                         │
│   React + Vite (Firebase Hosting)                            │
│   tRPC Client · TanStack Query · Shadcn UI · Tailwind CSS    │
└──────────────────────────┬───────────────────────────────────┘
                           │  HTTPS (tRPC over REST)
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                      API / LOGIC LAYER                       │
│   Firebase Functions (Node.js)                               │
│   tRPC Router · Business Logic Services                      │
│   Firebase Auth (RBAC) · Zod Validation                      │
└───────┬──────────────────┬────────────────────┬─────────────┘
        │                  │                    │
        ▼                  ▼                    ▼
┌───────────────┐  ┌───────────────┐  ┌────────────────────────┐
│   Firestore   │  │  Vertex AI    │  │   Google Cloud         │
│  Operational  │  │  ML Models    │  │   Pub/Sub · Scheduler  │
│  Data Store   │  │  Forecasting  │  │   Dataflow · GCS       │
│               │  │  NLP · Anomaly│  │   Secret Manager       │
└───────────────┘  └───────────────┘  └────────────────────────┘
                                                │
                           ┌────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                        DATA LAYER                            │
│   Google Cloud Storage (Data Lake)                           │
│   Ingestion via Dataflow pipelines                           │
│   Sources: PMS · POS · CRM · RMS · Channel Manager · OTAs   │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Data Flow — From Hotel System to Dashboard

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

### 5.1 Firebase Services In Use

| Service                      | Usage                                                             |
| ---------------------------- | ----------------------------------------------------------------- |
| **Firebase Hosting**         | Serve the React/Vite frontend with CDN and custom domain          |
| **Firebase Functions**       | Host the tRPC server; process Pub/Sub events; run scheduled jobs  |
| **Firebase Firestore**       | Store hotel KPIs, alerts, guest profiles, health scores, UI state |
| **Firebase Authentication**  | User login (email/password + Google SSO); RBAC via custom claims  |
| **Firebase Cloud Messaging** | Push notifications for automated alerts to dashboard users        |
| **Firebase Storage**         | Store report exports, logos, uploaded reference files             |

### 5.2 Firestore Data Model (Top-Level Collections)

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

### 5.3 Firebase Environments

| Alias   | Firebase Project     | Purpose                                 |
| ------- | -------------------- | --------------------------------------- |
| `dev`   | `hotel-trends-dev`   | Development and integration testing     |
| `stage` | `hotel-trends-stage` | Staging, UAT with pilot hotel           |
| `prod`  | `hotel-trends-prod`  | Live production — Melbourne pilot hotel |

---

## 6. Google Cloud Platform Architecture

### 6.1 GCP Services In Use

| Service                          | Usage                                                                |
| -------------------------------- | -------------------------------------------------------------------- |
| **Google Cloud Storage**         | Central data lake for raw PMS/POS/CRM exports                        |
| **Cloud Dataflow**               | ETL pipelines — transform and load hotel system data                 |
| **Vertex AI**                    | Train and serve ML models (forecasting, NLP, anomaly detection)      |
| **Cloud Pub/Sub**                | Async event bus between integrations, functions, and AI jobs         |
| **Cloud Scheduler**              | Trigger nightly aggregations, report generation, model refresh       |
| **Secret Manager**               | Store PMS API keys, OTA credentials, integration tokens              |
| **Cloud Monitoring**             | Uptime checks, function latency, pipeline health dashboards          |
| **Cloud Logging**                | Centralised logs across all Functions, pipelines, and AI jobs        |
| **Workload Identity Federation** | Keyless CI/CD auth — no static service account keys stored in GitHub |

### 6.2 AI / ML Models on Vertex AI

| Model                              | Input                                               | Output                                               | Phase   |
| ---------------------------------- | --------------------------------------------------- | ---------------------------------------------------- | ------- |
| **Demand Forecasting**             | Historical occupancy + event calendar + weather     | 30/60/90-day occupancy forecast by room type         | Phase 1 |
| **Dynamic Pricing Recommendation** | Demand forecast + competitor rates + booking pace   | Optimal rate recommendation per room category        | Phase 1 |
| **Labour Optimisation**            | Occupancy forecast + historical roster + cost data  | Recommended staffing levels by department/shift      | Phase 1 |
| **Sentiment NLP**                  | Review text from Google, TripAdvisor, OTAs          | Sentiment score, category, touchpoint classification | Phase 2 |
| **Upsell Trigger Detection**       | Booking metadata + guest profile + historical spend | Upsell opportunity flags with probability score      | Phase 2 |
| **Anomaly Detection**              | Energy, maintenance, and POS time-series data       | Anomaly alerts with severity score                   | Phase 2 |
| **Guest Segmentation**             | CRM + spend + stay history                          | Behavioural clusters for targeted marketing          | Phase 3 |
| **Churn / Loyalty Prediction**     | Guest frequency + recency + spend                   | Retention risk score by guest segment                | Phase 3 |
| **Scenario Modelling**             | KPI history + input variables                       | Projected financial impact of "what if" scenarios    | Phase 3 |

### 6.3 Pub/Sub Topics

| Topic           | Publisher                  | Subscriber        | Purpose                                     |
| --------------- | -------------------------- | ----------------- | ------------------------------------------- |
| `pms-ingest`    | Dataflow pipeline          | Firebase Function | New booking/checkout events                 |
| `pos-ingest`    | Dataflow pipeline          | Firebase Function | F&B and room service transactions           |
| `sentiment-raw` | External review aggregator | Vertex AI NLP job | Raw review text for processing              |
| `ai-output`     | Vertex AI                  | Firebase Function | Completed forecast / recommendation results |
| `alert-trigger` | Firebase Function          | FCM dispatcher    | Anomaly or threshold breach detected        |

---

## 7. Security Architecture

### 7.1 Authentication & Authorisation

- All dashboard users authenticate via **Firebase Authentication**
- **Custom claims** are set on tokens to define role:
  `executive`, `revenue_manager`, `operations_manager`, `fb_manager`, `marketing_manager`, `guest_experience`, `it_admin`
- tRPC procedures validate role claims server-side on every request
- Firestore Security Rules enforce collection-level access by role

### 7.2 Secrets Management

- All third-party credentials (PMS API keys, OTA tokens, weather API keys) stored in **Google Secret Manager**
- Firebase Functions access secrets at runtime via the Secret Manager SDK — no secrets in environment variables or code
- CI/CD uses **Workload Identity Federation** — no static service account JSON keys stored in GitHub

### 7.3 Data Privacy

- No raw payment card data is stored at any point (PCI compliance)
- Guest PII (name, email, preferences) stored only in Firestore with encryption at rest
- Data handling reviewed against **Australian Privacy Act 1988** before Phase 1 launch
- All data in transit encrypted via HTTPS/TLS

---

## 8. CI/CD Pipeline

### 8.1 Branch Strategy

| Branch  | Environment              | Trigger                  |
| ------- | ------------------------ | ------------------------ |
| `dev`   | Firebase `dev` project   | Auto-deploy on push      |
| `stage` | Firebase `stage` project | Auto-deploy on push      |
| `main`  | Firebase `prod` project  | Manual with confirmation |

### 8.2 GitHub Actions Workflows

| Workflow                | Trigger         | Steps                                             |
| ----------------------- | --------------- | ------------------------------------------------- |
| `ci.yml`                | PR + push       | pnpm install → lint → typecheck → build → test    |
| `deploy-dev.yml`        | Push to `dev`   | CI → Firebase deploy (hosting + functions) to dev |
| `deploy-stage.yml`      | Push to `stage` | CI → Firebase deploy to stage                     |
| `deploy-main.yml`       | Manual          | CI → Firebase deploy to prod with approval gate   |
| `release.yml`           | Push to `main`  | Changeset version bump + tag                      |
| `dependency-review.yml` | PR              | Audit for vulnerable dependencies                 |

### 8.3 Firebase Deployment Commands

```bash
# Deploy all (hosting + functions)
firebase deploy --project dev

# Deploy only frontend
firebase deploy --only hosting --project dev

# Deploy only functions
firebase deploy --only functions --project dev
```

---

## 9. Development Scripts

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

## 10. Local Development Setup

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

## 11. Phase 0 — UI Prototype Technical Notes

Per the PDD, Phase 0 is a **frontend-only clickable prototype** using mock data. The following technical standards apply:

- All dashboard data is hardcoded in a `/mocks` directory within `apps/web/src`
- Mock data follows the exact Zod schemas defined in `packages/shared` — so wiring to real data in Phase 1 requires zero schema changes
- Firebase emulators run locally but **no real data connections** are made in Phase 0
- tRPC client is initialised but calls return mocked responses via MSW (Mock Service Worker)
- All navigation is functional end-to-end using React Router

---

## 12. Version Requirements Summary

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

## 13. Open Technical Questions

1. Which PMS is the pilot hotel running? (Opera, Protel, Mews — determines Dataflow pipeline design)
2. Does the hotel expose PMS data via REST API or file export only?
3. Confirm GCP project IDs and billing accounts for dev / stage / prod
4. Which external review aggregator will be used to feed the sentiment Pub/Sub topic?
5. Is the Firebase Blaze (pay-as-you-go) plan confirmed for all three environments?
6. What is the expected concurrent user count at launch? (Informs Firestore read/write quota planning)

---

## 14. Useful References

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

---

_Document Owner: [Tech Lead / Architect Name TBD]_
_Last Updated: March 2026_
_Next Review: End of Sprint 1_
