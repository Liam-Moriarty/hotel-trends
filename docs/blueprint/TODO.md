# TODO.md — Hotel Trends

## Step-by-Step Build Guide (Phase 0 → Phase 3)

---

## 🛠️ PRE-PHASE: Environment & Repo Setup

### Repo & Tooling

- [ ] Create GitHub repository (`hotel-trends`)
- [ ] Initialise monorepo with `pnpm` + `Turborepo`
- [ ] Configure `pnpm-workspace.yaml` with `apps/*` and `packages/*`
- [ ] Configure `turbo.json` with `build`, `dev`, `test`, `lint`, `typecheck` pipelines
- [ ] Add root `package.json` with workspace scripts
- [ ] Install and configure **TypeScript 5.x** (`packages/typescript-config`)
- [ ] Install and configure **ESLint 8.x** (`packages/eslint-config`)
- [ ] Install and configure **Prettier 3.x**

### Firebase & GCP Setup

- [ ] Create three Firebase projects: `hotel-trends-dev`, `hotel-trends-stage`, `hotel-trends-prod`
- [ ] Configure `.firebaserc` with `dev`, `stage`, `prod` aliases
- [ ] Configure `firebase.json` (hosting + functions)
- [ ] Enable **Firebase Blaze (pay-as-you-go)** plan on all three projects
- [ ] Enable GCP services on each project:
  - [ ] Cloud Storage (Data Lake)
  - [ ] Cloud Dataflow
  - [ ] Vertex AI
  - [ ] Cloud Pub/Sub
  - [ ] Cloud Scheduler
  - [ ] Secret Manager
  - [ ] Cloud Monitoring + Logging
- [ ] Set up **Workload Identity Federation** for GitHub Actions (`scripts/setup-wif.sh`)
- [ ] Confirm GCP project IDs and billing accounts

### CI/CD Pipelines (`.github/workflows/`)

- [ ] `ci.yml` — lint → typecheck → build → test on every PR
- [ ] `deploy-dev.yml` — auto-deploy to Firebase `dev` on push to `dev`
- [ ] `deploy-stage.yml` — auto-deploy to Firebase `stage` on push to `stage`
- [ ] `deploy-main.yml` — manual deploy to `prod` with approval gate
- [ ] `release.yml` — Changesets versioning on `main`
- [ ] `dependency-review.yml` — vulnerable dependency audit on PR
- [ ] Add `CODEOWNERS` file
- [ ] Add issue templates (`.github/ISSUE_TEMPLATE/`)

### Shared Packages Bootstrap

- [ ] **`packages/shared`** — Zod schemas + TypeScript types
  - [ ] `schemas/hotel.ts` (Hotel, room, booking)
  - [ ] `schemas/revenue.ts` (ADR, RevPAR, pricing)
  - [ ] `schemas/operations.ts` (labour, energy, maintenance)
  - [ ] `schemas/guest.ts` (guest profile, sentiment)
  - [ ] `schemas/integrations.ts` (PMS, POS, CRM event schemas)
  - [ ] `types/index.ts`
- [ ] **`packages/firebase-config`** — Firebase initialisation
  - [ ] `client.ts` (Firebase client SDK for web)
  - [ ] `admin.ts` (Firebase Admin SDK for functions)
- [ ] **`packages/ui`** — Shared React component library
  - [ ] Install Shadcn UI + Tailwind CSS
  - [ ] Scaffold base components: `Button`, `Card`, `Badge`
  - [ ] Build `Header.tsx`
  - [ ] Build `HealthScoreBadge.tsx`
  - [ ] Build `KpiCard.tsx`
  - [ ] Build `TrendChart.tsx`
  - [ ] Build `AlertCard.tsx`

---

## 📦 PHASE 0 — UI Prototype (Frontend Only)

> **Goal:** Fully clickable prototype with mock data. No backend. ~4 weeks (2 sprints).

### App Shell Setup (`apps/web`)

- [ ] Scaffold React + Vite + TypeScript app
- [ ] Install and configure React Router
- [ ] Install TanStack Query + set up `queryClient.ts`
- [ ] Set up tRPC client (`lib/trpc.ts`) — mock responses via **MSW (Mock Service Worker)**
- [ ] Set up Auth context provider (mock login, no real Firebase Auth yet)
- [ ] Create `/mocks` directory — all mock data must conform to `packages/shared` Zod schemas
- [ ] Build app layout shell (sidebar nav + top nav + main content area)

### Sprint 1

#### Epic 0.1 — Navigation Shell & Layout

- [ ] `LoginPage` — login form UI (mock auth, no real Firebase)
- [ ] `AppShell` — sidebar navigation linking all major sections
- [ ] `RoleSwitcher` — UI to switch between department views (Executive, Revenue, Operations, F&B, Marketing, Guest Experience)
- [ ] Confirm all nav links resolve to a screen (no dead ends)

#### Epic 0.2 — Executive Dashboard

- [ ] `ExecutiveDashboardPage`
  - [ ] Hotel Health Score visual indicator (mock score, e.g. 82/100)
  - [ ] KPI summary cards: Occupancy %, RevPAR, ADR, Cost Index with mock trend lines
  - [ ] Automated alert card (clickable)
- [ ] `AlertDetailPage` — sample alert detail screen
- [ ] `ScenarioPlannerPage` — slider-based "what if" interface (mock output)

#### Epic 0.3 — Revenue & Pricing View

- [ ] `RevenueDashboardPage`
  - [ ] Demand forecast chart (30/60/90-day mock data)
  - [ ] Dynamic pricing recommendation card (clickable)
- [ ] `RateShoppingTablePage` — competitor rate table with placeholder data
- [ ] `BookingMixPage` — direct vs OTA donut chart

### Sprint 2

#### Epic 0.4 — Operations & Cost View

- [ ] `OperationsDashboardPage`
  - [ ] Labour roster vs occupancy comparison chart (mock)
- [ ] `EnergyViewPage` — energy usage by day/occupancy (mock)
- [ ] `MaintenanceAlertsPage` — maintenance alert list with predictive flag indicators

#### Epic 0.5 — Guest Experience View

- [ ] `SentimentDashboardPage` — mock sentiment feed (Google, TripAdvisor, OTAs)
- [ ] `TouchpointBreakdownPage` — sentiment by touchpoint score card
- [ ] `GuestProfilePage` — CRM card (preferences, past stays, spend history)
- [ ] `ServiceRecoveryPanelPage` — negative alert → guest profile → recovery actions

#### Epic 0.6 — Marketing & Distribution View

- [ ] `MarketingDashboardPage`
  - [ ] Google/Meta Ads performance + booking conversion (mock)
- [ ] `ChannelROIPage` — channel ROI ranking table with wasted spend indicators
- [ ] `CampaignSummaryPage` — pre-arrival offer campaign summary

#### Epic 0.7 — F&B & Housekeeping Views

- [ ] `FBDashboardPage` — food waste summary + staffing recommendation card
- [ ] `HousekeepingPage` — room turnaround times + task completion status

### Phase 0 Exit Criteria

- [ ] All screens navigable end-to-end (zero dead ends)
- [ ] Product Owner sign-off on all flows
- [ ] Pilot hotel stakeholder walkthrough completed
- [ ] All feedback items logged and triaged into Phase 1 backlog

---

## 🚀 PHASE 1 — MVP: Core Intelligence Foundation

> **Goal:** Wire Phase 0 UI to real data. Deliver Hotel Health Score, dynamic pricing, and cost/labour optimisation. ~8 weeks (4 sprints).

### Epic 1 — Data Infrastructure

- [ ] Build Dataflow ETL pipeline: **PMS → GCS Data Lake**
  - [ ] Identify pilot hotel PMS (Opera / Protel / Mews) and confirm API or CSV export
  - [ ] Write pipeline to clean and normalise booking/ADR data
- [ ] Build Dataflow ETL pipeline: **POS → GCS Data Lake**
  - [ ] F&B and room service transaction ingestion
- [ ] Build Dataflow ETL pipeline: **Channel Manager → GCS Data Lake**
  - [ ] Direct vs OTA booking mix data
- [ ] Set up **Cloud Pub/Sub** topics: `pms-ingest`, `pos-ingest`
- [ ] Build Firebase Function: data processor (Pub/Sub → Firestore write)
- [ ] Build admin data pipeline health monitor view (integration status dashboard)
- [ ] Seed Firestore with real-structure (non-mock) collections:
  - `/hotels/{hotelId}/snapshots`, `/revenue`, `/operations`
- [ ] Store all integration credentials in **Secret Manager**

### Epic 2 — Hotel Health Score & Executive Dashboard

- [ ] Implement `healthScore.ts` service — composite KPI scoring algorithm
- [ ] Build tRPC router: `dashboard.ts`
  - [ ] `getHealthScore` procedure
  - [ ] `getKpiSummary` procedure
  - [ ] `getAlerts` procedure
- [ ] Wire `ExecutiveDashboardPage` to real tRPC data (replace MSW mocks)
- [ ] Implement automated daily alert logic (threshold breach detection)
- [ ] Set up **Firebase Cloud Messaging (FCM)** for push notifications
- [ ] Set up **Cloud Scheduler** for nightly KPI snapshot job

### Epic 3 — Revenue & Dynamic Pricing

- [ ] Deploy **Demand Forecasting** model to Vertex AI
  - [ ] Input: historical occupancy + event calendar + weather API
  - [ ] Output: 30/60/90-day occupancy forecast by room type
  - [ ] Store output in `/hotels/{hotelId}/forecasts`
- [ ] Deploy **Dynamic Pricing Recommendation** model to Vertex AI
  - [ ] Input: demand forecast + competitor rates + booking pace
  - [ ] Output: rate recommendation per room category
- [ ] Build tRPC router: `revenue.ts`
  - [ ] `getDemandForecast` procedure
  - [ ] `getCompetitorRates` procedure
  - [ ] `getBookingMix` procedure
  - [ ] `getPricingRecommendations` procedure
- [ ] Wire `RevenueDashboardPage`, `RateShoppingTablePage`, `BookingMixPage` to real data

### Epic 4 — Labour & Cost Optimisation

- [ ] Deploy **Labour Optimisation** model to Vertex AI
  - [ ] Input: occupancy forecast + historical roster + cost data
  - [ ] Output: recommended staffing levels by department/shift
- [ ] Build tRPC router: `operations.ts`
  - [ ] `getLabourRoster` procedure
  - [ ] `getOvertimeAlerts` procedure
  - [ ] `getEnergyUsage` procedure
- [ ] Wire `OperationsDashboardPage`, `EnergyViewPage` to real data
- [ ] Implement overtime threshold alert logic → FCM notification

### Phase 1 Exit Criteria

- [ ] Hotel Health Score live with real data
- [ ] Dynamic pricing recommendations flowing end-to-end
- [ ] Labour and energy dashboards live
- [ ] All Phase 1 features UAT sign-off from pilot hotel stakeholder
- [ ] Monitoring and logging active in Cloud Monitoring

---

## 📈 PHASE 2 — Growth: Guest Intelligence & Marketing Efficiency

> **Goal:** Sentiment analysis, upsell intelligence, marketing ROI, predictive maintenance. ~8 weeks (4 sprints).

### Epic 5 — Guest Sentiment & Experience

- [ ] Identify and connect external review aggregator (feeds `sentiment-raw` Pub/Sub topic)
- [ ] Deploy **Sentiment NLP** model to Vertex AI
  - [ ] Input: review text from Google, TripAdvisor, OTAs
  - [ ] Output: sentiment score + category + touchpoint classification
- [ ] Build tRPC router additions: `guests.ts`
  - [ ] `getSentimentFeed` procedure
  - [ ] `getSentimentByTouchpoint` procedure
  - [ ] `getGuestProfile` procedure
  - [ ] `getServiceRecoveryActions` procedure
- [ ] Implement in-stay negative feedback alert → FCM notification
- [ ] Wire `SentimentDashboardPage`, `TouchpointBreakdownPage`, `GuestProfilePage`, `ServiceRecoveryPanelPage` to real data
- [ ] Populate `/hotels/{hotelId}/sentiment` and `/guests` Firestore collections

### Epic 6 — Upsell & Pre-Arrival Intelligence

- [ ] Deploy **Upsell Trigger Detection** model to Vertex AI
  - [ ] Input: booking metadata + guest profile + historical spend
  - [ ] Output: upsell opportunity flags with probability score
- [ ] Build upsell recommendation procedures in `revenue.ts`
- [ ] Build pre-arrival offer campaign trigger logic in `marketing.ts`
- [ ] Wire upsell cards and campaign summary screens to real data

### Epic 7 — Marketing & Distribution Performance

- [ ] Integrate Google Ads API → Dataflow → GCS
- [ ] Integrate Meta Ads API → Dataflow → GCS
- [ ] Build tRPC router: `marketing.ts`
  - [ ] `getChannelROI` procedure
  - [ ] `getAdPerformance` procedure
  - [ ] `getWastedSpend` procedure
  - [ ] `getBudgetReallocationRecommendations` procedure
- [ ] Wire `MarketingDashboardPage`, `ChannelROIPage` to real data
- [ ] Populate `/hotels/{hotelId}/marketing` Firestore collection

### Epic 8 — Predictive Maintenance

- [ ] Deploy **Anomaly Detection** model to Vertex AI
  - [ ] Input: energy, maintenance, POS time-series data
  - [ ] Output: anomaly alerts with severity score
- [ ] Build AI-generated preventive maintenance schedule logic
- [ ] Add maintenance procedures to `operations.ts` tRPC router
- [ ] Wire `MaintenanceAlertsPage` to real predictive data
- [ ] Set up `alert-trigger` Pub/Sub topic → FCM dispatcher

### Phase 2 Exit Criteria

- [ ] Sentiment feed live with real reviews
- [ ] Upsell recommendations flowing
- [ ] Marketing ROI dashboard live
- [ ] Predictive maintenance alerts active
- [ ] All Phase 2 features UAT sign-off from pilot hotel stakeholder

---

## 🌐 PHASE 3 — Scale: Full Intelligence & Scenario Planning

> **Goal:** External intelligence, scenario planning, advanced AI, multi-property readiness. ~8 weeks (4 sprints).

### Epic 9 — External Contextual Intelligence

- [ ] Integrate **weather API** → Dataflow pipeline
- [ ] Integrate **local events feed** → Dataflow pipeline
- [ ] Integrate **flight arrivals data** → Dataflow pipeline
- [ ] Integrate **citywide occupancy / STR data** → Dataflow pipeline
- [ ] Integrate **competitor promotions monitoring** feed
- [ ] Integrate **macroeconomic indicators** feed
- [ ] Wire external data into Revenue, F&B, and Marketing recommendation engines
- [ ] Build weather-driven package suggestion logic (e.g. spa offers on rainy days)

### Epic 10 — Scenario Planning & CapEx Intelligence

- [ ] Deploy **Scenario Modelling** model to Vertex AI
  - [ ] Input: KPI history + user-defined input variables
  - [ ] Output: projected financial impact
- [ ] Build `getScenarioProjection` tRPC procedure
- [ ] Wire `ScenarioPlannerPage` slider interface to real model output
- [ ] Build CapEx prioritisation view (ROI + urgency ranking)
- [ ] Add CapEx procedures to `dashboard.ts` tRPC router

### Epic 11 — Advanced AI Models

- [ ] Deploy **Guest Segmentation** model to Vertex AI
  - [ ] Input: CRM + spend + stay history
  - [ ] Output: behavioural clusters for targeted marketing
- [ ] Deploy **Churn / Loyalty Prediction** model to Vertex AI
  - [ ] Input: guest frequency + recency + spend
  - [ ] Output: retention risk score by segment
- [ ] Deploy **Combined Optimisation** model (pricing + occupancy + cost)
- [ ] Wire guest segment views and churn predictions to Marketing and GM dashboards

### Epic 12 — Remaining Integrations

- [ ] **RMS integration** — pricing decision sync (Dataflow pipeline)
- [ ] **MICE/Events system** — group and conference revenue tracking
- [ ] **Loyalty program** — guest loyalty data integration
- [ ] **OTA performance data** — Booking.com and Expedia metrics ingestion
- [ ] **Camera feed integration** — anomaly detection and occupancy sensing (if in scope)
- [ ] Set up `ai-output` Pub/Sub topic for all remaining Vertex AI jobs

### Phase 3 Exit Criteria

- [ ] All 72 features delivered and verified
- [ ] Full end-to-end UAT completed with pilot hotel
- [ ] Multi-property architecture validated (data model supports multiple `hotelId`s)
- [ ] Security audit and Australian Privacy Act 1988 compliance review signed off
- [ ] Performance testing complete (Firestore quota, Functions concurrency)
- [ ] Monitoring dashboards and alerting active across all services
- [ ] Product Owner and stakeholder final sign-off

---

## 🔐 ONGOING — Security, Compliance & Ops (All Phases)

- [ ] Enforce RBAC via Firebase Auth custom claims on all tRPC procedures
- [ ] Enforce Firestore Security Rules by user role
- [ ] Confirm no raw payment card data stored anywhere (PCI)
- [ ] Engage legal/compliance review for Australian Privacy Act 1988 before Phase 1
- [ ] Encrypt all guest PII at rest in Firestore
- [ ] All data in transit via HTTPS/TLS only
- [ ] Run `pnpm sync:lint` / `pnpm sync:fix` regularly to keep dependency versions consistent
- [ ] Create changesets (`pnpm changeset`) for all versioned releases

---

## 📋 OPEN QUESTIONS TO RESOLVE BEFORE SPRINT 1

- [ ] Which PMS is the pilot hotel running? (Opera / Protel / Mews)
- [ ] Does the hotel expose PMS data via REST API or file export only?
- [ ] Does the hotel have an existing RMS, or is pricing managed manually?
- [ ] Confirm GCP project IDs and billing accounts for dev / stage / prod
- [ ] Which external review aggregator will feed the sentiment pipeline?
- [ ] What is the expected concurrent user count at launch?
- [ ] Which BI tools (if any) are currently in use at the pilot hotel?
- [ ] Is there an internal hotel IT team co-owning integration work, or fully outsourced?
- [ ] Confirm Firebase Blaze plan active on all three environments

---

_Last Updated: March 2026_
_Based on: PDD v1.0 + TDD v1.0_
