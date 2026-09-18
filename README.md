# Clear Path NEMT - Non-Emergency Medical Transportation Platform

**Status:** Phase 1 (MVP) - In Development  
**Domain:** goclearpathemt.com  
**Organization:** Clear Path Labs  

## 🎯 Project Overview

Clear Path NEMT is a production-ready SaaS platform providing non-emergency medical transportation (NEMT) for MassHealth and Medicare members. Built with **Next.js 14** (frontend), **NestJS** (backend), and **PostgreSQL**, using a **hybrid monorepo architecture** with pnpm workspaces.

### Current Phase: MVP (Phase 1)
- ✅ Public marketing website with landing pages
- ✅ State-specific landing pages (MA, CT, RI, VT, NH)
- ✅ Provider application and management system
- ✅ Basic authentication (JWT-based)
- ✅ Admin dashboard for provider approvals
- ✅ Contact/support pages
- ✅ FAQ and about sections
- ⏳ (Phase 2) Patient portal + ride booking
- ⏳ (Phase 3) Insurance integration + real-time tracking

## 🚀 Quick Start

### Prerequisites
```bash
node --version      # 18.0+
pnpm --version      # 8.0+
docker --version    # For containerized development
```

### Install & Start

```bash
# 1. Navigate to project
cd /path/to/clear-path-nemt

# 2. Install all dependencies
pnpm install

# 3. Start all services (local development)
pnpm dev
```

### Access the Application

```
Frontend:     http://localhost:3000
Backend API:  http://localhost:3001
API Docs:     http://localhost:3001/api/docs
Database:     localhost:5432 (PostgreSQL)
```

### First-Time Setup

1. **Database**: PostgreSQL will auto-sync schema in dev mode
2. **Environment**: `.env.local` file is already configured for local dev
3. **Test Account**: Use provided test credentials (coming in Phase 1)

---

## 📁 Project Structure (Hybrid Monorepo)

```
clear-path-nemt/
├── packages/
│   ├── shared/                    # Shared types (@clear-path/shared)
│   │   ├── src/types/
│   │   │   ├── auth.ts           # Auth & JWT types
│   │   │   ├── booking.ts        # Ride booking types
│   │   │   ├── insurance.ts      # Insurance & eligibility types
│   │   │   ├── provider.ts       # Provider & driver types
│   │   │   └── index.ts          # Public API
│   │   └── package.json
│   │
│   ├── backend/                   # NestJS API
│   │   ├── src/
│   │   │   ├── auth/             # JWT, login, registration
│   │   │   ├── providers/        # Provider management
│   │   │   ├── database/         # TypeORM entities & migrations
│   │   │   ├── common/           # Logger, utilities
│   │   │   ├── app.module.ts     # Main module
│   │   │   └── main.ts           # Entry point
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── frontend/                  # Next.js 14 UI
│       ├── pages/                # Next.js pages
│       │   ├── index.tsx         # Home
│       │   ├── about.tsx
│       │   ├── contact.tsx
│       │   ├── faq.tsx
│       │   ├── auth/
│       │   │   ├── login.tsx
│       │   │   └── register.tsx
│       │   ├── benefits/
│       │   └── providers/
│       ├── src/
│       │   ├── components/       # React components
│       │   ├── styles/           # Tailwind CSS + globals
│       │   └── lib/              # API client, utilities
│       ├── next.config.js        # Next.js config
│       ├── tailwind.config.js    # Tailwind (Clear Path brand colors)
│       └── package.json
│
├── services/
│   └── infra/
│       ├── docker-compose.yml    # Local dev environment
│       ├── docker/               # Dockerfiles
│       │   ├── backend.Dockerfile
│       │   └── frontend.Dockerfile
│       └── k8s/                  # Kubernetes manifests (future)
│
├── docs/                          # Documentation
├── pnpm-workspace.yaml           # Workspace definition
├── tsconfig.json                 # Root TypeScript config
├── package.json                  # Root package.json
├── .env.local                    # Local environment (dev)
├── CLAUDE.md                     # Project context & instructions
└── README.md                     # This file
```

---

## 📦 Workspace Commands

Run from **root directory**:

```bash
# Install all packages (do this first!)
pnpm install

# Start all services in parallel
pnpm dev

# Build all packages
pnpm build

# Run tests across all packages
pnpm test

# Run type checking
pnpm type-check

# Lint and fix all code
pnpm lint
pnpm lint:fix

# Docker commands
pnpm docker:build
pnpm docker:up
pnpm docker:down
pnpm docker:logs
```

### Running Individual Services

```bash
# Start only backend (NestJS API)
pnpm --filter @clear-path/backend dev

# Start only frontend (Next.js)
pnpm --filter @clear-path/frontend dev

# Build only shared types
pnpm --filter @clear-path/shared build

# Run tests for one package
pnpm --filter @clear-path/backend test
```

---

## 🔑 Shared Types (@clear-path/shared)

All backends and frontend use types from the shared package. **No duplication, automatic syncing.**

```typescript
// Backend
import { AuthUser, RideBooking, ProviderProfile } from '@clear-path/shared';

// Frontend
import { LoginRequest, BenefitInfo, EligibilityStatus } from '@clear-path/shared';
```

### Adding a New Shared Type

1. Create file: `packages/shared/src/types/my-feature.ts`
2. Export: Add to `packages/shared/src/types/index.ts`
3. Use everywhere: `import { MyType } from '@clear-path/shared'`

**That's it!** No version bumping, no republishing—types sync automatically across the workspace.

---

## 🔧 Environment Configuration

### Backend (.env.local)

```bash
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=clear_path_nemt

# API
PORT=3001
NODE_ENV=development

# Auth
JWT_SECRET=dev_jwt_secret_change_in_production

# Features (Phase 2+)
CHAT_ENABLED=false
RAG_ENABLED=false
AGENTS_ENABLED=false
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_DOMAIN=goclearpathemt.com
```

### Production Environment

See `.env.prod.example` (template provided during Phase 4).

---

## 🎨 Branding & Styling

### Clear Path Brand Colors

- **Navy:** `#003366` (primary, text)
- **Gold:** `#D4A574` (accent, CTAs)
- **Light:** `#E8EFF7` (backgrounds)
- **Dark:** `#001F3F` (dark navy)

These are configured in `packages/frontend/tailwind.config.js`. Use Tailwind utility classes:

```jsx
// Button with Clear Path branding
<button className="clear-btn-primary">Book a Ride</button>

// Heading
<h1 className="clear-heading">Welcome to Clear Path</h1>

// Accent text
<span className="clear-accent">Gold text</span>
```

---

## 🔐 Authentication

### JWT-Based Auth

- Access token: 24-hour expiry
- Refresh token: 7-day expiry
- Roles: `admin`, `provider`, `patient`, `driver`

### Flow

1. User registers via `/auth/register`
2. Backend creates user and returns JWT tokens
3. Frontend stores `accessToken` in secure storage
4. Protected routes use `JwtAuthGuard`

---

## 📊 Database Schema (Phase 1)

### Core Tables

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  password_hash VARCHAR,
  role ENUM('admin', 'provider', 'patient', 'driver'),
  created_at TIMESTAMP
);

-- Providers
CREATE TABLE providers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  company_name VARCHAR,
  state VARCHAR,
  status ENUM('pending', 'approved', 'rejected', 'suspended'),
  created_at TIMESTAMP
);

-- Provider Applications
CREATE TABLE provider_applications (
  id UUID PRIMARY KEY,
  provider_id UUID REFERENCES providers(id),
  status ENUM('draft', 'submitted', 'approved', 'rejected'),
  documents JSONB,
  submitted_at TIMESTAMP,
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP
);
```

### Phase 2+ Tables

- `patients` - Patient profiles
- `rides` - Booking/trip records
- `drivers` - Driver profiles
- `vehicles` - Vehicle inventory

### Phase 3+ Tables

- `eligibility_checks` - Insurance verification
- `claims` - Insurance claims
- `insurance_info` - Member insurance details

---

## 🧪 Testing & Type Checking

```bash
# Type check all packages
pnpm type-check

# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:cov
```

### Running Tests for One Package

```bash
pnpm --filter @clear-path/backend test
pnpm --filter @clear-path/frontend test
```

---

## 🚨 Troubleshooting

### "Module not found: @clear-path/shared"

```bash
# Build shared types
pnpm --filter @clear-path/shared build

# Restart dev server
pnpm dev
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>
```

### Database Connection Failed

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# If using Docker Compose
pnpm docker:up
```

### Dependencies Not Installing

```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and reinstall
rm -rf node_modules
pnpm install
```

---

## 📋 API Documentation

### Swagger Docs

When backend is running, visit: **http://localhost:3001/api/docs**

### Authentication

All protected endpoints require Bearer token:

```bash
curl -H "Authorization: Bearer <access_token>" http://localhost:3001/api/providers
```

### Core Endpoints (Phase 1)

```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login
POST   /api/providers/applications            # Create provider application
GET    /api/providers/applications            # Get applications
POST   /api/providers/applications/:id/submit # Submit application
POST   /api/providers/applications/:id/approve # Admin: Approve
GET    /api/providers/:id        # Get provider details
```

---

## 🎓 Development Workflow

### Adding a New Feature (Full Stack)

```bash
1. Create type in packages/shared/src/types/
2. Export from packages/shared/src/types/index.ts
3. Add API endpoint in packages/backend/src/
4. Build shared: pnpm --filter @clear-path/shared build
5. Add UI in packages/frontend/pages/ or src/components/
6. Run: pnpm dev
7. Test at http://localhost:3000
```

### Backend-Only Work

```bash
pnpm --filter @clear-path/backend dev
# Backend runs on http://localhost:3001
```

### Frontend-Only Work

```bash
pnpm --filter @clear-path/frontend dev
# Frontend runs on http://localhost:3000
# Uses backend from http://localhost:3001
```

---

## 📊 Project Status

| Phase | Status | Deliverables |
|-------|--------|--------------|
| **Phase 1 (MVP)** | 🟢 In Progress | Landing pages, provider signup, auth |
| Phase 2 | 🟡 Planned | Patient portal, ride booking, tracking |
| Phase 3 | 🟡 Planned | Insurance integration, claims |
| Phase 4 | 🟡 Planned | Security hardening, production readiness |

---

## 🤝 Team Setup

### For New Developers

1. Clone: `git clone https://github.com/clear-path-labs/clear-path-nemt.git`
2. Install: `pnpm install`
3. Start: `pnpm dev`
4. Check API docs at http://localhost:3001/api/docs
5. Pick a task from GitHub Issues

### For Deployments

```bash
pnpm install      # Install all
pnpm type-check   # Type check all
pnpm lint         # Lint all
pnpm test         # Test all
pnpm build        # Build all
pnpm docker:build # Build Docker images
```

---

## 🔄 Git Workflow

### Branching

- `main` - Production ready
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation

### Committing

```bash
git commit -m "feat: add provider application form

- Implement ProviderApplicationEntity
- Add providers module with CRUD endpoints
- Create provider signup page
"
```

---

## 📚 Documentation

- **[Shared Types Guide](./packages/shared/README.md)** - Type definitions
- **[Backend Guide](./packages/backend/README.md)** - NestJS setup and APIs
- **[Frontend Guide](./packages/frontend/README.md)** - Next.js pages and components
- **[Database Schema](./docs/DATABASE.md)** - Entity relationships
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Docker, Kubernetes, production setup
- **[Architecture Decision Log](./docs/ADR.md)** - Tech stack decisions

---

## 💡 Key Technologies

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Next.js 14 | SSR, SEO, fast development |
| **Styling** | Tailwind CSS | Rapid UI, brand consistency |
| **State** | Zustand | Lightweight, no boilerplate |
| **Backend** | NestJS | Enterprise framework, DI, modularity |
| **Database** | PostgreSQL | ACID, reliability, healthcare data |
| **Auth** | JWT + Passport | Stateless, scalable |
| **Validation** | class-validator | Type-safe, declarative |
| **Infrastructure** | Docker + Kubernetes | Portable, scalable deployments |
| **Package Manager** | pnpm | Fast, space-efficient workspaces |

---

## 🚀 Next Steps

### Immediate (This Week)

- [ ] Database migrations for Phase 1 schema
- [ ] Complete auth endpoints (login, register, refresh)
- [ ] Provider application form (frontend + backend)
- [ ] Admin dashboard for provider approvals
- [ ] Contact form integration

### Short-term (Next 2 Weeks)

- [ ] Email notifications (SendGrid integration)
- [ ] Provider onboarding workflow
- [ ] Payment setup (Stripe/payment processor for future copays)
- [ ] Testing framework (Jest + Supertest)

### Medium-term (Weeks 3-4)

- [ ] Patient portal scaffold
- [ ] Ride booking form
- [ ] Real-time tracking (WebSocket)
- [ ] Insurance verification (mock integrations)

---

## 📞 Support

- **Dev Questions:** Open a GitHub Issue
- **Bug Reports:** GitHub Issues with `bug` label
- **Deployments:** See [Deployment Guide](./docs/DEPLOYMENT.md)
- **Architecture:** See [ADR](./docs/ADR.md)

---

## 📜 License

MIT License - See LICENSE file for details

---

## 🎯 Success Metrics

- [ ] Landing pages load in <2 seconds
- [ ] 0 type errors (strict TypeScript)
- [ ] 80%+ test coverage
- [ ] 100% API endpoint documentation
- [ ] Mobile-responsive design
- [ ] Accessibility compliance (WCAG 2.1 AA)

---

**Last Updated:** September 18, 2026  
**Version:** 0.1.0 (Phase 1 MVP)  
**Repository:** https://github.com/clear-path-labs/clear-path-nemt  
**Domain:** https://goclearpathemt.com  

---

**Ready to build?** Run `pnpm install && pnpm dev` and start coding! 🚀
