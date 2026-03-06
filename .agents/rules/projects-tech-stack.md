---
trigger: always_on
---

---

description: Workspace rules for Hotel Health Trends — enforces the approved tech stack defined in TDD v1.0 (March 2026). Apply to all code generation, refactoring, and architecture decisions.
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.json", "**/*.yaml", "**/*.yml"]
alwaysApply: true

---

# Hotel Health Trends — Workspace Rules (TDD v1.0)

You are an agent working inside the **Hotel Health Trends** monorepo. Every decision you make must conform to the approved tech stack and architectural patterns defined in TDD v1.0. Do not introduce, suggest, or scaffold any tool, library, or service that is not listed below.

---

## 1. Monorepo & Tooling

- **Package manager:** `pnpm` only. Never use `npm` or `yarn`. All install commands must use `pnpm`.
- **Build orchestration:** `Turborepo`. Pipeline tasks are defined in `turbo.json`. Never bypass Turborepo for cross-package builds.
- **Workspace layout:**
  - `apps/web` — React frontend
  - `apps/functions` — Firebase Functions backend
  - `packages/ui` — shared React components
  - `packages/shared` — Zod schemas and TypeScript types
  - `packages/firebase-config` — Firebase SDK initialisation
  - `packages/eslint-config` — shared ESLint config
  - `packages/typescript-config` — shared tsconfig
- **Versioning:** Use `changesets` for semantic versioning. Run `pnpm changeset` before merging breaking changes.
- **Dependency hygiene:** Use `pnpm sync:lint` and `pnpm sync:fix` (Syncpack) to enforce consistent dependency versions across packages.

---

## 2. Frontend — `apps/web`

- **Framework:** React with Vite. No Next.js, Remix, or any other meta-framework.
- **Language:** TypeScript (minimum v5.x). No plain `.js` files in `src/`.
- **Styling:** Tailwind CSS + Shadcn UI only. Do not introduce CSS Modules, styled-components, Emotion, or any other styling solution.
- **Component library:** Shadcn UI (built on Radix UI). Add new components via `shadcn` CLI into `packages/ui/components/ui/`.
- **Routing:** React Router. No other routing library.
- **Server state & data fetching:** TanStack Query (`@tanstack/react-query`). Never use SWR, Apollo, or raw `useEffect` for data fetching.
- **API client:** tRPC client (`packages/web/src/lib/trpc.ts`). Never call Firebase Functions via raw `fetch` or Axios from the frontend — always go through tRPC.
- **Auth:** Firebase Authentication via `packages/firebase-config/src/client.ts`. Never roll a custom auth layer.
- **Mock data (Phase 0):** All mocks live in `apps/web/src/mocks/`. They must conform to Zod schemas from `packages/shared`. Use MSW (Mock Service Worker) to intercept tRPC calls in Phase 0.

---

## 3. Backend — `apps/functions`

- **Runtime:** Firebase Functions (Node.js 20.x). No other serverless provider (no AWS Lambda, no Vercel Functions).
- **API layer:** tRPC. All client-facing endpoints are tRPC procedures organised in `apps/functions/src/trpc/routers/`. Never expose raw HTTP REST endpoints to the frontend.
- **Validation:** Zod schemas from `packages/shared`. Every tRPC input and output must be validated with Zod. Never use `any` or untyped inputs.
- **Business logic:** Encapsulate in service files under `apps/functions/src/services/`. Routers call services — routers must not contain business logic directly.
- **Auth enforcement:** Validate Firebase Auth custom claims on every tRPC procedure server-side. Do not rely solely on Firestore Security Rules for API-level access control.
- **Secrets:** Access all credentials at runtime via **Google Secret Manager SDK**. Never hardcode secrets, never store them in environment variables, never commit `.env` files containing real credentials.
- **Events:** Publish and consume async events via **Google Cloud Pub/Sub** using `apps/functions/src/services/pubsub.ts`. Never use Firebase Realtime Database triggers for cross-service eventing.
- **Scheduled jobs:** Define triggers in **Google Cloud Scheduler**. Functions that are scheduled must be clearly annotated and documented.

---

## 4. Database — Firestore

- **Database:** Firebase Firestore only. Do not introduce any relational database (PostgreSQL, MySQL), Redis, or any other store for operational dashboard data.
- **Data model:** Follow the top-level collection schema defined in TDD §5.2:
  - `/hotels/{hotelId}/snapshots/{date}`
  - `/hotels/{hotelId}/alerts/{alertId}`
  - `/hotels/{hotelId}/revenue/{date}`
  - `/hotels/{hotelId}/operations/{date}`
  - `/hotels/{hotelId}/guests/{guestId}`
  - `/hotels/{hotelId}/sentiment/{reviewId}`
  - `/hotels/{hotelId}/marketing/{date}`
  - `/hotels/{hotelId}/forecasts/{modelRun}`
  - `/hotels/{hotelId}/recommendations/{id}`
  - `/users/{userId}/preferences`
- **Access helper:** Use `apps/functions/src/services/firestore.ts` as the Firestore helper layer. Do not use the Firestore SDK directly in routers or other services.
- **Security rules:** All Firestore Security Rules must enforce role-based access aligned to Firebase Auth custom claims.

---

## 5. Shared Schemas — `packages/shared`

- **Validation library:** Zod only. No Yup, Joi, or Valibot.
- **Schema files:** Define all schemas in `packages/shared/src/schemas/`:
  - `hotel.ts` — hotel, room, booking
  - `revenue.ts` — pricing, ADR, RevPAR
  - `operations.ts` — labour, energy, maintenance
  - `guest.ts` — guest profile, sentiment
  - `integrations.ts` — PMS, POS, CRM event shapes
- **Rule:** Frontend and backend must import schemas from `packages/shared`. Never duplicate schema definitions.

---

## 6. AI / ML — Vertex AI

- **Provider:** Google Cloud Vertex AI only. No OpenAI, Anthropic, HuggingFace, or any other external AI/ML provider.
- **Client wrapper:** All Vertex AI calls go through `apps/functions/src/services/vertexai.ts`. Never call Vertex AI directly from routers.
- **Approved models & phases** (per TDD §6.2):

  | Phase   | Models                                                                  |
  | ------- | ----------------------------------------------------------------------- |
  | Phase 1 | Demand Forecasting, Dynamic Pricing Recommendation, Labour Optimisation |
  | Phase 2 | Sentiment NLP, Upsell Trigger Detection, Anomaly Detection              |
  | Phase 3 | Guest Segmentation, Churn/Loyalty Prediction, Scenario Modelling        |

- Do not implement or scaffold Phase 2 or Phase 3 models until Phase 1 is complete and signed off.

---

## 7. Infrastructure & GCP Services

Only the following GCP services are approved. Do not introduce any other GCP or third-party cloud service without updating the TDD:

| Service                      | Purpose                             |
| ---------------------------- | ----------------------------------- |
| Google Cloud Storage         | Data lake — raw PMS/POS/CRM exports |
| Cloud Dataflow               | ETL pipelines                       |
| Vertex AI                    | ML model training and inference     |
| Cloud Pub/Sub                | Async event bus                     |
| Cloud Scheduler              | Nightly batch job triggers          |
| Google Secret Manager        | Credentials and API key storage     |
| Cloud Monitoring + Logging   | Observability                       |
| Workload Identity Federation | Keyless CI/CD auth                  |

---

## 8. Firebase Environments

| Alias   | Project              | Use                                 |
| ------- | -------------------- | ----------------------------------- |
| `dev`   | `hotel-health-dev`   | Development and integration testing |
| `stage` | `hotel-health-stage` | Staging / UAT                       |
| `prod`  | `hotel-health-prod`  | Production — Melbourne pilot hotel  |

- Always target a named project alias with `--project <alias>` in Firebase CLI commands. Never deploy without specifying the project.
- Production (`prod`) deployments require **manual approval** — never auto-deploy to `main`.

---

## 9. CI/CD — GitHub Actions

- All pipelines are defined in `.github/workflows/`. Do not add pipeline config in any other location.
- **Approved workflows:**
  - `ci.yml` — lint → typecheck → build → test (runs on every PR and push)
  - `deploy-dev.yml` — auto-deploy to dev on push to `dev`
  - `deploy-stage.yml` — auto-deploy to stage on push to `stage`
  - `deploy-main.yml` — manual deploy to prod with approval gate
  - `release.yml` — Changesets version bump on `main`
  - `dependency-review.yml` — vulnerability audit on PR
- **Auth:** Use Workload Identity Federation (WIF) for all GCP auth in CI. Never store service account JSON keys in GitHub secrets.

---

## 10. Testing

- **Test framework:** Vitest only. No Jest, Mocha, or Jasmine.
- **Coverage:** Run `pnpm test:coverage` to generate coverage reports. All new business logic in `services/` requires unit tests.
- **Commands:**
  - `pnpm test` — run all tests
  - `pnpm test:coverage` — run with coverage
  - `pnpm precheck` — full pre-PR gate: lint + typecheck + build + test

---

## 11. Security Rules

- No raw payment card data may be stored or logged anywhere in the system (PCI compliance).
- Guest PII is stored only in Firestore, encrypted at rest, in the `/hotels/{hotelId}/guests/` and `/users/{userId}/` collections.
- All data in transit must use HTTPS/TLS — no HTTP endpoints.
- Compliance baseline: **Australian Privacy Act 1988**. Flag any feature that processes guest PII for review before shipping.

---

## 12. Forbidden Libraries & Patterns

The following are **explicitly prohibited**. If a user or task requests them, decline and suggest the approved alternative:

| Forbidden                                         | Approved Alternative                   |
| ------------------------------------------------- | -------------------------------------- |
| `npm` / `yarn`                                    | `pnpm`                                 |
| `axios` / raw `fetch` for API calls               | tRPC client                            |
| `express` / `fastify` / raw HTTP server           | Firebase Functions + tRPC              |
| `prisma` / `drizzle` / any SQL ORM                | Firestore via `services/firestore.ts`  |
| `styled-components` / `emotion` / CSS Modules     | Tailwind CSS + Shadcn UI               |
| `yup` / `joi` / `valibot`                         | Zod                                    |
| `swr` / raw `useEffect` for data fetching         | TanStack Query                         |
| OpenAI / Anthropic / any non-GCP AI               | Vertex AI                              |
| `jest` / `mocha`                                  | Vitest                                 |
| `next.js` / `remix`                               | React + Vite                           |
| Any static service account JSON key in CI         | Workload Identity Federation           |
| Hardcoded secrets or `.env` with real credentials | Google Secret Manager                  |
| Deploying to `prod` without approval gate         | `deploy-main.yml` with manual approval |

---

## 13. Version Requirements

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
