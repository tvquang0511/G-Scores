# Cache

## Mục đích

Cache giúp giảm số lần truy vấn Database và tăng tốc độ phản hồi.

---

## Cách hoạt động

```
Request
    │
    ▼
 Cache
 ├── Hit  → Response
 └── Miss → Database → Cache → Response
```

---

## Khi nào nên Cache

- Dữ liệu ít thay đổi.
- Được đọc nhiều lần.
- Truy vấn tốn thời gian.

---

## Khi nào không nên Cache

- Dữ liệu thay đổi liên tục.
- Request có nhiều tham số khác nhau.
- Không mang lại lợi ích về hiệu năng.

---

## Áp dụng cho G-Scores

| API | Cache |
|------|-------|
| GET /students/:registrationNumber | ❌ |
| GET /statistics | ✅ |
| GET /ranking | ✅ |

---

## TTL

TTL (Time To Live) là thời gian dữ liệu được lưu trong Cache.

Sau khi hết TTL, dữ liệu sẽ được lấy lại từ Database và cập nhật Cache.