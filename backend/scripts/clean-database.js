const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function cleanDatabase() {
  try {
    console.log('Cleaning database...');
    
    // Xóa tất cả attendances
    console.log('Deleting attendances...');
    const deletedAttendances = await prisma.attendance.deleteMany({});
    console.log(`Deleted ${deletedAttendances.count} attendances`);
    
    // Xóa tất cả subscription cancellation requests
    console.log('Deleting cancellation requests...');
    const deletedCancellations = await prisma.subscriptionCancellationRequest.deleteMany({});
    console.log(`Deleted ${deletedCancellations.count} cancellation requests`);
    
    // Xóa tất cả subscriptions
    console.log('Deleting subscriptions...');
    const deletedSubscriptions = await prisma.subscription.deleteMany({});
    console.log(`Deleted ${deletedSubscriptions.count} subscriptions`);
    
    // Xóa tất cả appointments
    console.log('Deleting appointments...');
    const deletedAppointments = await prisma.appointment.deleteMany({});
    console.log(`Deleted ${deletedAppointments.count} appointments`);
    
    // Xóa tất cả maintenance logs
    console.log('Deleting maintenance logs...');
    const deletedLogs = await prisma.maintenanceLog.deleteMany({});
    console.log(`Deleted ${deletedLogs.count} maintenance logs`);
    
    // Xóa tất cả equipment
    console.log('Deleting equipment...');
    const deletedEquipment = await prisma.equipment.deleteMany({});
    console.log(`Deleted ${deletedEquipment.count} equipment`);
    
    // Xóa tất cả memberships
    console.log('Deleting memberships...');
    const deletedMemberships = await prisma.membership.deleteMany({});
    console.log(`Deleted ${deletedMemberships.count} memberships`);
    
    // Xóa tất cả users (trừ admin)
    console.log('Deleting test users...');
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        OR: [
          { role: 'member' },
          { role: 'trainer' },
          { email: { contains: 'test' } },
          { email: { contains: 'example.com' } }
        ]
      }
    });
    console.log(`Deleted ${deletedUsers.count} test users`);
    
    console.log('Database cleaned successfully!');
    console.log('Only admin users remain in the database.');
    
  } catch (error) {
    console.error('Error cleaning database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanDatabase(); 