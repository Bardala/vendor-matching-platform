# Hiring Quest – Backend Developer @ Expanders360

## Phase: Registration

**Registration Deadline:** September 10, 2025

**Submission Deadline:** September 10, 2025

To register for a quest, you need to create an account on our platform. If you've registered for any quest before, you already have an account. If you face any issues, please contact us on WhatsApp at 01558405326 or join our WhatsApp Community.

## Prizes

You get hired with paid contract and the opportunity to work on real-world.

## 👋 We are Expanders360

We are Expanders360, a global expansion partner helping founders and investors enter new markets with ease. Through our network of vetted experts and service providers, we make cross-border growth smooth, compliant, and successful.

We’re now hiring a Backend Developer (3–5 YOE) to build reliable APIs, relational schemas, and hybrid storage systems that support our international expansion platform.

- **🕓 Start Date:** Immediate
- **🌍 Location:** Remote (Egypt-based preferred)
- **💰 Salary:** Paid in USD (or USD-equivalent)

## 🛠️ How the Hiring Quest Works

1.  Register for the quest
2.  Receive full instructions via email after registration closes
3.  Submit your solution before the deadline
4.  Top candidates will be invited to a review session
5.  One candidate will be hired — others may be considered for freelance or future roles

## 🔍 Who We’re Looking For

- 3–5 years of backend development experience
- Strong in NestJS with solid OOP design
- Proficient in MySQL (schema design, joins, transactions, optimization)
- Knowledge of MongoDB for handling unstructured data
- Experienced in building secure REST APIs with RBAC & validation
- Solid understanding of DB migrations, indexing, and caching strategies
- Bonus: experience with message queues, scheduling, or hybrid data architectures

## 🎯 Your Mission: Build the Global Expansion Management API

**Business Context:**
Expanders360 helps founders run expansion projects in new countries. Each project requires structured data (clients, vendors, projects) stored in MySQL, and unstructured research documents (e.g., market insights, contracts, reports) stored in MongoDB. Your mission is to design a backend that connects these worlds and powers the matching of projects with vendors.

## 🛠️ Your Tasks

### Auth & Roles

- Implement JWT authentication in NestJS ✅
- Roles: client, admin ✅
- Clients can manage their own projects ✅
- Admins can manage vendors and system configs ✅

### Projects & Vendors (MySQL) - Relational schema in MySQL:

- `clients` (id, company_name, contact_email)✅
- `projects` (id, client_id, country, services_needed[], budget, status)✅
- `vendors` (id, name, countries_supported[], services_offered[], rating, response_sla_hours)✅
- `matches` (id, project_id, vendor_id, score, created_at)✅

### Research Documents (MongoDB)

- Store market reports and project research files in MongoDB (schema-free).✅
- Each document is linked to a project (projectId).✅
- Provide an endpoint to:
  - Upload a document (title, content, tags). ✅
  - Query/search documents by tag, text, or project. ✅

### Project-Vendor Matching

- Build an endpoint `/projects/:id/matches/rebuild` that generates vendor matches using MySQL queries.✅❔
- Matching rules:
  - Vendors must cover same country
  - At least one service overlap
  - Score formula: `services_overlap * 2 + rating + SLA_weight`
- Store matches in DB with idempotent upsert logic.

### Analytics & Cross-DB Query

- Create an endpoint `/analytics/top-vendors` that returns:✅
  - Top 3 vendors per country (avg match score last 30 days, from MySQL)✅
  - Count of research documents linked to expansion projects in that country (from MongoDB)✅
- This requires joining relational and non-relational sources in your service layer.✅

### Notifications & Scheduling

- When a new match is generated → send email notification (SMTP or mock service).
- Implement a scheduled job (e.g., using NestJS Schedule or BullMQ) that:
  - Refreshes matches daily for “active” projects ✅
  - Flags vendors with expired SLAs ✅

### Deployment

- Dockerized app with MySQL + MongoDB containers
- Deploy to any free cloud (Render, Railway, AWS free tier, etc.)
- Provide a working `.env.example` and setup instructions

## 🧰 Tech Stack

```
NestJS (TypeScript)
MySQL for relational data
MongoDB for unstructured documents
JWT Authentication
ORM: TypeORM (MySQL) + Mongoose (MongoDB)
Scheduling: NestJS Schedule / BullMQ
Docker + docker-compose
```

## 📝 What You Should Submit

GitHub repo with:

- Codebase (NestJS modules, services, controllers)
- MySQL migrations + seeds
- MongoDB seed script
- README including: setup, schema diagrams, API list, matching formula, deployment link
- Short demo video: DB schema walkthrough, API demo, analytics query demo

## 📊 Evaluation Criteria

- API & Architecture (NestJS practices, modularity, DI) – 25%
- MySQL Schema & Queries – 20%
- MongoDB Integration – 15%
- Matching Logic & Analytics – 15%
- Notifications & Scheduling – 10%
- Documentation & DX – 10%
- Deployment – 5%

👉 Final hiring decisions will be made within 3–5 business days after your review.
