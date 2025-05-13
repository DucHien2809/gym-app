const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Xóa dữ liệu cũ (nếu muốn)
  await prisma.attendance.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.membership.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Đã xóa dữ liệu cũ');

  // Tạo admin
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      phone: '0123456789',
      active: true,
    },
  });

  // Tạo nhân viên
  const trainer = await prisma.user.create({
    data: {
      name: 'Trainer User',
      email: 'trainer@example.com',
      password: hashedPassword,
      role: 'trainer',
      phone: '0123456780',
      active: true,
    },
  });

  // Tạo thành viên
  const member = await prisma.user.create({
    data: {
      name: 'Member User',
      email: 'member@example.com',
      password: hashedPassword,
      role: 'member',
      phone: '0123456781',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      dateOfBirth: new Date('1990-01-01'),
      active: true,
    },
  });

  console.log('Đã tạo các tài khoản người dùng');

  // Tạo gói tập
  const membershipBasic = await prisma.membership.create({
    data: {
      name: 'Gói Cơ bản',
      description: 'Gói tập cơ bản dành cho người mới bắt đầu',
      duration: 1, // 1 tháng
      price: 500000,
      features: ['Sử dụng tất cả máy tập', 'Tập không giới hạn thời gian', 'Nước uống miễn phí'],
      active: true,
    },
  });

  const membershipStandard = await prisma.membership.create({
    data: {
      name: 'Gói Tiêu chuẩn',
      description: 'Gói tập tiêu chuẩn với nhiều ưu đãi',
      duration: 3, // 3 tháng
      price: 1200000,
      features: [
        'Tất cả tính năng của gói Cơ bản',
        '1 buổi PT miễn phí',
        'Giảm 10% khi mua sản phẩm tại gym',
      ],
      active: true,
    },
  });

  const membershipPremium = await prisma.membership.create({
    data: {
      name: 'Gói Premium',
      description: 'Gói tập cao cấp với đầy đủ đặc quyền',
      duration: 12, // 12 tháng
      price: 3600000,
      features: [
        'Tất cả tính năng của gói Tiêu chuẩn',
        '5 buổi PT miễn phí',
        'Giảm 20% khi mua sản phẩm tại gym',
        'Ưu tiên đăng ký lớp học nhóm',
      ],
      active: true,
    },
  });

  console.log('Đã tạo các gói tập');

  // Tạo đăng ký gói tập
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + membershipBasic.duration);

  const subscription = await prisma.subscription.create({
    data: {
      memberId: member.id,
      membershipId: membershipBasic.id,
      startDate,
      endDate,
      paymentAmount: membershipBasic.price,
      paymentStatus: 'completed',
      paymentMethod: 'cash',
      paymentDate: new Date(),
      active: true,
      createdById: trainer.id,
    },
  });

  console.log('Đã tạo đăng ký gói tập');

  // Tạo điểm danh
  const checkInTime = new Date();
  checkInTime.setHours(checkInTime.getHours() - 2); // 2 giờ trước

  const checkOutTime = new Date();
  checkOutTime.setHours(checkOutTime.getHours() - 1); // 1 giờ trước

  const duration = Math.round((checkOutTime - checkInTime) / (1000 * 60)); // Số phút

  const attendance = await prisma.attendance.create({
    data: {
      memberId: member.id,
      checkInTime,
      checkOutTime,
      duration,
      notes: 'Buổi tập đầu tiên',
      createdById: trainer.id,
    },
  });

  console.log('Đã tạo điểm danh');

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 