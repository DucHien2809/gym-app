const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestData() {
  try {
    console.log('Creating test data...');
    
    // Hash password for members
    const hashedPassword = await bcrypt.hash('member123', 12);
    
    // Create memberships
    console.log('Creating memberships...');
    const memberships = await Promise.all([
      prisma.membership.upsert({
        where: { name: 'Gói Cơ Bản' },
        update: {},
        create: {
          name: 'Gói Cơ Bản',
          description: 'Gói tập cơ bản cho người mới bắt đầu',
          duration: 1, // 1 month
          price: 500000,
          features: ['Sử dụng thiết bị cơ bản', 'Phòng tập chính'],
          active: true
        }
      }),
      prisma.membership.upsert({
        where: { name: 'Gói Cao Cấp' },
        update: {},
        create: {
          name: 'Gói Cao Cấp',
          description: 'Gói tập cao cấp với đầy đủ tiện ích',
          duration: 3, // 3 months
          price: 1200000,
          features: ['Toàn bộ thiết bị', 'Huấn luyện viên cá nhân', 'Spa & Sauna'],
          active: true
        }
      })
    ]);
    
    console.log('Created memberships:', memberships.map(m => m.name));
    
    // Create member users
    console.log('Creating member users...');
    const members = [];
    const memberData = [
      { name: 'Nguyễn Văn A', email: 'member1@example.com', phone: '0901234567' },
      { name: 'Trần Thị B', email: 'member2@example.com', phone: '0912345678' },
      { name: 'Lê Văn C', email: 'member3@example.com', phone: '0923456789' },
      { name: 'Phạm Thị D', email: 'member4@example.com', phone: '0934567890' },
      { name: 'Hoàng Văn E', email: 'member5@example.com', phone: '0945678901' }
    ];
    
    for (const memberInfo of memberData) {
      const member = await prisma.user.upsert({
        where: { email: memberInfo.email },
        update: {},
        create: {
          ...memberInfo,
          password: hashedPassword,
          role: 'member',
          active: true
        }
      });
      members.push(member);
    }
    
    console.log('Created members:', members.map(m => m.name));
    
    // Create active subscriptions for members
    console.log('Creating active subscriptions...');
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      const membership = memberships[i % memberships.length]; // Alternate between memberships
      
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + membership.duration);
      
      // Check if subscription already exists
      const existingSubscription = await prisma.subscription.findFirst({
        where: {
          memberId: member.id,
          membershipId: membership.id,
          active: true
        }
      });
      
      if (!existingSubscription) {
        await prisma.subscription.create({
          data: {
            memberId: member.id,
            membershipId: membership.id,
            startDate,
            endDate,
            paymentStatus: 'completed',
            paymentAmount: membership.price,
            paymentDate: new Date(),
            paymentMethod: 'cash',
            active: true,
            notes: 'Test subscription'
          }
        });
        console.log(`Created subscription for ${member.name}`);
      } else {
        console.log(`Subscription already exists for ${member.name}`);
      }
    }
    
    console.log('Test data creation completed!');
    console.log('Members can login with: member1@example.com / member123');
    console.log('All members have active subscriptions for attendance testing');
    
  } catch (error) {
    console.error('Error creating test data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestData(); 