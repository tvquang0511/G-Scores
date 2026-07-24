# 🏗️ G-Scores System Architecture

Comprehensive overview of system design, monorepo structure, data flow, caching tiers, and database optimizations in **G-Scores**.

---

## 🏛️ Monorepo Overview

```text
G-Scores (NPM Workspaces Monorepo)
├── apps/
│   ├── api/                  # NestJS v11 REST API Backend
│   │   ├── prisma/           # Prisma Schema, Migrations, Seeder
│   │   ├── data/             # CSV Dataset (diem_thi_thpt_2024.csv)
│   │   └── src/
│   │       ├── common/       # Interceptors, Filters, Guards, Middleware
│   │       ├── config/       # ConfigService modules & env schemas
│   │       ├── database/     # PrismaService instance
│   │       └── modules/      # Domain modules (students, statistics, ranking)
│   └── web/                  # React 19 + Vite Frontend SPA
│       ├── public/           # Static assets & vercel.json
│       └── src/
│           ├── api/          # Axios HTTP client
│           ├── components/   # UI components (Shadcn UI, Recharts)
│           ├── hooks/        # Custom React & TanStack Query hooks
│           ├── pages/        # LookupPage, StatisticsPage, RankingPage
│           └── router/       # React Router v7 SPA routing
├── infra/                    # Infrastructure & Docker configuration
│   ├── docker-compose.yml    # Mode 3: Full Stack Production
│   ├── docker-compose.dev.yml# Mode 2: Local PostgreSQL
│   └── nginx/                # Reverse proxy config for React frontend
└── docs/                     # Technical documentation markdown files
```

---

## 🔄 End-to-End Data Flow

```
[ User Browser ]
       │
       ▼
[ React 19 Frontend ] (TanStack Query Cache: 10 mins)
       │ HTTP Request
       ▼
[ Nginx / Vercel SPA ]
       │ Reverse Proxy
       ▼
[ NestJS API Gateway ]
       │
       ├──► 1. ThrottlerGuard (Rate Limit: 30 req/min per IP)
       │
       ├──► 2. ValidationPipe (DTO Regex & Class Validator)
       │
       ├──► 3. LoggingCacheInterceptor (In-Memory Cache)
       │         ├── Cache HIT  ──► Return Cached JSON Response
       │         └── Cache MISS ──► Query Database ──► Store in Cache ──► Return JSON
       ▼
[ PostgreSQL / Supabase DB ] (Single SQL Aggregations & Unique Index Lookups)
```

---

## ⚡ Performance Optimizations

### 1. Database Single SQL Queries
Instead of fetching 1,000,000+ rows into Node.js memory and performing `.map()`, `.filter()`, and `.sort()` in JavaScript:
- **Statistics**: Computed inside PostgreSQL using `COUNT(*) FILTER (...)` in a single query.
- **Rankings**: Computed inside PostgreSQL using dynamic `$queryRaw` SQL queries with `ORDER BY (subject1 + subject2 + subject3) DESC LIMIT 10`.

### 2. Two-Tier Caching
- **Client Tier**: TanStack Query (`staleTime: 10 minutes`) prevents redundant network calls during tab switches.
- **Server Tier**: NestJS `@nestjs/cache-manager` (`TTL: 600s`) serves analytical responses instantly without hitting PostgreSQL.

### 3. Rate Limiting Protection
Global `@nestjs/throttler` guard limits requests to **30 req / 60 seconds per IP** to safeguard against DDoS attacks or scraping scripts.