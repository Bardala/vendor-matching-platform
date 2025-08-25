# Hiring Quest: Backend Developer @ Expanders360

## 🎯 Mission: Build the Global Expansion Management API

**Business Context:**
Expanders360 helps founders run expansion projects in new countries. Each project requires structured data (clients, vendors, projects) stored in MySQL, and unstructured research documents (e.g., market insights, contracts, reports) stored in MongoDB. Your mission is to design a backend that connects these worlds and powers the matching of projects with vendors.

---

## 🛠️ Your Tasks

### 1. Auth & Roles

- [ ] Implement JWT authentication in NestJS.
- [ ] **Roles:** `client`, `admin`.
- [ ] Clients can manage their own projects.
- [ ] Admins can manage vendors and system configs.

### 2. Projects & Vendors (MySQL)

Design and implement the following relational schema in MySQL:

- [ ] `clients` (`id`, `company_name`, `contact_email`)
- [ ] `projects` (`id`, `client_id`, `country`, `services_needed[]`, `budget`, `status`)
- [ ] `vendors` (`id`, `name`, `countries_supported[]`, `services_offered[]`, `rating`, `response_sla_hours`)
- [ ] `matches` (`id`, `project_id`, `vendor_id`, `score`, `created_at`)

### 3. Research Documents (MongoDB)

- [ ] Store market reports and project research files in MongoDB (schema-free).
- [ ] Each document must be linked to a project (`projectId`).
- [ ] Provide an endpoint to:
  - [ ] Upload a document (title, content, tags).
  - [ ] Query/search documents by tag, text, or project.

### 4. Project-Vendor Matching

- [ ] Build an endpoint `POST /projects/:id/matches/rebuild` that generates vendor matches using MySQL queries.
- [ ] **Matching Rules:**
  1.  Vendors must cover the same country as the project.
  2.  Must have at least one service overlap.
  3.  **Score Formula:** `services_overlap * 2 + rating + SLA_weight`
      _(Note: You will need to define `SLA_weight` based on `response_sla_hours`)_
- [ ] Store matches in DB with idempotent upsert logic.

### 5. Analytics & Cross-DB Query

- [ ] Create an endpoint `GET /analytics/top-vendors` that returns:
  - Top 3 vendors per country (based on avg match score last 30 days, from MySQL)
  - Count of research documents linked to expansion projects in that country (from MongoDB)
- [ ] _This requires joining relational and non-relational sources in your service layer._

### 6. Notifications & Scheduling

- [ ] When a new match is generated → send email notification (SMTP or mock service).
- [ ] Implement a scheduled job (e.g., using NestJS Schedule or BullMQ) that:
  - [ ] Refreshes matches daily for “active” projects.
  - [ ] Flags vendors with expired SLAs.

### 7. Deployment

- [ ] Dockerized app with MySQL + MongoDB containers.
- [ ] Deploy to any free cloud (Render, Railway, AWS free tier, etc.).
- [ ] Provide a working `.env.example` and clear setup instructions.

---

## 🧰 Mandatory Tech Stack

- **Framework:** NestJS (TypeScript)
- **Database:** MySQL (Primary) + MongoDB
- **Authentication:** JWT
- **ORMs:** TypeORM (MySQL) + Mongoose (MongoDB)
- **Scheduling:** NestJS Schedule / BullMQ
- **Containerization:** Docker + docker-compose

---

## 📝 Submission Requirements (GitHub Repo)

- [ ] **Codebase:** Complete NestJS modules, services, controllers.
- [ ] **Database:**
  - [ ] MySQL migrations + seeds.
  - [ ] MongoDB seed script.
- [ ] **README.md** including:
  - Setup instructions.
  - Schema diagrams.
  - API list.
  - Explanation of matching formula.
  - Deployment link.
- [ ] **Short Demo Video:** covering:
  - DB schema walkthrough.
  - API demo.
  - Analytics query demo.

---

## 📊 Evaluation Criteria

| Criteria                                              | Weight |
| :---------------------------------------------------- | :----- |
| API & Architecture (NestJS practices, modularity, DI) | 25%    |
| MySQL Schema & Queries                                | 20%    |
| MongoDB Integration                                   | 15%    |
| Matching Logic & Analytics                            | 15%    |
| Notifications & Scheduling                            | 10%    |
| Documentation & Developer Experience (DX)             | 10%    |
| Deployment                                            | 5%     |

---

## 🔍 Who We’re Looking For

- 3–5 years of backend development experience.
- Strong in NestJS with solid OOP design.
- Proficient in MySQL (schema design, joins, transactions, optimization).
- Knowledge of MongoDB for handling unstructured data.
- Experienced in building secure REST APIs with RBAC & validation.
- Solid understanding of DB migrations, indexing, and caching strategies.
- _Bonus:_ experience with message queues, scheduling, or hybrid data architectures.

---

## 💼 Quest Info

- **Registration Deadline:** September 10, 2025
- **Submission Deadline:** September 10, 2025
- **Start Date:** Immediate
- **Location:** Remote (Egypt-based preferred)
- **Salary:** Paid in USD (or USD-equivalent)

**Prizes:** You get hired with a paid contract and the opportunity to work on real-world projects.

**Contact:** If you face any issues, please contact us on WhatsApp at `01558405326`.
