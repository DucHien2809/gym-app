# 🏋️ Gym Management System

Hệ thống quản lý phòng Gym toàn diện với 3 vai trò chính: Quản trị viên (Admin), Huấn luyện viên (Trainer) và Thành viên (Member).

## 📋 Mục lục

- [Tổng quan](#-tổng-quan)
- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Cài đặt](#-cài-đặt)
- [Sử dụng](#-sử-dụng)
- [API Documentation](#-api-documentation)
- [Tài khoản mặc định](#-tài-khoản-mặc-định)
- [Screenshots](#-screenshots)
- [Đóng góp](#-đóng-góp)
- [Giấy phép](#-giấy-phép)

## 🎯 Tổng quan

Gym Management System là một ứng dụng web full-stack được xây dựng để quản lý toàn bộ hoạt động của một phòng gym hiện đại. Hệ thống hỗ trợ quản lý thành viên, gói tập, thiết bị, lịch hẹn, điểm danh và nhiều tính năng khác.

## ✨ Tính năng

### 👨‍💼 Quản trị viên (Admin)
- **Quản lý người dùng**: Thêm, sửa, xóa và quản lý tất cả người dùng
- **Quản lý gói tập**: Tạo và quản lý các gói membership
- **Quản lý thiết bị**: Theo dõi và bảo trì thiết bị gym
- **Báo cáo tài chính**: Xem doanh thu và thống kê
- **Quản lý hủy đăng ký**: Xử lý yêu cầu hủy gói tập
- **Dashboard tổng quan**: Thống kê tổng thể hoạt động

### 👨‍🏫 Huấn luyện viên (Trainer)
- **Quản lý thành viên**: Xem thông tin và hỗ trợ thành viên
- **Điểm danh**: Check-in/check-out cho thành viên
- **Quản lý lịch hẹn**: Tạo và quản lý appointments
- **Thống kê điểm danh**: Theo dõi hoạt động của thành viên

### 👤 Thành viên (Member)
- **Hồ sơ cá nhân**: Cập nhật thông tin và ảnh đại diện
- **Xem gói tập**: Theo dõi gói đăng ký hiện tại
- **Lịch sử điểm danh**: Xem history check-in/out
- **Đặt lịch hẹn**: Book appointments với trainer
- **Yêu cầu hủy gói**: Gửi yêu cầu hủy đăng ký

## 🛠 Công nghệ sử dụng

### Frontend
- **Framework**: Next.js 15.3.2 với TypeScript
- **Styling**: TailwindCSS 4.1.5
- **UI Libraries**: React Icons, Framer Motion
- **HTTP Client**: Axios
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Password Hashing**: bcryptjs
- **Validation**: Validator.js

### DevOps & Tools
- **Package Manager**: NPM
- **Development**: Nodemon (hot reload)
- **Linting**: ESLint
- **Environment**: dotenv

## 📁 Cấu trúc dự án

```
SE104/
├── backend/                          # Backend API
│   ├── src/
│   │   ├── controllers/             # Route controllers
│   │   ├── middleware/              # Auth & error middleware  
│   │   ├── models/                  # Data models
│   │   ├── routes/                  # API routes
│   │   └── lib/                     # Utilities & config
│   ├── prisma/                      # Database schema & seeds
│   ├── uploads/                     # File uploads
│   └── server.js                    # Entry point
├── frontend/                        # Next.js frontend
│   ├── src/
│   │   ├── app/                     # App router pages
│   │   ├── components/              # Reusable components
│   │   ├── context/                 # React contexts
│   │   ├── services/                # API services
│   │   ├── types/                   # TypeScript types
│   │   └── utils/                   # Helper functions
│   └── public/                      # Static assets
└── README.md                        # Documentation
```

## 🚀 Cài đặt

### Yêu cầu hệ thống

- **Node.js**: >= 14.0.0
- **MongoDB**: >= 4.4
- **NPM**: >= 6.0.0

### 1. Clone repository

```bash
git clone <repository-url>
cd SE104
```

### 2. Cài đặt Backend

```bash
cd backend
npm install
```

### 3. Cấu hình Backend

Tạo file `.env` trong thư mục `backend`:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/gym-management"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="30d"

# Server
PORT=5000
NODE_ENV="development"

# File Upload
MAX_FILE_SIZE=5000000  # 5MB
```

### 4. Thiết lập Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to MongoDB
npm run prisma:push

# Seed initial data
npm run prisma:seed
```

### 5. Khởi chạy Backend

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 6. Cài đặt Frontend

```bash
cd ../frontend
npm install
```

### 7. Cấu hình Frontend

Tạo file `.env.local` trong thư mục `frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_UPLOAD_URL=http://localhost:5000/uploads
```

### 8. Khởi chạy Frontend

```bash
# Development mode
npm run dev

# Build for production
npm run build
npm start
```

## 🎮 Sử dụng

1. Truy cập `http://localhost:3000` để mở ứng dụng
2. Đăng nhập bằng một trong các tài khoản mặc định (xem bên dưới)
3. Khám phá các tính năng theo vai trò của bạn

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/auth/signup     # Đăng ký tài khoản mới
POST   /api/auth/login      # Đăng nhập
GET    /api/auth/me         # Lấy thông tin user hiện tại
```

### User Management
```
GET    /api/users           # Lấy danh sách users
GET    /api/users/:id       # Lấy thông tin user cụ thể
POST   /api/users           # Tạo user mới
PATCH  /api/users/:id       # Cập nhật thông tin user
DELETE /api/users/:id       # Xóa user
```

### Membership Management
```
GET    /api/memberships     # Lấy danh sách gói tập
GET    /api/memberships/:id # Lấy thông tin gói tập
POST   /api/memberships     # Tạo gói tập mới
PATCH  /api/memberships/:id # Cập nhật gói tập
DELETE /api/memberships/:id # Xóa gói tập
```

### Subscription Management
```
GET    /api/subscriptions             # Lấy danh sách đăng ký
GET    /api/subscriptions/:id         # Lấy thông tin đăng ký
GET    /api/subscriptions/member/:id  # Đăng ký của thành viên
POST   /api/subscriptions             # Tạo đăng ký mới
PATCH  /api/subscriptions/:id         # Cập nhật đăng ký
DELETE /api/subscriptions/:id         # Hủy đăng ký
```

### Attendance Management
```
GET    /api/attendance               # Lấy danh sách điểm danh
GET    /api/attendance/member/:id    # Điểm danh của thành viên
POST   /api/attendance               # Check-in
PATCH  /api/attendance/:id           # Check-out
DELETE /api/attendance/:id           # Xóa điểm danh
```

### Equipment Management
```
GET    /api/equipment        # Lấy danh sách thiết bị
GET    /api/equipment/:id    # Lấy thông tin thiết bị
POST   /api/equipment        # Thêm thiết bị mới
PATCH  /api/equipment/:id    # Cập nhật thiết bị
DELETE /api/equipment/:id    # Xóa thiết bị
```

### Appointment Management  
```
GET    /api/appointments     # Lấy danh sách appointments
POST   /api/appointments     # Tạo appointment mới
PATCH  /api/appointments/:id # Cập nhật appointment
DELETE /api/appointments/:id # Hủy appointment
```

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 Giấy phép

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 📞 Liên hệ

- **Team**: SE104 - Nhóm 3
- **Email**: 23520460@gm.uit.edu.vn

---

⭐ **Nếu dự án này hữu ích, hãy cho tụi mình một star!** ⭐ 