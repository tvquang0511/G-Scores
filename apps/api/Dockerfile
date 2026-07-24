# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root & app package manifests
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Generate Prisma Client & Build NestJS API
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma
RUN npm run build --workspace=apps/api

# Stage 2: Production Runner
FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/

RUN npm install --only=production

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/apps/api/data ./apps/api/data
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push --schema=apps/api/prisma/schema.prisma && node apps/api/dist/main.js"]