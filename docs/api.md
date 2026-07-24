# 📡 G-Scores API Documentation

Official REST API reference for the **G-Scores** High School Examination Analytics System.

- **Base URL**: `http://localhost:3000` (Local) / `https://g-scores-api-dmr1.onrender.com` (Production)
- **Swagger OpenAPI Docs**: `http://localhost:3000/api/docs`

---

## 📋 Table of Contents
- [1. Student Lookup (`GET /students/:registrationNumber`)](#1-student-lookup)
- [2. Score Statistics (`GET /statistics`)](#2-score-statistics)
- [3. University Entrance Rankings (`GET /ranking/:group`)](#3-university-entrance-rankings)
- [4. Global Error & Rate Limit Specifications](#4-global-error--rate-limit-specifications)

---

## 1. Student Lookup

Fetch detailed examination scores for a student by their 8-digit registration number (SBD).

### Request
```http
GET /students/:registrationNumber HTTP/1.1
Host: localhost:3000
Accept: application/json
```

#### Parameters
| Parameter | Type | In | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `registrationNumber` | `string` | Path | **Yes** | 8-digit numeric student SBD (e.g., `01000001`) |

### Responses

#### `200 OK`
```json
{
  "id": "cm5...1",
  "registrationNumber": "01000001",
  "math": 8.4,
  "literature": 7.5,
  "foreignLanguage": 9.0,
  "physics": 8.0,
  "chemistry": 7.75,
  "biology": 6.5,
  "history": null,
  "geography": null,
  "civicEducation": null,
  "foreignLanguageCode": "N1",
  "createdAt": "2026-07-23T09:10:45.000Z",
  "updatedAt": "2026-07-23T09:10:45.000Z"
}
```

#### `400 Bad Request` (Validation Error)
```json
{
  "statusCode": 400,
  "message": [
    "registrationNumber must contain exactly 8 digits"
  ],
  "error": "Bad Request"
}
```

#### `404 Not Found`
```json
{
  "statusCode": 404,
  "message": "Student with registration number 00000000 not found",
  "error": "Not Found"
}
```

---

## 2. Score Statistics

Get distribution statistics for all 9 subjects, categorized into 4 score tiers:
- **Giỏi**: Score ≥ 8.0
- **Khá**: 6.0 ≤ Score < 8.0
- **Trung Bình**: 4.0 ≤ Score < 6.0
- **Yếu**: Score < 4.0

### Request
```http
GET /statistics HTTP/1.1
Host: localhost:3000
Accept: application/json
```

### Response (`200 OK`)
```json
{
  "math": {
    "excellent": 150240,
    "good": 450120,
    "average": 310500,
    "poor": 150745,
    "total": 1061605
  },
  "literature": {
    "excellent": 120500,
    "good": 580000,
    "average": 290000,
    "poor": 71105,
    "total": 1061605
  },
  "foreignLanguage": {
    "excellent": 98000,
    "good": 320000,
    "average": 410000,
    "poor": 233605,
    "total": 1061605
  },
  "physics": { "excellent": 45000, "good": 120000, "average": 90000, "poor": 45000, "total": 300000 },
  "chemistry": { "excellent": 42000, "good": 118000, "average": 92000, "poor": 48000, "total": 300000 },
  "biology": { "excellent": 25000, "good": 95000, "average": 110000, "poor": 70000, "total": 300000 },
  "history": { "excellent": 80000, "good": 250000, "average": 220000, "poor": 150000, "total": 700000 },
  "geography": { "excellent": 95000, "good": 280000, "average": 210000, "poor": 115000, "total": 700000 },
  "civicEducation": { "excellent": 210000, "good": 350000, "average": 100000, "poor": 40000, "total": 700000 }
}
```

*Note: Results are cached in-memory for 10 minutes (`TTL: 600s`).*

---

## 3. University Entrance Rankings

Fetch Top 10 student rankings for a specific university entrance exam group.

### Request
```http
GET /ranking/:group HTTP/1.1
Host: localhost:3000
Accept: application/json
```

#### Supported Group Enums
- `g-a`: Group A (Math + Physics + Chemistry)
- `g-a1`: Group A1 (Math + Physics + Foreign Language)
- `g-b`: Group B (Math + Chemistry + Biology)
- `g-c`: Group C (Literature + History + Geography)
- `g-d`: Group D (Math + Literature + Foreign Language)

### Response (`200 OK`)
```json
[
  {
    "rank": 1,
    "registrationNumber": "01024589",
    "totalScore": 29.75,
    "subject1": 10.0,
    "subject2": 9.75,
    "subject3": 10.0
  },
  {
    "rank": 2,
    "registrationNumber": "02011478",
    "totalScore": 29.5,
    "subject1": 9.8,
    "subject2": 9.7,
    "subject3": 10.0
  }
]
```

---

## 4. Global Error & Rate Limit Specifications

### `429 Too Many Requests`
Triggered when an IP exceeds **30 requests / 60 seconds**.
```json
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```