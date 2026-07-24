# 🎓 G-Scores - High School Examination Analytics System

[![NestJS](https://img.shields.io/badge/NestJS-v11.0-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-v19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-v6.3-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16.0-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

A modern, high-performance web application designed for high school national examination result lookup, subject score distribution analytics, and university entrance group rankings.

---

## 📌 Key Features

### 1. 🔍 Student Score Lookup (`/lookup`)
- **8-Digit Registration Number Validation**: Strict client-side and server-side DTO validation (`/^[0-9]{8}$/`).
- **Detailed Subject Grid**: Displays scores for all 10 subjects (Math, Literature, Foreign Language, Physics, Chemistry, Biology, History, Geography, Civic Education, Foreign Language Code).
- **Performance Color Coding**: Color-coded score indicators (Excellent: Emerald Green, Average: Amber, Poor: Red).
- **Error Handling**: Graceful error cards for HTTP 404 (Student Not Found) and HTTP 400 validation failures.

### 2. 📊 Subject Score Statistics (`/statistics`)
- **Interactive Recharts Donut Charts**: Transformed score distributions into responsive Donut Charts.
- **4 Performance Levels**: Categorizes exam performance into **Giỏi (≥ 8.0)**, **Khá (6.0 - < 8.0)**, **Trung Bình (4.0 - < 6.0)**, and **Yếu (< 4.0)**.
- **Subject Filter Dropdown**: Allows filtering stats for all 9 subjects simultaneously or focusing on individual subjects.

### 3. 🏆 Top 10 University Group Rankings (`/ranking`)
- **Group Selector Tabs**: Interactive tabs for 5 major university entrance groups:
  - **Khối A**: Math + Physics + Chemistry (`GET /ranking/g-a`)
  - **Khối A1**: Math + Physics + Foreign Language (`GET /ranking/g-a1`)
  - **Khối B**: Math + Chemistry + Biology (`GET /ranking/g-b`)
  - **Khối C**: Literature + History + Geography (`GET /ranking/g-c`)
  - **Khối D**: Math + Literature + Foreign Language (`GET /ranking/g-d`)
- **Single SQL Query Execution**: Computes rankings and aggregations in PostgreSQL using a single raw `$queryRaw` query (eliminating Node.js in-memory sorting).
- **Aligned Ranking Badges**: Distinct `#1`, `#2`, `#3` badge styling ensuring pixel-perfect vertical table alignment.

### 4. 🛡️ Security, Rate Limiting & Two-Tier Caching
- **Rate Limiting**: Global `@nestjs/throttler` guard protecting all endpoints (**30 requests / 60s per IP**) to prevent automated data scraping.
- **Two-Tier Caching**:
  - **Frontend Cache**: TanStack Query (`staleTime: 10 mins`) for 0ms tab switching.
  - **Backend Cache**: In-memory cache (`@nestjs/cache-manager`) protecting PostgreSQL under heavy traffic.
  - **Transparent Terminal Logging**: Custom `LoggingCacheInterceptor` logging `🟢 [Cache HIT]` and `🟡 [Cache MISS]` in real time.

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Monorepo** | NPM Workspaces (`apps/api`, `apps/web`) |
| **Backend API** | NestJS v11, TypeScript, Prisma ORM v6, `@nestjs/throttler`, `@nestjs/cache-manager`, Swagger OpenAPI |
| **Frontend Web** | React 19, Vite 8, TypeScript, Tailwind CSS v4, Shadcn UI, Recharts v3, TanStack Query v5, Axios |
| **Database** | PostgreSQL 16 / Supabase Cloud Database |
| **Containerization** | Docker, Multi-Stage Builds, Nginx Reverse Proxy, Docker Compose |

---

## 🚀 Quick Start Guide (4 Evaluation Modes)

Choose any of the 4 execution modes below to evaluate the application:

### 🌟 MODE 0: Live Deployed Application (Zero Setup / Instant Access)
*Evaluate the fully deployed production application live in your browser immediately.*

- 🌐 **Live Web Application (Vercel)**: [https://g-scores-kappa.vercel.app](https://g-scores-kappa.vercel.app)
- ⚡ **Live Backend API (Render)**: [https://g-scores-api-dmr1.onrender.com](https://g-scores-api-dmr1.onrender.com)
- 📚 **Live Swagger OpenAPI Docs**: [https://g-scores-api-dmr1.onrender.com/api/docs](https://g-scores-api-dmr1.onrender.com/api/docs)

---

### 🟢 MODE 1 (DEFAULT): Supabase Cloud Database (Zero Setup)
*Runs locally connected directly to live Supabase Cloud PostgreSQL.*

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tvquang0511/G-Scores.git
   cd G-Scores
   ```

2. **Copy environment variables**:
   ```bash
   cp .env.example .env
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   ```

3. **Install dependencies**:
   ```bash
   # Option A: Install at Root (Monorepo Workspace)
   npm install

   # Option B: Or install individually inside each subfolder
   cd apps/api && npm install
   cd ../web && npm install
   ```

4. **Start development servers**:
   ```bash
   # Terminal 1: Run Backend API (from apps/api)
   cd apps/api
   npm run start:dev

   # Terminal 2: Run Frontend Web (from apps/web)
   cd apps/web
   npm run dev
   ```

- 🌐 Frontend Web: `http://localhost:5173`
- ⚡ Backend API: `http://localhost:3000`
- 📚 Swagger Docs: `http://localhost:3000/api/docs`

---

### 🟡 MODE 2: Local PostgreSQL with `infra/docker-compose.dev.yml`
*Runs local PostgreSQL 16 in a Docker container while running code locally.*

1. **Start Local PostgreSQL Container**:
   ```bash
   docker compose -f infra/docker-compose.dev.yml up -d
   ```

2. **Uncomment Local Database URL in `.env` & `apps/api/.env`**:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gscores?schema=public"
   DIRECT_URL="postgresql://postgres:postgres@localhost:5432/gscores?schema=public"
   ```

3. **Push Prisma Schema, Seed Data & Start Backend**:
   ```bash
   cd apps/api
   npx prisma db push
   npm run prisma:seed
   npm run start:dev
   ```

---

### 🔵 MODE 3: Single-Command Full Production Stack (`infra/docker-compose.yml`)
*Builds and runs PostgreSQL, NestJS API, and Nginx React Web in Docker with a single command.*

1. **Run Docker Compose**:
   ```bash
   docker compose -f infra/docker-compose.yml up -d --build
   ```

2. **Seed Data into Docker PostgreSQL (Optional)**:
   ```bash
   docker exec -it gscores-api npx prisma db seed --schema=apps/api/prisma/schema.prisma
   ```

- 🌐 Web Application (Nginx): `http://localhost` (Port 80)
- ⚡ Backend API: `http://localhost:3000` (Port 3000)
- 🗄️ PostgreSQL Database: `localhost:5432` (Port 5432)

---

## 🌱 Data Seeding (`diem_thi_thpt_2024.csv`)

The project includes an official dataset (`apps/api/data/diem_thi_thpt_2024.csv`). To import the dataset into your target PostgreSQL database (Local or Supabase):

```bash
# Navigate to API directory
cd apps/api

# Execute Prisma Seeder (batch import with progress status)
npm run prisma:seed
```

**Seeding Features**:
- Stream-reads CSV data using `csv-parser`.
- Inserts data in batch chunks of **5,000 records** for maximum speed.
- Logs progress in real time (`Imported 5000 / 1061605`, etc.).

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description | Cache | Rate Limit |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/students/:registrationNumber` | Fetch student scores by 8-digit SBD | ❌ Disabled | 30 req / 60s |
| `GET` | `/statistics` | Get score distribution statistics for 9 subjects | 🟢 600s TTL | 30 req / 60s |
| `GET` | `/ranking/g-a` | Top 10 ranking for Group A (Math, Physics, Chem) | 🟢 600s TTL | 30 req / 60s |
| `GET` | `/ranking/g-a1` | Top 10 ranking for Group A1 (Math, Phys, Eng) | 🟢 600s TTL | 30 req / 60s |
| `GET` | `/ranking/g-b` | Top 10 ranking for Group B (Math, Chem, Bio) | 🟢 600s TTL | 30 req / 60s |
| `GET` | `/ranking/g-c` | Top 10 ranking for Group C (Lit, Hist, Geo) | 🟢 600s TTL | 30 req / 60s |
| `GET` | `/ranking/g-d` | Top 10 ranking for Group D (Math, Lit, Eng) | 🟢 600s TTL | 30 req / 60s |

---

## 🧪 Testing

Run backend unit test suite:
```bash
cd apps/api
npm test
```
*(All 21 unit tests passing across controllers and services).*

---

## 📄 License

MIT License. Designed and engineered as a Technical Assessment for Senior NestJS & React Backend/Frontend roles.