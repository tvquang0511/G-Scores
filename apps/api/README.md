# Backend Overview

The backend is built with **NestJS**, **Prisma ORM**, and **PostgreSQL**, following a modular architecture and RESTful API design. It provides APIs for student score lookup, score statistics, and university subject group rankings based on the 2024 Vietnamese National High School Examination dataset.

## Tech Stack

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* Docker
* Swagger (OpenAPI)
* GitHub Actions

---

# Features

## Student Lookup

* Search student scores by registration number.
* Input validation using `class-validator`.
* Proper HTTP status codes.
* Swagger documentation.

Endpoint:

```http
GET /students/:registrationNumber
```

---

## Statistics

Generate score distributions for every subject.

The API categorizes scores into four levels:

* Excellent (>= 8)
* Good (6 - <8)
* Average (4 - <6)
* Poor (<4)

The implementation performs aggregation directly inside PostgreSQL using raw SQL for better performance on datasets with over one million records.

Endpoint:

```http
GET /statistics
```

---

## Ranking

Return the Top 10 students for a selected university subject group.

Supported groups:

* A
* A1
* B
* C
* D

Example:

```http
GET /ranking?group=A
```

Ranking is calculated inside PostgreSQL using dynamic SQL generated from the selected subject group.

---

# Database

## ORM

Prisma ORM is used for:

* schema management
* migrations
* database access
* type-safe queries

---

## Migration

Database schema is managed using Prisma Migrate.

Example:

```bash
npm run prisma:migrate
```

---

## Seeder

The project imports the official 2024 examination dataset (over one million records) into PostgreSQL.

The seeder:

* reads the CSV file
* transforms data
* inserts records in batches
* avoids connection timeout by chunking inserts

Example:

```bash
npm run prisma:seed
```

---

# Performance

Several optimizations are implemented.

## Database Index

The registration number is indexed to speed up lookup operations.

```text
registrationNumber
```

---

## Raw SQL

Complex analytical queries are executed using raw SQL instead of loading all records into Node.js.

Benefits:

* lower memory usage
* faster execution
* database-side aggregation

---

## In-Memory Cache

Frequently accessed endpoints are cached using NestJS Cache Manager.

Cached endpoints:

* GET /statistics
* GET /ranking

Student lookup is intentionally not cached because it is already optimized with database indexing.

---

## Rate Limiting

Global rate limiting protects public APIs from excessive requests.

Configuration:

* 30 requests
* 1 minute
* per IP

The implementation uses:

* @nestjs/throttler

---

# API Documentation

Swagger UI is available for testing all APIs.

It includes:

* request validation
* response schema
* endpoint descriptions
* query parameters

---

# Validation

All incoming requests are validated using:

* ValidationPipe
* class-validator
* class-transformer

Invalid requests return proper HTTP error responses.

---

# CI

GitHub Actions automatically validates the project on every push.

Current pipeline includes:

* dependency installation
* project build
* code verification

---

# Docker

Docker support is included for local development.

The project can be started using Docker Compose together with PostgreSQL and other required services.

---

# Current Backend Status

* Prisma ORM
* PostgreSQL
* Database Migration
* Seeder
* Validation
* Swagger
* Raw SQL Optimization
* Statistics API
* Student Lookup API
* Multi-Group Ranking API
* Rate Limiting
* In-Memory Cache
* GitHub Actions
* Docker Support
