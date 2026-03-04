# Hotel Trends

## Product Design Document (PDD)

**Version:** 1.0
**Date:** March 2026
**Status:** Draft
**Methodology:** Agile (Scrum)

---

## 1. Product Overview

### 1.1 Product Name

**Hotel Trends**

### 1.2 Product Vision

To be the intelligence layer of modern hotel operations — a single platform that aggregates data across all hotel systems, applies AI to surface actionable trends, and gives hotel management the clarity to control costs and maximise profitability in real time.

### 1.3 Problem Statement

Hotel management teams operate across fragmented systems — PMS, POS, CRM, RMS, energy, maintenance, and more — with no unified view of performance. Critical decisions around pricing, staffing, maintenance, and guest experience are made reactively rather than proactively, resulting in lost revenue, unnecessary costs, and preventable guest dissatisfaction.

### 1.4 Proposed Solution

Hotel Trends is a cloud-based AI management dashboard that:

- Aggregates data from all major hotel IT systems and external sources
- Applies AI models (forecasting, NLP, anomaly detection, recommendations) to detect trends
- Delivers actionable intelligence through executive and department-level dashboards
- Enables proactive, data-driven decisions across revenue, operations, guest experience, and marketing

### 1.5 Initial Deployment Context

Pilot hotel: **5-star property, Melbourne, Australia**
All initial modelling, testing, and validation will be conducted against live data from this property before scaling.

---

## 2. Goals & Success Metrics

### 2.1 Business Goals

| Goal                     | Target Outcome                                                 |
| ------------------------ | -------------------------------------------------------------- |
| Revenue uplift           | 5–15% increase via dynamic pricing and upsell optimisation     |
| Cost reduction           | 8–20% savings via labour, energy, and maintenance optimisation |
| OTA dependency reduction | Increase direct booking share by measurable % within 12 months |
| Guest satisfaction       | Improved review scores and repeat stay rate                    |
| Executive clarity        | Daily health score adopted as primary leadership KPI           |

### 2.2 Key Performance Indicators (KPIs)

- Hotel Health Score (daily composite index)
- Revenue per Available Room (RevPAR) trend
- Direct vs OTA booking ratio
- Labour cost as % of revenue
- Average energy cost per occupied room
- Maintenance emergency callout rate
- Guest sentiment score (by touchpoint)
- Upsell conversion rate
- Dashboard adoption rate (% of management actively using the tool)

---

## 3. Target Users

| User Type                | Role                    | Primary Need                                           |
| ------------------------ | ----------------------- | ------------------------------------------------------ |
| Hotel Executive / GM     | Strategic oversight     | Daily health score, scenario planning, CapEx decisions |
| Revenue Manager          | Pricing & demand        | Dynamic pricing, forecasting, channel optimisation     |
| Operations Manager       | Efficiency & costs      | Labour, energy, maintenance, housekeeping data         |
| F&B Manager              | Food & beverage         | Waste tracking, staffing recommendations, POS trends   |
| Marketing Manager        | Acquisition & CRM       | Channel ROI, campaign performance, pre-arrival offers  |
| Guest Experience Manager | Satisfaction & recovery | Sentiment alerts, upsell triggers, service recovery    |
| IT / Data Administrator  | System health           | Integration status, data pipeline monitoring           |

---

## 4. Scope & Feature Set

The full product comprises **72 features** across 8 categories. These are delivered across three Agile release phases.

### 4.1 Feature Categories

1. Dashboard & Reporting (6 features)
2. Revenue & Pricing (10 features)
3. AI & Forecasting (9 features)
4. Guest Experience (9 features)
5. Operations & Cost (10 features)
6. Marketing & Distribution (7 features)
7. External Intelligence (11 features)
8. Data & Integration (10 features)

---

## 5. Agile Delivery Model

### 5.1 Methodology

Hotel Trends will be built using **Scrum**, with:

- **2-week sprints**
- **Sprint Planning, Daily Standups, Sprint Review, and Retrospective** ceremonies
- A prioritised **Product Backlog** managed by the Product Owner
- Three major release milestones: MVP, Phase 2, Phase 3

### 5.2 Team Structure

| Role               | Responsibility                                                     |
| ------------------ | ------------------------------------------------------------------ |
| Product Owner      | Backlog prioritisation, stakeholder alignment, acceptance criteria |
| Scrum Master       | Sprint facilitation, impediment removal, process health            |
| Backend Engineers  | Data pipeline, API integrations, cloud infrastructure              |
| AI/ML Engineers    | Forecasting models, NLP, anomaly detection, recommendation engines |
| Frontend Engineers | Dashboard UI, alerts, department views                             |
| QA Engineers       | Test automation, UAT coordination with pilot hotel                 |
| Data Analyst       | KPI validation, model accuracy monitoring                          |

### 5.3 Definition of Done

**Phase 0 – UI Prototype (Frontend Only)**
A screen or flow is considered "done" when:

- All relevant UI components and layouts are built and clickable
- Navigation between screens works end-to-end
- Placeholder/mock data is used to simulate real data states
- Reviewed and approved by Product Owner and pilot hotel stakeholder
- No backend, API, or database connection is required at this stage

**Phase 1–3 – Full Build**
A feature is considered "done" when:

- Code is reviewed and merged to main branch
- Unit and integration tests pass
- Acceptance criteria validated by Product Owner
- UAT sign-off from pilot hotel stakeholder (where applicable)
- Monitoring/logging in place for production

---

## 6. Phased Delivery Roadmap

---

### Phase 0 — UI Prototype: Clickable Frontend

**Goal:** Build a fully clickable, navigation-complete prototype using mock/static data. No backend, no APIs, no database. This phase exists to validate UX, screen flows, and stakeholder alignment before a single line of backend code is written.
**Duration:** ~2 Sprints (4 weeks)
**Output:** A shareable, interactive prototype that any hotel stakeholder can click through to experience the full product vision.

#### Guiding Principles for This Phase

- All data is hardcoded or mocked (realistic dummy values for a 5-star Melbourne hotel)
- Every screen must be navigable — no dead ends
- Design should reflect final intended UI, not wireframes
- Feedback from pilot hotel stakeholders is captured and logged as backlog refinement input for Phase 1

#### Epics & User Stories

**Epic 0.1: Navigation Shell & Layout**

- As a user, I can log in to a landing screen so that I am oriented within the product
- As a user, I can navigate between all major sections via a sidebar or top nav so that I can explore the full tool
- As a user, I can see which role/department view I am in so that the context is always clear
  > Screens: Login, App Shell, Role Switcher

**Epic 0.2: Executive Dashboard**

- As an executive, I can view a mock Hotel Health Score with a visual indicator so that I understand the concept of the daily score
- As an executive, I can see a summary of key KPIs (occupancy %, RevPAR, ADR, cost index) with mock trend lines
- As an executive, I can click into an automated alert card to see a sample alert detail screen
- As an executive, I can navigate to a scenario planning screen with a slider-based "what if" interface
  > Screens: Executive Dashboard, Alert Detail, Scenario Planner

**Epic 0.3: Revenue & Pricing View**

- As a revenue manager, I can view a mock demand forecast chart for the next 30/60/90 days
- As a revenue manager, I can see a competitor rate shopping table with placeholder pricing data
- As a revenue manager, I can view a direct vs OTA booking mix donut chart
- As a revenue manager, I can click into a dynamic pricing recommendation card
  > Screens: Revenue Dashboard, Rate Shopping Table, Booking Mix View

**Epic 0.4: Operations & Cost View**

- As an operations manager, I can view a labour roster vs occupancy comparison chart with mock data
- As an operations manager, I can see an energy usage dashboard broken down by day/occupancy
- As an operations manager, I can view a maintenance alert list with predictive flag indicators
  > Screens: Operations Dashboard, Energy View, Maintenance Alerts

**Epic 0.5: Guest Experience View**

- As a guest experience manager, I can view a mock sentiment feed from Google, TripAdvisor, and OTAs
- As a manager, I can see sentiment broken down by touchpoint using a visual score card
- As a manager, I can click on a negative sentiment alert to view a sample guest profile and service recovery action panel
- As a manager, I can view a CRM guest profile card with preferences, past stays, and spend history
  > Screens: Sentiment Dashboard, Touchpoint Breakdown, Guest Profile, Service Recovery Panel

**Epic 0.6: Marketing & Distribution View**

- As a marketing manager, I can view mock Google/Meta Ads performance alongside booking conversion data
- As a marketing manager, I can see a channel ROI ranking table with wasted spend indicators
- As a marketing manager, I can view a pre-arrival offer campaign summary screen
  > Screens: Marketing Dashboard, Channel ROI View, Campaign Summary

**Epic 0.7: Department-Specific Views (F&B & Housekeeping)**

- As an F&B manager, I can view a food waste tracking summary and staffing recommendation card
- As a housekeeping manager, I can view room turnaround times and task completion status
  > Screens: F&B Dashboard, Housekeeping View

#### Phase 0 Exit Criteria (before proceeding to Phase 1)

- All screens built and navigable end-to-end
- Product Owner sign-off on all flows
- Pilot hotel stakeholder walkthrough completed and feedback documented
- All feedback items triaged into the Phase 1 backlog

---

### Phase 1 — MVP: Core Intelligence Foundation

**Goal:** Establish the data backbone, deliver the Hotel Health Score, and unlock the two highest-ROI capabilities — dynamic pricing and cost/labour optimisation.
**Duration:** ~4 Sprints (8 weeks)
**Note:** Phase 1 backend and frontend work is guided directly by the screens validated in Phase 0. UI components built in Phase 0 are wired up to real data — not rebuilt from scratch.

#### Epics & User Stories

**Epic 1: Data Infrastructure**

- As a system, I can ingest data from PMS via API so that booking and ADR data is available in the platform
- As a system, I can ingest POS data so that F&B and room service revenue is tracked
- As a system, I can connect to the Channel Manager so that direct vs OTA booking mix is visible
- As an admin, I can monitor data pipeline health so that integration failures are detected early
  > Features: 63, 64, 65, 72

**Epic 2: Executive Dashboard & Hotel Health Score**

- As an executive, I can view a daily Hotel Health Score so that I have a single indicator of overall performance
- As an executive, I can see top-level KPIs (occupancy, RevPAR, ADR, costs) on one screen
- As an executive, I can set up automated daily alerts so that I'm notified of significant changes without logging in
  > Features: 1, 2, 4

**Epic 3: Revenue & Dynamic Pricing Foundation**

- As a revenue manager, I can view a demand forecast by room type for the next 30/60/90 days
- As a revenue manager, I can see competitor pricing and availability (rate shopping) in real time
- As a revenue manager, I can view the direct vs OTA booking mix with associated cost per booking
  > Features: 7, 8, 9, 16, 17

**Epic 4: Labour & Cost Optimisation**

- As an operations manager, I can view labour roster data against forecasted occupancy
- As an operations manager, I receive alerts when overtime thresholds are being approached
- As an operations manager, I can view energy usage by day segmented by occupancy level
  > Features: 23, 35, 37, 41, 42

---

### Phase 2 — Growth: Guest Intelligence & Marketing Efficiency

**Goal:** Layer in guest sentiment, upsell intelligence, marketing ROI, and predictive maintenance to drive incremental revenue and reduce reactive costs.
**Duration:** ~4 Sprints (8 weeks)

#### Epics & User Stories

**Epic 5: Guest Sentiment & Experience**

- As a guest experience manager, I can view real-time sentiment from Google, TripAdvisor, and OTAs in one feed
- As a manager, I receive an immediate alert when a guest's in-stay feedback is flagged as negative so I can intervene before checkout
- As a guest experience manager, I can view sentiment broken down by touchpoint (room, F&B, check-in, spa)
- As a manager, I can view a guest's CRM profile including past stays, preferences, and spend history
  > Features: 26, 27, 28, 29, 31, 32, 34

**Epic 6: Upsell & Pre-Arrival Intelligence**

- As a revenue manager, I can view AI-identified upsell trigger patterns (e.g. late arrivals → room service spend)
- As a marketing manager, I can trigger personalised pre-arrival offers based on guest segment and booking data
- As a revenue manager, I can view and act on last-minute tactical offer recommendations
  > Features: 12, 13, 14, 21, 33

**Epic 7: Marketing & Distribution Performance**

- As a marketing manager, I can view Google Ads and Meta Ads performance alongside booking conversion data
- As a marketing manager, I can identify which acquisition channels are generating the highest ROI
- As a marketing manager, I can see wasted ad spend and receive AI recommendations to reallocate budget
  > Features: 45, 46, 47, 48, 49, 50

**Epic 8: Predictive Maintenance**

- As a maintenance manager, I can view an AI-generated preventive maintenance schedule for key assets
- As an operations manager, I am alerted when equipment anomalies suggest an imminent failure
  > Features: 24, 38, 40, 44

---

### Phase 3 — Scale: Full Intelligence & Scenario Planning

**Goal:** Complete the platform with external intelligence, full scenario planning, advanced AI models, and architecture ready for multi-property scaling.
**Duration:** ~4 Sprints (8 weeks)

#### Epics & User Stories

**Epic 9: External Contextual Intelligence**

- As a revenue manager, I can view local events, flight arrivals, and citywide occupancy trends in one feed so I can adjust pricing proactively
- As an F&B manager, I receive staffing recommendations based on external event and weather data
- As a marketing manager, I can receive weather-driven package creation suggestions (e.g. spa offers on rainy days)
- As an executive, I can monitor competitor promotions and macroeconomic indicators from the dashboard
  > Features: 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62

**Epic 10: Scenario Planning & CapEx Intelligence**

- As an executive, I can run a scenario ("What if occupancy drops 10% next month?") and see the projected financial impact
- As an executive, I can view a capital expenditure prioritisation view ranked by ROI and urgency
  > Features: 5, 6

**Epic 11: Advanced AI Models & Optimisation**

- As a revenue manager, I can view a combined optimisation model that balances pricing, occupancy, and cost simultaneously
- As a marketing manager, I can view guest segments with behavioural clusters and target offers accordingly
- As a GM, I can run churn vs loyalty predictions by guest segment to identify retention risks
  > Features: 19, 20, 22, 25

**Epic 12: Remaining Integrations**

- RMS integration for pricing decision sync
- MICE/events system integration for group and conference revenue tracking
- Loyalty program data integration
- OTA performance data (Booking.com, Expedia metrics)
- Camera feed integration (for anomaly detection and occupancy sensing)
  > Features: 66, 67, 68, 69, 70, 71

---

## 7. Technical Architecture

### 7.1 Overview

Three-layer cloud-first architecture designed for API-driven integration and future multi-property scalability.

```
[ External Sources ]        [ Hotel IT Systems ]
       |                            |
       ▼                            ▼
  ┌─────────────────────────────────────────┐
  │         DATA LAYER                      │
  │  Central Cloud Data Lake                │
  │  API connectors: PMS, POS, CRM, RMS,   │
  │  Channel Manager, MICE, Loyalty, OTAs  │
  └────────────────┬────────────────────────┘
                   │
                   ▼
  ┌─────────────────────────────────────────┐
  │         AI LAYER                        │
  │  • Time-series forecasting models       │
  │  • NLP sentiment engine                 │
  │  • Guest clustering & segmentation      │
  │  • Anomaly detection                    │
  │  • Recommendation engine                │
  │  • Optimisation models                  │
  └────────────────┬────────────────────────┘
                   │
                   ▼
  ┌─────────────────────────────────────────┐
  │         EXPERIENCE LAYER                │
  │  • Executive dashboard                  │
  │  • Department-specific views            │
  │  • Automated alerts & recommendations   │
  │  • Scenario planning tool               │
  └─────────────────────────────────────────┘
```

### 7.2 Core Technology Decisions (To Be Confirmed)

| Component          | Approach                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| Cloud Platform     | AWS / Azure / GCP (TBD based on hotel IT environment)                    |
| Data Lake          | Cloud-native (S3 / Azure Data Lake)                                      |
| API Layer          | RESTful APIs with OAuth 2.0 for hotel system integrations                |
| AI/ML              | Python-based models (scikit-learn, Prophet, HuggingFace NLP)             |
| Dashboard Frontend | React-based web application, mobile-responsive                           |
| Alerting           | Real-time push notifications + email/SMS                                 |
| Security           | Role-based access control (RBAC), data encryption at rest and in transit |

---

## 8. Risks & Mitigations

| Risk                                           | Likelihood | Impact | Mitigation                                                                           |
| ---------------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------ |
| PMS/POS API access is limited or unavailable   | Medium     | High   | Audit all system APIs in Sprint 0; identify fallback (CSV export pipelines)          |
| Data quality from legacy hotel systems is poor | High       | High   | Build data validation layer; flag and quarantine anomalous records                   |
| AI model accuracy is insufficient at launch    | Medium     | Medium | Start with rule-based logic in Phase 1; introduce ML models once data volume matures |
| Pilot hotel staff don't adopt the tool         | Medium     | High   | Involve hotel stakeholders in Sprint Reviews; build training into Phase 1 delivery   |
| Scope creep across 72 features                 | High       | Medium | Strict backlog prioritisation by Product Owner; defer non-MVP features formally      |
| Data privacy and PCI compliance concerns       | Low        | High   | Engage legal/compliance review before Phase 1 begins; no raw payment data stored     |

---

## 9. Assumptions & Dependencies

### Assumptions

- The pilot hotel will provide API or data export access to PMS, POS, and Channel Manager before Sprint 1
- A dedicated product owner from the hotel or client side will be available for Sprint Reviews
- External data feeds (weather, events, flight data) will be sourced via third-party API providers
- The platform is web-first; native mobile apps are out of scope for Phase 1–3

### Dependencies

- Hotel IT team cooperation for system integration and credentials
- Selection of cloud infrastructure provider before Sprint 1
- Legal/compliance sign-off on data handling before any guest data is ingested

---

## 10. Open Questions

1. Which PMS is the pilot hotel running (e.g. Opera, Protel, Mews)? This determines integration complexity.
2. Does the hotel have an existing RMS, or is pricing managed manually?
3. What is the preferred cloud provider (AWS, Azure, GCP)?
4. Are there existing BI tools in use (e.g. Tableau, Power BI) that should be integrated or replaced?
5. What are the data retention and privacy obligations under Australian law (Privacy Act 1988) for guest data?
6. Is there an internal IT team who will co-own the integration work, or is this fully outsourced?

---

## 11. Glossary

| Term   | Definition                                                       |
| ------ | ---------------------------------------------------------------- |
| ADR    | Average Daily Rate — average revenue per occupied room per night |
| CRS    | Central Reservation System                                       |
| LOS    | Length of Stay                                                   |
| MICE   | Meetings, Incentives, Conferences, and Exhibitions               |
| OTA    | Online Travel Agency (e.g. Booking.com, Expedia)                 |
| PMS    | Property Management System                                       |
| POS    | Point of Sale system                                             |
| RevPAR | Revenue per Available Room                                       |
| RMS    | Revenue Management System                                        |
| NLP    | Natural Language Processing                                      |
| CapEx  | Capital Expenditure                                              |
| RBAC   | Role-Based Access Control                                        |

---

_Document Owner: [Product Owner Name TBD]_
_Last Updated: March 2026_
_Next Review: End of Sprint 2_
