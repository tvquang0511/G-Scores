# Rate Limiting

## Mục đích

Rate Limiting giúp giới hạn số lượng request mà một client có thể gửi trong một khoảng thời gian.

Ví dụ:

- 100 requests / phút / IP

Nếu vượt quá giới hạn, server sẽ trả về:

```

429 Too Many Requests

```

---

## Tại sao cần?

Ngăn chặn:

- Spam API
- Brute-force
- DoS đơn giản
- Một client gửi quá nhiều request làm ảnh hưởng người dùng khác

---

## Tại sao áp dụng trong G-Scores?

Các API như:

- GET /students/:registrationNumber
- GET /statistics
- GET /ranking

đều là API public.

Nếu không có giới hạn, một client có thể gửi hàng nghìn request liên tục và tạo tải không cần thiết cho server.

---

## Giải pháp

Sử dụng:

- @nestjs/throttler

Cấu hình:

- 100 requests / phút / IP

Đây là mức phù hợp cho bài test.

---

## Luồng hoạt động

Client

↓

Request

↓

Throttler Guard

↓

Kiểm tra số request của IP

↓

Nếu chưa vượt giới hạn

↓

Controller

↓

Response

Ngược lại

↓

429 Too Many Requests

---

## Khi nào nên dùng?

Nên áp dụng cho:

- Public API
- Authentication API
- Search API
- Statistics API

Không thay thế Authentication hay Authorization, chỉ là một lớp bảo vệ bổ sung.