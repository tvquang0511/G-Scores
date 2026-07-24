# 🚀 G-Scores Deployment Guide

Comprehensive deployment guide for Backend (Render), Frontend (Vercel/Netlify), Database (Supabase), and Docker Compose.

---

## 1. Backend Deployment (Render)

1. Connect your GitHub repository to [Render](https://render.com).
2. Create a new **Web Service**:
   - **Name**: `g-scores-api`
   - **Root Directory**: `apps/api`
   - **Environment**: `Node`
   - **Build Command**:
     ```bash
     npm install && npx prisma db push --schema=prisma/schema.prisma && npm run build
     ```
   - **Start Command**:
     ```bash
     npm run start:prod
     ```
3. Set **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
   - `DATABASE_URL` = `postgresql://postgres.pszuzryedizlqylhejon:vuquang123@@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true`
   - `DIRECT_URL` = `postgresql://postgres.pszuzryedizlqylhejon:vuquang123@@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres`

---

## 2. Frontend Deployment (Vercel)

1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Import Project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Set **Environment Variable**:
   - `VITE_API_BASE_URL` = `https://g-scores-api-dmr1.onrender.com`
4. Deploy!

*Note: Single-page application route rewrites are pre-configured in `vercel.json` and `apps/web/public/vercel.json`.*

---

## 3. Local Production Deployment (Docker Compose)

To run the complete production stack (PostgreSQL + NestJS API + Nginx React Web) in Docker containers locally:

```bash
# Start all containers in background
docker compose -f infra/docker-compose.yml up -d --build

# Run manual seeding inside Docker container (optional)
docker exec -it gscores-api npx prisma db seed --schema=apps/api/prisma/schema.prisma

# Stop containers
docker compose -f infra/docker-compose.yml down
```