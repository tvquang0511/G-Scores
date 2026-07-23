# Database

## Nguyên tắc

- Để Database xử lý các tác vụ Search, Filter, Sort và Aggregate.
- Chỉ đưa dữ liệu lên Node.js khi cần xử lý Business Logic.
- Hạn chế sử dụng `findMany()` rồi xử lý bằng JavaScript nếu SQL có thể làm được.

---

## Các loại truy vấn

### Lookup

Tìm một bản ghi theo khóa.

Ví dụ:

```sql
SELECT *
FROM Student
WHERE registration_number = '01000001';
```

→ Sử dụng `Unique Index`.

---

### Aggregation

Thống kê dữ liệu.

Ví dụ:

```sql
SELECT COUNT(*)
FROM Student
WHERE math >= 8;
```

→ Sử dụng `COUNT`, `SUM`, `AVG`, `GROUP BY`, `FILTER`.

---

### Ranking

Sắp xếp và lấy Top N.

Ví dụ:

```sql
SELECT *
FROM Student
ORDER BY math + physics + chemistry DESC
LIMIT 10;
```

→ Database xử lý tốt hơn JavaScript.

---

## Index

Index giúp Database tìm kiếm dữ liệu nhanh hơn.

Chỉ tạo Index cho:

- Primary Key
- Unique Key
- Các cột thường xuyên Search hoặc Join

Không tạo Index cho mọi cột vì Index cũng làm tăng chi phí Insert/Update.

---

## Áp dụng cho G-Scores

| API | Giải pháp |
|------|-----------|
| GET /students/:registrationNumber | Unique Index |
| GET /statistics | SQL Aggregation (`COUNT ... FILTER`) |
| GET /ranking | `ORDER BY ... LIMIT 10` |