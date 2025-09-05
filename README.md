# Vendor Matching Platform

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Global Expansion Management API with MySQL and MongoDB - A vendor matching platform that helps clients find the best service providers for their international expansion needs.

## System Overview

This platform enables businesses to:

- Create projects for international expansion
- Get matched with pre-vetted vendors based on service requirements and target countries
- Manage research documents and analytics across multiple databases

### System Design

For detailed system architecture, database schema, and API flow diagrams, please refer to the [System Design Documentation](./docs/SystemDesign.md).

### Authentication & Roles

- **Admin Role**: Full system access (use: `admin@vendormatching.com` / `password123!@#`)
- **Client Role**: Limited to their own projects and data
- All user passwords are set to: `password123!@#`

## Project Setup

### Prerequisites

- Node.js
- Docker and Docker Compose
- npm

### Installation

```bash
$ npm install
```

## Development Commands

```bash
# Run complete development environment with Docker (app + databases)
$ npm run docker:dev

# Run only databases in Docker (for local development)
$ npm run docker:up:db

# Run application locally with watch mode (with databases running in Docker)
$ npm run start:dev

# Stop all Docker services
$ npm run docker:down

# View application logs
$ npm run docker:logs:app

# View MySQL database logs
$ npm run docker:logs:mysql

# View MongoDB logs
$ npm run docker:logs:mongo

# Run tests
$ npm run test
$ npm run test:e2e

# Access application container shell
$ npm run docker:exec:app

# Access MySQL database console
$ npm run docker:exec:mysql

# Access MongoDB shell
$ npm run docker:exec:mongo
```

## API Documentation

The API is documented using Swagger and available at:

- **Local development**: http://localhost:3000/api/
- **Production deployment**: https://vendor-matching-platform-production.up.railway.app/api

## Default Accounts

The system comes with pre-seeded data including:

**Admin Account:**

- Email: `admin@vendormatching.com`
- Password: `password123!@#`

**Client Accounts:**

- TechStars: `client1@techstars.com`
- GreenFoods: `client2@greenfoods.com`
- EduGlobal: `client3@eduglobal.org`
- All passwords: `password123!@#`

## Key Features

### Authentication

- `POST /auth/register` - Client account registration
- `POST /auth/login` - User login

### Automated Matching System

- **Matching Algorithm**: Runs every minute for testing (configurable to daily in production)
- **Scoring System**: Calculates vendor matches based on:
  - Service overlap between project needs and vendor offerings
  - Country compatibility
  - Vendor rating and response SLA
  - Only high-quality matches (score ≥ 7) trigger notifications

### Notification System

- **Mock Email Service**: Notifications are printed to console for development
- **Automatic Alerts**: Clients receive notifications for new high-quality vendor matches
- **Match Details**: Includes vendor information, scores, and next steps

### Database Structure

- **MySQL**: Structured data (Users, Clients, Projects, Vendors, Services, Matches)
- **MongoDB**: Unstructured research documents with flexible tagging

## Database Migrations

Migrations run automatically before the app starts using the custom my-migrator library.

## Deployment

The application uses Docker-based deployment. For production deployment, use the deploy branch with Docker containerization.
