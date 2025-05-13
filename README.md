# Gym Management System

Hệ thống quản lý phòng Gym với 3 vai trò chính: admin, huấn luyện viên (trainer) và thành viên (member).

## Công nghệ sử dụng

- **Frontend**: Next.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB với Prisma ORM
- **Authentication**: JWT

## Cài đặt

### Yêu cầu môi trường

- Node.js v14+
- MongoDB
- NPM hoặc Yarn

### Cài đặt backend

1. Di chuyển đến thư mục backend:

```bash
cd backend
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Tạo file .env với nội dung sau (điều chỉnh theo cấu hình của bạn):

```
DATABASE_URL="mongodb://localhost:27017/gym-management"
JWT_SECRET="your-secret-key-change-this-in-production"
JWT_EXPIRES_IN="30d"
PORT=5000
```

4. Tạo Prisma client:

```bash
npm run prisma:generate
```

5. Đẩy schema lên MongoDB (đảm bảo MongoDB đã được chạy):

```bash
npm run prisma:push
```

6. Khởi tạo dữ liệu mẫu:

```bash
npm run prisma:seed
```

7. Chạy server:

```bash
npm run dev
```

### Cài đặt frontend

1. Di chuyển đến thư mục frontend:

```bash
cd frontend
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Tạo file .env.local với nội dung sau:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Chạy frontend:

```bash
npm run dev
```

## Tài khoản mặc định

Sau khi chạy seed, hệ thống sẽ tạo các tài khoản sau:

- **Admin**: admin@example.com / admin123
- **Trainer**: trainer@example.com / admin123
- **Member**: member@example.com / admin123

## Các chức năng chính

### Admin
- Quản lý tất cả người dùng (thêm, sửa, xóa)
- Quản lý gói tập (thêm, sửa, xóa)
- Xem tất cả đăng ký và lịch sử điểm danh
- Báo cáo doanh thu

### Trainer
- Quản lý thành viên
- Quản lý đăng ký gói tập
- Điểm danh (check-in, check-out)

### Member
- Xem thông tin cá nhân và gói tập hiện tại
- Xem lịch sử điểm danh
- Đăng ký gói tập mới

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Đăng ký người dùng mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin người dùng hiện tại

### Users
- `GET /api/users` - Lấy danh sách người dùng
- `GET /api/users/:id` - Lấy thông tin người dùng cụ thể
- `POST /api/users` - Tạo người dùng mới
- `PATCH /api/users/:id` - Cập nhật thông tin người dùng
- `DELETE /api/users/:id` - Xóa người dùng

### Memberships
- `GET /api/memberships` - Lấy danh sách gói tập
- `GET /api/memberships/:id` - Lấy thông tin gói tập cụ thể
- `POST /api/memberships` - Tạo gói tập mới
- `PATCH /api/memberships/:id` - Cập nhật thông tin gói tập
- `DELETE /api/memberships/:id` - Xóa gói tập

### Subscriptions
- `GET /api/subscriptions` - Lấy danh sách đăng ký
- `GET /api/subscriptions/:id` - Lấy thông tin đăng ký cụ thể
- `GET /api/subscriptions/member/:memberId` - Lấy danh sách đăng ký của thành viên
- `POST /api/subscriptions` - Tạo đăng ký mới
- `PATCH /api/subscriptions/:id` - Cập nhật trạng thái thanh toán
- `DELETE /api/subscriptions/:id` - Hủy đăng ký

### Attendance
- `GET /api/attendance` - Lấy danh sách điểm danh
- `GET /api/attendance/member/:memberId` - Lấy danh sách điểm danh của thành viên
- `POST /api/attendance` - Check-in
- `PATCH /api/attendance/:id` - Check-out
- `DELETE /api/attendance/:id` - Xóa điểm danh 