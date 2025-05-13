const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmins() {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Danh sách thông tin 3 admin cần tạo
    const adminsData = [
      {
        name: 'Admin 1',
        email: 'admin1@example.com',
        password: hashedPassword,
        role: 'admin',
        phone: '0123456001',
        active: true,
      },
      {
        name: 'Admin 2',
        email: 'admin2@example.com',
        password: hashedPassword,
        role: 'admin',
        phone: '0123456002',
        active: true,
      },
      {
        name: 'Admin 3',
        email: 'admin3@example.com',
        password: hashedPassword,
        role: 'admin',
        phone: '0123456003',
        active: true,
      }
    ];
    
    // Tạo các admin
    console.log('Bắt đầu tạo tài khoản admin...');
    
    for (const adminData of adminsData) {
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await prisma.user.findUnique({
        where: { email: adminData.email }
      });
      
      if (existingUser) {
        console.log(`Tài khoản với email ${adminData.email} đã tồn tại.`);
        continue;
      }
      
      // Tạo admin mới
      const admin = await prisma.user.create({
        data: adminData
      });
      
      console.log(`Đã tạo tài khoản admin: ${admin.name} (${admin.email})`);
    }
    
    console.log('Hoàn thành việc tạo tài khoản admin.');
  } catch (error) {
    console.error('Lỗi khi tạo tài khoản admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Chạy hàm tạo admin
createAdmins(); 